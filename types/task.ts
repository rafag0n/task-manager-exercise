export type TaskInput = {
    titulo: string;
    descricao?: string;
}

export type Task = TaskInput & {
    id: string;
    concluido: boolean;
    dataCriacao: Date;
};

export type TaskUpdate = Partial<TaskInput>;

export type TaskDelete = {
    id: string;
}
