import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { InfoMenu } from "../Interfaces/InfoMenu";

interface CircularCarouselProps {
  items: InfoMenu[];
}

export default function CircularCarousel({ items }: CircularCarouselProps) {
  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (items: InfoMenu) => {
    return (
      <div className="border-1  border-round rounded-xl text-center py-3 px-2 mx-auto w-[200px]">
        <div
          className="h-50 bg-center bg-cover rounded-md shadow-md mb-3"
          style={{
            backgroundImage: `url(${items.imageURL})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div>
          <h4 className="mb-1">{items.titulo}</h4>
          <h6 className="mt-0 mb-3">{items.descripcion}</h6>
          <Tag value={items.cantPersonas}></Tag>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button
              icon="pi pi-star-fill"
              className="p-button-success p-button-rounded"
            />
          </div>
        </div>
      </div>
    );
  };
  <style jsx>{`
    .custom-carousel .p-carousel-items-content {
      justify-content: center !important;
      gap: 1rem; /* Ajusta el espacio entre las cards */
    }
  `}</style>;

  return (
    <div className="card">
      <Carousel
        value={items}
        numVisible={3}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={productTemplate}
      />
    </div>
  );
}
