import { Hono } from 'hono';
import { MASTER_LIBRARY } from '../data/library';

const router = new Hono();

router.get('/', (c) => {
  return c.json(MASTER_LIBRARY);
});

export default router;
