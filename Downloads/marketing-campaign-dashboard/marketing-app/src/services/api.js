// Mock API layer.
// Simulates GET /api/campaign-formats and POST /api/campaigns with realistic
// latency so the UI can be built and demoed end-to-end without a live backend.

import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

const MOCK_CAMPAIGN_FORMATS = [
  {
    id: 1,
    title: 'Sponsored Listing',
    description: 'Boost restaurant visibility in search and category pages.',
    icon: 'megaphone',
  },
  {
    id: 2,
    title: 'Video Ad',
    description: 'Promote meals using engaging, high-quality video in the discovery feed.',
    icon: 'video',
  },
]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * GET /api/campaign-formats
 * Fetches the list of available campaign formats.
 */
export async function getCampaignFormats() {
  await delay(600)
  return { data: MOCK_CAMPAIGN_FORMATS }
}

/**
 * POST /api/campaigns
 * Submits a new campaign (draft or launched).
 * @param {object} campaign - the campaign payload
 */
export async function createCampaign(campaign) {
  await delay(900)

  if (!campaign.campaignName || !campaign.campaignType) {
    throw new Error('Campaign is missing required fields.')
  }

  const saved = {
    id: `CMP-${Math.floor(Math.random() * 90000 + 10000)}`,
    ...campaign,
    createdAt: new Date().toISOString(),
  }

  return { data: saved }
}
