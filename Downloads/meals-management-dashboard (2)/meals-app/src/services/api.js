// Mock API layer.
// Simulates GET /api/meals and POST /api/meal-plans with realistic latency
// so the UI can be built and demoed end-to-end without a live backend.

import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

const MOCK_MEALS = [
  {
    id: 1,
    name: 'Citrus Glazed Salmon',
    category: 'Dinner',
    tag: 'Lean Protein',
    price: 18,
    description: 'Herb quinoa, roasted asparagus',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Mediterranean Chicken Bowl',
    category: 'Lunch',
    tag: 'Balanced',
    price: 14,
    description: 'Lemon couscous, feta, olives',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    name: 'Radiance Buddha Bowl',
    category: 'Vegan',
    tag: 'Vegan',
    price: 12,
    description: 'Sweet potato, kale, tahini dressing',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop',
  },
  {
    id: 4,
    name: 'Keto Beef Skillet',
    category: 'Keto',
    tag: 'Low Carb',
    price: 16,
    description: 'Grass-fed beef, cauliflower rice, greens',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop',
  },
  {
    id: 5,
    name: 'Golden Avocado Toast',
    category: 'Breakfast',
    tag: 'Fiber Rich',
    price: 9,
    description: 'Sourdough, poached egg, chili flake',
    image:
      'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200&h=200&fit=crop',
  },
  {
    id: 6,
    name: 'Berry Protein Parfait',
    category: 'Breakfast',
    tag: 'High Protein',
    price: 8,
    description: 'Greek yogurt, granola, mixed berries',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop',
  },
  {
    id: 7,
    name: 'Herb Grilled Tofu Plate',
    category: 'Vegan',
    tag: 'Plant Protein',
    price: 13,
    description: 'Charred tofu, brown rice, greens',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
  },
  {
    id: 8,
    name: 'Zesty Shrimp Zoodles',
    category: 'Keto',
    tag: 'Low Carb',
    price: 17,
    description: 'Zucchini noodles, garlic shrimp, chili oil',
    image:
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop',
  },
]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * GET /api/meals
 * Fetches the full catalog of available meals.
 */
export async function getMeals() {
  await delay(650)
  return { data: MOCK_MEALS }
}

/**
 * POST /api/meal-plans
 * Submits a new meal plan (draft or published).
 * @param {object} plan - the meal plan payload
 */
export async function createMealPlan(plan) {
  await delay(900)

  if (!plan.planName || !plan.selectedMeals || plan.selectedMeals.length === 0) {
    throw new Error('Meal plan is missing required fields.')
  }

  const saved = {
    id: `MP-${Math.floor(Math.random() * 90000 + 10000)}`,
    ...plan,
    createdAt: new Date().toISOString(),
  }

  return { data: saved }
}
