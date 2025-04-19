"use client";

import { useState, useEffect, useRef } from "react";

interface MasonryItem {
  id: number;
  height: number;
}

export function InfiniteLoopingMasonry() {
  const [columns, setColumns] = useState(3);
  const [baseItems, setBaseItems] = useState<MasonryItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationSpeedRef = useRef(40);

  const itemColor = "bg-gray-800";

  useEffect(() => {
    const items = Array(20)
      .fill(null)
      .map((_, i) => ({
        id: i,
        height: Math.floor(Math.random() * 100) + 50,
      }));

    setBaseItems(items);

    const handleResize = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth < 250) setColumns(1);
      else if (containerWidth < 450) setColumns(2);
      else setColumns(3);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const getColumnItems = () => {
    const columnItems = Array(columns)
      .fill(null)
      .map(() => [] as MasonryItem[]);

    baseItems.forEach((item, index) => {
      const columnIndex = index % columns;
      columnItems[columnIndex].push(item);
    });

    return columnItems;
  };

  return (
    <div
      className="relative overflow-hidden w-full h-full flex-1"
      style={{ backgroundColor: "#0a0a0a" }}
      ref={containerRef}
    >
      <div className="w-full h-full absolute">
        <div
          className="absolute w-full"
          style={{
            animation: `infinite-scroll ${animationSpeedRef.current}s linear infinite`,
          }}
        >
          <div className={`grid grid-cols-${columns} gap-4 p-2`}>
            {getColumnItems().map((columnItems, colIndex) => (
              <div
                key={`col-1-${colIndex}`}
                className="flex flex-col space-y-2"
              >
                {columnItems.map((item) => (
                  <div
                    key={`set-1-${item.id}`}
                    className={`${itemColor} rounded shadow-md hover:scale-105 transition-transform duration-300`}
                    style={{ height: `${item.height}px` }}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className={`grid grid-cols-${columns} gap-4 p-2`}>
            {getColumnItems().map((columnItems, colIndex) => (
              <div
                key={`col-2-${colIndex}`}
                className="flex flex-col space-y-2"
              >
                {columnItems.map((item) => (
                  <div
                    key={`set-2-${item.id}`}
                    className={`${itemColor} rounded shadow-md hover:scale-105 transition-transform duration-300`}
                    style={{ height: `${item.height}px` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}
