"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import { InfoMenu } from "../Interfaces/InfoMenu";

interface SlideData {
  title: string;
  description: string;
  price: number;
  src: string;
  button: string;
  numberOfPeople: number;
  category: string;
  aditionalServices: string;
}

interface SlideProps {
  slide: InfoMenu;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  flippedIndex: number | null;
  setFlippedIndex: (index: number | null) => void;
}

const Slide = ({
  slide,
  index,
  current,
  handleSlideClick,
  flippedIndex,
  setFlippedIndex,
}: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  const isFlipped = flippedIndex === index;
  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const handleFlipClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Importante para que no cambie el slide
    if (isFlipped) {
      setFlippedIndex(null);
    } else {
      setFlippedIndex(index);
    }
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[65vmin] h-[65vmin] sm:w-[70vw] sm:h-[70vw]
  md:w-[50vh] md:h-[50vh]
  lg:w-[55vh] lg:h-[55vh]
  xl:w-[60vh] xl:h-[60vh] mx-[4vmin] sm:mx-[6vmin] md:mx-[8vmin] lg:mx-[10vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        {/* Contenedor que gira */}
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Face */}
          <div className="absolute w-full h-full backface-hidden rounded-[10%] overflow-hidden bg-[#1D1F2F]">
            <img
              className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
              style={{
                opacity: current === index ? 1 : 0.5,
                transform:
                  current === index
                    ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                    : "none",
              }}
              alt={slide.imageURL}
              src={slide.imageURL}
              onLoad={imageLoaded}
              loading="eager"
              decoding="sync"
            />
            {current === index && (
              <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
            )}
            <article
              className={`relative p-[4vmin] h-full flex flex-col justify-center items-center text-center transition-opacity duration-1000 ease-in-out ${
                current === index
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
            >
              <h2
                className="text-[5vh] md:text-[7vh] font-500 relative"
                style={{ fontFamily: "Italiana" }}
              >
                {slide.titulo}
              </h2>
              <p
                className="mt-[0.4vh] text-[3vh] lg:text-[4vh]"
                style={{ fontFamily: "Abel" }}
              >
                {slide.cantPersonas} personas
              </p>
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleFlipClick}
                  className="text-[1.8vh] sm:text-[1.6vh] md:text-[2vh] lg:text-[3vh] px-[2vh] py-[1vh]
             w-fit text-black bg-white border border-transparent
             flex justify-center items-center rounded-2xl
             transition duration-300 ease-in-out 
             hover:bg-neutral-300 hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  <span
                    className="tracking-wide"
                    style={{ fontFamily: "Abel" }}
                  >
                    Ver más
                  </span>
                </button>
              </div>
            </article>
          </div>

          {/* Back Face */}
          <div
            className="absolute w-full h-full backface-hidden bg-[gray] rounded-[10%] p-6 text-black overflow-y-auto"
            style={{
              transform: "rotateY(180deg)",
            }}
          >
            <div className="bg-[gray" style={{ fontFamily: "Abel" }}>
              <h3 className=" text-[4vh] md:text-[4.5vh] lg:text-[5vh] font-bold mb-4">
                {slide.titulo}
              </h3>
              <div className="flex flex-col justify-start items-start text-[2vh] md:text-[2.3vh] lg:text-[3vh] ">
                <label className="text-left">
                  Descripción:
                  <p className="mb-6">{slide.descripcion}</p>
                </label>
                <label>
                  Tipo de Servicio:
                  <p className="flex flex-col items-start  mb-6">
                    {slide.servicio.tipoServicio.nombre}
                  </p>
                </label>
                <label>
                  Detalles del Servicio:
                  <div className="flex flex-col items-start  mb-6">
                    {slide.servicio.items.map((item) => (
                      <p key={item.id}>{item.item.nombre}</p>
                    ))}
                  </div>
                </label>
                <label>
                  Precio:
                  <p className="flex flex-col items-start  mb-6">
                    {slide.precio}
                  </p>
                </label>
              </div>
            </div>
            <button
              onClick={handleFlipClick}
              className="text-[1.8vh] sm:text-[1.6vh] md:text-[2vh] lg:text-[3vh] px-[2vh] py-[1vh]
             w-fit text-black bg-white border border-transparent
             flex justify-center items-center rounded-2xl
             transition duration-300 ease-in-out 
             hover:bg-neutral-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <span className="tracking-wide" style={{ fontFamily: "Abel" }}>
                Volver
              </span>
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-[8vh] h-[8vh] sm:w-[6vh] sm:h-[6vh] md:w-[8vh] md:h-[8vh] lg:w-[7vw] lg:h-[7vw] xl:w-[8vh] xl:h-[8vh]   flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  items: InfoMenu[];
}

export function Carousel({ items }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handlePreviousClick = () => {
    setFlippedIndex(null);
    const previous = current - 1;
    setCurrent(previous < 0 ? items.length - 1 : previous);
  };

  const handleNextClick = () => {
    setFlippedIndex(null);
    const next = current + 1;
    setCurrent(next === items.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    setFlippedIndex(null);
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-[70vmin] h-[90vmin] mx-auto mt-[7vh] lg:mt-[17vh] xl:mt-[17vh]"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / items.length)}%)`,
        }}
      >
        {items.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            flippedIndex={flippedIndex}
            setFlippedIndex={setFlippedIndex}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full bottom-[1vh] sm:bottom-[7vh] md:bottom-[6vh] lg:bottom-[17vh] xl:bottom-[17vh] ">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
