"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Users, RefreshCw, Plus } from "lucide-react";

import { Term } from "@/app/_lib/_const/services";

interface TermsOverviewProps {
  terms: Term[];
}

export const TermsOverview: React.FC<TermsOverviewProps> = ({ terms }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return Users;
      case "revision":
        return RefreshCw;
      case "additional":
        return Plus;
      default:
        return Check;
    }
  };

  return (
    <div className="space-y-3 flex-1">
      {terms.map((term, index) => {
        const Icon = getIcon(term.type);

        return (
          <motion.div
            key={term.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg bg-gray-900/20 border border-gray-800/30"
          >
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Icon className="size-3 text-blue-400" />
              {term.isIncluded ? (
                <Check className="size-3 text-green-400" />
              ) : (
                <X className="size-3 text-red-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium text-xs mb-1">
                {term.title}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                {term.description}
              </p>
              {!term.isIncluded && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-red-500/10 text-red-300 text-xs rounded-full border border-red-500/20">
                  Additional Charges Apply
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
