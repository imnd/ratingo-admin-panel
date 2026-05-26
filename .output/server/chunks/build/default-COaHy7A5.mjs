import { _ as __nuxt_component_0 } from './nuxt-link-B0B2o9DE.mjs';
import { computed, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderSlot, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { XIcon, BarChart3Icon, MessageSquareWarningIcon, SettingsIcon, LogOutIcon, MenuIcon, ChevronRightIcon, MapPinIcon, ChevronDownIcon, SearchIcon, CheckIcon, PlusIcon, ExternalLinkIcon, QrCodeIcon, EditIcon, DownloadIcon } from 'lucide-vue-next';
import QrcodeVue from 'qrcode.vue';
import { u as useAuthStore } from './auth-CjgQdcOt.mjs';
import { u as useLocationsStore } from './locations-BrApycPY.mjs';
import { u as useNotificationsStore } from './notifications-DKRejIty.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import './useApi-AmrMVBvt.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const authStore = useAuthStore();
    const locationsStore = useLocationsStore();
    useNotificationsStore();
    const user = computed(() => authStore.user);
    const company = computed(() => authStore.company);
    const isSidebarOpen = ref(false);
    const locationsModalOpen = ref(false);
    const addEditModalOpen = ref(false);
    const isEditMode = ref(false);
    const formSubmitting = ref(false);
    const locationForm = ref({ id: null, name: "", google_maps_url: "", justdial_url: "", is_active: true });
    const qrModalOpen = ref(false);
    const activeQrLocation = ref(null);
    const qrCodeUrl = computed(() => {
      var _a;
      if (!activeQrLocation.value) return "";
      const uuid = ((_a = activeQrLocation.value.qr_code) == null ? void 0 : _a.uuid) || activeQrLocation.value.uuid;
      return `https://app.domain.in/r/${uuid}`;
    });
    const routeName = computed(() => {
      const path = route.path;
      if (path.includes("analytics")) return "analytics dashboard";
      if (path.includes("feedback")) return "feedback logs";
      return path.substring(1) || "home";
    });
    const isOpen = ref(false);
    const searchQuery = ref("");
    ref(null);
    const filteredLocations = computed(() => {
      const query = searchQuery.value.toLowerCase().trim();
      if (!query) return locationsStore.locations;
      return locationsStore.locations.filter(
        (loc) => loc.name.toLowerCase().includes(query)
      );
    });
    const currentLocationName = computed(() => {
      var _a;
      if (locationsStore.currentLocationId === null) return "All Locations";
      return ((_a = locationsStore.currentLocation) == null ? void 0 : _a.name) || "All Locations";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex bg-[#03060f] text-slate-100 relative overflow-hidden" }, _attrs))} data-v-b8fa2f36>`);
      if (isSidebarOpen.value) {
        _push(`<div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 md:hidden" data-v-b8fa2f36></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([isSidebarOpen.value ? "translate-x-0" : "-translate-x-full", "fixed md:static inset-y-0 left-0 w-64 border-r border-slate-800/80 bg-[#070b19]/90 backdrop-blur-xl flex flex-col justify-between flex-shrink-0 z-40 transition-transform duration-250 ease-in-out md:translate-x-0"])}" data-v-b8fa2f36><div data-v-b8fa2f36><div class="h-16 flex items-center justify-between px-6 border-b border-slate-800/80" data-v-b8fa2f36><div class="flex items-center gap-3" data-v-b8fa2f36><div class="w-8 h-8 bg-gradient-to-tr from-brand-600 to-indigo-500 rounded-lg flex items-center justify-center shadow shadow-brand-500/30" data-v-b8fa2f36><svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b8fa2f36><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-b8fa2f36></path></svg></div><div data-v-b8fa2f36><h2 class="font-bold tracking-wide text-sm bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent" data-v-b8fa2f36>RATINGO</h2><p class="text-[10px] text-brand-400 font-semibold tracking-wider uppercase leading-none" data-v-b8fa2f36>Merchant Hub</p></div></div><button class="md:hidden text-slate-400 hover:text-slate-200" data-v-b8fa2f36>`);
      _push(ssrRenderComponent(unref(XIcon), { class: "w-5 h-5" }, null, _parent));
      _push(`</button></div><nav class="p-4 space-y-1.5" data-v-b8fa2f36>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/analytics",
        class: "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-slate-300 hover:text-slate-100 hover:bg-slate-800/40",
        "active-class": "bg-brand-500/10 border border-brand-500/20 !text-brand-400 font-medium",
        onClick: ($event) => isSidebarOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(BarChart3Icon), { class: "w-5 h-5 transition-transform duration-200 group-hover:scale-105" }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm" data-v-b8fa2f36${_scopeId}>Dashboard</span>`);
          } else {
            return [
              createVNode(unref(BarChart3Icon), { class: "w-5 h-5 transition-transform duration-200 group-hover:scale-105" }),
              createVNode("span", { class: "text-sm" }, "Dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/feedback",
        class: "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-slate-300 hover:text-slate-100 hover:bg-slate-800/40",
        "active-class": "bg-brand-500/10 border border-brand-500/20 !text-brand-400 font-medium",
        onClick: ($event) => isSidebarOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MessageSquareWarningIcon), { class: "w-5 h-5 transition-transform duration-200 group-hover:scale-105" }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm" data-v-b8fa2f36${_scopeId}>Feedback Logs</span>`);
          } else {
            return [
              createVNode(unref(MessageSquareWarningIcon), { class: "w-5 h-5 transition-transform duration-200 group-hover:scale-105" }),
              createVNode("span", { class: "text-sm" }, "Feedback Logs")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left text-slate-300 hover:text-slate-100 hover:bg-slate-800/40" data-v-b8fa2f36>`);
      _push(ssrRenderComponent(unref(SettingsIcon), { class: "w-5 h-5" }, null, _parent));
      _push(`<span class="text-sm" data-v-b8fa2f36>Manage Locations</span></button></nav></div><div class="p-4 border-t border-slate-800/80 bg-[#050813]" data-v-b8fa2f36>`);
      if (company.value) {
        _push(`<div class="mb-4 px-2" data-v-b8fa2f36><p class="text-xs text-slate-400" data-v-b8fa2f36>Company</p><p class="text-sm font-semibold truncate text-slate-200" data-v-b8fa2f36>${ssrInterpolate(company.value.name)}</p><span class="${ssrRenderClass([company.value.is_subscription_active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20", "inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium"])}" data-v-b8fa2f36>${ssrInterpolate(company.value.is_subscription_active ? "Active Plan" : "Expired")}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-800 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 transition-all text-xs text-slate-400" data-v-b8fa2f36>`);
      _push(ssrRenderComponent(unref(LogOutIcon), { class: "w-4 h-4" }, null, _parent));
      _push(`<span data-v-b8fa2f36>Log Out</span></button></div></aside><div class="flex-grow flex flex-col min-w-0 min-h-screen overflow-y-auto" data-v-b8fa2f36><header class="h-16 border-b border-slate-800/80 bg-[#070b19]/60 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-20" data-v-b8fa2f36><div class="flex items-center gap-3" data-v-b8fa2f36><button class="md:hidden text-slate-300 hover:text-white mr-1" data-v-b8fa2f36>`);
      _push(ssrRenderComponent(unref(MenuIcon), { class: "w-6 h-6" }, null, _parent));
      _push(`</button><span class="text-sm text-slate-400 font-medium hidden sm:inline" data-v-b8fa2f36>Reputation Portal</span>`);
      _push(ssrRenderComponent(unref(ChevronRightIcon), { class: "w-4 h-4 text-slate-600 hidden sm:inline" }, null, _parent));
      _push(`<span class="text-sm font-semibold text-slate-200 capitalize" data-v-b8fa2f36>${ssrInterpolate(routeName.value)}</span></div><div class="flex items-center gap-4 md:gap-6" data-v-b8fa2f36><div class="relative" data-v-b8fa2f36><button class="flex items-center gap-2.5 px-3 py-2 md:px-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 hover:border-slate-600 transition-all text-xs font-semibold" data-v-b8fa2f36>`);
      _push(ssrRenderComponent(unref(MapPinIcon), { class: "w-4 h-4 text-brand-400" }, null, _parent));
      _push(`<span class="max-w-[120px] md:max-w-xs truncate" data-v-b8fa2f36>Location: ${ssrInterpolate(currentLocationName.value)}</span>`);
      _push(ssrRenderComponent(unref(ChevronDownIcon), {
        class: ["w-3.5 h-3.5 text-slate-400 transition-transform duration-200", { "rotate-180": isOpen.value }]
      }, null, _parent));
      _push(`</button>`);
      if (isOpen.value) {
        _push(`<div class="absolute right-0 mt-2 w-64 rounded-xl shadow-glass-lg border border-slate-700/80 glass-dropdown z-40 py-1" data-v-b8fa2f36>`);
        if (unref(locationsStore).locations.length > 5) {
          _push(`<div class="p-2 border-b border-slate-800/80" data-v-b8fa2f36><div class="relative" data-v-b8fa2f36>`);
          _push(ssrRenderComponent(unref(SearchIcon), { class: "absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" }, null, _parent));
          _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search location..." class="w-full bg-[#03060f] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500/50 transition-colors" data-v-b8fa2f36></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="max-h-60 overflow-y-auto" data-v-b8fa2f36><button class="${ssrRenderClass([{ "text-brand-400 bg-brand-500/5 font-semibold": unref(locationsStore).currentLocationId === null }, "w-full text-left px-4 py-2.5 text-xs hover:bg-brand-500/10 hover:text-brand-400 transition-colors flex items-center justify-between"])}" data-v-b8fa2f36><span data-v-b8fa2f36>All Locations</span>`);
        if (unref(locationsStore).currentLocationId === null) {
          _push(ssrRenderComponent(unref(CheckIcon), { class: "w-3.5 h-3.5 text-brand-400" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
        if (filteredLocations.value.length === 0) {
          _push(`<div class="px-4 py-3 text-center text-xs text-slate-500" data-v-b8fa2f36> No locations match search </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(filteredLocations.value, (loc) => {
          _push(`<button class="${ssrRenderClass([{ "text-brand-400 bg-brand-500/5 font-semibold": unref(locationsStore).currentLocationId === loc.id }, "w-full text-left px-4 py-2.5 text-xs hover:bg-brand-500/10 hover:text-brand-400 transition-colors flex items-center justify-between"])}" data-v-b8fa2f36><div class="truncate pr-2" data-v-b8fa2f36><p class="font-medium text-slate-200 truncate" data-v-b8fa2f36>${ssrInterpolate(loc.name)}</p></div>`);
          if (unref(locationsStore).currentLocationId === loc.id) {
            _push(ssrRenderComponent(unref(CheckIcon), { class: "w-3.5 h-3.5 text-brand-400 flex-shrink-0" }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (user.value) {
        _push(`<div class="flex items-center gap-2" data-v-b8fa2f36><div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center text-xs font-semibold text-brand-300" data-v-b8fa2f36>${ssrInterpolate(user.value.name.charAt(0).toUpperCase())}</div><div class="hidden md:block" data-v-b8fa2f36><p class="text-xs font-semibold text-slate-200 leading-none" data-v-b8fa2f36>${ssrInterpolate(user.value.name)}</p><p class="text-[10px] text-slate-500 capitalize leading-none mt-0.5" data-v-b8fa2f36>${ssrInterpolate(user.value.role)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><main class="flex-grow p-4 md:p-8 bg-[#03060f]" data-v-b8fa2f36>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
      if (locationsModalOpen.value) {
        _push(`<div class="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" data-v-b8fa2f36><div class="w-full max-w-4xl rounded-2xl border border-slate-800 glass-panel shadow-glass-lg overflow-hidden flex flex-col max-h-[85vh] animate-fade-in-up" data-v-b8fa2f36><div class="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between flex-shrink-0" data-v-b8fa2f36><div class="flex items-center gap-2" data-v-b8fa2f36>`);
        _push(ssrRenderComponent(unref(MapPinIcon), { class: "w-5 h-5 text-brand-400" }, null, _parent));
        _push(`<h3 class="text-base font-bold text-slate-200" data-v-b8fa2f36>Manage Locations</h3></div><div class="flex items-center gap-3" data-v-b8fa2f36><button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow transition-all" data-v-b8fa2f36>`);
        _push(ssrRenderComponent(unref(PlusIcon), { class: "w-3.5 h-3.5" }, null, _parent));
        _push(`<span data-v-b8fa2f36>Add Location</span></button><button class="text-slate-400 hover:text-slate-200 p-1 hover:bg-slate-800/60 rounded-lg" data-v-b8fa2f36>`);
        _push(ssrRenderComponent(unref(XIcon), { class: "w-5 h-5" }, null, _parent));
        _push(`</button></div></div><div class="p-6 overflow-y-auto space-y-4 flex-grow bg-slate-950/40" data-v-b8fa2f36>`);
        if (unref(locationsStore).loading) {
          _push(`<div class="space-y-4" data-v-b8fa2f36><!--[-->`);
          ssrRenderList(3, (i) => {
            _push(`<div class="animate-pulse glass-panel rounded-xl p-4 border border-slate-800/80 h-24" data-v-b8fa2f36></div>`);
          });
          _push(`<!--]--></div>`);
        } else if (unref(locationsStore).locations.length === 0) {
          _push(`<div class="text-center py-12" data-v-b8fa2f36>`);
          _push(ssrRenderComponent(unref(MapPinIcon), { class: "w-12 h-12 text-slate-600 mx-auto mb-3" }, null, _parent));
          _push(`<p class="text-sm font-semibold text-slate-300" data-v-b8fa2f36>No locations configured yet</p><p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto" data-v-b8fa2f36>Configure your restaurant branches to start generating QR codes and capturing feedback.</p></div>`);
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-b8fa2f36><!--[-->`);
          ssrRenderList(unref(locationsStore).locations, (loc) => {
            _push(`<div class="${ssrRenderClass([loc.is_active ? "border-slate-800/80" : "border-slate-900 opacity-60", "glass-panel border rounded-xl p-4 flex flex-col justify-between transition-all hover:border-slate-700/60"])}" data-v-b8fa2f36><div data-v-b8fa2f36><div class="flex items-start justify-between gap-2 mb-2" data-v-b8fa2f36><h4 class="font-bold text-slate-200 text-sm truncate" data-v-b8fa2f36>${ssrInterpolate(loc.name)}</h4><span class="${ssrRenderClass([loc.is_active ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-800 text-slate-500 border-slate-700/50", "px-2 py-0.5 rounded-full text-[9px] font-semibold border"])}" data-v-b8fa2f36>${ssrInterpolate(loc.is_active ? "Active" : "Inactive")}</span></div><div class="space-y-1 text-xs text-slate-400 mb-4" data-v-b8fa2f36><div class="flex items-center gap-1.5 truncate" data-v-b8fa2f36><span class="text-slate-500 text-[10px] w-12 font-medium uppercase" data-v-b8fa2f36>Google:</span><a${ssrRenderAttr("href", loc.google_maps_url)} target="_blank" class="text-brand-400 hover:underline truncate flex items-center gap-0.5" data-v-b8fa2f36><span data-v-b8fa2f36>View on Maps</span>`);
            _push(ssrRenderComponent(unref(ExternalLinkIcon), { class: "w-3 h-3" }, null, _parent));
            _push(`</a></div>`);
            if (loc.justdial_url) {
              _push(`<div class="flex items-center gap-1.5 truncate" data-v-b8fa2f36><span class="text-slate-500 text-[10px] w-12 font-medium uppercase" data-v-b8fa2f36>Justdial:</span><a${ssrRenderAttr("href", loc.justdial_url)} target="_blank" class="text-brand-400 hover:underline truncate flex items-center gap-0.5" data-v-b8fa2f36><span data-v-b8fa2f36>View Justdial</span>`);
              _push(ssrRenderComponent(unref(ExternalLinkIcon), { class: "w-3 h-3" }, null, _parent));
              _push(`</a></div>`);
            } else {
              _push(`<!---->`);
            }
            if (loc.qr_code) {
              _push(`<div class="flex items-center gap-1.5" data-v-b8fa2f36><span class="text-slate-500 text-[10px] w-12 font-medium uppercase" data-v-b8fa2f36>Scans:</span><span class="text-slate-200 font-semibold" data-v-b8fa2f36>${ssrInterpolate(loc.qr_code.scan_count)} scans</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div><div class="flex items-center gap-2 pt-3 border-t border-slate-800/80 mt-auto" data-v-b8fa2f36><button class="flex-grow inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 text-brand-400 text-xs font-semibold transition-all" data-v-b8fa2f36>`);
            _push(ssrRenderComponent(unref(QrCodeIcon), { class: "w-3.5 h-3.5" }, null, _parent));
            _push(`<span data-v-b8fa2f36>Get QR Code</span></button><button class="px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-xs font-semibold text-slate-300 transition-all" data-v-b8fa2f36>`);
            _push(ssrRenderComponent(unref(EditIcon), { class: "w-3.5 h-3.5" }, null, _parent));
            _push(`</button></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (addEditModalOpen.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" data-v-b8fa2f36><div class="w-full max-w-md rounded-2xl border border-slate-800 glass-panel shadow-glass-lg overflow-hidden animate-fade-in-up" data-v-b8fa2f36><div class="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between" data-v-b8fa2f36><h3 class="text-base font-bold text-slate-200" data-v-b8fa2f36>${ssrInterpolate(isEditMode.value ? "Edit Location" : "Add New Location")}</h3><button class="text-slate-400 hover:text-slate-200" data-v-b8fa2f36>`);
        _push(ssrRenderComponent(unref(XIcon), { class: "w-5 h-5" }, null, _parent));
        _push(`</button></div><form class="p-6 space-y-4" data-v-b8fa2f36><div data-v-b8fa2f36><label for="loc-name" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" data-v-b8fa2f36>Location Name</label><input${ssrRenderAttr("value", locationForm.value.name)} id="loc-name" type="text" required placeholder="e.g. Connaught Place Branch" class="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all" data-v-b8fa2f36></div><div data-v-b8fa2f36><label for="loc-gmaps" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" data-v-b8fa2f36>Google Maps URL</label><input${ssrRenderAttr("value", locationForm.value.google_maps_url)} id="loc-gmaps" type="url" required placeholder="https://maps.google.com/?cid=..." class="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all" data-v-b8fa2f36></div><div data-v-b8fa2f36><label for="loc-jd" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" data-v-b8fa2f36>Justdial URL (Optional)</label><input${ssrRenderAttr("value", locationForm.value.justdial_url)} id="loc-jd" type="url" placeholder="https://www.justdial.com/..." class="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all" data-v-b8fa2f36></div>`);
        if (isEditMode.value) {
          _push(`<div class="flex items-center gap-2 pt-2" data-v-b8fa2f36><input${ssrIncludeBooleanAttr(Array.isArray(locationForm.value.is_active) ? ssrLooseContain(locationForm.value.is_active, null) : locationForm.value.is_active) ? " checked" : ""} id="loc-active" type="checkbox" class="rounded border-slate-800 text-brand-600 focus:ring-brand-500 h-4 w-4 bg-slate-900" data-v-b8fa2f36><label for="loc-active" class="text-sm text-slate-300 font-medium cursor-pointer" data-v-b8fa2f36>Active and open for scans</label></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-800/80 mt-6" data-v-b8fa2f36><button type="button" class="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800/40 text-xs font-semibold text-slate-300 transition-all" data-v-b8fa2f36> Cancel </button><button type="submit" class="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition-all shadow"${ssrIncludeBooleanAttr(formSubmitting.value) ? " disabled" : ""} data-v-b8fa2f36>`);
        if (formSubmitting.value) {
          _push(`<span class="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-1 inline-block" data-v-b8fa2f36></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-b8fa2f36>${ssrInterpolate(isEditMode.value ? "Save Changes" : "Create Location")}</span></button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (qrModalOpen.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" data-v-b8fa2f36>`);
        if (activeQrLocation.value) {
          _push(`<div class="w-full max-w-sm rounded-2xl border border-slate-800 glass-panel shadow-glass-lg overflow-hidden animate-fade-in-up text-center" data-v-b8fa2f36><div class="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between" data-v-b8fa2f36><h3 class="text-sm font-bold text-slate-200 text-left truncate" data-v-b8fa2f36>QR Code: ${ssrInterpolate(activeQrLocation.value.name)}</h3><button class="text-slate-400 hover:text-slate-200" data-v-b8fa2f36>`);
          _push(ssrRenderComponent(unref(XIcon), { class: "w-5 h-5" }, null, _parent));
          _push(`</button></div><div class="p-6 flex flex-col items-center" data-v-b8fa2f36><p class="text-xs text-slate-400 mb-4" data-v-b8fa2f36>Scan this QR code with a mobile device to rate the branch and provide feedback.</p><div class="flex flex-col items-center justify-center p-6 bg-white rounded-2xl mb-4 border border-slate-800 shadow-lg" data-v-b8fa2f36>`);
          _push(ssrRenderComponent(QrcodeVue, {
            id: "qr-canvas",
            value: qrCodeUrl.value,
            size: 200,
            level: "H",
            "render-as": "canvas"
          }, null, _parent));
          _push(ssrRenderComponent(QrcodeVue, {
            id: "qr-svg",
            value: qrCodeUrl.value,
            size: 200,
            level: "H",
            "render-as": "svg",
            class: "hidden"
          }, null, _parent));
          _push(`</div><div class="w-full text-xs text-slate-500 font-mono select-all bg-slate-950/80 border border-slate-850 p-2.5 rounded-xl break-all mb-6" data-v-b8fa2f36>${ssrInterpolate(qrCodeUrl.value)}</div><div class="grid grid-cols-2 gap-3 w-full" data-v-b8fa2f36><button class="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 text-brand-400 text-xs font-semibold transition-all" data-v-b8fa2f36>`);
          _push(ssrRenderComponent(unref(DownloadIcon), { class: "w-4 h-4" }, null, _parent));
          _push(`<span data-v-b8fa2f36>PNG</span></button><button class="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold transition-all" data-v-b8fa2f36>`);
          _push(ssrRenderComponent(unref(DownloadIcon), { class: "w-4 h-4" }, null, _parent));
          _push(`<span data-v-b8fa2f36>SVG</span></button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b8fa2f36"]]);

export { _default as default };
//# sourceMappingURL=default-COaHy7A5.mjs.map
