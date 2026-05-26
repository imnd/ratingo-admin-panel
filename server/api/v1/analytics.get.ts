import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const locationId = query.locationId ? Number(query.locationId) : 0 // 0 means "All Locations"
  const period = query.period ? query.period.toString() : '7d'

  // Base metrics configuration depending on location
  let baseScans = 1540
  let baseRedirects = 1120
  let baseIntercepts = 34
  
  let scansChange = 12.4
  let redirectsChange = 15.1
  let interceptsChange = -8.2

  if (locationId === 1) { // Connaught Place
    baseScans = 480
    baseRedirects = 350
    baseIntercepts = 12
    scansChange = 8.2
    redirectsChange = 11.4
    interceptsChange = -5.0
  } else if (locationId === 2) { // Indiranagar
    baseScans = 350
    baseRedirects = 260
    baseIntercepts = 8
    scansChange = 14.5
    redirectsChange = 18.2
    interceptsChange = -15.4
  } else if (locationId === 3) { // Bandra West
    baseScans = 410
    baseRedirects = 295
    baseIntercepts = 9
    scansChange = -2.1
    redirectsChange = 1.8
    interceptsChange = 12.0
  } else if (locationId > 3) { // Other branches
    baseScans = 100 + (locationId * 15)
    baseRedirects = 70 + (locationId * 10)
    baseIntercepts = 1 + (locationId % 3)
    scansChange = 5.0 + (locationId % 2)
    redirectsChange = 6.0 - (locationId % 2)
    interceptsChange = -2.0
  }

  // Scale metrics based on period (30d has roughly 4.2x more data than 7d)
  const multiplier = period === '30d' ? 4.2 : 1.0
  const finalScans = Math.round(baseScans * multiplier)
  const finalRedirects = Math.round(baseRedirects * multiplier)
  const finalIntercepts = Math.round(baseIntercepts * multiplier)

  // Generate Date Labels & Chart Coordinates
  const labels = []
  const positiveRedirects = []
  const negativeIntercepts = []

  const daysCount = period === '30d' ? 30 : 7
  
  // Base date is current time (May 25, 2026)
  const baseDate = new Date('2026-05-25T12:00:00')

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(baseDate)
    d.setDate(baseDate.getDate() - i)
    
    // Format label, e.g. "21 May"
    const labelStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
    labels.push(labelStr)

    // Calculate realistic daily distributions
    // Redirects: average around baseRedirects / daysCount, plus some random noise
    const dailyRedirectAvg = (baseRedirects * multiplier) / daysCount
    const dailyRedirectVal = Math.round(dailyRedirectAvg + (Math.sin(i * 0.8) * (dailyRedirectAvg * 0.3)) + (Math.random() - 0.5) * (dailyRedirectAvg * 0.15))
    positiveRedirects.push(Math.max(0, dailyRedirectVal))

    // Intercepts: average around baseIntercepts / daysCount, usually low count
    const dailyInterceptAvg = (baseIntercepts * multiplier) / daysCount
    const dailyInterceptVal = Math.round(dailyInterceptAvg + (Math.cos(i * 1.1) * (dailyInterceptAvg * 0.5)) + (Math.random() - 0.5) * 0.8)
    negativeIntercepts.push(Math.max(0, dailyInterceptVal))
  }

  return {
    metrics: {
      totalScans: finalScans,
      scansChange,
      positiveRedirects: finalRedirects,
      redirectsChange,
      negativeIntercepts: finalIntercepts,
      interceptsChange
    },
    chartData: {
      labels,
      positiveRedirects,
      negativeIntercepts
    }
  }
})
