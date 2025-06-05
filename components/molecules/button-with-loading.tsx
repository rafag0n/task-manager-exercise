import { PrimaryButton } from "../atoms/button";
import { LoadingIndicatorSmall } from "../atoms/loading-indicator";


interface ButtonWithLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const PrimaryButtonWithLoading = ({ isLoading, disabled, children, ...props }: ButtonWithLoadingProps) => {

    return <PrimaryButton disabled={isLoading || disabled} {...props}>
        {children}
        {!!isLoading && <LoadingIndicatorSmall />} 
    </PrimaryButton>

}