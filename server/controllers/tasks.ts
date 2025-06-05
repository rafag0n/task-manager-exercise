import { TaskRepository } from "../repositories/task";
import { Task, TaskInput, TaskUpdate } from "../types/task";


export class TaskController {
    taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    createTask(task: TaskInput): string {
        return this.taskRepository.createTask(task);
    }

    findAll(): Task[] {
        return this.taskRepository.getAllTasks();
    }

    findById(id: string): Task | null {
        return this.taskRepository.getTaskById(id);
    }

    updateTask(id: string, update: TaskUpdate): void {
        this.taskRepository.updateTask(id, update);
    }

    deleteTask(id: string): void {
        this.taskRepository.deleteTask(id);
    }
    
}