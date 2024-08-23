import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface Form_errorProps {
  message?: string;
}

const Form_error = ({ message }: Form_errorProps) => {
  return message ? (
    <div className="ui-bg-destructive/15 ui-p-3 ui-rounded-md ui-flex ui-items-center ui-gap-x-2 ui-text-sm ui-text-destructive">
      <ExclamationTriangleIcon className="ui-h-4 ui-w-4" />
      <span>{message}</span>
    </div>
  ) : null;
};

export default Form_error;
