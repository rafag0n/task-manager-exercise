

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input = (props:InputProps)=> {
    return <input {...props}
    className="w-full p-3 mb-4 text-base bg-white border-gray-400 border rounded"/>
};

export const TextArea = (props:TextAreaProps) => {
    return <textarea {...props}
    className="w-full p-3 mb-4 bg-white text-base border-gray-400 border rounded resize-none"
    rows={4}/>
};