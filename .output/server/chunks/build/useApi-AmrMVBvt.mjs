import { u as useAuthStore } from './auth-CjgQdcOt.mjs';
import { n as navigateTo, f as useRuntimeConfig } from './server.mjs';

const useApi = () => {
  const authStore = useAuthStore();
  const runtimeConfig = useRuntimeConfig();
  return $fetch.create({
    baseURL: runtimeConfig.public.apiBaseUrl || "http://localhost:8000/api/v1",
    async onRequest({ options }) {
      if (authStore.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
          Accept: "application/json"
        };
      }
    },
    async onResponseError({ response }) {
      var _a;
      if (response.status === 419 || response.status === 401) {
        authStore.logout();
        await navigateTo("/auth/login");
      }
      if (response.status === 403 && ((_a = response._data) == null ? void 0 : _a.error_code) === "SUBSCRIPTION_EXPIRED") {
        authStore.setSubscriptionStatus(false);
        await navigateTo("/billing/expired");
      }
    }
  });
};

export { useApi as u };
//# sourceMappingURL=useApi-AmrMVBvt.mjs.map
