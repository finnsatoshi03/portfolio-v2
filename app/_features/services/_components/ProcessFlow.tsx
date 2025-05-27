"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { PROCESS_STEPS } from "@/app/_lib/_const/services";

export const ProcessFlow: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {PROCESS_STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center space-y-3 flex-1"
              >
                <div className="relative">
                  <div className="size-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30 hover:border-blue-500/50 transition-colors duration-300">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 size-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {step.id}
                  </div>
                </div>
                <div className="text-center max-w-[120px]">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {index < PROCESS_STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="flex items-center justify-center px-4"
                >
                  <ArrowRight className="size-5 text-blue-400/60" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="relative flex-shrink-0">
                <div className="size-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <span className="text-lg">{step.icon}</span>
                </div>
                <div className="absolute -top-1 -right-1 size-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {step.id}
                </div>
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-blue-500/40 to-transparent"></div>
                )}
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-white font-semibold text-sm mb-1">
                  {step.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
