import Modal from "../../../Component/Modal";
import DWTLab from "./components/DWTLab";
interface DWTModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DWTModal: React.FC<DWTModalProps> = ({ isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="h-full flex flex-col bg-gray-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 overflow-hidden">
                <DWTLab />
            </div>
        </Modal>
    )
}

export default DWTModal;
