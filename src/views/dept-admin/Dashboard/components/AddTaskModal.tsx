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
import { useState, useRef } from "react";

import Card from "@/components/card";
import { BsCardText } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsCalendar2Plus } from "react-icons/bs";
import { getDateTime } from "@/constants/utils";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Admin } from "@/app/features/AdminSlice";
import { Staff } from "@/app/features/StaffSlice";
import Multiselect from "multiselect-react-dropdown";
import { IoImages, IoClose } from "react-icons/io5";
import { FiSave } from "react-icons/fi";
import { addTask } from "@/app/features/TaskSlice";

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
  const admin = useAppSelector(
    (state: { admin: { data: Admin } }) => state.admin.data
  );
  const staff = useAppSelector(
    (state: { staff: { data: Staff[] } }) => state.staff.data
  );
  const dispatch = useAppDispatch();
  const availableStaff = staff.filter((obj) => obj.status === "Available");
  const defaultImageURL =
    "https://static.toiimg.com/thumb/msid-65971726,imgsize-108452,width-400,resizemode-4/65971726.jpg";
  const [taskData, setTaskData] = useState({
    title: incident?.title || "-",
    description: incident
      ? `Around ${incident.location}, ${
          incident.description || "No description provided"
        }`
      : "No incident data available",
    assigned_to: [],
    image: incident?.image || defaultImageURL,
    deadline: "",
    assc_incident: incident?.id || "-",
    dept_name: localStorage.getItem("dept") || "-",
    station_name: admin?.station_name || "-",
  });
  const [selectedStaff, setSelectedStaff] = useState([]);
  const multiselectRef = useRef(null);

  const handleCreateTask = async () => {
    const formData = {
      title: taskData.title,
      description: taskData.description,
      assigned_to: taskData.assigned_to,
      image: taskData.image,
      deadline: taskData.deadline,
      assc_incident: taskData.assc_incident,
      dept_name: taskData.dept_name,
      station_name: taskData.station_name,
    };
    dispatch(addTask(formData));
  };

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
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] top-[2vh] sm:top-[3vh]">
          <ModalCloseButton className="right-5 top-5 absolute z-[5000] text-[#000000A0] hover:text-navy-900" />
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] w-[85vw] max-w-[950px] flex flex-col !z-[1004] md-max:h-[95vh] overflow-y-auto">
              <h1 className="mb-4 text-2xl text-navy-700 dark:text-white font-bold">
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
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-col basis-2/5 mr-2">
                  <div className="flex items-center">
                    <IoImages fill="#1b254b" />
                    <label
                      htmlFor="image"
                      className={`text-navy-700 dark:text-white font-bold ml-1`}
                    >
                      Image:
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
                    className="mt-2 rounded-xl w-full h-60"
                  />
                </div>
                <div className="basis-3/5 grid grid-cols-2 gap-2">
                  <div className="relative  flex-col my-1">
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
                  <div className="relative flex-col my-1">
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
                  <div className="relative flex-col col-span-2 my-1">
                    <div className="flex items-center ml-2">
                      <HiOutlineUsers stroke="#1b254b" />
                      <label
                        htmlFor="assigned_to"
                        className={`text-navy-700 dark:text-white font-bold ml-1`}
                      >
                        Assigned To:
                      </label>
                    </div>

                    <Multiselect
                      ref={multiselectRef}
                      className="!bg-gray-50 rounded-xl mt-2 h-full py-1 "
                      displayValue="key"
                      customArrow={{}}
                      onKeyPressFn={function noRefCheck() {}}
                      onRemove={function noRefCheck() {}}
                      onSearch={function noRefCheck() {}}
                      onSelect={() => {
                        setSelectedStaff(
                          multiselectRef?.current?.getSelectedItems()
                        );
                        setTaskData({
                          ...taskData,
                          assigned_to: multiselectRef?.current
                            ?.getSelectedItems()
                            .map((obj: { id: any }) => obj.id),
                        });
                      }}
                      options={availableStaff.map((obj) => {
                        return { key: obj.staff_name, id: obj.id };
                      })}
                      selectedValues={selectedStaff}
                      hidePlaceholder={true}
                      placeholder="Select Staff"
                      selectionLimit={3}
                      customCloseIcon={
                        <div className="ml-1">
                          <IoClose />
                        </div>
                      }
                      style={{
                        chips: {
                          background: "#D0DCFB",
                          color: "#3311DB",
                          "border-radius": "5px",
                        },
                        searchBox: {
                          border: "none",
                          "padding-left": "13px",
                        },
                      }}
                    />
                  </div>
                  <div className="relative flex-col col-span-2 my-1">
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
              </div>
              <div className="mt-5 flex justify-center gap-4 ">
                <button
                  onClick={handleCreateTask}
                  className={` flex items-center justify-center rounded-lg bg-navy-50  font-medium text-brand-600 transition duration-200
           hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 p-3`}
                >
                  <FiSave className="h-6 w-6 mr-2" /> Create Task
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTaskModal;
