import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  error?: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement & HTMLTextAreaElement>;
  inputMode?: React.HTMLAttributes<HTMLElement>["inputMode"];
  maxLength?: number;
};

export function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  className,
  value,
  onChange,
  onBlur,
  inputMode,
  maxLength,
}: FieldProps) {
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sharedClasses = cn(
    "border-edge-2 text-fg placeholder:text-muted-2 font-display w-full border-b bg-transparent",
    "py-2.5 text-lg focus:outline-none",
    error && "border-red-500/70",
  );

  // Grow to fit content, but never shrink a height the user dragged manually.
  useEffect(() => {
    if (type !== "textarea" || !textareaRef.current) return;
    const el = textareaRef.current;
    if (el.scrollHeight > el.clientHeight) {
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [type, value]);

  const shared = {
    id: inputId,
    name,
    placeholder: placeholder ?? label,
    value,
    onChange,
    onBlur,
    inputMode,
    maxLength,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className={cn("flex min-w-0 flex-1 flex-col items-start gap-1.5", className)}>
      <label htmlFor={inputId} className="font-display text-[#E4E4E6]">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...shared}
          ref={textareaRef}
          className={cn(sharedClasses, "min-h-[88px] resize-y")}
          rows={3}
        />
      ) : (
        <input {...shared} type={type} className={sharedClasses} />
      )}
      {error ? (
        <p id={errorId} className="font-display text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
