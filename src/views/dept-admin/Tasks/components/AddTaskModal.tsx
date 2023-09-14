import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem quos
          perspiciatis corrupti provident voluptatem quasi aperiam nemo tempora
          voluptates illum repellendus atque voluptatibus magnam amet accusamus,
          sunt cumque deleniti eveniet?
        </ModalBody>

        <ModalFooter>
          <button className="mr-3" onClick={() => onClose()}>
            Close
          </button>
          <button>Secondary Action</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
