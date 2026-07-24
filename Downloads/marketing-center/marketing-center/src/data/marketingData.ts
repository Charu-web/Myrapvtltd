import {
  Star,
  Truck,
  Megaphone,
  ImageIcon,
  Clapperboard,
  Bell,
  LayoutGrid,
  ShoppingBag,
  Bike,
  UtensilsCrossed,
  BarChart3,
  Heart,
  Soup,
  Tag,
  Users,
  UserCog,
  MessageSquareText,
  Receipt,
  Boxes,
  UserCircle,
  Wallet,
  HelpCircle,
  LogOut,
  type LucideIcon,
} from "lucide-react";

export type CampaignStatus = "live" | "scheduled" | "paused" | "ended";

export interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  status: CampaignStatus;
  icon: "star" | "truck";
  impressions: string;
  clicks: string;
  conversion: string;
  conversionTrend: "up" | "down";
  startsOn?: string;
}

export const campaigns: Campaign[] = [
  {
    id: "camp-featured-restaurant",
    title: "Featured Restaurant",
    subtitle: "Homepage Banner Placement",
    status: "live",
    icon: "star",
    impressions: "12.4K",
    clicks: "842",
    conversion: "4.2%",
    conversionTrend: "up",
  },
  {
    id: "camp-free-delivery",
    title: "Free Delivery Weekend",
    subtitle: "Starts Oct 26, 5:00 PM",
    status: "scheduled",
    icon: "truck",
    impressions: "—",
    clicks: "—",
    conversion: "—",
    conversionTrend: "up",
    startsOn: "Starts Oct 26, 5:00 PM",
  },
];

export interface MarketingTool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const marketingTools: MarketingTool[] = [
  {
    id: "tool-sponsored-listing",
    title: "Sponsored Listing",
    description:
      "Boost your restaurant's ranking in search results to capture high intent customers.",
    icon: Megaphone,
  },
  {
    id: "tool-featured-restaurant",
    title: "Featured Restaurant",
    description:
      "Secure premium banner placement on the app homepage for maximum visibility.",
    icon: ImageIcon,
  },
  {
    id: "tool-video-ads",
    title: "Video Ads",
    description:
      "Share behind-the-scenes chef stories and dynamic content in the feed.",
    icon: Clapperboard,
  },
  {
    id: "tool-push-notifications",
    title: "Push Notifications",
    description:
      "Send direct alerts to your past customers for immediate re-engagement.",
    icon: Bell,
  },
];

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  roi: string;
}

export const recentActivity: ActivityItem[] = [
  {
    id: "act-1",
    title: "Lunch Special Boost",
    detail: "Completed Oct 15",
    roi: "2.1x ROI",
  },
  {
    id: "act-2",
    title: "New Menu Push",
    detail: "Completed Sep 28",
    roi: "4.6x ROI",
  },
];

export interface InsightBar {
  label: string;
  value: number;
}

export const insightChartData: InsightBar[] = [
  { label: "Mon", value: 24 },
  { label: "Tue", value: 32 },
  { label: "Wed", value: 28 },
  { label: "Thu", value: 45 },
  { label: "Fri", value: 58 },
  { label: "Sat", value: 72 },
  { label: "Sun", value: 64 },
];

export interface InsightSummary {
  totalReachLabel: string;
  totalReach: string;
  reachGrowth: string;
  estimatedRoiLabel: string;
  estimatedRoi: string;
}

export const insightSummary: InsightSummary = {
  totalReachLabel: "Total Reach (30 Days)",
  totalReach: "45.2K",
  reachGrowth: "+12%",
  estimatedRoiLabel: "Estimated ROI",
  estimatedRoi: "3.4x",
};

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

export const primaryNav: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
  { id: "orders", label: "Orders", icon: ShoppingBag, path: "/orders" },
  { id: "deliveries", label: "Deliveries", icon: Bike, path: "/deliveries" },
  { id: "menu", label: "Menu", icon: UtensilsCrossed, path: "/menu" },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
  { id: "loyalty", label: "Loyalty", icon: Heart, path: "/loyalty" },
  { id: "catering", label: "Catering", icon: Soup, path: "/catering" },
  { id: "deals", label: "Deals", icon: Tag, path: "/deals" },
  { id: "marketing", label: "Marketing", icon: Megaphone, path: "/marketing" },
  { id: "offers", label: "Offers", icon: Tag, path: "/offers" },
  { id: "staff", label: "Staff", icon: UserCog, path: "/staff" },
  { id: "users", label: "Users", icon: Users, path: "/users" },
  { id: "reviews", label: "Reviews", icon: MessageSquareText, path: "/reviews" },
  { id: "transactions", label: "Transactions", icon: Receipt, path: "/transactions" },
  { id: "inventory", label: "Inventory", icon: Boxes, path: "/inventory" },
  { id: "profile", label: "Profile", icon: UserCircle, path: "/profile" },
];

export const bottomNav: NavItem[] = [
  { id: "withdraw", label: "Withdraw Funds", icon: Wallet, path: "/withdraw" },
  { id: "help", label: "Help", icon: HelpCircle, path: "/help" },
  { id: "logout", label: "Logout", icon: LogOut, path: "/logout" },
];

export { Star, Truck };
