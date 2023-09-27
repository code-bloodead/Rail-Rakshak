import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { Select, Option } from "@material-tailwind/react";
import Card from "@/components/card";
import { MdCheckCircle, MdOutlinePostAdd } from "react-icons/md";
import { BsCardText, BsClockHistory } from "react-icons/bs";
import { getDateTime } from "@/constants/utils";
import { BiTimeFive, BiCategoryAlt } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoImages } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

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
  isViewTaskModalOpen: boolean;
  onViewTaskModalClose: () => void;
}

const ViewTaskModal = ({
  isViewTaskModalOpen,
  onViewTaskModalClose,
  task,
}: TaskModalProps) => {
  return (
    <>
      <Modal
        isOpen={isViewTaskModalOpen}
        onClose={onViewTaskModalClose}
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
            <Card extra="px-[30px] pt-[35px] pb-[40px] w-[85vw] max-w-[950px] flex flex-col !z-[1004] md-max:h-[95vh] overflow-y-auto">
              <h1 className="mb-4 text-2xl text-navy-700 dark:text-white font-bold">
                Task {task?.id}
              </h1>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewTaskModal;
