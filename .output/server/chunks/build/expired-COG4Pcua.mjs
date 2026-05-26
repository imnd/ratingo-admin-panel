import { computed, ref, mergeProps, unref, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
import { u as useAuthStore } from './auth-CjgQdcOt.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { CreditCardIcon } from 'lucide-vue-next';
import { u as useNotificationsStore } from './notifications-DKRejIty.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';

const _sfc_main = {
  __name: "expired",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const authStore = useAuthStore();
    useNotificationsStore();
    const user = computed(() => authStore.user);
    const company = computed(() => authStore.company);
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative min-h-screen flex items-center justify-center p-4 bg-[#030712] overflow-hidden" }, _attrs))}><div class="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-[128px]"></div><div class="w-full max-w-md glass-panel rounded-2xl shadow-glass-lg p-8 relative z-10 border border-red-500/20 text-center"><div class="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 mx-auto mb-6 text-red-500 animate-pulse">`);
      _push(ssrRenderComponent(unref(CreditCardIcon), { class: "w-8 h-8" }, null, _parent));
      _push(`</div><h1 class="text-2xl font-bold text-slate-100 mb-2">Subscription Expired</h1><p class="text-slate-400 text-sm mb-6 leading-relaxed"> Your merchant subscription has expired. Please renew your plan to reactivate location synchronization, reviews monitoring, and analytical dashboards. </p><div class="bg-[#0f172a]/50 border border-slate-800 rounded-xl p-4 mb-6 text-left"><div class="flex justify-between text-xs mb-1.5"><span class="text-slate-500">Merchant Account:</span><span class="text-slate-300 font-medium">${ssrInterpolate((_a = user.value) == null ? void 0 : _a.email)}</span></div><div class="flex justify-between text-xs"><span class="text-slate-500">Company ID:</span><span class="text-slate-300 font-medium font-mono">#${ssrInterpolate((_b = company.value) == null ? void 0 : _b.id)}</span></div></div><div class="space-y-3"><button class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-500 hover:from-brand-500 hover:to-indigo-400 text-sm font-semibold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all text-white flex items-center justify-center gap-2"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}>`);
      if (loading.value) {
        _push(`<span class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>`);
      } else {
        _push(`<span>Renew &amp; Activate Plan (Demo)</span>`);
      }
      _push(`</button><button class="w-full py-2 px-4 rounded-xl border border-slate-800 hover:bg-slate-800/40 transition-all text-xs text-slate-400 font-medium"> Log Out </button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/billing/expired.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=expired-COG4Pcua.mjs.map
