import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";

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
import Upload from "../upload/Upload";

interface NewTaskModalProps {
  isNewTaskModalOpen: boolean;
  onNewTaskModalClose: () => void;
}

const NewTaskModal = ({
  isNewTaskModalOpen,
  onNewTaskModalClose,
}: NewTaskModalProps) => {
  const admin = useAppSelector(
    (state: { admin: { data: Admin } }) => state.admin.data
  );
  const staff = useAppSelector(
    (state: { staff: { data: Staff[] } }) => state.staff.data
  );
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const availableStaff = staff.filter((obj) => obj.status === "Available");
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assigned_to: [],
    image: "",
    deadline: "",
    assc_incident: "",
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
    onNewTaskModalClose();
  };

  return (
    <>
      <Modal
        isOpen={isNewTaskModalOpen}
        onClose={onNewTaskModalClose}
        size="xl"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay
          className="bg-[#000000A0] !z-[1001]]"
          backdropFilter="blur(10px)"
        />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] ">
          <ModalCloseButton className="right-5 top-5 absolute z-[5000] text-[#000000A0] hover:text-navy-900 " />
          <ModalBody>
            <Card
              extra={`px-[30px] pt-[35px] pb-[40px] max-w-[950px] flex flex-col !z-[1004]  overflow-y-auto overflow-x-hidden md:overflow-y-hidden w-[85vw] md:w-[75vw] lg:w-[65vw] md-max:h-[90vh] sm:max-h-[90vh]
              `}
            >
              <h1 className="mb-4 text-2xl text-navy-700 dark:text-white font-bold">
                Create Task
              </h1>

              <div className="grid grid-cols-5 gap-2">
                <div className={`col-span-5 grid grid-cols-2 gap-2`}>
                  <div className="relative  flex-col my-2 col-span-2 md:col-span-1">
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
                      placeholder="Enter Task Title"
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
                  <div className="relative flex-col my-2 col-span-2 md:col-span-1">
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
                      min={new Date().toISOString().split("T")[0]}
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
                      placeholder="Enter Task Description"
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

              <div className="">
                <Upload setImage={setImage} />
              </div>

              <div className="mt-8 md:mt-5 flex justify-center gap-4 ">
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

export default NewTaskModal;
