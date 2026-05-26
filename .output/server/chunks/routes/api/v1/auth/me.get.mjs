import { d as defineEventHandler } from '../../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const me_get = defineEventHandler((event) => {
  return {
    user: {
      id: 101,
      name: "Rajesh Kumar",
      email: "admin@ratingo.in",
      role: "merchant"
    },
    company: {
      id: 501,
      name: "Tandoori Delights Hospitality Pvt Ltd",
      gstin: "27AADCB8374H1Z5",
      is_subscription_active: true,
      subscription_expires_at: "2026-12-31T23:59:59.000Z"
    }
  };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
