import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useState } from "react";

import Card from "@/components/card";
import { BsCardText, BsClockHistory } from "react-icons/bs";
import { MdCheckCircle, MdOutlineLocationOn } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsCalendar2Plus } from "react-icons/bs";
import { getDateTime } from "@/constants/utils";
import { useAppSelector } from "@/app/store";

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

interface AddTaskModalProps {
  incident: Incident;
  isAddTaskModalOpen: boolean;
  onAddTaskModalClose: () => void;
}

const AddTaskModal = ({
  isAddTaskModalOpen,
  onAddTaskModalClose,
  incident,
}: AddTaskModalProps) => {
  const admin = useAppSelector((state) => state.admin.data);
  const [taskData, setTaskData] = useState({
    title: `${incident?.title ? incident?.title : "-"}`,
    description: `${
      incident?.description
        ? "Around " + incident?.location + ", " + incident?.description
        : "No description provided"
    }`,
    assigned_to: [],
    image: `${
      incident?.image
        ? incident?.image
        : "https://static.toiimg.com/thumb/msid-65971726,imgsize-108452,width-400,resizemode-4/65971726.jpg"
    }`,
    deadline: "",
    assc_incident: `${incident?.id ? incident?.id : "-"}`,
    dept_name: `${
      localStorage.getItem("dept") ? localStorage.getItem("dept") : "-"
    }`,
    station_name: `${admin?.station_name ? admin?.station_name : "-"}`,
  });

  return (
    <>
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={onAddTaskModalClose}
        size="xl"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay
          className="bg-[#000000A0] !z-[1001]]"
          backdropFilter="blur(10px)"
        />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] top-[3vh] sm:top-[5vh]">
          <ModalCloseButton className="right-5 top-5 absolute z-[5000] text-[#000000A0] hover:text-navy-900" />
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] w-[85vw] max-w-[950px] flex flex-col !z-[1004]">
              <h1 className="mb-4 text-2xl text-navy-700 font-bold">
                Create Task
              </h1>
              {/*  Referenced Incident  */}
              <div className="flex flex-col justify-center bg-lightPrimary rounded-lg px-4 mb-3">
                <Accordion className="w-full" allowMultiple>
                  <AccordionItem className="border-b border-gray-200 py-[17px] dark:!border-white/10">
                    <h2>
                      <AccordionButton className="flex justify-between">
                        <span className="text-left font-bold text-navy-900 dark:text-white">
                          Referenced Incident
                        </span>
                        <AccordionIcon className="text-left !text-navy-900 dark:!text-white" />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      className="text-left text-medium mt-2 !text-navy-900 dark:!text-white"
                      pb={4}
                    >
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4">
                        <div className="relative flex-col my-2 sm:my-0">
                          <div className="flex items-center ">
                            <label
                              htmlFor="title"
                              className={`text-navy-700 dark:text-white font-bold ml-2`}
                            >
                              Incident ID:
                            </label>
                          </div>

                          <input
                            disabled={true}
                            id="title"
                            value={incident?.id ? incident?.id : "-"}
                            className="cursor-not-allowed relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-white dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                          />
                        </div>
                        <div className="relative flex-col my-2 sm:my-0">
                          <div className="flex items-center ">
                            <label
                              htmlFor="title"
                              className={`text-navy-700 dark:text-white font-bold ml-2`}
                            >
                              Incident Title:
                            </label>
                          </div>

                          <input
                            disabled={true}
                            id="title"
                            value={incident?.title ? incident?.title : "-"}
                            className="cursor-not-allowed relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-white dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
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
                            value={
                              incident?.location ? incident?.location : "-"
                            }
                            className="cursor-not-allowed relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-white dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                          />
                        </div>
                        <div className="relative flex-col sm:basis-1/4">
                          <div className="flex items-center ml-2">
                            <BiTimeFive fill="#1b254b" />
                            <label
                              htmlFor="date-time"
                              className={`text-navy-700 dark:text-white font-bold ml-1`}
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
                            className="cursor-not-allowed relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-white dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)] mr-3"
                          />
                        </div>
                      </div>
                    </AccordionPanel>
                  </AccordionItem>{" "}
                </Accordion>
              </div>
              {/*  Referenced Incident  */}
              <div className="my-2 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative flex-col my-2 sm:my-0">
                  <div className="flex items-center ">
                    <label
                      htmlFor="title"
                      className={`text-navy-700 dark:text-white font-bold ml-2`}
                    >
                      Task Title:
                    </label>
                  </div>

                  <input
                    id="title"
                    value={taskData.title}
                    onChange={(e) =>
                      setTaskData({
                        ...taskData,
                        title: e.target.value.toString(),
                      })
                    }
                    className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                  />
                </div>
                <div className="relative flex-col my-2 sm:my-0">
                  <div className="flex items-center ml-2">
                    <BsCalendar2Plus fill="#1b254b" />
                    <label
                      htmlFor="deadline"
                      className={`text-navy-700 dark:text-white font-bold ml-2`}
                    >
                      Deadline:
                    </label>
                  </div>

                  <input
                    type="date"
                    id="deadline"
                    value={taskData.deadline}
                    onChange={(e) =>
                      setTaskData({
                        ...taskData,
                        deadline: e.target.value.toString(),
                      })
                    }
                    className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                  />
                </div>
                <div className="relative flex-col my-2 md:my-0">
                  <div className="flex items-center ml-2">
                    <HiOutlineUsers stroke="#1b254b" />
                    <label
                      htmlFor="assigned_to"
                      className={`text-navy-700 dark:text-white font-bold ml-1`}
                    >
                      Assigned To:
                    </label>
                  </div>

                  <input
                    id="location"
                    value={incident?.location ? incident?.location : "-"}
                    className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                  />
                </div>
                <div className="relative flex-col lg:col-span-2 sm:col-span-2 md:col-span-3 my-2 md:my-0">
                  <div className="flex items-center ml-2">
                    <BsCardText fill="#1b254b" />
                    <label
                      htmlFor="description"
                      className={`text-navy-700 dark:text-white font-bold ml-2`}
                    >
                      Description:
                    </label>
                  </div>
                  <input
                    id="description"
                    value={taskData.description}
                    onChange={(e) =>
                      setTaskData({
                        ...taskData,
                        description: e.target.value.toString(),
                      })
                    }
                    className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                  />
                </div>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTaskModal;
