"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Service } from "@/app/_lib/_const/services";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-xl border border-gray-800/50 bg-gradient-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm p-6 flex flex-col h-full hover:border-gray-700/50 hover:from-gray-900/60 hover:to-gray-900/40 transition-all duration-300"
    >
      {/* Icon and Title */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-2xl">{service.icon}</div>
        <div>
          <h3 className="text-white font-semibold text-base">
            {service.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {service.description}
      </p>

      {/* Features */}
      <div className="flex-1">
        <div className="space-y-2">
          {service.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Check className="size-3 text-green-400 flex-shrink-0" />
              <span className="text-gray-300 text-xs">{feature}</span>
            </div>
          ))}
          {service.features.length > 3 && (
            <div className="flex items-center space-x-2">
              <div className="size-3 flex-shrink-0" />
              <span className="text-gray-500 text-xs">
                +{service.features.length - 3} more features
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
