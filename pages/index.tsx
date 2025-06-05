import { Header } from "../components/molecules/header";
import { getTrpcServerSideHelper } from "../utils/trpc-helper";
import { Task } from "../types/task";
import { TaskList } from "../components/organisms/task-list";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import { trpcClient } from "../utils/trpc";

type HomeProps = {
  tasks: Task[];
}

export default function Home(props: HomeProps) {

  const router = useRouter();

  const onClickTask = (task: Task) => {
    router.push(`/tasks/${task.id}`);
  }

  const [tasks, setTasks] = useState(props.tasks);

  const onDeleteItem = async () => {
    const newTasks = await trpcClient.tasks.findAll.query();
    setTasks(
      newTasks.map(task => ({
        ...task,
        dataCriacao: new Date(task.dataCriacao),
      }))
    );
  }

  return <div className="flex max-w-[600px] pb-5 m-auto bg-slate-100 flex-col min-h-screen">
    <Head>
      <title>Task manager</title>
    </Head>
    <Header />
    <TaskList tasks={tasks} onDeleteItem={onDeleteItem} onClickItem={onClickTask} />
  </div>
}

export const getServerSideProps = async () => {
  const helper = getTrpcServerSideHelper();
  await helper.tasks.findAll.prefetch();
  const tasks = helper.dehydrate().queries[0].state.data;

  return {
    props: {
      tasks
    }
  };
}