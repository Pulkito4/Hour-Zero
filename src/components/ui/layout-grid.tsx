"use client";
import React, { useState, useRef, useEffect, JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {

  return (
      <div className="w-4/6 h-full p-10 grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-5">
        {cards.map((card, i) => (
          <div key={i} className={cn(card.className, "group")}>
            <motion.div
              className={cn(
                card.className,
                "relative overflow-hidden rounded-xl h-full w-full"
              )}
            >
              <ImageComponent card={card} />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <motion.div
                className="absolute inset-0 flex flex-col justify-end px-8 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {card.content}
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    );
  
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <Image
      src={card.thumbnail}
      className="object-cover object-top h-full w-full transition duration-200"
      alt="thumbnail"
    />
  );
};


