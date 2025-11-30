import React from "react";
import { withSlide } from "../../../HOC/withSlide";

import { styles } from "../../../style";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { papersByYearData, watermarkingApproachesData, chartPalette } from "./data";

const Slide6withOutHOC: React.FC = () => {

    return (
        <div className={`${styles.slideContainer} `}>
            <div className={`${styles.slideContent} `}>
                {/* Header */}
                <div className="mb-8 shrink-0">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-grotesk text-6xl font-bold mb-6 text-left text-[#5F6F52] dark:text-[#D6C0B3] tracking-tight">
                            Data Overview
                        </h2>
                        <div className="w-32 h-2 bg-[#8D9F87] dark:bg-[#8D9F87] rounded-full" />
                    </motion.div>
                </div>
                
                <div className="flex-1 flex flex-row gap-8 items-center justify-center w-full h-full min-h-0">
                    {/* Bar Chart Section */}
                    <motion.div 
                        className="flex-1 h-full flex flex-col items-center bg-[#FDFCF8]/80 dark:bg-[#2A2A28]/80 rounded-2xl p-6 backdrop-blur-sm border border-[#E6E4DC] dark:border-[#444440] shadow-sm"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-[#5F6F52] dark:text-[#D6C0B3]">Distribution of Papers by Year</h3>
                        <div className="w-full h-full min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={papersByYearData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#B4A596" opacity={0.4} />
                                    <XAxis dataKey="year" stroke="#7E8D85" tick={{ fill: '#7E8D85' }} />
                                    <YAxis stroke="#7E8D85" tick={{ fill: '#7E8D85' }} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                                    />
                                    <Bar dataKey="count" name="Papers">
                                        {papersByYearData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={chartPalette[index % chartPalette.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Pie Chart Section */}
                    <motion.div 
                        className="flex-1 h-full flex flex-col items-center bg-[#FDFCF8]/80 dark:bg-[#2A2A28]/80 rounded-2xl p-6 backdrop-blur-sm border border-[#E6E4DC] dark:border-[#444440] shadow-sm"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-[#5F6F52] dark:text-[#D6C0B3]">Watermarking Approaches</h3>
                        <div className="w-full h-full min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={watermarkingApproachesData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {watermarkingApproachesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const SlideDataShown = withSlide(Slide6withOutHOC);

export default SlideDataShown;

