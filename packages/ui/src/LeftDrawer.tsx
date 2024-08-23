import { cn } from "@repo/lib/utils";
import React from "react";

interface LeftDrawerProps {
  children: React.ReactNode;
  className?: string;
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        " ui-absolute ui-h-screen ui-w-full ui-z-[3] ui-overflow-hidden",
        className
      )}>
      {children}
    </div>
  );
};

export default LeftDrawer;
