import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Svg, { Rect } from "react-native-svg";
import Navbar from "../Navbar";

import {
  Clock3,
  CheckCircle2,
  Zap,
  Sparkles,
  Code2,
  Users,
} from "lucide-react-native";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
// appointment-service base URL (see Business API Documentation, port 8083).
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8083";

const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop";

// TODO: replace with your real auth storage (AsyncStorage / SecureStore / auth context).
// All /api/v1/business/** endpoints require `Authorization: Bearer <jwt>` with the
// MERCHANT_APPOINTMENTS role, per the Business API Documentation.
async function getAuthToken(): Promise<string | null> {
  return null;
}

async function apiGet<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const token = await getAuthToken();
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  const response = await fetch(`${API_BASE_URL}${path}${query}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message ?? `Request to ${path} failed (${response.status})`
    );
  }
  return response.json();
}

// ---------------------------------------------------------------------------
// Response types (subset of what's documented for these endpoints)
// ---------------------------------------------------------------------------
interface MerchantProfileResponse {
  firstName: string;
  lastName: string;
  businessName: string;
  logoUrl?: string;
}

interface KpiValue {
  value: number;
  delta?: string;
  deltaType?: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
}

interface AnalyticsBootstrapResponse {
  period: { label: string; from: string; to: string };
  kpis: {
    totalRevenue: KpiValue;
    totalBookings: KpiValue;
    completionRate: KpiValue;
    cancellationRate: KpiValue;
  };
  topServicesPreview: {
    serviceId: string;
    serviceName: string;
    totalRevenue: number;
  }[];
}

interface DashboardGoalResponse {
  configured: boolean;
  month: string;
  revenueGoal: number;
  revenueAchieved: number;
  revenueProgress: number;
  bookingGoal: number;
  bookingsAchieved: number;
  bookingProgress: number;
  currency: string;
}

// The documentation only describes this endpoint in prose ("busiest day of
// week ... by-weekday breakdown"), not an exact schema — this shape is a
// best-effort guess. Anything unexpected falls back gracefully below.
interface UtilizationResponse {
  byWeekday?: { dayOfWeek: number; bookingCount: number }[];
}

// ---------------------------------------------------------------------------
// View-model types (what the UI actually renders)
// ---------------------------------------------------------------------------
interface StatCard {
  id: number;
  badge: string;
  title: string;
  value: string;
  icon: typeof Clock3;
}

interface ComparisonItem {
  title: string;
  value: number;
}

interface GoalItem {
  title: string;
  value: number;
  description: string;
  icon: typeof Sparkles;
}

interface DashboardViewModel {
  profile: {
    name: string;
    role: string;
    avatar: string;
    status: string;
    label: string;
  };
  hero: {
    valueLabel: string;
    change: string;
    changeLabel: string;
    description: string;
  };
  cards: StatCard[];
  comparison: ComparisonItem[];
  goals: GoalItem[];
  weekday: { day: string; count: number }[];
}

const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const formatCurrency = (value: number, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value ?? 0);

const getCellColor = (value: number) => {
  if (value >= 80) return "#07699e";
  if (value >= 60) return "#1e3442";
  if (value >= 40) return "#8fb7d2";
  if (value >= 20) return "#b8d0e2";
  return "#d8e5ee";
};

const BarIcon = () => (
  <Svg width={70} height={70}>
    <Rect x="5" y="35" width="12" height="30" fill="#6F8EA1" />
    <Rect x="25" y="15" width="12" height="50" fill="#6F8EA1" />
    <Rect x="45" y="25" width="12" height="40" fill="#6F8EA1" />
  </Svg>
);

// ---------------------------------------------------------------------------
// Data loading
// ---------------------------------------------------------------------------
async function loadDashboardData(): Promise<DashboardViewModel> {
  const [profileRes, analyticsRes, goalsRes, utilizationRes] = await Promise.all([
    apiGet<MerchantProfileResponse>("/api/v1/business/profile"),
    apiGet<AnalyticsBootstrapResponse>("/api/v1/business/analytics/bootstrap", {
      period: "LAST_30_DAYS",
    }),
    apiGet<DashboardGoalResponse>("/api/v1/business/dashboard/goals"),
    apiGet<UtilizationResponse>("/api/v1/business/analytics/utilization", {
      period: "LAST_30_DAYS",
    }).catch(() => null),
  ]);

  const { kpis, topServicesPreview, period } = analyticsRes;

  const cards: StatCard[] = [
    {
      id: 1,
      badge: "BOOKINGS",
      title: "Total Bookings",
      value: String(kpis.totalBookings.value),
      icon: CheckCircle2,
    },
    {
      id: 2,
      badge: "RATE",
      title: "Completion Rate",
      value: `${kpis.completionRate.value}%`,
      icon: Zap,
    },
    {
      id: 3,
      badge: "RATE",
      title: "Cancellation Rate",
      value: `${kpis.cancellationRate.value}%`,
      icon: Clock3,
    },
  ];

  const maxServiceRevenue = Math.max(
    1,
    ...topServicesPreview.map((s) => s.totalRevenue)
  );
  const comparison: ComparisonItem[] = topServicesPreview.slice(0, 3).map((s) => ({
    title: s.serviceName.toUpperCase(),
    value: clampPercent(Math.round((s.totalRevenue / maxServiceRevenue) * 100)),
  }));

  const goals: GoalItem[] = [
    {
      title: "Revenue Goal",
      value: clampPercent(goalsRes.configured ? goalsRes.revenueProgress : 0),
      description: goalsRes.configured
        ? `${formatCurrency(goalsRes.revenueAchieved, goalsRes.currency)} of ${formatCurrency(
            goalsRes.revenueGoal,
            goalsRes.currency
          )} target for ${goalsRes.month}`
        : "No revenue goal set for this month yet.",
      icon: Sparkles,
    },
    {
      title: "Booking Goal",
      value: clampPercent(goalsRes.configured ? goalsRes.bookingProgress : 0),
      description: goalsRes.configured
        ? `${goalsRes.bookingsAchieved} of ${goalsRes.bookingGoal} bookings this month.`
        : "No booking goal set for this month yet.",
      icon: Code2,
    },
    {
      title: "Completion Rate",
      value: clampPercent(kpis.completionRate.value),
      description: `${kpis.completionRate.value}% of appointments completed successfully.`,
      icon: Users,
    },
  ];

  const weekdayCounts = new Map<number, number>();
  utilizationRes?.byWeekday?.forEach((d) => weekdayCounts.set(d.dayOfWeek, d.bookingCount));
  const weekday = DAY_LABELS.map((day, index) => ({
    day,
    count: weekdayCounts.get(index + 1) ?? 0,
  }));

  return {
    profile: {
      name: `${profileRes.firstName} ${profileRes.lastName}`.trim(),
      role: profileRes.businessName,
      avatar: profileRes.logoUrl || FALLBACK_AVATAR,
      status: "ACTIVE STATUS",
      label: "ELITE TIER",
    },
    hero: {
      valueLabel: formatCurrency(kpis.totalRevenue.value),
      change: kpis.totalRevenue.delta ?? "—",
      changeLabel: "vs previous period",
      description: `Revenue for ${period.label} (${period.from} – ${period.to}).`,
    },
    cards,
    comparison,
    goals,
    weekday,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Performance() {
  const [data, setData] = useState<DashboardViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const viewModel = await loadDashboardData();
      setData(viewModel);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load performance data.");
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0c77b4" />
        <Text style={styles.centeredText}>Loading performance dashboard…</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? "Something went wrong."}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchData()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { profile, hero, cards, comparison, goals, weekday } = data;
  const maxWeekdayCount = Math.max(1, ...weekday.map((d) => d.count));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => fetchData(true)} />
      }
    >
      <Navbar />
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />

            <View style={styles.labelBadge}>
              <Text style={styles.labelText}>{profile.label}</Text>
            </View>
          </View>

          <View style={{ marginLeft: 14 }}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.role}>{profile.role}</Text>
          </View>
        </View>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{profile.status}</Text>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.rankCard}>
          <View style={styles.rankIcon}>
            <BarIcon />
          </View>

          <Text style={styles.rankTitle}>TOTAL REVENUE</Text>

          <View style={styles.rankRow}>
            <Text style={styles.rankNumber}>{hero.valueLabel}</Text>

            <View>
              <Text style={styles.rankChange}>{hero.change}</Text>
              <Text style={styles.rankChange}>{hero.changeLabel}</Text>
            </View>
          </View>

          <Text style={styles.rankDesc}>{hero.description}</Text>
        </View>

        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <LinearGradient
              key={card.id}
              colors={["#0b6ca0", "#207fb1", "#4296cb"]}
              style={styles.statCard}
            >
              <View style={styles.statTop}>
                <View style={styles.iconBox}>
                  <Icon size={18} color="#fff" />
                </View>
                <Text style={styles.badge}>{card.badge}</Text>
              </View>

              <Text style={styles.statTitle}>{card.title}</Text>
              <Text style={styles.statValue}>{card.value}</Text>
            </LinearGradient>
          );
        })}
      </View>

      <LinearGradient colors={["#4f95c2", "#7daecc"]} style={styles.activityCard}>
        <Text style={styles.activityTitle}>Booking Density by Day (30d)</Text>

        <View style={styles.weekdayList}>
          {weekday.map((d) => (
            <View key={d.day} style={styles.weekdayRow}>
              <Text style={styles.dayText}>{d.day}</Text>
              <View style={styles.weekdayBarBg}>
                <View
                  style={[
                    styles.weekdayBarFill,
                    {
                      width: `${clampPercent((d.count / maxWeekdayCount) * 100)}%`,
                      backgroundColor: getCellColor(
                        clampPercent((d.count / maxWeekdayCount) * 100)
                      ),
                    },
                  ]}
                />
              </View>
              <Text style={styles.weekdayCount}>{d.count}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      {comparison.length > 0 && (
        <View style={styles.peerCard}>
          <Text style={styles.sectionTitle}>Top Services by Revenue</Text>

          {comparison.map((item) => (
            <View key={item.title}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>{item.title}</Text>
                <Text style={styles.progressLabel}>{item.value}%</Text>
              </View>

              <View style={styles.progressBg}>
                <View
                  style={[styles.progressFill, { width: `${item.value}%` }]}
                />
              </View>
            </View>
          ))}
        </View>
      )}

      <LinearGradient
        colors={["#0d0d0d", "#474f55", "#868d93"]}
        style={styles.goalCard}
      >
        <Text style={styles.goalHeading}>Goal Performance Objectives</Text>

        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <View key={goal.title} style={{ marginBottom: 22 }}>
              <View style={styles.goalHeader}>
                <View style={styles.goalLeft}>
                  <Icon size={16} color="#fff" />
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                </View>
                <Text style={styles.goalValue}>{goal.value}%</Text>
              </View>

              <View style={styles.goalProgressBg}>
                <View
                  style={[styles.goalProgressFill, { width: `${goal.value}%` }]}
                />
              </View>

              <Text style={styles.goalDesc}>{goal.description}</Text>
            </View>
          );
        })}
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 1,
  },

  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  centeredText: {
    marginTop: 12,
    color: "#5d6770",
    fontSize: 13,
  },

  errorText: {
    color: "#c0392b",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },

  retryButton: {
    backgroundColor: "#0c77b4",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },

  retryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1dd15d",
  },

  header: {
    marginBottom: 20,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 10,
  },

  labelBadge: {
    position: "absolute",
    bottom: -8,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    borderRadius: 20,
  },

  labelText: {
    fontSize: 8,
    fontWeight: "700",
  },

  name: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111",
  },

  role: {
    fontSize: 12,
    color: "#5d6770",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#f6f3f1",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 50,
    marginTop: 15,
  },

  statusText: {
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 9,
  },

  cardsContainer: {
    marginTop: 0,
  },

  rankCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 2,
    marginBottom: 16,
  },

  rankIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    opacity: 0.1,
  },

  rankTitle: {
    fontSize: 11,
    fontWeight: "900",
  },

  rankRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    // BUG FIX: previously used a fixed `marginRight: 190` on rankNumber to
    // push the change badge to the right — broke on any screen narrower/
    // wider than the original design. justifyContent handles this responsively.
    justifyContent: "space-between",
    marginTop: 2,
  },

  rankNumber: {
    fontSize: 32,
    fontWeight: "900",
  },

  rankChange: {
    color: "#38c76b",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "right",
  },

  rankDesc: {
    marginTop: 7,
    color: "#555",
    fontSize: 11,
  },

  statCard: {
    borderRadius: 18,
    padding: 20,
    minHeight: 140,
    marginBottom: 16,
  },

  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#4fc0ff",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 10,
  },

  statTitle: {
    color: "#fff",
    marginTop: 18,
  },

  statValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 8,
  },

  activityCard: {
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
  },

  activityTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  weekdayList: {
    gap: 10,
  },

  weekdayRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dayText: {
    color: "#fff",
    fontSize: 11,
    width: 34,
  },

  weekdayBarBg: {
    flex: 1,
    height: 14,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginHorizontal: 8,
    overflow: "hidden",
  },

  weekdayBarFill: {
    height: 14,
    borderRadius: 8,
  },

  weekdayCount: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    width: 24,
    textAlign: "right",
  },

  peerCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 16,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  progressLabel: {
    fontWeight: "700",
  },

  progressBg: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },

  progressFill: {
    height: 8,
    backgroundColor: "#0c77b4",
    borderRadius: 10,
  },

  goalCard: {
    borderRadius: 18,
    padding: 24,
    marginTop: 20,
  },

  goalHeading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 20,
  },

  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  goalLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  goalTitle: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
  },

  goalValue: {
    color: "#fff",
    fontWeight: "900",
  },

  goalProgressBg: {
    height: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    marginTop: 8,
    overflow: "hidden",
  },

  goalProgressFill: {
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },

  goalDesc: {
    color: "rgba(255,255,255,0.7)",
    marginTop: 8,
    fontSize: 12,
  },
});
