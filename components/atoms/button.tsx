import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return <button className="bg-green-500 items-center gap-2 flex cursor-pointer rounded-xl text-base text-white px-4 py-2" {...props}>
    {children}
  </button>
}

export const SecondaryButton = ({ children, ...props }: ButtonProps) => {
  return <button className="cursor-pointer text-gray-800 text-base px-2 py-2 rounded" {...props}>
    {children}
  </button>
}
