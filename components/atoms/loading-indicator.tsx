import { ClipLoader } from "react-spinners";

type LoadingIndicatorProps = {
    color?: string;
};

export const LoadingIndicatorSmall = ({ color = 'white' }: LoadingIndicatorProps) => {
    return <ClipLoader
    size={20}
    color={color}
    aria-label="Loading" />
}