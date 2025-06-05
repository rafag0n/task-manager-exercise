import { Task } from "../../types/task";
import { TaskItem } from "../molecules/task-item";

type TaskListProps = {
    tasks: Task[];
    onClickItem?: (task: Task) => void;
    onDeleteItem?: (task: Task) => void;
}

export const TaskList = ({ tasks, onClickItem, onDeleteItem }: TaskListProps) => {

    //some paginatioun logic could be added here in the future
    return <div className="flex flex-col gap-4 px-3">
        {tasks.map((task:Task) => <TaskItem onDeleteItem={onDeleteItem} onClick={onClickItem} key={task.id} task={task} />)}
    </div>

}