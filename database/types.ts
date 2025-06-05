import { Task, TaskDelete, TaskInput, TaskUpdate } from "../types/task";

export type JSONDatabaseBase = {
    snapshot: DatabaseSnapshot;
    create: <K extends keyof DatabaseTypes>(type: K, data: Omit<DatabaseTypes[K], 'id'>) => string;
    deleteById: <K extends keyof DatabaseDelete>(type: K, id: string) => void;
    updateById: <K extends keyof DatabaseUpdate>(type: K, id: string, data: DatabaseUpdate[K]) => void;
    findOneById: <K extends keyof DatabaseTypes>(type: K, id: string) => DatabaseTypes[K] | null;
    findAll: <K extends keyof DatabaseTypes>(type: K) => DatabaseTypes[K][];
}

export type DatabaseSnapshot = {
    [collection: string]: { [id: string]: Task }
};

export type DatabaseTypes = {
    tasks: Task;
}

export type DatabaseInput = {
    tasks: TaskInput;
};

export type DatabaseDelete = {
    tasks: TaskDelete;
};

export type DatabaseUpdate = {
    tasks: TaskUpdate;
};