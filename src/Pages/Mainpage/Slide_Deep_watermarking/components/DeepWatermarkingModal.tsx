import Modal from "../../../../Component/Modal";
import DeepWatermarking from "./DeepWatermarking";


interface DeepWatermarkingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeepWatermarkingModal: React.FC<DeepWatermarkingModalProps> = ({ isOpen, onClose }) => {
    

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 text-black dark:text-white">
                <DeepWatermarking />
            </div>
        </Modal>
    );
};

export default DeepWatermarkingModal;