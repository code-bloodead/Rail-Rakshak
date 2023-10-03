import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const CreateTaskButton = () => {
  return (
    <a
      href="#"
      className="inline-flex items-center space-x-4 text-white bg-blueSecondary hover:bg-navy-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blueSecondary dark:hover:bg-navy-600 focus:outline-none dark:focus:ring-navy-500"
    >
      Assign personnel
      <span className="px-2">
        <AiOutlineArrowRight />
      </span>
    </a>
  );
};

export default CreateTaskButton;
