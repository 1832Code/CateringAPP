"use client";
import { Carousel } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { InfoMenu } from "../Interfaces/InfoMenu";

interface CarouselDemoProps {
  items: InfoMenu[];
}
export function CarouselDemo({ items }: CarouselDemoProps) {
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel items={items} />
    </div>
  );
}
