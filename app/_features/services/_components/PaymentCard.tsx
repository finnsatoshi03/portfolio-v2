"use client";

import React from "react";
import { motion } from "framer-motion";
import { CreditCard, GraduationCap, Check } from "lucide-react";

import { PaymentOption } from "@/app/_lib/_const/services";

interface PaymentCardProps {
  option: PaymentOption;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ option }) => {
  const Icon = option.type === "student" ? GraduationCap : CreditCard;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-gray-800/30 rounded-lg p-4 bg-gray-900/20 hover:bg-gray-900/40 transition-all duration-300"
    >
      <div className="flex space-x-3 mb-3">
        <Icon
          className={`size-4 ${
            option.type === "student" ? "text-blue-400" : "text-green-400"
          }`}
        />
        <div>
          <h4 className="text-white font-medium text-sm">{option.title}</h4>
          <p className="text-gray-400 text-xs">{option.description}</p>
        </div>
      </div>

      <div className="space-y-1.5">
        {option.features.slice(0, 3).map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Check className="size-2.5 text-green-400 flex-shrink-0" />
            <span className="text-gray-300 text-xs">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
