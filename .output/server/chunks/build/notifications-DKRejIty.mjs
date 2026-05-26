import { defineStore } from 'pinia';
import { ref } from 'vue';

const useNotificationsStore = defineStore("notifications", () => {
  const notifications = ref([]);
  function add(message, type = "info") {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    notifications.value.push({ id, message, type });
    setTimeout(() => {
      remove(id);
    }, 4e3);
  }
  const success = (message) => add(message, "success");
  const error = (message) => add(message, "error");
  const warning = (message) => add(message, "warning");
  const info = (message) => add(message, "info");
  function remove(id) {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  }
  return { notifications, add, success, error, warning, info, remove };
});

export { useNotificationsStore as u };
//# sourceMappingURL=notifications-DKRejIty.mjs.map
