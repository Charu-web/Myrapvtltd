import axios from 'axios'

// A real deployment would point this at the Caloryehive Business API.
// For this project it is mocked locally so the app runs standalone.
export const api = axios.create({
  baseURL: '/api',
  timeout: 8000,
})

const OFFERS = [
  {
    id: 1,
    title: 'Free Delivery Weekend',
    category: 'Flash Sales',
    eyebrow: 'Weekend Special',
    status: 'Closing Soon',
    image:
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80',
    description:
      'Capture peak weekend traffic by waiving delivery fees. Platform covers 50% of the cost.',
    impact: '+25% Vol.',
    eligibility: 'Min. Rating 4.5+',
    rating: 4.5,
    button: 'Join Promotion',
    joined: false,
  },
  {
    id: 2,
    title: 'Happy Hour Boost',
    category: 'Customer Loyalty',
    eyebrow: 'Limited Slots',
    status: 'Flash Sale',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80',
    description:
      'Drive traffic during off-peak hours (3PM-5PM) with targeted app placements.',
    impact: '+15% Revenue',
    value: '20% Off Menu',
    rating: 4.2,
    button: 'View Details',
    joined: false,
  },
  {
    id: 3,
    title: 'First Order Hook',
    category: 'New Member',
    eyebrow: 'Evergreen',
    status: 'New Member',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    description:
      'Acquire high-value new customers with a compelling first-order discount.',
    requirement: 'Min $25 Spend',
    impact: '+30% New Users',
    rating: 4.8,
    button: 'Start Enrollment',
    joined: false,
  },
  {
    id: 4,
    title: 'Weekday Lunch Rush',
    category: 'Flash Sales',
    eyebrow: 'Trending',
    status: 'Flash Sale',
    image:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    description:
      'Boost midday orders with a fast-lane discount for the 11AM-1PM rush window.',
    impact: '+18% Orders',
    value: '15% Off Menu',
    rating: 4.6,
    button: 'Join Promotion',
    joined: false,
  },
  {
    id: 5,
    title: 'Loyalty Points Multiplier',
    category: 'Customer Loyalty',
    eyebrow: 'Member Boost',
    status: 'Evergreen',
    image:
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=800&q=80',
    description:
      'Double loyalty points for repeat customers to encourage higher order frequency.',
    impact: '+12% Repeat Rate',
    eligibility: 'Loyalty Tier 2+',
    rating: 4.4,
    button: 'Join Promotion',
    joined: false,
  },
  {
    id: 6,
    title: 'Referral Reward',
    category: 'New Member',
    eyebrow: 'Growth',
    status: 'New Member',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    description:
      'Reward existing customers for referring friends, expanding your reach organically.',
    requirement: 'Min 1 Referral',
    impact: '+22% New Users',
    rating: 4.7,
    button: 'Start Enrollment',
    joined: false,
  },
]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Mocked network layer. Swap the body of each function for a real axios
 * call (e.g. `const { data } = await api.get('/offers')`) when a backend
 * is available — the calling components already expect this exact shape.
 */
export async function fetchOffers({ search = '', category = 'All Campaigns' } = {}) {
  await delay(650)

  if (Math.random() < 0.02) {
    throw new Error('Unable to reach the promotions service. Please try again.')
  }

  let results = [...OFFERS]

  if (category && category !== 'All Campaigns') {
    results = results.filter((offer) => offer.category === category)
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase()
    results = results.filter(
      (offer) =>
        offer.title.toLowerCase().includes(q) || offer.description.toLowerCase().includes(q),
    )
  }

  return results
}

export async function joinPromotion(offerId) {
  await delay(500)
  return { success: true, offerId }
}

export async function launchDiscount({ value, days }) {
  await delay(700)
  return { success: true, value, days, launchedAt: new Date().toISOString() }
}

export async function fetchCampaignReach() {
  await delay(300)
  return { impressions: '84.2k', label: 'Impressions this week', trend: '+6.4%' }
}
