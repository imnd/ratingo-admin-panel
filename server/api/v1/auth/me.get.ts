import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  return {
    user: {
      id: 101,
      name: 'Rajesh Kumar',
      email: 'admin@ratingo.in',
      role: 'merchant'
    },
    company: {
      id: 501,
      name: 'Tandoori Delights Hospitality Pvt Ltd',
      gstin: '27AADCB8374H1Z5',
      is_subscription_active: true,
      subscription_expires_at: '2026-12-31T23:59:59.000Z'
    }
  }
})
