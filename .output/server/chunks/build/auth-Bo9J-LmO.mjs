import { d as defineNuxtRouteMiddleware, n as navigateTo, e as executeAsync } from './server.mjs';
import { u as useAuthStore } from './auth-CjgQdcOt.mjs';
import { u as useApi } from './useApi-AmrMVBvt.mjs';
import 'vue';
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
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';

const auth = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const authStore = useAuthStore();
  if (!authStore.token) {
    return navigateTo("/auth/login");
  }
  if (authStore.token && !authStore.user) {
    try {
      const api = useApi();
      const data = ([__temp, __restore] = executeAsync(() => api("/auth/me")), __temp = await __temp, __restore(), __temp);
      authStore.user = data.user;
      authStore.company = data.company;
    } catch (err) {
      console.error("Failed to restore user session:", err);
      authStore.logout();
      return navigateTo("/auth/login");
    }
  }
  if (!authStore.isSubscriptionActive && to.path !== "/billing/expired") {
    return navigateTo("/billing/expired");
  }
});

export { auth as default };
//# sourceMappingURL=auth-Bo9J-LmO.mjs.map
