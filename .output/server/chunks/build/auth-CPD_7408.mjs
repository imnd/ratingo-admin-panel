import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = {
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative min-h-screen flex items-center justify-center p-4 bg-[#030712] overflow-hidden" }, _attrs))}><div class="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-[128px]"></div><div class="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]"></div><div class="w-full max-w-md glass-panel rounded-2xl shadow-glass-lg p-8 relative z-10 border border-slate-700/30"><div class="flex flex-col items-center mb-8"><div class="w-12 h-12 bg-gradient-to-tr from-brand-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 mb-3"><svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><h1 class="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"> Ratingo Merchant </h1><p class="text-slate-400 text-xs mt-1">Reputation Management SaaS Platform</p></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-CPD_7408.mjs.map
