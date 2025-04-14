"use client";

import React, { useState, useEffect } from "react";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type LinePart = {
  content: string;
  type: "comment" | "keyword" | "function" | "string" | "operator" | "empty";
};

type Line = {
  number: number;
  content: string;
  type:
    | "comment"
    | "keyword"
    | "function"
    | "string"
    | "operator"
    | "empty"
    | "mixed";
  parts?: LinePart[];
};

export const DevSkills = () => {
  const [fontSize, setFontSize] = useState("text-xs");
  const [wrapLines, setWrapLines] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setFontSize("text-sm");
      } else if (window.innerWidth >= 768) {
        setFontSize("text-xs");
      } else {
        setFontSize("text-xs");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lines: Line[] = [
    {
      number: 1,
      content: "// Skills & Technologies Used in My Frontend Projects",
      type: "comment",
    },
    {
      number: 2,
      content: "// These are the core technologies I work with",
      type: "comment",
    },
    {
      number: 3,
      content: "// to build high-performance, scalable, and",
      type: "comment",
    },
    {
      number: 4,
      content: "// user-friendly applications across web and mobile.",
      type: "comment",
    },
    { number: 5, content: "", type: "empty" },
    {
      number: 6,
      content: "const devSkills = () => {",
      type: "mixed",
      parts: [
        { content: "const", type: "keyword" },
        { content: " ", type: "empty" },
        { content: "devSkills", type: "function" },
        { content: " ", type: "empty" },
        { content: "=", type: "operator" },
        { content: " ", type: "empty" },
        { content: "()", type: "function" },
        { content: " ", type: "empty" },
        { content: "=>", type: "keyword" },
        { content: " ", type: "empty" },
        { content: "{", type: "function" },
      ],
    },
    {
      number: 7,
      content: "   return [",
      type: "mixed",
      parts: [
        { content: "   ", type: "empty" },
        { content: "return", type: "keyword" },
        { content: " ", type: "empty" },
        { content: "[", type: "keyword" },
      ],
    },
    {
      number: 8,
      content:
        "      'JavaScript', 'TypeScript', 'React', 'Next.js', 'Electron',",
      type: "mixed",
      parts: [
        { content: "      ", type: "empty" },
        { content: "'JavaScript'", type: "string" },
        { content: ", ", type: "empty" },
        { content: "'TypeScript'", type: "string" },
        { content: ", ", type: "empty" },
        { content: "'React'", type: "string" },
        { content: ", ", type: "empty" },
        { content: "'Next.js'", type: "string" },
        { content: ", ", type: "empty" },
        { content: "'Electron'", type: "string" },
        { content: ",", type: "empty" },
      ],
    },
    {
      number: 9,
      content: "      'React Native', 'TailwindCSS', 'ShadCN/UI', 'Supabase',",
      type: "mixed",
      parts: [
        { content: "      ", type: "empty" },
        { content: "'React Native'", type: "string" },
        { content: ", ", type: "empty" },
        { content: "'TailwindCSS'", type: "string" },
        { content: ", ", type: "empty" },
        { content: "'ShadCN/UI'", type: "string" },
        { content: ", ", type: "empty" },
        { content: "'Supabase'", type: "string" },
        { content: ",", type: "empty" },
      ],
    },
    {
      number: 10,
      content: "      'Firebase', 'Git/GitHub', 'BitBucket'",
      type: "mixed",
      parts: [
        { content: "      ", type: "empty" },
        { content: "'Firebase'", type: "string" },
        { content: ", ", type: "empty" },
        { content: "'Git/GitHub'", type: "string" },
        { content: ", ", type: "empty" },
        { content: "'BitBucket'", type: "string" },
      ],
    },
    {
      number: 11,
      content: "   ];",
      type: "mixed",
      parts: [
        { content: "   ", type: "empty" },
        { content: "];", type: "keyword" },
      ],
    },
    {
      number: 12,
      content: "};",
      type: "mixed",
      parts: [{ content: "};", type: "function" }],
    },
    { number: 13, content: "", type: "empty" },
    {
      number: 14,
      content: "// Always learning and improving! 🚀",
      type: "comment",
    },
    { number: 15, content: "", type: "empty" },
  ];

  const toggleWrapLines = () => {
    setWrapLines(!wrapLines);
  };

  return (
    <div className="rounded-lg overflow-hidden h-full w-full flex flex-col col-span-2 border border-gray-700/30">
      <div className="flex items-center justify-between px-2 md:px-4 py-2 border-b border-gray-700/30 bg-gray-800/50">
        <div className="flex items-center">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-2 text-xs md:text-sm text-gray-400 truncate">
            FrontendDevSkills.tsx
          </span>
        </div>
        <button
          onClick={toggleWrapLines}
          className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
        >
          {wrapLines ? "Nowrap" : "Wrap"}
        </button>
      </div>
      <div
        className={`${jetBrainsMono.className} ${fontSize} p-2 md:p-4 overflow-auto flex-grow`}
      >
        <div className="w-full">
          {lines.map((line) => (
            <div
              key={line.number}
              className="flex items-start hover:bg-gray-800/50 group"
            >
              <div className="text-gray-500 w-6 md:w-8 mr-2 md:mr-4 text-right select-none flex-shrink-0 opacity-60 group-hover:opacity-100">
                {line.number.toString().padStart(2, "0")}
              </div>
              <div className={`flex-1 ${wrapLines ? "" : "overflow-x-auto"}`}>
                {line.type === "mixed" && line.parts ? (
                  <div
                    className={
                      wrapLines
                        ? "break-words whitespace-pre-wrap"
                        : "whitespace-pre"
                    }
                  >
                    {line.parts.map((part, index) => (
                      <span
                        key={index}
                        className={
                          part.type === "comment"
                            ? "text-gray-500"
                            : part.type === "keyword"
                            ? "text-purple-400"
                            : part.type === "function"
                            ? "text-yellow-300"
                            : part.type === "string"
                            ? "text-green-400"
                            : part.type === "operator"
                            ? "text-red-400"
                            : "text-gray-300"
                        }
                      >
                        {part.content}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div
                    className={`${
                      wrapLines
                        ? "break-words whitespace-pre-wrap"
                        : "whitespace-pre"
                    } ${
                      line.type === "comment"
                        ? "text-gray-500"
                        : line.type === "keyword"
                        ? "text-purple-400"
                        : line.type === "function"
                        ? "text-yellow-300"
                        : line.type === "string"
                        ? "text-green-400"
                        : line.type === "operator"
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    {line.content}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevSkills;
