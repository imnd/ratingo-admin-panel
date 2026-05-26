import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { ChevronDownIcon, SearchIcon, MapPinOffIcon, PlusIcon, InboxIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon, PhoneIcon, EyeIcon, MessageCircleIcon, ShieldAlertIcon, XIcon } from 'lucide-vue-next';
import { u as useLocationsStore } from './locations-BrApycPY.mjs';
import { u as useNotificationsStore } from './notifications-DKRejIty.mjs';
import { u as useApi } from './useApi-AmrMVBvt.mjs';
import { defineStore } from 'pinia';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const useFeedbackStore = defineStore("feedback", () => {
  const feedbacks = ref([]);
  const loading = ref(false);
  const filters = ref({
    location_id: null,
    date_from: "",
    date_to: "",
    search: ""
  });
  const pagination = ref({
    page: 1,
    limit: 15,
    total: 0,
    totalPages: 1
  });
  async function fetchFeedbacks() {
    const api = useApi();
    loading.value = true;
    try {
      const data = await api("/feedback", {
        query: {
          location_id: filters.value.location_id,
          date_from: filters.value.date_from,
          date_to: filters.value.date_to,
          search: filters.value.search,
          page: pagination.value.page,
          limit: pagination.value.limit
        }
      });
      feedbacks.value = data.data;
      pagination.value.total = data.pagination.total;
      pagination.value.totalPages = data.pagination.totalPages;
    } catch (err) {
      console.error("Failed to fetch feedback logs:", err);
    } finally {
      loading.value = false;
    }
  }
  function setPage(page) {
    pagination.value.page = page;
  }
  function setFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters };
    pagination.value.page = 1;
  }
  return {
    feedbacks,
    loading,
    filters,
    pagination,
    fetchFeedbacks,
    setPage,
    setFilters
  };
});
const usePhoneFormatter = () => {
  const formatIndianPhone = (phone) => {
    if (!phone) return "";
    let cleaned = phone.toString().replace(/\D/g, "");
    if (cleaned.length === 12 && cleaned.startsWith("91")) {
      const part1 = cleaned.substring(2, 7);
      const part2 = cleaned.substring(7);
      return `+91 ${part1}-${part2}`;
    }
    if (cleaned.length === 10) {
      const part1 = cleaned.substring(0, 5);
      const part2 = cleaned.substring(5);
      return `+91 ${part1}-${part2}`;
    }
    return phone.toString();
  };
  return {
    formatIndianPhone
  };
};
const _sfc_main$2 = {
  __name: "FeedbackRow",
  __ssrInlineRender: true,
  props: {
    feedback: {
      type: Object,
      required: true
    }
  },
  emits: ["view"],
  setup(__props) {
    const props = __props;
    const { formatIndianPhone } = usePhoneFormatter();
    const formattedDate = computed(() => {
      if (!props.feedback.created_at) return "";
      const date = new Date(props.feedback.created_at);
      return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }).format(date);
    });
    const formattedPhone = computed(() => {
      return formatIndianPhone(props.feedback.phone);
    });
    const truncatedComment = computed(() => {
      const comment = props.feedback.feedback_text || "";
      if (comment.length > 35) {
        return comment.substring(0, 35) + "...";
      }
      return comment;
    });
    const getStarColorClass = (rating) => {
      if (rating === 1) return "text-red-500 fill-red-500";
      return "text-amber-500 fill-amber-500";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<tr${ssrRenderAttrs(mergeProps({ class: "hover:bg-slate-800/20 transition-colors border-b border-slate-800/80 last:border-0" }, _attrs))}><td class="px-6 py-4.5 whitespace-nowrap text-xs text-slate-300 font-medium">${ssrInterpolate(formattedDate.value)}</td><td class="px-6 py-4.5 whitespace-nowrap text-xs text-slate-300">${ssrInterpolate(((_a = __props.feedback.location) == null ? void 0 : _a.name) || "Unknown")}</td><td class="px-6 py-4.5 whitespace-nowrap"><div class="flex items-center gap-0.5"><!--[-->`);
      ssrRenderList(5, (index) => {
        _push(ssrRenderComponent(unref(StarIcon), {
          key: index,
          class: ["w-4 h-4", index <= __props.feedback.rating ? getStarColorClass(__props.feedback.rating) : "text-slate-700"]
        }, null, _parent));
      });
      _push(`<!--]--></div></td><td class="px-6 py-4.5 whitespace-nowrap"><div class="text-xs font-semibold text-slate-200">${ssrInterpolate(__props.feedback.name || "Guest")}</div><div class="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(PhoneIcon), { class: "w-3 h-3 text-brand-400" }, null, _parent));
      _push(`<span>${ssrInterpolate(formattedPhone.value)}</span></div></td><td class="px-6 py-4.5 text-xs text-slate-300 max-w-xs truncate"><span class="italic text-slate-300">&quot;${ssrInterpolate(truncatedComment.value)}&quot;</span></td><td class="px-6 py-4.5 whitespace-nowrap text-right text-xs font-semibold space-x-2"><button class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 hover:bg-brand-500/20 hover:text-brand-300 transition-all">`);
      _push(ssrRenderComponent(unref(EyeIcon), { class: "w-3.5 h-3.5" }, null, _parent));
      _push(`<span>View</span></button><button class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all">`);
      _push(ssrRenderComponent(unref(MessageCircleIcon), { class: "w-3.5 h-3.5" }, null, _parent));
      _push(`<span>WhatsApp</span></button></td></tr>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/feedback/components/FeedbackRow.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "FeedbackModal",
  __ssrInlineRender: true,
  props: {
    feedback: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { formatIndianPhone } = usePhoneFormatter();
    const formattedPhone = computed(() => {
      var _a;
      if (!((_a = props.feedback) == null ? void 0 : _a.phone)) return "";
      return formatIndianPhone(props.feedback.phone);
    });
    const getStarColorClass = (rating) => {
      if (rating === 1) return "text-red-500 fill-red-500";
      return "text-amber-500 fill-amber-500";
    };
    const clientLocalDate = computed(() => {
      var _a;
      if (!((_a = props.feedback) == null ? void 0 : _a.created_at)) return "";
      const date = new Date(props.feedback.created_at);
      return new Intl.DateTimeFormat(void 0, {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(date);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" }, _attrs))} data-v-10409759><div class="w-full max-w-lg rounded-2xl border border-slate-800 glass-panel shadow-glass-lg overflow-hidden animate-fade-in-up" role="dialog" aria-modal="true" data-v-10409759><div class="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between" data-v-10409759><div class="flex items-center gap-2" data-v-10409759>`);
        _push(ssrRenderComponent(unref(ShieldAlertIcon), { class: "w-5 h-5 text-red-400" }, null, _parent));
        _push(`<h3 class="text-base font-bold text-slate-200" data-v-10409759>Negative Feedback Details</h3></div><button class="text-slate-400 hover:text-slate-200 transition-colors p-1 hover:bg-slate-800/60 rounded-lg" data-v-10409759>`);
        _push(ssrRenderComponent(unref(XIcon), { class: "w-5 h-5" }, null, _parent));
        _push(`</button></div><div class="p-6 space-y-5" data-v-10409759><div class="grid grid-cols-2 gap-4 bg-[#070b19]/60 border border-slate-800 rounded-xl p-4" data-v-10409759><div data-v-10409759><p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider" data-v-10409759>Customer Name</p><p class="text-sm font-semibold text-slate-200 mt-0.5" data-v-10409759>${ssrInterpolate(__props.feedback.name || "Guest")}</p></div><div data-v-10409759><p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider" data-v-10409759>Phone Number</p><p class="text-sm font-semibold text-slate-200 mt-0.5" data-v-10409759>${ssrInterpolate(formattedPhone.value || "Not provided")}</p></div><div data-v-10409759><p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider" data-v-10409759>Rating Given</p><div class="flex items-center gap-0.5 mt-0.5" data-v-10409759><!--[-->`);
        ssrRenderList(5, (index) => {
          _push(ssrRenderComponent(unref(StarIcon), {
            key: index,
            class: ["w-4 h-4", index <= __props.feedback.rating ? getStarColorClass(__props.feedback.rating) : "text-slate-700"]
          }, null, _parent));
        });
        _push(`<!--]--></div></div><div data-v-10409759><p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider" data-v-10409759>Logged (Local Time)</p><p class="text-xs font-medium text-slate-300 mt-0.5" data-v-10409759>${ssrInterpolate(clientLocalDate.value)}</p></div></div><div data-v-10409759><p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2" data-v-10409759>Detailed Complaint Text</p><div class="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 min-h-[120px] max-h-60 overflow-y-auto" data-v-10409759><p class="text-sm text-slate-300 leading-relaxed italic whitespace-pre-wrap" data-v-10409759> &quot;${ssrInterpolate(__props.feedback.feedback_text || "No comment provided by user.")}&quot; </p></div></div></div><div class="px-6 py-4 border-t border-slate-800/80 bg-[#050813] flex items-center justify-end gap-3" data-v-10409759><button class="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-800/40 text-xs font-semibold text-slate-300 transition-all" data-v-10409759> Close Details </button>`);
        if (__props.feedback.phone) {
          _push(`<button class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow shadow-emerald-500/20 transition-all flex items-center gap-1.5" data-v-10409759>`);
          _push(ssrRenderComponent(unref(MessageCircleIcon), { class: "w-4 h-4" }, null, _parent));
          _push(`<span data-v-10409759>Contact on WhatsApp</span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/feedback/components/FeedbackModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const FeedbackModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-10409759"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const locationsStore = useLocationsStore();
    useNotificationsStore();
    const feedbackStore = useFeedbackStore();
    const searchQuery = ref("");
    const modalOpen = ref(false);
    const activeFeedback = ref({});
    const visiblePages = computed(() => {
      const range = [];
      const maxPages = 5;
      const currentPage = feedbackStore.pagination.page;
      const totalPages = feedbackStore.pagination.totalPages;
      let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
      let end = Math.min(totalPages, start + maxPages - 1);
      if (end - start + 1 < maxPages) {
        start = Math.max(1, end - maxPages + 1);
      }
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    });
    const openDetails = (feedback) => {
      activeFeedback.value = feedback;
      modalOpen.value = true;
    };
    const closeDetails = () => {
      modalOpen.value = false;
    };
    watch(
      () => locationsStore.currentLocationId,
      (newId) => {
        feedbackStore.filters.location_id = newId;
        feedbackStore.pagination.page = 1;
        feedbackStore.fetchFeedbacks();
      },
      { immediate: true }
    );
    watch(
      () => [feedbackStore.filters.location_id, feedbackStore.filters.date_from, feedbackStore.filters.date_to],
      async () => {
        feedbackStore.pagination.page = 1;
        await feedbackStore.fetchFeedbacks();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 animate-fade-in-up" }, _attrs))}><div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6"><div><h1 class="text-2xl font-bold tracking-tight text-white">Feedback Interceptor Logs</h1><p class="text-sm text-slate-400 mt-1">Manage and respond to critical 1\u20133 star ratings captured from customer scans</p></div><div class="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"><div class="relative min-w-[180px]"><select class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500/50 appearance-none pr-8 cursor-pointer font-semibold"><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(feedbackStore).filters.location_id) ? ssrLooseContain(unref(feedbackStore).filters.location_id, null) : ssrLooseEqual(unref(feedbackStore).filters.location_id, null)) ? " selected" : ""}>All Locations</option><!--[-->`);
      ssrRenderList(unref(locationsStore).locations, (loc) => {
        _push(`<option${ssrRenderAttr("value", loc.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(feedbackStore).filters.location_id) ? ssrLooseContain(unref(feedbackStore).filters.location_id, loc.id) : ssrLooseEqual(unref(feedbackStore).filters.location_id, loc.id)) ? " selected" : ""}>${ssrInterpolate(loc.name)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">`);
      _push(ssrRenderComponent(unref(ChevronDownIcon), { class: "w-3.5 h-3.5" }, null, _parent));
      _push(`</div></div><div class="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1.5"><input${ssrRenderAttr("value", unref(feedbackStore).filters.date_from)} type="date" class="bg-transparent border-0 text-xs text-slate-200 focus:outline-none cursor-pointer focus:ring-0 w-28 uppercase" placeholder="From Date"><span class="text-slate-600 text-xs font-semibold">to</span><input${ssrRenderAttr("value", unref(feedbackStore).filters.date_to)} type="date" class="bg-transparent border-0 text-xs text-slate-200 focus:outline-none cursor-pointer focus:ring-0 w-28 uppercase" placeholder="To Date"></div><div class="relative min-w-[200px] flex-grow sm:flex-grow-0">`);
      _push(ssrRenderComponent(unref(SearchIcon), { class: "absolute left-3 top-2.5 w-4 h-4 text-slate-500" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search details..." class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500/50 transition-colors"></div></div></div>`);
      if (!unref(locationsStore).loading && unref(locationsStore).locations.length === 0) {
        _push(`<div class="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl border border-slate-800 text-center min-h-[350px]"><div class="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700/50 text-slate-400 mb-4">`);
        _push(ssrRenderComponent(unref(MapPinOffIcon), { class: "w-8 h-8" }, null, _parent));
        _push(`</div><h3 class="text-lg font-bold text-slate-200">No Locations Found</h3><p class="text-sm text-slate-400 max-w-sm mt-2 mb-6"> Please configure a location in your merchant profile first. </p><button class="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-500 hover:from-brand-500 hover:to-indigo-400 text-xs font-semibold shadow shadow-brand-500/20 text-white">`);
        _push(ssrRenderComponent(unref(PlusIcon), { class: "w-4 h-4" }, null, _parent));
        _push(`<span>+ Add First Location</span></button></div>`);
      } else {
        _push(`<div class="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-glass-sm bg-slate-900/10"><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="border-b border-slate-800/80 bg-slate-900/40 text-slate-400 text-xs font-semibold uppercase tracking-wider"><th class="px-6 py-4">Date &amp; Time</th><th class="px-6 py-4">Location</th><th class="px-6 py-4">Rating</th><th class="px-6 py-4">Customer Info</th><th class="px-6 py-4">Comment Summary</th><th class="px-6 py-4 text-right">Actions</th></tr></thead><tbody class="divide-y divide-slate-800/60">`);
        if (unref(feedbackStore).loading) {
          _push(`<!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<tr class="animate-pulse"><td class="px-6 py-5"><div class="h-4 bg-slate-800/60 rounded w-24"></div></td><td class="px-6 py-5"><div class="h-4 bg-slate-800/60 rounded w-28"></div></td><td class="px-6 py-5"><div class="h-4 bg-slate-800/60 rounded w-16"></div></td><td class="px-6 py-5"><div class="h-4 bg-slate-800/60 rounded w-24 mb-1.5"></div><div class="h-3 bg-slate-800/60 rounded w-32"></div></td><td class="px-6 py-5"><div class="h-4 bg-slate-800/60 rounded w-full"></div></td><td class="px-6 py-5 text-right"><div class="h-7 bg-slate-800/60 rounded w-16 ml-auto"></div></td></tr>`);
          });
          _push(`<!--]-->`);
        } else if (unref(feedbackStore).feedbacks.length === 0) {
          _push(`<tr><td colspan="6" class="px-6 py-16 text-center"><div class="max-w-md mx-auto flex flex-col items-center">`);
          _push(ssrRenderComponent(unref(InboxIcon), { class: "w-12 h-12 text-slate-700 mb-3" }, null, _parent));
          _push(`<p class="text-sm font-semibold text-slate-300">No intercept logs found</p><p class="text-xs text-slate-500 mt-1"> No negative feedback found for this location in the selected date range. </p></div></td></tr>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(unref(feedbackStore).feedbacks, (item) => {
            _push(ssrRenderComponent(_sfc_main$2, {
              key: item.id,
              feedback: item,
              onView: openDetails
            }, null, _parent));
          });
          _push(`<!--]-->`);
        }
        _push(`</tbody></table></div>`);
        if (unref(feedbackStore).pagination.totalPages > 1) {
          _push(`<div class="px-6 py-4 bg-slate-900/20 border-t border-slate-800/80 flex items-center justify-between gap-4"><span class="text-xs text-slate-500 font-medium"> Showing page ${ssrInterpolate(unref(feedbackStore).pagination.page)} of ${ssrInterpolate(unref(feedbackStore).pagination.totalPages)} (Total ${ssrInterpolate(unref(feedbackStore).pagination.total)} entries) </span><div class="flex items-center gap-1"><button${ssrIncludeBooleanAttr(unref(feedbackStore).pagination.page === 1) ? " disabled" : ""} class="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 disabled:opacity-30 disabled:hover:bg-transparent transition-all">`);
          _push(ssrRenderComponent(unref(ChevronLeftIcon), { class: "w-4 h-4" }, null, _parent));
          _push(`</button><!--[-->`);
          ssrRenderList(visiblePages.value, (page) => {
            _push(`<button class="${ssrRenderClass([unref(feedbackStore).pagination.page === page ? "bg-brand-600 text-white font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-850", "px-3 py-1 rounded-lg text-xs font-semibold transition-all"])}">${ssrInterpolate(page)}</button>`);
          });
          _push(`<!--]--><button${ssrIncludeBooleanAttr(unref(feedbackStore).pagination.page === unref(feedbackStore).pagination.totalPages) ? " disabled" : ""} class="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 disabled:opacity-30 disabled:hover:bg-transparent transition-all">`);
          _push(ssrRenderComponent(unref(ChevronRightIcon), { class: "w-4 h-4" }, null, _parent));
          _push(`</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(ssrRenderComponent(FeedbackModal, {
        feedback: activeFeedback.value,
        "is-open": modalOpen.value,
        onClose: closeDetails
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/feedback/pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CvcBmlmT.mjs.map
