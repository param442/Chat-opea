import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";

const AddButton = () => {
  const navigate = useRouter();
  return (
    <>
      <button className="ui-bg-HotPink ui-flex ui-items-center ui-p-2 ui-justify-center  ui-w-[2vmax] ui-h-[2vmax]  ui-rounded-full">
        <IoMdAdd
          onClick={() => {
            navigate.push("/adduser");
          }}
          style={{
            transform: "scale(2)",
          }}
        />
      </button>
    </>
  );
};

export default AddButton;
