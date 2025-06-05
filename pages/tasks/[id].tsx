import Head from "next/head";
import { SubmitTaskFormArgs, TaskForm } from "../../components/organisms/task-form";
import { trpc } from "../../utils/trpc";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getTrpcServerSideHelper } from "../../utils/trpc-helper";
import { GetServerSideProps } from "next";
import { Task } from "../../types/task";

type EditTaskPageProps = {
  task: Omit<Task, 'dataCriacao'> | null;
};

export default function EditTaskPage({ task }: EditTaskPageProps) {

    const router = useRouter();
    const { id } = router.query;

    const { mutate: updateTask, isPending } = trpc.tasks.updateOne.useMutation({
        onSuccess: () => {
            toast.success("Task updated successfully");
            router.replace('/');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onSubmitTask = ({ title, description }: SubmitTaskFormArgs) => {
        updateTask({
            id: id as string,
            update:{
                titulo: title, 
                descricao: description
            }
        });
    }
    
    return (
        <div className="max-w-[600px] m-auto bg-slate-100 min-h-screen p-6">
            <Head>
                <title>Update Task</title>
            </Head>
            <h1 className="text-2xl font-bold mb-4">Update Task</h1>
            <TaskForm onSubmit={onSubmitTask} submitting={isPending} existingTask={task}  />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<EditTaskPageProps> = async (context) => {
    const { id } = context.params!;
    const helper = getTrpcServerSideHelper();
    const task = !!id ? await helper.tasks.findOneById.fetch(id as string) : null;
    
    return {
        props: { task }
    };
}