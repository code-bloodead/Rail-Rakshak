import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import Card from "@/components/card";

interface ViewIncidentModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ViewIncidentModal = ({
  isOpen,
  onOpen,
  onClose,
}: ViewIncidentModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay
          className="bg-[#000000A0] !z-[1001]]"
          backdropFilter="blur(10px)"
        />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[12vh]">
          <ModalCloseButton className="right-5 top-5 absolute z-[5000] text-[#000000A0] hover:text-[#000]" />
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[450px] flex flex-col !z-[1004]">
              <h1 className="mb-[20px] text-2xl font-bold">Modal Title</h1>
              <p className="mb-[20px]">
                A modal is a type of modal window with critical information
                which disable all app functionality when they appear and remains
                on screen until confirmed/dismissed.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Close
                </button>
                <button className="linear text-navy-700 rounded-xl bg-gray-100 px-5 py-3 text-base font-medium transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
                  Secondary
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewIncidentModal;
