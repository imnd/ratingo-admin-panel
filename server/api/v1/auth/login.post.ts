import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { email, password } = body

  // Check mock credentials
  if (email === 'admin@ratingo.in' && password === 'admin123') {
    return {
      token: 'mock-jwt-session-token-987654321',
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
  }

  // Auth failure
  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized',
    data: {
      message: 'Invalid credentials. Use admin@ratingo.in and admin123'
    }
  })
})
