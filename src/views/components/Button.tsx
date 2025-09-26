import { cn } from "@app/libs/utils";
import type { ComponentProps } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
  variant?: 'danger' | 'ghost';
}

export function Button({ className, isLoading, disabled, children, variant, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-primary hover:bg-primary/70 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl font-medium text-white transition-all flex items-center justify-center cursor-pointer',
        variant === 'danger' && 'bg-red-900 hover:bg-red-800',
        variant === 'ghost' && 'bg-transparent border border-gray-100 text-gray-100 hover:bg-gray-100/5',
        className,
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  );
}
