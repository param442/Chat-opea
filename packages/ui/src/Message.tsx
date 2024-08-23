import { cn } from "@repo/lib/utils";

import { TypeClient } from "@repo/types/types";

const Message = ({
  className,
  message,
  isSent,
  type,
}: {
  className?: string;
  message?: string;
  isSent?: boolean;
  type?: TypeClient;
}) => {
  return (
    <div
      className={cn(
        // Maximum width

        "ui-rounded-sm", // Rounded corners
        "ui-p-2", // Padding
        // Conditional alignment
        type === TypeClient.CLIENT
          ? "ui-bg-gradient-to-r ui-from-Lavender ui-to-MagentaPurple ui-self-start ui-mr-auto ui-ml-3"
          : "ui-bg-CharcoalGray ui-self-end ui-ml-auto ui-mr-2",
        className // Default background color for USER
      )}>
      {message}
    </div>
  );
};

export default Message;
export { TypeClient };
