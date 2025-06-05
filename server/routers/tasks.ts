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

//mockDelay was introduced to simulate a delay in the API response,
//as it is likely that the API will have some delay in a real-world scenario.
const mockDelay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));

const taskController = new TaskController(new MemoryTaskRepository())

export const taskRouter = router({
  findAll: procedure.query(() => {
    return taskController.findAll();
  }),
  findOneById: procedure.input(z.string()).query(async ({ input }) => {
    const id = input;
    return taskController.findById(id);
  }),
  delete: procedure.input(taskDeleteSchema).mutation(async ({ input }) => {
    const { id } = input;
    await mockDelay();
    return taskController.deleteTask(id)
  }),
  create: procedure.input(taskInputSchema).mutation(async ({ input }) => {
    await mockDelay();
    taskController.createTask(input);
  }),
  updateOne: procedure.input(taskUpdateSchema).mutation(async ({ input }) => {
    const { id, update } = input;
    await mockDelay();
    return taskController.updateTask( id, update );
  })
});