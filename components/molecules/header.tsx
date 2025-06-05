import { useRouter } from "next/router"
import { PrimaryButton } from "../atoms/button"
import { SmallParagraph, Title } from "../atoms/text"

export const Header = () => {

    const router = useRouter();

    const addTask = () => {
        router.push('/tasks/create');
    }

    return <header className="flex justify-between p-6 items-center mb-4">
        <div className='flex flex-col'>
            <Title>Task Manager</Title>
            <SmallParagraph>Hover a task to see more details</SmallParagraph>
        </div>
        <PrimaryButton onClick={addTask}>Create Task</PrimaryButton>
    </header>
}
