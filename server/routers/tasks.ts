import { z } from 'zod';
import { procedure, router } from '../trpc';
import { TaskController } from '../controllers/tasks';
import { MemoryTaskRepository } from '../repositories/task';

const taskDeleteSchema = z.object({
    id: z.string(),
})

const taskInputSchema = z.object({
    titulo: z.string().min(1, 'Title is required'),
    descricao: z.string().optional(),
});

const taskUpdateSchema = z.object({
    id: z.string(),
    update: taskInputSchema,
})

const taskController = new TaskController(new MemoryTaskRepository())

export const taskRouter = router({
  list: procedure.input(z.null()).query(() => {
    return taskController.findAll();
  }),
  delete: procedure.input(taskDeleteSchema).mutation(async ({ input }) => {
    const { id } = input;
    return taskController.deleteTask(id)
  }),
  create: procedure.input(taskInputSchema).mutation(async ({ input }) => {
    return taskController.createTask(input);
  }),
  modify: procedure.input(taskUpdateSchema).mutation(async ({ input }) => {
    const { id, update } = input;
    return taskController.updateTask( id, update );
  })
});