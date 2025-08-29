import { cn } from "@app/libs/utils";
import { forwardRef, type ComponentProps } from "react";

interface SwitchProps extends ComponentProps<'input'> {
  name: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ placeholder, name, id, className, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative inline-block w-11 h-5">
        <input
          {...props}
          ref={ref}
          name={name}
          placeholder={placeholder}
          id={inputId}
          type="checkbox"
          className={cn(
            "peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-primary cursor-pointer transition-colors duration-300",
            className,
          )}
        />
        <label
          htmlFor={inputId}
          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-primary cursor-pointer"
        >
        </label>
      </div>
    )
  }
)