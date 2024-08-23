import { cn } from "@repo/lib/utils";
import { CiStar } from "react-icons/ci";
import { PiVideoCameraThin } from "react-icons/pi";
import { SlUserFollow } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";
import { RiNotification2Line } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import { NavbarProps } from "@repo/types/types";
const Navbar = ({ img, name, onclick, type, className }: NavbarProps) => {
  return (
    <div
      className={cn(
        "navbar ui-flex ui-justify-between ui-items-center ui-px-5",
        className
      )}>
      <span className="ui-bg-red-500 ui-flex ui-relative ui-gap-3 ui-items-center ui-justify-between ui-w-[3vmax] ui-h-[3-vmax] ui-rounded-full">
        <img
          onClick={onclick?.User}
          src={img}
          className=" ui-h-full ui-w-full ui-cursor-pointer ui-object-contain ui-rounded-full"
          alt="Image"
        />
        <h1 className=" ui-text-nowrap ui-select-none">{name}</h1>
        {type == "FOLLOWER" && (
          <span className="ui-bg-green-800 ui-cursor-pointer ui-w-[0.7rem] ui-h-[0.7rem] ui-rounded-full ui-absolute ui-top-0 ui-right-0"></span>
        )}
      </span>
      {type == "FOLLOWER" && (
        <span className=" ui-flex ui-items-center ui-gap-8 ui-justify-between">
          <CiStar
            onClick={onclick?.favorite}
            style={{
              scale: "1.5",
              cursor: "pointer",
            }}
          />
          <SlUserFollow
            onClick={onclick?.Follow}
            style={{
              scale: "1.5",
              cursor: "pointer",
            }}
          />
          <PiVideoCameraThin
            onClick={onclick?.videoCall}
            style={{
              scale: "1.5",
              cursor: "pointer",
            }}
          />
          <IoCallOutline
            onClick={onclick?.voiceCall}
            style={{
              scale: "1.5",
              cursor: "pointer",
            }}
          />
        </span>
      )}
      {type == "USER" && (
        <span className=" ui-flex ui-items-center ui-justify-between ui-gap-5">
          <RiNotification2Line
            onClick={onclick?.notification}
            style={{
              scale: "1.5",
              cursor: "pointer",
            }}
          />
          <IoIosMore
            onClick={onclick?.more}
            style={{
              scale: "1.5",
              cursor: "pointer",
            }}
          />
        </span>
      )}
    </div>
  );
};

export default Navbar;
