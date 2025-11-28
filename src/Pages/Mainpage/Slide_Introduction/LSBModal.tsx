import Modal from "../../../Component/Modal";
import { useState } from "react";
import { 
    Binary, 
    RefreshCw, 
    Eye, 
    EyeOff, 
} from "lucide-react";
import { motion } from "motion/react";

// Helper to get binary string
const toBinary = (num: number) => num.toString(2).padStart(8, '0');

interface LSBModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LSBModal: React.FC<LSBModalProps> = ({ isOpen, onClose }) => {
    

    // --- LSB State ---
    const [pixels, setPixels] = useState<number[]>(() => Array.from({ length: 16 }, () => Math.floor(Math.random() * 50) + 100));
    const [selectedPixelIdx, setSelectedPixelIdx] = useState<number | null>(0);
    const [embedChar, setEmbedChar] = useState<string>("A");
    const [isEmbedded, setIsEmbedded] = useState(false);
    const [showDiff, setShowDiff] = useState(false);
    
    // Embed Logic
    const handleEmbed = () => {
        if (!embedChar) return;
        const charCode = embedChar.charCodeAt(0);
        const charBinary = toBinary(charCode);
        const newPixels = [...pixels];
        for (let i = 0; i < 8; i++) {
            const bit = parseInt(charBinary[i]);
            newPixels[i] = (newPixels[i] & ~1) | bit;
        }
        setPixels(newPixels);
        setIsEmbedded(true);
        setSelectedPixelIdx(0);
    };

    const handleResetLSB = () => {
        setPixels(Array.from({ length: 16 }, () => Math.floor(Math.random() * 50) + 100));
        setIsEmbedded(false);
        setShowDiff(false);
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 text-black dark:text-white">
                <div className="h-full flex flex-col p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                            <Binary size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">Spatial Domain: LSB</h3>
                            <p className="text-gray-500 dark:text-gray-400">Least Significant Bit Substitution</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
                        <div className="flex gap-6 items-start">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Image Patch</span>
                                <div className="grid grid-cols-4 gap-1 p-2 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 w-fit">
                                    {pixels.map((val, idx) => {
                                        const isTarget = idx < 8;
                                        const isSelected = selectedPixelIdx === idx;
                                        const diffColor = isTarget && isEmbedded && showDiff ? 'rgba(59, 130, 246, 0.5)' : `rgb(${val}, ${val}, ${val})`;
                                        return (
                                            <motion.div
                                                key={idx}
                                                onClick={() => setSelectedPixelIdx(idx)}
                                                className={`w-12 h-12 rounded cursor-pointer relative overflow-hidden ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-zinc-900' : ''}`}
                                                style={{ backgroundColor: diffColor }}
                                                whileHover={{ scale: 1.1 }}
                                                layout
                                            >
                                                {isTarget && isEmbedded && (
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 text-white text-[10px] font-mono transition-opacity">
                                                        {toBinary(val).slice(-1)}
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Embed Character</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            maxLength={1}
                                            value={embedChar}
                                            onChange={(e) => { setEmbedChar(e.target.value.toUpperCase()); setIsEmbedded(false); }}
                                            className="w-12 h-10 text-center font-mono font-bold text-lg border rounded bg-gray-50 dark:bg-zinc-800 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                        <div className="flex-1 flex items-center px-3 bg-gray-50 dark:bg-zinc-800 rounded border border-gray-200 dark:border-zinc-700 font-mono text-sm text-gray-500">
                                            {embedChar ? toBinary(embedChar.charCodeAt(0)) : "--------"}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={handleEmbed} disabled={!embedChar || isEmbedded} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium">
                                        {isEmbedded ? "Embedded!" : "Embed"}
                                    </button>
                                    <button onClick={handleResetLSB} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">
                                        <RefreshCw size={18} />
                                    </button>
                                </div>
                                {isEmbedded && (
                                    <button onClick={() => setShowDiff(!showDiff)} className={`flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium border transition-colors ${showDiff ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200 text-gray-500'}`}>
                                        {showDiff ? <EyeOff size={14} /> : <Eye size={14} />}
                                        {showDiff ? "Hide Changes" : "Show Changes"}
                                    </button>
                                )}
                            </div>
                        </div>

                        {selectedPixelIdx !== null && (
                            <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-700 flex items-center gap-4 shadow-sm">
                                <div className="w-12 h-12 rounded shadow-inner border border-gray-200 dark:border-zinc-700" style={{ backgroundColor: `rgb(${pixels[selectedPixelIdx]}, ${pixels[selectedPixelIdx]}, ${pixels[selectedPixelIdx]})` }} />
                                <div className="flex-1">
                                    <div className="flex gap-1 mb-1">
                                        {toBinary(pixels[selectedPixelIdx]).split('').map((bit, i) => (
                                            <div key={i} className={`w-6 h-8 flex items-center justify-center rounded border-b-2 text-sm font-mono font-bold ${i === 7 ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-400'}`}>{bit}</div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-gray-400">LSB modification is invisible to the human eye.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LSBModal;