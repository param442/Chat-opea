"use client";

import { cn } from "@repo/lib/utils";
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
const Send = ({
  className,
  onClick,
  message,
  setMessage,
}: {
  className?: string;
  onClick: () => void;
  message: string;
  setMessage: (text: string) => void;
}) => {
  return (
    <div
      className={cn(
        "ui-w-full ui-h-[15%] ui-relative  ui-flex ui-items-center ui-justify-evenly ui-border-t-2 ui-border-white ui-pt-2",
        className
      )}>
      <span className="ui-w-[80%]  ui-gap-3 ui-h-[90%] ui-relative  ui-flex ui-px-5 ui-bg-BlueCharcol ui-rounded-xl ui-items-center ui-justify-center">
        <BsEmojiSmile style={{ transform: "scale(1.5)" }} />
        <textarea
          className="ui-w-full ui-resize-none mt-1 ui-h-[40%] ui-bg-inherit ui-outline-none "
          placeholder="Type Message"
          autoCorrect="on"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </span>
      <button className=" ui-bg-HotPink ui-w-[3vmax] ui-h-[3vmax] ui-flex ui-items-center ui-justify-center px-2 py-1 ui-rounded-full">
        <IoIosSend
          onClick={() => {
            console.log(message);
            onClick();
          }}
          style={{
            transform: "scale(2)",
          }}
        />
      </button>
    </div>
  );
};

export default Send;
