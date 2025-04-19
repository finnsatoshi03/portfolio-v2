"use client";

import React, { useState, useEffect, useRef } from "react";
import { JetBrains_Mono } from "next/font/google";
import { GitBranch, GitMerge, GitPullRequest, WrapText } from "lucide-react";
import { useAnimationControl } from "@/app/_hooks/useAnimationControl";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Developer = "M3RK" | "Ego";

interface EditingState {
  line: number | null;
  text: string;
  complete: boolean;
}

interface CursorPosition {
  line: number | null;
  position: number;
}

interface SuggestionState {
  active: boolean;
  line: number | null;
  position: number;
  options: string[];
}

export const CollaborativeCoding: React.FC = () => {
  // Use animation control hook
  const { isAnimating, ref: animationRef } =
    useAnimationControl<HTMLDivElement>({
      threshold: 0.3,
      deactivationDelay: 200,
    });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [wordWrap, setWordWrap] = useState<boolean>(false);
  const [codeLines, setCodeLines] = useState<string[]>([
    "function calculatePrice(items: { price: number }[], discountCode: string): number {",
    "  // Calculate the base total",
    "  const total = items",
    "    .map(item => item.price)",
    "    .reduce((sum, price) => sum + price, 0);",
    "",
    "  // TODO: Implement discount logic",
    "",
    "  return total;",
    "}",
  ]);
  const [highlightedLines, setHighlightedLines] = useState<
    Record<Developer, number | null>
  >({
    M3RK: null,
    Ego: null,
  });
  const [editing, setEditing] = useState<Record<Developer, EditingState>>({
    M3RK: { line: null, text: "", complete: false },
    Ego: { line: null, text: "", complete: false },
  });
  const [actionLabels, setActionLabels] = useState<Record<Developer, string>>({
    M3RK: "",
    Ego: "",
  });
  const [cursors, setCursors] = useState<Record<Developer, CursorPosition>>({
    M3RK: { line: null, position: 0 },
    Ego: { line: null, position: 0 },
  });
  const [suggestions, setSuggestions] = useState<SuggestionState>({
    active: false,
    line: null,
    position: 0,
    options: [],
  });

  const codeRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Record<number, HTMLTableRowElement | null>>({});
  const [changedLines, setChangedLines] = useState<number[]>([]);

  // Toggle word wrap
  const toggleWordWrap = (): void => {
    setWordWrap(!wordWrap);
  };

  // Scroll to specific line
  // Function to scroll to specific line WITHIN the component
  const scrollToLine = (lineNum: number): void => {
    if (codeRef.current && lineRefs.current[lineNum]) {
      const lineElement = lineRefs.current[lineNum];
      const codeContainer = codeRef.current.querySelector(".overflow-auto");

      if (lineElement && codeContainer) {
        // Calculate the position within the scrollable container
        const containerRect = codeContainer.getBoundingClientRect();
        const lineRect = lineElement.getBoundingClientRect();

        // Calculate the scroll position to center the line in the container
        const scrollTop =
          lineRect.top -
          containerRect.top -
          containerRect.height / 2 +
          lineElement.offsetHeight / 2;

        // Scroll the container, not the page
        codeContainer.scrollTop = scrollTop;
      }
    }
  };

  // Animation sequence
  useEffect(() => {
    // Don't run animations if component is not visible or window is not focused
    if (!isAnimating) return;

    const animationSteps: (() => void)[] = [
      // Step 0: Initial browsing
      () => {
        // M3RK browsing at top part of the code
        setCursors((prev) => ({
          ...prev,
          M3RK: { line: 2, position: 10 },
        }));
        setActionLabels((prev) => ({ ...prev, M3RK: "Reading" }));

        // Ego browsing the bottom part
        setCursors((prev) => ({
          ...prev,
          Ego: { line: 8, position: 5 },
        }));
        setActionLabels((prev) => ({ ...prev, Ego: "Reading" }));

        setTimeout(() => {
          // M3RK moves cursor
          animateCursor("M3RK", 2, 25, () => {
            animateCursor("M3RK", 3, 15, () => {
              animateCursor("M3RK", 4, 20);
            });
          });

          // Ego moves to return statement
          animateCursor("Ego", 8, 12, () => {
            setCurrentStep(1);
          });
        }, 1000);
      },
      // Step 1: M3RK finds the TODO and highlights it, Ego starts editing return
      () => {
        // M3RK highlights TODO
        setHighlightedLines((prev) => ({ ...prev, M3RK: 6 }));
        setActionLabels((prev) => ({ ...prev, M3RK: "Highlighting" }));
        setCursors((prev) => ({ ...prev, M3RK: { line: 6, position: 0 } }));
        scrollToLine(6);

        // Ego starts editing return statement
        setEditing((prev) => ({
          ...prev,
          Ego: { line: 8, text: "  return total;", complete: false },
        }));
        setCursors((prev) => ({ ...prev, Ego: { line: 8, position: 12 } }));
        setActionLabels((prev) => ({ ...prev, Ego: "Editing" }));
        scrollToLine(8);

        setTimeout(() => {
          // Ego modifies return statement
          simulateDeleting("Ego", 8, "  return total;", "  return ", () => {
            typeCode(
              "  return total * 0.9; // Apply 10% discount",
              8,
              "Ego",
              () => {
                addChangedLine(8);
                setCurrentStep(2);
              },
              true
            );
          });
        }, 1500);
      },
      // Step 2: M3RK adds comment while Ego reviews their work
      () => {
        // M3RK starts adding comment at TODO line
        setHighlightedLines((prev) => ({ ...prev, M3RK: null }));
        setEditing((prev) => ({
          ...prev,
          M3RK: {
            line: 6,
            text: "  // Implementing dynamic discount logic",
            complete: false,
          },
        }));
        setCursors((prev) => ({ ...prev, M3RK: { line: 6, position: 33 } }));
        setActionLabels((prev) => ({ ...prev, M3RK: "Editing" }));
        scrollToLine(6);

        // Ego reviews their change
        setEditing((prev) => ({
          ...prev,
          Ego: { line: null, text: "", complete: false },
        }));
        setHighlightedLines((prev) => ({ ...prev, Ego: 8 }));
        setCursors((prev) => ({ ...prev, Ego: { line: 8, position: 0 } }));
        setActionLabels((prev) => ({ ...prev, Ego: "Reviewing" }));
        scrollToLine(8);

        setTimeout(() => {
          // M3RK modifies the TODO comment
          simulateDeleting(
            "M3RK",
            6,
            "  // Implementing dynamic discount logic",
            "  // ",
            () => {
              typeCode(
                "  // Implementing dynamic discount logic",
                6,
                "M3RK",
                () => {
                  addChangedLine(6);

                  // Show autocomplete suggestion for M3RK
                  setSuggestions({
                    active: true,
                    line: 7,
                    position: 0,
                    options: ["const", "let", "var", "function"],
                  });
                  setCursors((prev) => ({
                    ...prev,
                    M3RK: { line: 7, position: 0 },
                  }));
                  setEditing((prev) => ({
                    ...prev,
                    M3RK: { line: 7, text: "", complete: false },
                  }));
                  scrollToLine(7);

                  setTimeout(() => {
                    setSuggestions({
                      active: false,
                      line: null,
                      position: 0,
                      options: [],
                    });
                    typeCode("  const discounts = {", 7, "M3RK", () => {
                      addChangedLine(7);
                      setCurrentStep(3);
                    });
                  }, 1000);
                }
              );
            }
          );

          // Ego moves cursor in their line and actively reviews with highlighting
          setTimeout(() => {
            animateCursor("Ego", 8, 31, () => {
              // Enhanced "Ego reviewing" with more visible action
              setHighlightedLines((prev) => ({ ...prev, Ego: null }));
              setTimeout(() => {
                setHighlightedLines((prev) => ({ ...prev, Ego: 8 }));
                setTimeout(() => {
                  animateCursor("Ego", 8, 18);
                }, 300);
              }, 300);
            });
          }, 800);
        }, 1500);
      },
      // Step 3: Both working simultaneously - M3RK adding discount map, Ego fixing return statement
      () => {
        // Ego starts editing return statement again
        setHighlightedLines((prev) => ({ ...prev, Ego: null }));
        setEditing((prev) => ({
          ...prev,
          Ego: {
            line: 8,
            text: "  return total * 0.9; // Apply 10% discount",
            complete: false,
          },
        }));
        setCursors((prev) => ({ ...prev, Ego: { line: 8, position: 18 } }));
        scrollToLine(8);

        // M3RK continues filling in discount object
        setEditing((prev) => ({
          ...prev,
          M3RK: { line: 8, text: "", complete: false },
        }));
        setCursors((prev) => ({ ...prev, M3RK: { line: 8, position: 0 } }));

        setTimeout(() => {
          // M3RK adds SUMMER discount
          typeCode("    'SUMMER': 0.2,", 8, "M3RK", () => {
            // Add WELCOME discount after SUMMER
            typeCode("    'WELCOME': 0.1", 9, "M3RK", () => {
              // Add closing brace
              typeCode("  };", 10, "M3RK", () => {
                // Add discount variable
                typeCode(
                  "  const discount = discounts[discountCode] || 0;",
                  12,
                  "M3RK",
                  () => {
                    addChangedLine(8, 9, 10, 12);

                    // Now M3RK moves to edit the return statement
                    setTimeout(() => {
                      // M3RK tries to edit the return statement
                      setEditing((prev) => ({
                        ...prev,
                        M3RK: { line: 14, text: "", complete: false },
                      }));
                      setCursors((prev) => ({
                        ...prev,
                        M3RK: { line: 14, position: 0 },
                      }));
                      setActionLabels((prev) => ({
                        ...prev,
                        M3RK: "Editing return",
                      }));
                      scrollToLine(14);

                      // Ego is already editing the return statement
                      setEditing((prev) => ({
                        ...prev,
                        Ego: {
                          line: 14,
                          text: "  return total * (1 - discount);",
                          complete: false,
                        },
                      }));
                      setCursors((prev) => ({
                        ...prev,
                        Ego: { line: 14, position: 30 },
                      }));
                      setActionLabels((prev) => ({
                        ...prev,
                        Ego: "Editing return",
                      }));

                      // Signal overlap issue
                      setTimeout(() => {
                        setActionLabels((prev) => ({
                          ...prev,
                          M3RK: "Merge conflict!",
                          Ego: "Merge conflict!",
                        }));
                        setHighlightedLines({ M3RK: 14, Ego: 14 });

                        setTimeout(() => {
                          setCurrentStep(4);
                        }, 1000);
                      }, 1000);
                    }, 1000);
                  }
                );
              });
            });
          });

          // Ego modifies return statement to be more dynamic
          simulateDeleting(
            "Ego",
            8,
            "  return total * 0.9; // Apply 10% discount",
            "  return total * ",
            () => {
              typeCode(
                "  return total * (1 - discount);",
                8,
                "Ego",
                () => {
                  addChangedLine(8);
                },
                true
              );
            }
          );
        }, 1000);
      },
      // Step 4: Resolving merge conflict - CLEANER VERSION
      () => {
        // Clear previous states first
        setHighlightedLines({ M3RK: null, Ego: null });
        setEditing({
          M3RK: { line: null, text: "", complete: false },
          Ego: { line: null, text: "", complete: false },
        });

        // Update the code to show the conflict more clearly
        const updatedLines = [...codeLines];
        updatedLines[14] = "  // CONFLICT: Both developers edited this line";
        updatedLines.splice(15, 0, "  // M3RK's version:");
        updatedLines.splice(16, 0, "  return total * (1 - discount);");
        updatedLines.splice(17, 0, "  // Egor version:");
        updatedLines.splice(18, 0, "  return total * (1 - discount);");
        setCodeLines(updatedLines);

        // Focus the component's scroll to the conflict area without affecting page scroll
        setTimeout(() => {
          if (codeRef.current && lineRefs.current[14]) {
            // Use our custom scrollToLine function instead of scrollIntoView
            scrollToLine(14);
          }

          // Set the conflict indicators
          setActionLabels({
            M3RK: "Merge conflict detected",
            Ego: "Merge conflict detected",
          });

          // Highlight the conflict lines with a clearer indication
          setHighlightedLines({ M3RK: 16, Ego: 18 });

          // Show developers examining the conflict
          setCursors({
            M3RK: { line: 16, position: 10 },
            Ego: { line: 18, position: 10 },
          });

          // Simpler conflict resolution sequence
          setTimeout(() => {
            // Show discussion starting
            setActionLabels({
              M3RK: "Our changes are identical",
              Ego: "We made the same change",
            });

            // Move cursors to show examination
            animateCursor("M3RK", 16, 15, () => {
              animateCursor("Ego", 18, 15);
            });

            setTimeout(() => {
              // Resolution discussion
              setActionLabels({
                M3RK: "Let's use this approach",
                Ego: "Agreed, it looks good",
              });

              setTimeout(() => {
                // Update code to resolved state with cleaner structure
                const resolvedLines = [
                  "function calculatePrice(items: { price: number }[], discountCode: string): number {",
                  "  // Calculate the base total",
                  "  const total = items",
                  "    .map(item => item.price)",
                  "    .reduce((sum, price) => sum + price, 0);",
                  "",
                  "  // Implementing dynamic discount logic",
                  "  const discounts = {",
                  "    'SUMMER': 0.2,",
                  "    'WELCOME': 0.1",
                  "  };",
                  "",
                  "  const discount = discounts[discountCode] || 0;",
                  "",
                  "  return total * (1 - discount); // Conflict resolved",
                  "}",
                ];

                setCodeLines(resolvedLines);

                // Highlight the resolved line
                setHighlightedLines({ M3RK: null, Ego: 14 });

                // Position cursors near the resolved line
                setCursors({
                  M3RK: { line: 14, position: 15 },
                  Ego: { line: 14, position: 30 },
                });

                // Show resolution message
                setActionLabels({
                  M3RK: "Conflict resolved",
                  Ego: "Changes approved",
                });

                // Update changed lines tracking
                setChangedLines([...changedLines, 8, 9, 10, 12, 14]);

                // Scroll to show the resolved code, contained within the component
                if (codeRef.current && lineRefs.current[14]) {
                  // Use our custom scrollToLine function instead of scrollIntoView
                  scrollToLine(14);
                }

                // Move to next step after resolution
                setTimeout(() => {
                  setCurrentStep(5);
                }, 1500);
              }, 1200);
            }, 1000);
          }, 1200);
        }, 800);
      },
      // Step 5: Final review and verification
      () => {
        // M3RK reviews the code
        setCursors((prev) => ({ ...prev, M3RK: { line: 7, position: 0 } }));
        setActionLabels((prev) => ({ ...prev, M3RK: "Reviewing" }));
        scrollToLine(7);

        // Ego reviews the return statement
        setCursors((prev) => ({ ...prev, Ego: { line: 8, position: 0 } }));
        setActionLabels((prev) => ({ ...prev, Ego: "Verifying" }));
        setTimeout(() => {
          scrollToLine(8);
        }, 300);

        setTimeout(() => {
          // M3RK moves through code lines
          animateCursor("M3RK", 8, 5, () => {
            animateCursor("M3RK", 9, 5, () => {
              animateCursor("M3RK", 12, 15, () => {
                setHighlightedLines((prev) => ({ ...prev, M3RK: 12 }));
                scrollToLine(12);
                setTimeout(() => {
                  setHighlightedLines((prev) => ({ ...prev, M3RK: null }));
                }, 800);
              });
            });
          });

          // Ego reviews return statement with enhanced visibility
          setHighlightedLines((prev) => ({ ...prev, Ego: 8 }));
          setTimeout(() => {
            // Toggle highlight for better visibility
            setHighlightedLines((prev) => ({ ...prev, Ego: null }));
            setTimeout(() => {
              setHighlightedLines((prev) => ({ ...prev, Ego: 8 }));
              setTimeout(() => {
                setHighlightedLines((prev) => ({ ...prev, Ego: null }));
                setActionLabels({
                  M3RK: "Ready to commit",
                  Ego: "Approved changes",
                });

                setTimeout(() => {
                  setCurrentStep(6);
                }, 1500);
              }, 600);
            }, 600);
          }, 800);
        }, 1000);
      },
      // Step 6: Both approve, reset and start over
      () => {
        setHighlightedLines({ M3RK: null, Ego: null });
        setCursors({
          M3RK: { line: null, position: 0 },
          Ego: { line: null, position: 0 },
        });
        setActionLabels({
          M3RK: "Committed changes",
          Ego: "Committed changes",
        });

        setTimeout(() => {
          // Reset state for next iteration
          setActionLabels({ M3RK: "", Ego: "" });
          setChangedLines([]);
          setTimeout(() => {
            setCodeLines([
              "function calculatePrice(items: { price: number }[], discountCode: string): number {",
              "  // Calculate the base total",
              "  const total = items",
              "    .map(item => item.price)",
              "    .reduce((sum, price) => sum + price, 0);",
              "",
              "  // TODO: Implement discount logic",
              "",
              "  return total;",
              "}",
            ]);
            setCurrentStep(0);
          }, 2000);
        }, 1500);
      },
    ];

    animationSteps[currentStep]();
  }, [currentStep, isAnimating]);

  // Add line to change history
  const addChangedLine = (...lineNums: number[]): void => {
    const newChangedLines = [...changedLines];
    lineNums.forEach((lineNum) => {
      if (!newChangedLines.includes(lineNum)) {
        newChangedLines.push(lineNum);
      }
    });
    setChangedLines(newChangedLines);
  };

  // Animate cursor movement
  const animateCursor = (
    developer: Developer,
    lineNum: number,
    position: number,
    callback?: () => void
  ): void => {
    setCursors((prev) => ({
      ...prev,
      [developer]: {
        line: lineNum,
        position: position,
      },
    }));

    // Scroll to ensure cursor is visible
    scrollToLine(lineNum);

    if (callback) {
      setTimeout(callback, 300);
    }
  };

  // Simulate deleting text
  const simulateDeleting = (
    developer: Developer,
    lineNum: number,
    fullText: string,
    targetText: string,
    callback?: () => void
  ): (() => void) => {
    let currentText = fullText;

    const deleteInterval = setInterval(() => {
      if (currentText.length > targetText.length) {
        currentText = currentText.slice(0, -1);

        setEditing((prev) => ({
          ...prev,
          [developer]: {
            ...prev[developer],
            text: currentText,
          },
        }));

        setCursors((prev) => ({
          ...prev,
          [developer]: {
            ...prev[developer],
            position: currentText.length,
          },
        }));
      } else {
        clearInterval(deleteInterval);
        if (callback) callback();
      }
    }, 50);

    return () => clearInterval(deleteInterval);
  };

  const typeCode = (
    text: string,
    lineIndex: number,
    developer: Developer,
    onComplete?: () => void,
    isReplacing: boolean = false
  ): (() => void) => {
    let currentText = isReplacing ? "" : editing[developer].text || "";
    let index = 0;
    const targetText = text.slice(currentText.length);

    // If replacing, we first need to clear the existing line
    if (isReplacing) {
      const updatedLines = [...codeLines];
      updatedLines[lineIndex] = "";
      setCodeLines(updatedLines);
    }

    const interval = setInterval(() => {
      if (index < targetText.length) {
        currentText += targetText.charAt(index);
        const updatedLines = [...codeLines];

        // Replace or insert the line
        if (lineIndex < updatedLines.length) {
          updatedLines[lineIndex] = currentText;
        } else {
          updatedLines.push(currentText);
        }

        setCodeLines(updatedLines);
        setEditing((prev) => ({
          ...prev,
          [developer]: {
            ...prev[developer],
            text: currentText,
          },
        }));

        setCursors((prev) => ({
          ...prev,
          [developer]: {
            ...prev[developer],
            position: currentText.length,
          },
        }));

        index++;
      } else {
        clearInterval(interval);
        setEditing((prev) => ({
          ...prev,
          [developer]: {
            ...prev[developer],
            complete: true,
          },
        }));
        if (onComplete) onComplete();
      }
    }, 50);

    return () => clearInterval(interval);
  };

  return (
    <div className="flex flex-col h-full space-y-2" ref={animationRef}>
      <div className="flex items-center justify-between mb-2">
        {/* Controls */}
        <div className="flex space-x-2">
          <button
            className={`flex items-center text-xs px-2 py-1 ${
              wordWrap
                ? "bg-green-500/20 text-green-400"
                : "bg-gray-700/50 text-gray-400"
            } rounded`}
            onClick={toggleWordWrap}
          >
            <WrapText className="h-3 w-3 mr-1" />
            <span>{wordWrap ? "Wrap" : "No Wrap"}</span>
          </button>
          <div className="flex items-center text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
            <GitBranch className="h-3 w-3 mr-1" />
            <span>feature/discount</span>
          </div>
          <div className="flex items-center text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
            <GitPullRequest className="h-3 w-3 mr-1" />
            <span>PR #42</span>
          </div>
        </div>
      </div>

      {/* Code editor panel */}
      <div
        ref={codeRef}
        className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden flex flex-col"
        style={{ maxHeight: "250px", minHeight: "250px" }}
      >
        <div className="bg-gray-800 px-3 py-1.5 border-b border-gray-700 flex flex-col gap-1">
          <span className="text-xs text-gray-400">discount.tsx</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-1.5 bg-blue-500"></div>
              <span className="text-xs text-gray-400">M3RK</span>
              {actionLabels.M3RK && (
                <span
                  className={`text-xs truncate ${
                    actionLabels.M3RK.includes("conflict")
                      ? "text-yellow-500"
                      : "text-gray-500"
                  } ml-1`}
                >
                  {actionLabels.M3RK}
                </span>
              )}
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-1.5 bg-purple-500"></div>
              <span className="text-xs text-gray-400">Ego</span>
              {actionLabels.Ego && (
                <span
                  className={`text-xs truncate ${
                    actionLabels.Ego.includes("conflict")
                      ? "text-yellow-500"
                      : "text-gray-500"
                  } ml-1`}
                >
                  {actionLabels.Ego}
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${jetBrainsMono.className} text-xs p-0 bg-gray-900 flex-grow overflow-auto`}
        >
          <table className={`min-w-full ${wordWrap ? "table-fixed" : ""}`}>
            <tbody>
              {codeLines.map((line, index) => (
                <tr
                  key={index}
                  ref={(el) => {
                    lineRefs.current[index] = el;
                  }}
                  className={`
                    ${
                      highlightedLines.M3RK === index &&
                      highlightedLines.Ego === index
                        ? `bg-yellow-500/10 border-l-2 border-yellow-500`
                        : highlightedLines.M3RK === index
                        ? `bg-blue-500/10 border-l-2 border-blue-500`
                        : highlightedLines.Ego === index
                        ? `bg-purple-500/10 border-l-2 border-purple-500`
                        : "border-l-2 border-transparent"
                    }
                    ${
                      editing.M3RK.line === index
                        ? `border-l-2 border-blue-500`
                        : ""
                    }
                    ${
                      editing.Ego.line === index
                        ? `border-l-2 border-purple-500`
                        : ""
                    }
                    ${changedLines.includes(index) ? `bg-green-500/5` : ""}
                    ${
                      line.includes("<<<<<<<") ||
                      line.includes("=======") ||
                      line.includes(">>>>>>>")
                        ? "bg-yellow-500/20"
                        : ""
                    }
                    hover:bg-gray-800/50
                  `}
                >
                  <td className="text-gray-500 w-10 text-right pr-2 select-none">
                    {index + 1}
                  </td>
                  <td
                    className={`text-gray-300 ${
                      wordWrap
                        ? "break-all whitespace-pre-wrap"
                        : "whitespace-pre"
                    } pl-2 py-0.5 relative`}
                  >
                    {/* Complex conditional rendering for all possible states */}
                    <div className="flex items-start">
                      {/* Base text */}
                      <div className="relative inline">
                        {/* Line content */}
                        <span
                          className={
                            line.includes("<<<<<<<") ||
                            line.includes("=======") ||
                            line.includes(">>>>>>>")
                              ? "text-yellow-300 font-bold"
                              : changedLines.includes(index)
                              ? "text-green-300"
                              : ""
                          }
                        >
                          {editing.M3RK.line === index
                            ? editing.M3RK.text
                            : editing.Ego.line === index
                            ? editing.Ego.text
                            : line}
                        </span>

                        {/* M3RK cursor */}
                        {cursors.M3RK.line === index && (
                          <span
                            className="absolute top-0 inline-flex flex-col items-center"
                            style={{
                              left: `${cursors.M3RK.position * 0.6}em`,
                              height: "100%",
                            }}
                          >
                            <span className="absolute top-0 transform -translate-y-full text-blue-100 text-xs bg-blue-500 px-1.5 py-0.5 rounded-sm whitespace-nowrap z-10 font-medium">
                              M3RK {actionLabels.M3RK}
                            </span>
                            <span className="animate-pulse text-blue-500 mx-0.5">
                              |
                            </span>
                          </span>
                        )}

                        {/* Ego cursor */}
                        {cursors.Ego.line === index && (
                          <span
                            className="absolute top-0 inline-flex flex-col items-center"
                            style={{
                              left: `${cursors.Ego.position * 0.6}em`,
                              height: "100%",
                            }}
                          >
                            <span className="absolute top-0 transform -translate-y-full text-purple-100 text-xs bg-purple-500 px-1.5 py-0.5 rounded-sm whitespace-nowrap z-10 font-medium">
                              Ego {actionLabels.Ego}
                            </span>
                            <span className="animate-pulse text-purple-500 mx-0.5">
                              |
                            </span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Autocomplete suggestions */}
                    {suggestions.active && suggestions.line === index && (
                      <div className="absolute left-0 ml-8 bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
                        <div className="text-gray-400 text-xs p-1 border-b border-gray-700">
                          Suggestions
                        </div>
                        <ul>
                          {suggestions.options.map((option, i) => (
                            <li
                              key={i}
                              className={`px-3 py-1 text-gray-300 ${
                                i === 0 ? "bg-blue-500/20" : ""
                              } hover:bg-gray-700`}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>

                  {/* Gutter for change indicators */}
                  <td className="w-1">
                    {changedLines.includes(index) && (
                      <div className="w-1 h-full bg-green-500"></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-center text-xs text-gray-400 mt-2">
        <GitMerge className="h-4 w-4 text-green-400 mr-2" />
        <span>Building better code, together</span>
      </div>
    </div>
  );
};

export default CollaborativeCoding;
