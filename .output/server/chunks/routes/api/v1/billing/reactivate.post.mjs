import { d as defineEventHandler } from '../../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const reactivate_post = defineEventHandler(() => {
  return {
    success: true,
    message: "Subscription successfully reactivated via mock checkout"
  };
});

export { reactivate_post as default };
//# sourceMappingURL=reactivate.post.mjs.map
