"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

interface GridItem {
  id: number;
  height: number;
}

const GRID_STYLES = [
  {
    // Masonry
    columns: 3,
    heightRange: { min: 50, max: 150 },
    pattern: () => Math.random() * 100 + 50,
  },
  {
    // Asymmetric
    columns: 3,
    heightRange: { min: 30, max: 120 },
    pattern: (i: number) => Math.sin(i * 0.5) * 40 + 80,
  },
  {
    // Bento
    columns: 3,
    heightRange: { min: 100, max: 200 },
    pattern: (i: number) => (i % 3 ? 150 : 220),
  },
  {
    // Zig Zag
    columns: 3,
    heightRange: { min: 80, max: 180 },
    pattern: (i: number) => (i % 2 ? 120 : 180),
  },
];

const COLUMNS = 3;
const ITEMS_COUNT = 24;
const STYLE_DURATION = 3000;

export function MorphingGrid() {
  const [styleIndex, setStyleIndex] = useState(0);
  const [items, setItems] = useState<GridItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateItems = useCallback(() => {
    const style = GRID_STYLES[styleIndex];
    return Array(ITEMS_COUNT)
      .fill(null)
      .map((_, i) => ({
        id: i,
        height: style.pattern(i),
      }));
  }, [styleIndex]);

  useEffect(() => {
    setItems(generateItems());

    const interval = setInterval(() => {
      setStyleIndex((prev) => (prev + 1) % GRID_STYLES.length);
    }, STYLE_DURATION);

    return () => clearInterval(interval);
  }, [styleIndex, generateItems]);

  const columns = useMemo(() => {
    const columnsArray = Array(COLUMNS)
      .fill(null)
      .map(() => [] as GridItem[]);

    items.forEach((item, index) => {
      const colIndex = index % COLUMNS;
      columnsArray[colIndex].push(item);
    });

    return columnsArray;
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-[#0a0a0a]"
    >
      <div className="h-full w-full p-4">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
          }}
        >
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              {column.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-lg shadow-xl will-change-[height] transition-[height] duration-1000 ease-in-out"
                  style={{
                    height: `${item.height}px`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
