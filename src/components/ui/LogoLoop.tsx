import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  node: React.ReactNode;
  title: string;
}

interface LogoLoopProps {
  logos: LogoProps[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function LogoLoop({ logos, direction = "left", speed = 20, className = "" }: LogoLoopProps) {
  return (
    <div className={`overflow-hidden relative flex items-center w-full ${className}`}>
      {/* Left/Right masks for smooth fading */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 sm:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 sm:w-32 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex gap-16 md:gap-24 items-center whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        style={{ width: "max-content" }}
      >
        {/* Render logos twice to create infinite loop effect */}
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-4 text-foreground/50 hover:text-primary transition-colors opacity-70 hover:opacity-100 min-w-[100px]"
          >
            <div className="text-4xl sm:text-5xl">{logo.node}</div>
            <span className="text-sm font-semibold tracking-wider font-mono">{logo.title}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
