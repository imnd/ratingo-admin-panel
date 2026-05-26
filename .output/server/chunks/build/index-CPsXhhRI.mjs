import { ref, watch, mergeProps, unref, computed, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { u as useApi } from './useApi-AmrMVBvt.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import { MapPinOffIcon, PlusIcon, QrCodeIcon, CheckSquareIcon, ShieldAlertIcon, ArrowUpRightIcon, ArrowDownRightIcon } from 'lucide-vue-next';
import { u as useLocationsStore } from './locations-BrApycPY.mjs';
import { u as useNotificationsStore } from './notifications-DKRejIty.mjs';
import { Chart, registerables } from 'chart.js';
import { _ as _export_sfc } from './server.mjs';
import './auth-CjgQdcOt.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main$2 = {
  __name: "MetricCard",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    icon: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    change: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    const formattedValue = computed(() => {
      if (typeof props.value === "number") {
        return new Intl.NumberFormat().format(props.value);
      }
      return props.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-glass-sm relative overflow-hidden transition-all duration-300 hover:border-slate-700/60 hover:shadow-glass" }, _attrs))}>`);
      if (__props.loading) {
        _push(`<div class="animate-pulse space-y-4"><div class="flex items-center justify-between"><div class="h-4 bg-slate-800 rounded-md w-28"></div><div class="w-10 h-10 bg-slate-800 rounded-xl"></div></div><div class="space-y-2"><div class="h-8 bg-slate-800 rounded-md w-20"></div><div class="h-3 bg-slate-800 rounded-md w-32"></div></div></div>`);
      } else {
        _push(`<div class="relative z-10 flex flex-col justify-between h-full"><div class="flex items-start justify-between mb-4"><div><span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">${ssrInterpolate(__props.title)}</span><span class="text-3xl font-bold tracking-tight text-white">${ssrInterpolate(formattedValue.value)}</span></div><div class="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-500/10 text-brand-400 border border-brand-500/20">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), { class: "w-6 h-6" }, null), _parent);
        _push(`</div></div><div class="flex items-center gap-1.5 mt-2">`);
        if (__props.change !== void 0) {
          _push(`<span class="${ssrRenderClass([__props.change >= 0 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20", "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"])}">`);
          if (__props.change >= 0) {
            _push(ssrRenderComponent(unref(ArrowUpRightIcon), { class: "w-3.5 h-3.5" }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(ArrowDownRightIcon), { class: "w-3.5 h-3.5" }, null, _parent));
          }
          _push(`<span>${ssrInterpolate(Math.abs(__props.change))}%</span></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="text-xs text-slate-500 font-medium">vs previous period</span></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/analytics/components/MetricCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SummaryChart",
  __ssrInlineRender: true,
  props: {
    chartData: {
      type: Object,
      required: true,
      default: () => ({ labels: [], positiveRedirects: [], negativeIntercepts: [] })
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    Chart.register(...registerables);
    const props = __props;
    const canvasRef = ref(null);
    let chartInstance = null;
    const initChart = () => {
      if (!canvasRef.value) return;
      const ctx = canvasRef.value.getContext("2d");
      const gradPositive = ctx.createLinearGradient(0, 0, 0, 250);
      gradPositive.addColorStop(0, "rgba(16, 185, 129, 0.20)");
      gradPositive.addColorStop(1, "rgba(16, 185, 129, 0.00)");
      const gradNegative = ctx.createLinearGradient(0, 0, 0, 250);
      gradNegative.addColorStop(0, "rgba(239, 68, 68, 0.15)");
      gradNegative.addColorStop(1, "rgba(239, 68, 68, 0.00)");
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: props.chartData.labels,
          datasets: [
            {
              label: "Google Maps Redirects",
              data: props.chartData.positiveRedirects,
              borderColor: "#10B981",
              borderWidth: 2.5,
              backgroundColor: gradPositive,
              fill: true,
              tension: 0.35,
              pointBackgroundColor: "#10B981",
              pointHoverRadius: 6,
              pointRadius: 3
            },
            {
              label: "Intercepted Negative Reviews",
              data: props.chartData.negativeIntercepts,
              borderColor: "#EF4444",
              borderWidth: 2.5,
              backgroundColor: gradNegative,
              fill: true,
              tension: 0.35,
              pointBackgroundColor: "#EF4444",
              pointHoverRadius: 6,
              pointRadius: 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "#0d1527",
              titleColor: "#94a3b8",
              bodyColor: "#cbd5e1",
              borderColor: "rgba(255, 255, 255, 0.08)",
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
              bodyFont: {
                family: "Outfit, Inter, sans-serif"
              },
              titleFont: {
                family: "Outfit, Inter, sans-serif"
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.03)",
                tickBorderDash: [4, 4]
              },
              ticks: {
                color: "#64748b",
                font: {
                  family: "Outfit, Inter, sans-serif",
                  size: 10
                }
              }
            },
            y: {
              grid: {
                color: "rgba(255, 255, 255, 0.03)",
                tickBorderDash: [4, 4]
              },
              ticks: {
                color: "#64748b",
                font: {
                  family: "Outfit, Inter, sans-serif",
                  size: 10
                },
                precision: 0
              },
              min: 0
            }
          }
        }
      });
    };
    watch(() => props.chartData, (newData) => {
      if (chartInstance) {
        chartInstance.data.labels = newData.labels;
        chartInstance.data.datasets[0].data = newData.positiveRedirects;
        chartInstance.data.datasets[1].data = newData.negativeIntercepts;
        chartInstance.update();
      } else {
        initChart();
      }
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-glass-sm min-h-[350px]" }, _attrs))} data-v-10cb9041><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6" data-v-10cb9041><div data-v-10cb9041><h3 class="text-base font-bold text-slate-200" data-v-10cb9041>Activity &amp; Conversion Trends</h3><p class="text-xs text-slate-500 mt-0.5" data-v-10cb9041>Track redirects to public maps vs captured negative feedbacks</p></div><div class="flex items-center gap-4 text-xs font-semibold" data-v-10cb9041><div class="flex items-center gap-1.5" data-v-10cb9041><span class="w-3 h-3 rounded bg-emerald-500 inline-block" data-v-10cb9041></span><span class="text-slate-400" data-v-10cb9041>Google Redirects</span></div><div class="flex items-center gap-1.5" data-v-10cb9041><span class="w-3 h-3 rounded bg-red-500 inline-block" data-v-10cb9041></span><span class="text-slate-400" data-v-10cb9041>Intercepted Negative</span></div></div></div><div class="h-64 w-full relative" data-v-10cb9041><canvas data-v-10cb9041></canvas></div>`);
      if (__props.loading) {
        _push(`<div class="absolute inset-0 rounded-2xl bg-[#03060f]/60 backdrop-blur-[2px] flex items-center justify-center z-10" data-v-10cb9041><div class="flex flex-col items-center gap-2" data-v-10cb9041><div class="animate-spin rounded-full h-8 w-8 border-2 border-brand-500 border-t-transparent" data-v-10cb9041></div><span class="text-xs text-slate-400 font-semibold tracking-wider uppercase" data-v-10cb9041>Loading stats...</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/analytics/components/SummaryChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SummaryChart = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-10cb9041"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const locationsStore = useLocationsStore();
    const notificationsStore = useNotificationsStore();
    const loading = ref(true);
    const currentPeriod = ref("7d");
    const periods = [
      { label: "Last 7 Days", value: "7d" },
      { label: "Last 30 Days", value: "30d" }
    ];
    const metrics = ref({
      totalScans: 0,
      scansChange: 0,
      positiveRedirects: 0,
      redirectsChange: 0,
      negativeIntercepts: 0,
      interceptsChange: 0
    });
    const chartData = ref({
      labels: [],
      positiveRedirects: [],
      negativeIntercepts: []
    });
    const loadAnalytics = async () => {
      if (locationsStore.locations.length === 0 && !locationsStore.loading) {
        loading.value = false;
        return;
      }
      loading.value = true;
      try {
        const api = useApi();
        const data = await api("/analytics", {
          query: {
            locationId: locationsStore.currentLocationId,
            period: currentPeriod.value
          }
        });
        metrics.value = data.metrics;
        chartData.value = data.chartData;
      } catch (err) {
        console.error("Failed to load analytics:", err);
        notificationsStore.error("Could not load analytics. Please try again.");
      } finally {
        loading.value = false;
      }
    };
    watch(() => locationsStore.currentLocationId, async () => {
      await loadAnalytics();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 animate-fade-in-up" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold tracking-tight text-white">Analytics Dashboard</h1><p class="text-sm text-slate-400 mt-1">Real-time scan conversions and feedback redirection statistics</p></div><div class="flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto"><!--[-->`);
      ssrRenderList(periods, (period) => {
        _push(`<button class="${ssrRenderClass([currentPeriod.value === period.value ? "bg-brand-600 text-white shadow shadow-brand-500/20" : "text-slate-400 hover:text-slate-200", "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"])}">${ssrInterpolate(period.label)}</button>`);
      });
      _push(`<!--]--></div></div>`);
      if (!unref(locationsStore).loading && unref(locationsStore).locations.length === 0) {
        _push(`<div class="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl border border-slate-800 text-center min-h-[350px]"><div class="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700/50 text-slate-400 mb-4">`);
        _push(ssrRenderComponent(unref(MapPinOffIcon), { class: "w-8 h-8" }, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-slate-200">No Locations Found</h3><p class="text-sm text-slate-400 max-w-sm mt-2 mb-6"> You haven&#39;t added any locations to your merchant account yet. Please add a business location to start tracking scans. </p><button class="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-500 hover:from-brand-500 hover:to-indigo-400 text-xs font-semibold shadow shadow-brand-500/20 text-white">`);
        _push(ssrRenderComponent(unref(PlusIcon), { class: "w-4 h-4" }, null, _parent));
        _push(`<span>+ Add First Location</span></button></div>`);
      } else {
        _push(`<div class="space-y-8"><div class="grid grid-cols-1 md:grid-cols-3 gap-6">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          title: "Total QR Scans",
          value: metrics.value.totalScans,
          icon: unref(QrCodeIcon),
          loading: loading.value,
          change: metrics.value.scansChange
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          title: "Positive Redirects",
          value: metrics.value.positiveRedirects,
          icon: unref(CheckSquareIcon),
          loading: loading.value,
          change: metrics.value.redirectsChange
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          title: "Negative Intercepted",
          value: metrics.value.negativeIntercepts,
          icon: unref(ShieldAlertIcon),
          loading: loading.value,
          change: metrics.value.interceptsChange
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(SummaryChart, {
          "chart-data": chartData.value,
          loading: loading.value
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/analytics/pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CPsXhhRI.mjs.map
