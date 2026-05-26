import { d as defineEventHandler, k as getQuery } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const analytics_get = defineEventHandler((event) => {
  const query = getQuery(event);
  const locationId = query.locationId ? Number(query.locationId) : 0;
  const period = query.period ? query.period.toString() : "7d";
  let baseScans = 1540;
  let baseRedirects = 1120;
  let baseIntercepts = 34;
  let scansChange = 12.4;
  let redirectsChange = 15.1;
  let interceptsChange = -8.2;
  if (locationId === 1) {
    baseScans = 480;
    baseRedirects = 350;
    baseIntercepts = 12;
    scansChange = 8.2;
    redirectsChange = 11.4;
    interceptsChange = -5;
  } else if (locationId === 2) {
    baseScans = 350;
    baseRedirects = 260;
    baseIntercepts = 8;
    scansChange = 14.5;
    redirectsChange = 18.2;
    interceptsChange = -15.4;
  } else if (locationId === 3) {
    baseScans = 410;
    baseRedirects = 295;
    baseIntercepts = 9;
    scansChange = -2.1;
    redirectsChange = 1.8;
    interceptsChange = 12;
  } else if (locationId > 3) {
    baseScans = 100 + locationId * 15;
    baseRedirects = 70 + locationId * 10;
    baseIntercepts = 1 + locationId % 3;
    scansChange = 5 + locationId % 2;
    redirectsChange = 6 - locationId % 2;
    interceptsChange = -2;
  }
  const multiplier = period === "30d" ? 4.2 : 1;
  const finalScans = Math.round(baseScans * multiplier);
  const finalRedirects = Math.round(baseRedirects * multiplier);
  const finalIntercepts = Math.round(baseIntercepts * multiplier);
  const labels = [];
  const positiveRedirects = [];
  const negativeIntercepts = [];
  const daysCount = period === "30d" ? 30 : 7;
  const baseDate = /* @__PURE__ */ new Date("2026-05-25T12:00:00");
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - i);
    const labelStr = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    labels.push(labelStr);
    const dailyRedirectAvg = baseRedirects * multiplier / daysCount;
    const dailyRedirectVal = Math.round(dailyRedirectAvg + Math.sin(i * 0.8) * (dailyRedirectAvg * 0.3) + (Math.random() - 0.5) * (dailyRedirectAvg * 0.15));
    positiveRedirects.push(Math.max(0, dailyRedirectVal));
    const dailyInterceptAvg = baseIntercepts * multiplier / daysCount;
    const dailyInterceptVal = Math.round(dailyInterceptAvg + Math.cos(i * 1.1) * (dailyInterceptAvg * 0.5) + (Math.random() - 0.5) * 0.8);
    negativeIntercepts.push(Math.max(0, dailyInterceptVal));
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
  };
});

export { analytics_get as default };
//# sourceMappingURL=analytics.get.mjs.map
