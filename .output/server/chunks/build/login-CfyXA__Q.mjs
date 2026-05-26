import { ref, unref, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
import { u as useAuthStore } from './auth-CjgQdcOt.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { AlertTriangleIcon, MailIcon, LockIcon, SparklesIcon } from 'lucide-vue-next';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useAuthStore();
    useNotificationsStore();
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (errorMessage.value) {
        _push(`<div class="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5">`);
        _push(ssrRenderComponent(unref(AlertTriangleIcon), { class: "w-4 h-4 mt-0.5 flex-shrink-0" }, null, _parent));
        _push(`<span>${ssrInterpolate(errorMessage.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-5"><div><label for="email" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label><div class="relative">`);
      _push(ssrRenderComponent(unref(MailIcon), { class: "absolute left-3 top-3 w-5 h-5 text-slate-500" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", email.value)} id="email" type="email" required placeholder="name@company.com" class="w-full bg-slate-900/50 border border-slate-700/50 hover:border-slate-600 focus:border-brand-500 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}></div></div><div><label for="password" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label><div class="relative">`);
      _push(ssrRenderComponent(unref(LockIcon), { class: "absolute left-3 top-3 w-5 h-5 text-slate-500" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", password.value)} id="password" type="password" required placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="w-full bg-slate-900/50 border border-slate-700/50 hover:border-slate-600 focus:border-brand-500 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}></div></div><button type="submit" class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-500 hover:from-brand-500 hover:to-indigo-400 text-sm font-semibold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}>`);
      if (loading.value) {
        _push(`<span class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>`);
      } else {
        _push(`<span>Log In</span>`);
      }
      _push(`</button></form><div class="mt-8 pt-6 border-t border-slate-800/80 text-center"><p class="text-xs text-slate-500 mb-3">Quickly test the merchant panel using demo account:</p><button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 hover:bg-brand-500/20 hover:text-brand-300 transition-all text-xs font-semibold"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(unref(SparklesIcon), { class: "w-3.5 h-3.5" }, null, _parent));
      _push(`<span>Autofill Demo Credentials</span></button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CfyXA__Q.mjs.map
