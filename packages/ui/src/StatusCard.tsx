import { statusCardProps } from "@repo/types/types";
import { cn } from "@repo/lib/utils";

const StatusCard = ({ img, name, day, Status, onClick }: statusCardProps) => {
  return (
    <div
      onClick={onClick}
      className="ui-w-full ui-h-[15%] ui-flex ui-items-center ui-justify-between ui-px-3 ui-border-b-white ui-border-b-[0.1rem]">
      <span className=" ui-text-slate-200 ui-relative ui-font-semibold ui-flex ui-gap-3 ui-items-center ui-justify-between ui-w-[3vmax] ui-h-[3-vmax] ui-rounded-full">
        <img
          src={img}
          className=" ui-cursor-pointer ui-object-fill ui-rounded-full"
          alt="Image"
        />
        <span
          className={cn(
            "ui-cursor-pointer ui-w-[0.6rem] ui-h-[0.6rem] ui-mt-2 ui-rounded-full ui-absolute ui-top-0 ui-right-0",
            Status == "online" ? "ui-bg-VividGreen" : "ui-bg-SunFlowerYellow"
          )}></span>
        <h1 className="ui-cursor-pointer ui-text-base ui-text-nowrap ui-select-none">
          {name}
        </h1>
      </span>
      <h1 className="ui-text-slate-200 ui-select-none ui-cursor-default">
        {day}
      </h1>
    </div>
  );
};

export default StatusCard;
