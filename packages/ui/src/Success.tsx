import { CheckCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@repo/lib/utils";

interface Form_errorProps {
  message?: string;
  className?: string;
}

const Form_success = ({ message, className }: Form_errorProps) => {
  return message ? (
    <div
      className={cn(
        "ui-bg-emerald-500/15 ui-p-3 ui-rounded-md ui-flex ui-items-center ui-gap-x-2 ui-text-sm ui-text-emerald-500",
        className
      )}>
      <CheckCircledIcon className="ui-h-4 ui-w-4" />
      <span>{message}</span>
    </div>
  ) : null;
};

export default Form_success;
