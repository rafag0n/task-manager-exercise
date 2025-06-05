import { useState } from "react"
import { Task } from "../../types/task"
import { ListTitle, SmallParagraph } from "../atoms/text"
import { trpc } from "../../utils/trpc"
import { toast } from "react-toastify"
import { DeleteIcon } from "./delete-icon"


type TaskItemProps = {
    task: Task,
    onClick?: (task: Task) => void,
    onDeleteItem?: (task: Task) => void
}

//hover a task item to see description and delete button
export const TaskItem = ({ task, onClick, onDeleteItem }:TaskItemProps) => {

    const [hovered, setHovered] = useState(false);

    const { mutate: deleteTask, isPending: deleting } = trpc.tasks.delete.useMutation({
        onSuccess: () => {
            toast.success("Task deleted successfully");
            if (onDeleteItem) onDeleteItem(task);
        }, onError: (error) => {
            toast.error(error.message);
        }
    })

    const _onClick = () => {
        if (onClick && !deleting) onClick(task);
    }

    const onMouseEnter = () => {
        setHovered(true);
    }

    const onMouseLeave = () => {
        setHovered(false);
    }

    //ideally a modal would be used to confirm deletion, but for simplicity, we will just delete it directly
    const onClickDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteTask({ id: task.id });
    }

    return <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={_onClick} className="rounded-md cursor-pointer bg-white p-4 flex-col flex">
        <div className="flex items-center justify-between">
            <ListTitle>{task.titulo}</ListTitle>
            {hovered && <DeleteIcon onClick={onClickDelete} deleting={deleting} />}
        </div>
        {!!task.descricao && hovered && <SmallParagraph className="mt-1">{task.descricao || ''}</SmallParagraph>}
    </div>

}