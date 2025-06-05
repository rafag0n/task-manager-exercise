import { Input, TextArea } from "../atoms/input";

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

interface TextAreaWithLabelProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export const InputWithLabel = ({ label, ...props }: InputWithLabelProps) => {
    return (
        <label className="flex flex-col text-sm mb-2 gap-1">
            {label}
            <Input {...props} />
        </label>
    );
};

export const TextareaWithLabel = ({ label, ...props }: TextAreaWithLabelProps) => {
    return (
        <label className="flex flex-col text-sm mb-2 gap-1">
            {label}
            <TextArea {...props} />
        </label>
    );
};