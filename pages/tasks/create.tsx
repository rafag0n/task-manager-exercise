import Head from "next/head";
import { SubmitTaskFormArgs, TaskForm } from "../../components/organisms/task-form";
import { trpc } from "../../utils/trpc";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function CreateTaskPage() {

    const router = useRouter();

    const { mutate: createTask, isPending } = trpc.tasks.create.useMutation({
        onSuccess: () => {
            toast.success("Task created successfully");
            router.replace('/');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onSubmitTask = ({ title, description }: SubmitTaskFormArgs) => {
        createTask({ 
            titulo: title, 
            descricao: description 
        });
    }
    
    return (
        <div className="max-w-[600px] m-auto bg-slate-100 min-h-screen p-6">
            <Head>
                <title>Create Task</title>
            </Head>
            <h1 className="text-2xl font-bold mb-4">Create a New Task</h1>
            <TaskForm onSubmit={onSubmitTask} submitting={isPending}  />
        </div>
    );
}