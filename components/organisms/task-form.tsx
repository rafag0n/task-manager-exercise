import { useRouter } from "next/router";
import { SecondaryButton } from "../atoms/button"
import { InputWithLabel, TextareaWithLabel } from "../molecules/input-with-label";
import { useState } from "react";
import { toast } from "react-toastify";
import { PrimaryButtonWithLoading } from "../molecules/button-with-loading";
import { Task } from "../../types/task";

export type SubmitTaskFormArgs = {
    title: string;
    description?: string;
}

type TaskFormProps = {
    submitting: boolean;
    existingTask?: Omit<Task, 'dataCriacao'> | null;
    onSubmit: (args: SubmitTaskFormArgs) => void;
}

//being the most important component in the application, it was planned to be 
//used on both creation and edition of tasks, so it has a generic name
export const TaskForm = ({
    onSubmit,
    submitting,
    existingTask
}: TaskFormProps) => {

    const [title, setTitle] = useState(existingTask?.titulo || "");
    const [description, setDescription] = useState(existingTask?.descricao || "");
    const router = useRouter();

    const validate = () => {
        if (!title) {
            throw new Error("Title is required");
        }
    };

    const handleCreate = () => {
        try {
            validate();
            onSubmit({ title, description });
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
            return;
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCreate();
        }
    };

    return <>
        <InputWithLabel
        label='Title'
        type="text"
        placeholder="Task title"
        value={title}
        onKeyDown={onKeyDown}
        onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaWithLabel
        label='Task Description'
        placeholder="Task description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-4 justify-end">
            <SecondaryButton disabled={submitting} onClick={() => router.back()}>Cancel</SecondaryButton>
            <PrimaryButtonWithLoading isLoading={submitting} onClick={handleCreate}>Save</PrimaryButtonWithLoading>
        </div>
    </>

}