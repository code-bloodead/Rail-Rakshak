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
import avatar from "@/assets/img/defaultAvatar.jpg";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import Card from "@/components/card";
import { MdCheckCircle } from "react-icons/md";
import { BsCalendar2Plus, BsCardText, BsClockHistory } from "react-icons/bs";
import { getDate, getDateTime } from "@/constants/utils";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoClose, IoImages } from "react-icons/io5";
import { FaTrash, FaUserClock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Incident } from "@/app/features/IncidentSlice";
import { HiOutlineUsers } from "react-icons/hi2";
import { Staff } from "@/app/features/StaffSlice";
import { deleteTask, editTask } from "@/app/features/TaskSlice";
import { FiSave } from "react-icons/fi";
import { Admin } from "@/app/features/AdminSlice";
import { Select, Option } from "@material-tailwind/react";
import Multiselect from "multiselect-react-dropdown";

type Task = {
  id?: string;
  title: string;
  description: string;
  assigned_to: string[];
  image: string;
  created_at?: Date;
  deadline: string;
  status?: string;
  assc_incident: string;
  dept_name: string;
  station_name: string;
  actions?: string | undefined;
};

interface TaskModalProps {
  task: Task;
  edit: boolean;
  isViewTaskModalOpen: boolean;
  onViewTaskModalClose: () => void;
}

const ViewTaskModal = ({
  isViewTaskModalOpen,
  onViewTaskModalClose,
  task,
  edit,
}: TaskModalProps) => {
  const [refIncident, setRefIncident] = useState<Incident | null>(null);
  const [staffNames, setStaffNames] = useState<string[]>([]);

  const multiselectRef = useRef(null);

  const dispatch = useAppDispatch();
  const hasImage = task?.image !== "";
  const incidents = useAppSelector(
    (state: { incidents: { data: Incident[] } }) => state.incidents.data
  );
  const admin = useAppSelector(
    (state: { admin: { data: Admin } }) => state.admin.data
  );
  const staff = useAppSelector(
    (state: { staff: { data: Staff[] } }) => state.staff.data
  );

  const availableStaff = staff.filter((obj) => obj.status === "Available");

  useEffect(() => {
    if (task.assc_incident !== "") {
      const incident = incidents.find(
        (incident: { id: string }) => incident.id === task.assc_incident
      );
      if (incident) {
        setRefIncident(incident);
      } else {
        setRefIncident(null);
      }
    }
  }, [task?.assc_incident, incidents]);

  const [taskData, setTaskData] = useState({
    title: task?.title || "-",
    description: task?.description || "-",
    assigned_to: [...task?.assigned_to] || [],
    image: task?.image || "",
    deadline: task?.deadline || "-",
    status: task?.status || "-",
    assc_incident: task?.assc_incident || "-",
    dept_name: localStorage.getItem("dept") || "-",
    station_name: admin?.station_name || "-",
  });

  const [selectedStaff, setSelectedStaff] = useState([]);

  useEffect(() => {
    setTaskData({
      title: task?.title || "-",
      description: task?.description || "-",
      assigned_to: [...task?.assigned_to] || [],
      image: task?.image || "",
      deadline: task?.deadline || "-",
      status: task?.status || "-",
      assc_incident: task?.assc_incident || "-",
      dept_name: localStorage.getItem("dept") || "-",
      station_name: admin?.station_name || "-",
    });
    setSelectedStaff([]);
    //
  }, [task]);

  useEffect(() => {
    if (task?.assigned_to.length > 0) {
      const staffNames = staff
        .filter((staff: { id: string }) => task.assigned_to.includes(staff.id))
        .map((staff: { staff_name: string }) => staff.staff_name);
      setStaffNames(staffNames);
      setSelectedStaff([
        ...task.assigned_to.map((id: string) => {
          const tempStaff = staff.find((obj: { id: string }) => obj.id === id);
          return { key: tempStaff?.staff_name, id: tempStaff?.id };
        }),
      ]);
    }
  }, [task, staff]);

  const handleSave = async () => {
    const formData = {
      id: task.id,
      title: taskData.title,
      description: taskData.description,
      assigned_to: taskData.assigned_to,
      image: taskData.image,
      deadline: taskData.deadline,
      status: taskData.status,
      assc_incident: taskData.assc_incident,
      dept_name: taskData.dept_name,
      station_name: taskData.station_name,
    };
    console.log(formData);
    await dispatch(editTask(formData));
    onViewTaskModalClose();
  };

  const handleDelete = (task: Task) => {
    dispatch(deleteTask({ id: task.id }));
    onViewTaskModalClose();
  };

  return (
    <>
      <Modal
        isOpen={isViewTaskModalOpen}
        onClose={() => {
          onViewTaskModalClose();
        }}
        size="xl"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay
          className="bg-[#000000A0] !z-[1001]]"
          backdropFilter="blur(10px)"
        />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] ">
          <ModalCloseButton className="right-5 top-5 absolute z-[5000] text-[#000000A0] hover:text-navy-900" />
          <ModalBody>
            <Card
              extra={`px-[30px] pt-[35px] pb-[40px] ${
                hasImage
                  ? "w-[85vw] md-max:h-[95vh]"
                  : "w-[85vw] md:w-[75vw] lg:w-[65vw] md-max:h-[90vh]"
              }  max-w-[950px] flex flex-col !z-[1004]  overflow-y-auto overflow-x-hidden`}
            >
              <h1
                className={`mb-4 text-2xl text-navy-700 dark:text-white font-bold ${
                  !hasImage && "text-center mb-6"
                }`}
              >
                Task {task?.id}
              </h1>

              {/* Referenced Incident */}
              {refIncident && (
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
                        <div
                          className={`mt-4 grid grid-cols-1  ${
                            hasImage ? "md:grid-cols-4" : "md:grid-cols-2"
                          } sm:grid-cols-2 gap-4`}
                        >
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
                              value={refIncident?.id ? refIncident?.id : "-"}
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
                              value={
                                refIncident?.title ? refIncident?.title : "-"
                              }
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
                                refIncident?.location
                                  ? refIncident?.location
                                  : "-"
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
                                refIncident?.created_at
                                  ? getDateTime(
                                      refIncident?.created_at.toString()
                                    )
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
              )}

              {/* Task Detail */}

              <div className="grid grid-cols-5 gap-2">
                {hasImage && (
                  <div
                    className={`flex-col col-span-5 md:col-span-2 mr-2 order-2 md:order-none`}
                  >
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
                        task?.image === ""
                          ? "https://static.toiimg.com/thumb/msid-65971726,imgsize-108452,width-400,resizemode-4/65971726.jpg"
                          : task?.image
                      }
                      alt="Evidence"
                      className="mt-2 rounded-xl md:w-full h-60 w-60"
                    />
                  </div>
                )}

                <div
                  className={`${
                    hasImage ? "col-span-5 md:col-span-3" : "col-span-5"
                  }  grid grid-cols-2 gap-2`}
                >
                  <div className="relative flex-col my-1 sm-max:col-span-2">
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
                      disabled={!edit}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTaskData({
                          ...taskData,
                          title: e.target.value.toString(),
                        })
                      }
                      value={taskData?.title ? taskData?.title : "-"}
                      className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                    />
                  </div>
                  <div className="relative flex-col my-1 sm-max:col-span-2">
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
                      id="deadline"
                      type={`${edit ? "date" : "text"}`}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTaskData({
                          ...taskData,
                          deadline: getDate(e.target.value.toString()),
                        })
                      }
                      value={
                        edit
                          ? taskData?.deadline !== "-"
                            ? new Date(taskData?.deadline)
                                .toISOString()
                                .split("T")[0]
                            : ""
                          : taskData?.deadline
                      }
                      disabled={!edit}
                      className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                    />
                  </div>
                  <div className="relative flex-col sm-max:col-span-2 pt-2">
                    <div className="flex items-center ml-2">
                      <HiOutlineUsers stroke="#1b254b" />
                      <label
                        htmlFor="assigned_to"
                        className={`text-navy-700 dark:text-white font-bold ml-1`}
                      >
                        Assigned To:
                      </label>
                    </div>
                    {edit ? (
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
                        options={availableStaff.map(
                          (obj: { staff_name: string; id: string }) => {
                            return { key: obj.staff_name, id: obj.id };
                          }
                        )}
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
                    ) : (
                      <div className="flex flex-row relative mt-2 h-12 w-full items-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)] mr-3 ">
                        {staffNames.length > 0 ? (
                          staffNames.map((staffName) => (
                            <div className="flex  flex-row rounded-lg  p-2 items-center space-x-2">
                              <div className="h-[30px] w-[30px] rounded-full">
                                <img
                                  src={avatar}
                                  className="h-full w-full rounded-full"
                                  alt="."
                                />
                              </div>
                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                {staffName},
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm mx-auto text-navy-700 dark:text-white">
                            -
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="relative flex-col my-2 sm-max:col-span-2">
                    <label
                      htmlFor="status"
                      className={`text-navy-700 dark:text-white font-bold ml-2`}
                    >
                      Status:
                    </label>
                    {edit ? (
                      <Select
                        id="status"
                        // onChange={(e) => console.log(e)}
                        value={taskData?.status}
                        className=" relative mt-2 flex h-12 w-full items-center justify-start rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                      >
                        <Option
                          key="Unassigned"
                          value="Unassigned"
                          onClick={() =>
                            setTaskData({ ...taskData, status: "Unassigned" })
                          }
                        >
                          <BsClockHistory className="me-2 text-amber-500 dark:text-amber-300 inline" />{" "}
                          Unassigned
                        </Option>
                        <hr />
                        <Option
                          key="Assigned"
                          className="mt-3"
                          value="Assigned"
                          onClick={() =>
                            setTaskData({ ...taskData, status: "Assigned" })
                          }
                        >
                          <FaUserClock className="me-2 text-teal-500 dark:text-teal-300 inline" />{" "}
                          Assigned
                        </Option>
                        <hr />
                        <Option
                          key="Completed"
                          value="Completed"
                          className="mt-3"
                          onClick={() =>
                            setTaskData({ ...taskData, status: "Completed" })
                          }
                        >
                          <MdCheckCircle className="me-2 text-green-500 dark:text-green-300 inline" />{" "}
                          Completed
                        </Option>
                      </Select>
                    ) : (
                      <div className="flex items-center">
                        <p className="relative mt-2 flex h-12 w-full items-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)] mr-3">
                          {task.status === "Completed" ? (
                            <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
                          ) : task.status === "Assigned" ? (
                            <FaUserClock className="me-1 text-teal-500 dark:text-teal-300" />
                          ) : (
                            <BsClockHistory className="me-1 text-amber-500 dark:text-amber-300" />
                          )}

                          {task?.status}
                        </p>
                      </div>
                    )}
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
                      value={task?.description ? task?.description : "-"}
                      disabled={!edit}
                      className=" relative mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-50 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center gap-4 ">
                {edit && (
                  <button
                    onClick={handleSave}
                    className={` flex items-center justify-center rounded-lg bg-navy-50  font-medium text-brand-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 p-3`}
                  >
                    <FiSave className="h-6 w-6 mr-2" /> Save
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task)}
                  className={` flex items-center justify-center rounded-lg bg-navy-50  font-medium text-brand-600 transition duration-200
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

export default ViewTaskModal;
