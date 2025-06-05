import { db } from '../../database';
import { Task, TaskUpdate, TaskInput } from '../../types/task';

export type TaskRepository = {
    createTask: (task: TaskInput) => string;
    getTaskById: (id: string) => Task;
    updateTask: (id: string, update: TaskUpdate) => void;
    deleteTask: (id: string) => void;
    getAllTasks: () => Task[];
}

//A repository pattern was used as the current database would definitely change in the future, and this way the code 
//is more modular and easier to maintain.

export class MemoryTaskRepository implements TaskRepository {

    createTask(task: TaskInput): string {
        const fullTask = {
            ...task,
            concluido: false,
            dataCriacao: new Date()
        };
        fullTask.concluido = false;
        fullTask.dataCriacao = new Date();
        const id = db.create('tasks', fullTask);  
        return id;
    }

    getTaskById(id: string): Task {
        const task = db.findOneById('tasks', id);
        return task;
    }

    updateTask(id: string, update: TaskUpdate) {
        db.updateById('tasks', id, update);
    }

    deleteTask(id: string) {
        db.deleteById('tasks', id);
    }

    getAllTasks(): Task[] {
        return db.findAll('tasks');
    }

}
