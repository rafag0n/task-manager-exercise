import { TaskRepository } from "../repositories/task";
import { Task, TaskInput, TaskUpdate } from "../../types/task";


//this controller is responsible for abstracting the logic of the task business layer;
//it would work nicely if we wanted to move to REST or GraphQL in the future, 
//as it is likely that non-typescript clients would like to interact with the API;
//this should also improve the testability of the code, as we can mock the repository in tests.

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

    findById(id: string): Task {
        return this.taskRepository.getTaskById(id);
    }

    updateTask(id: string, update: TaskUpdate): void {
        this.taskRepository.updateTask(id, update);
    }

    deleteTask(id: string): void {
        this.taskRepository.deleteTask(id);
    }
    
}