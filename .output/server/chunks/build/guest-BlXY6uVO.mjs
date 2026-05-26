import { u as useAuthStore } from './auth-CjgQdcOt.mjs';
import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
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
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const guest = defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    return navigateTo("/dashboard/analytics");
  }
});

export { guest as default };
//# sourceMappingURL=guest-BlXY6uVO.mjs.map
