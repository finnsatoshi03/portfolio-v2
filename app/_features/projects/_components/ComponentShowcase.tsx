"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/_components/ui/button";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/_components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/app/_components/ui/table";

export const ComponentShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Memoize components to prevent unnecessary re-renders
  const components = useMemo(
    () => [
      {
        name: "Button",
        element: (
          <Button variant="secondary" className="w-full">
            Click Me
          </Button>
        ),
      },
      {
        name: "Card",
        element: (
          <Card className="w-full">
            <CardHeader className="pb-2">Card Header</CardHeader>
            <CardContent>Card Content</CardContent>
          </Card>
        ),
      },
      {
        name: "Input",
        element: <Input placeholder="Type something..." className="w-full" />,
      },
      {
        name: "Skeleton",
        element: (
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        ),
      },
      {
        name: "Tabs",
        element: (
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Tab 1 content goes here...</TabsContent>
            <TabsContent value="tab2">Tab 2 content goes here...</TabsContent>
            <TabsContent value="tab3">Tab 3 content goes here...</TabsContent>
          </Tabs>
        ),
      },
      {
        name: "Table",
        element: (
          <div className="w-full border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Project Alpha</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Today</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Project Beta</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>Yesterday</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ),
      },
    ],
    []
  );

  // Unified animation config
  const springConfig = {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.5,
  };

  // Optimized interval handler
  const updateIndex = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % components.length);
  }, [components.length]);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(updateIndex, 2500);
      return () => clearInterval(interval);
    }
  }, [isHovered, updateIndex]);

  return (
    <motion.div
      className="relative w-full h-full bg-background/80 rounded-xl p-8"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Component Stack Animation */}
      <div className="w-full h-full flex items-center justify-center">
        {components.map((component, index) => (
          <motion.div
            key={component.name}
            className="absolute will-change-transform"
            initial={{ scale: 0 }}
            animate={{
              scale: index === activeIndex ? 1 : 0,
              transition: {
                ...springConfig,
                delay: index === activeIndex ? 0 : 0.1,
              },
            }}
          >
            <div className="relative hover:scale-105 transition-transform duration-200">
              {component.element}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
