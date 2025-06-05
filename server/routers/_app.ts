import { router } from '../trpc';
import { taskRouter } from './tasks';

export const appRouter = router({
  tasks: taskRouter, 
});

export type AppRouter = typeof appRouter;
