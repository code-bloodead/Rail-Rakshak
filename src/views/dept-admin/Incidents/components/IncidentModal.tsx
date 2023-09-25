import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { Select, Option } from "@material-tailwind/react";
import Card from "@/components/card";
import { MdCheckCircle } from "react-icons/md";
import { BsCardText, BsClockHistory } from "react-icons/bs";
import { getDateTime } from "@/constants/utils";
import { BiTimeFive, BiCategoryAlt } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoImages } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

type Incident = {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  station_name: string;
  location: string;
  source: string;
  status: string;
  created_at: Date;
  actions: string | undefined;
};

interface IncidentModalProps {
  incident: Incident;
  modalType: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const IncidentModal = ({
  isOpen,
  onClose,
  modalType,
  onOpen,
  incident,
}: IncidentModalProps) => {
  const [incidentStatus, setIncidentStatus] = useState<string>(
    incident?.status ? incident?.status : "Pending"
  );
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay
          className="bg-[#000000A0] !z-[1001]]"
          backdropFilter="blur(10px)"
        />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] top-[5vh] sm:top-[8vh]">
          <ModalCloseButton className="right-5 top-5 absolute z-[5000] text-[#000000A0] hover:text-navy-900" />
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] w-[85vw] max-w-[950px] flex flex-col !z-[1004]">
              <h1 className="mb-4 text-2xl text-navy-700 font-bold">
                Incident {incident?.id}
              </h1>
              <div className="my-2 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4">
                <div className="relative flex-col my-2 sm:my-0">
                  <div className="flex items-center ">
                    <label
                      htmlFor="title"
                      className={`text-navy-700 dark:text-white font-bold ml-2`}
                    >
                      Title:
                    </label>
                  </div>

                  <input
                    disabled={true}
                    id="title"
                    value={incident?.title ? incident?.title : "-"}
                    className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                  />
                </div>
                <div className="relative flex-col my-2 sm:my-0">
                  <div className="flex items-center ml-2">
                    <BiCategoryAlt fill="#1b254b" />
                    <label
                      htmlFor="category"
                      className={`text-navy-700 dark:text-white font-bold ml-1`}
                    >
                      Category:
                    </label>
                  </div>

                  <input
                    disabled={true}
                    id="category"
                    value={incident?.type ? incident?.type : "-"}
                    className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                  />
                </div>
                <div className="relative flex-col my-2 md:my-0">
                  <div className="flex items-center ml-2">
                    <MdOutlineLocationOn fill="#1b254b" />
                    <label
                      htmlFor="location"
                      className={`text-navy-700 dark:text-white font-bold ml-1`}
                    >
                      Location:
                    </label>
                  </div>

                  <input
                    disabled={true}
                    id="location"
                    value={incident?.location ? incident?.location : "-"}
                    className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                  />
                </div>
                <div className="relative flex-col my-2 md:my-0">
                  <label
                    htmlFor="status"
                    className={`text-navy-700 dark:text-white font-bold ml-2`}
                  >
                    Status:
                  </label>
                  {modalType === "edit" ? (
                    <Select
                      // disabled={true}
                      id="status"
                      // onChange={(e) => console.log(e)}
                      value={incidentStatus}
                      className=" relative mt-2 flex h-12 w-full items-center justify-start rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                    >
                      <Option
                        key="Pending"
                        value="Pending"
                        onClick={() => setIncidentStatus("Pending")}
                      >
                        <BsClockHistory className="me-2 text-amber-500 dark:text-amber-300 inline" />{" "}
                        Pending
                      </Option>
                      <hr />
                      <Option
                        key="Resolved"
                        value="Resolved"
                        className="mt-3"
                        onClick={() => setIncidentStatus("Resolved")}
                      >
                        <MdCheckCircle className="me-2 text-green-500 dark:text-green-300 inline" />{" "}
                        Resolved
                      </Option>
                    </Select>
                  ) : (
                    <div className="flex items-center">
                      <p className="relative mt-2 flex h-12 w-full items-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)] mr-3">
                        {incidentStatus === "Pending" ? (
                          <BsClockHistory className="me-2 text-amber-500 dark:text-amber-300 inline" />
                        ) : (
                          <MdCheckCircle className="me-2 text-green-500 dark:text-green-300 inline" />
                        )}
                        {incidentStatus}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row flex-wrap mt-3">
                <div className="relative flex-col sm:basis-1/4">
                  <div className="flex items-center ml-2">
                    <BiTimeFive fill="#1b254b" />
                    <label
                      htmlFor="date-time"
                      className={`text-navy-700 dark:text-white font-bold`}
                    >
                      Date & Time:
                    </label>
                  </div>
                  <input
                    disabled={true}
                    id="date-time"
                    value={
                      incident?.created_at
                        ? getDateTime(incident?.created_at.toString())
                        : "-"
                    }
                    className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)] mr-3"
                  />
                </div>
                <div className="relative flex-col sm:basis-3/4">
                  <div className="flex items-center ml-5">
                    <BsCardText fill="#1b254b" />
                    <label
                      htmlFor="description"
                      className={`text-navy-700 dark:text-white font-bold ml-1`}
                    >
                      Description:
                    </label>
                  </div>
                  <input
                    disabled={true}
                    id="date-time"
                    value={incident?.description ? incident?.description : "-"}
                    className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)] ml-3"
                  />
                  <p id="description"></p>
                </div>
              </div>

              <div className="my-3 flex-col">
                <div className="flex items-center">
                  <IoImages fill="#1b254b" />
                  <label
                    htmlFor="image"
                    className={`text-navy-700 dark:text-white font-bold ml-1`}
                  >
                    Images:
                  </label>
                </div>

                <img
                  id="image"
                  src={
                    incident?.image === ""
                      ? "https://static.toiimg.com/thumb/msid-65971726,imgsize-108452,width-400,resizemode-4/65971726.jpg"
                      : incident?.image
                  }
                  alt="Evidence"
                  className="mt-2 rounded-xl"
                  width={250}
                  height={250}
                />
              </div>

              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => console.log("Edit")}
                  className={` flex items-center justify-center rounded-lg bg-navy-50  font-medium text-brand-600 transition duration-200
           hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 p-3`}
                >
                  <FiEdit className="h-5 w-5 mr-2" /> Edit
                </button>
                <button
                  onClick={() => console.log("Delete")}
                  className={` flex items-center justify-center rounded-lg bg-navy-50   font-medium text-brand-600 transition duration-200
           hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 p-3`}
                >
                  <FaTrash className="h-5 w-5 mr-2" /> Delete
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IncidentModal;
