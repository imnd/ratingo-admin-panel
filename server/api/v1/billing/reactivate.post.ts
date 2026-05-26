import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    success: true,
    message: 'Subscription successfully reactivated via mock checkout'
  }
})
