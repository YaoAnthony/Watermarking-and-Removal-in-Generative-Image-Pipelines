import React from "react";
import Modal from "../../../../Component/Modal";
import { CheckCircle2, XCircle, Tag } from "lucide-react";

export interface NetworkDetailData {
    title: string;
    representatives: string[];
    pros: string[];
    cons: string[];
}

interface NetworkDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: NetworkDetailData | null;
}

const NetworkDetailsModal: React.FC<NetworkDetailsModalProps> = ({ isOpen, onClose, data }) => {
    if (!data) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-8 max-w-4xl w-full mx-auto text-gray-900 dark:text-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    {data.title}
                </h2>

                <div className="space-y-8">
                    {/* Representatives Section */}
                    <div className="bg-gray-50 dark:bg-zinc-800/50 p-5 rounded-xl border border-gray-100 dark:border-zinc-700">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                            <Tag className="w-5 h-5" />
                            Representative Works
                        </h3>
                        <ul className="flex flex-wrap gap-2">
                            {data.representatives.map((item, index) => (
                                <li key={index} className="px-3 py-1 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-full text-sm font-medium shadow-sm">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pros Section */}
                        <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-100 dark:border-green-900/30">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                                <CheckCircle2 className="w-5 h-5" />
                                Advantages
                            </h3>
                            <ul className="space-y-3">
                                {data.pros.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Cons Section */}
                        <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-100 dark:border-red-900/30">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-700 dark:text-red-400">
                                <XCircle className="w-5 h-5" />
                                Disadvantages
                            </h3>
                            <ul className="space-y-3">
                                {data.cons.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default NetworkDetailsModal;
