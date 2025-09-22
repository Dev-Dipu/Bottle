import { useState } from "react";
import Scene from "./components/Scene";
import { gsap } from "gsap";

const slides = [
  {
    title: "FOSH A Taste of Timeless Elegance",
    desc: "Experience rich flavors and timeless elegance in every sip of FOSH.",
    img: "/images/partyimg.png",
    rotation: 0,
  },
  {
    title: "Crafted to Perfection",
    desc: "Blended with heritage and modern craftsmanship, FOSH is created to deliver a perfectly balanced taste, with a smooth finish and luxurious aroma that delights every sense.",
    img: "/images/fosh2.png",
    rotation: 0.15,
  },
  {
    title: "Raise Your Spirit",
    desc: "Celebrate life with timeless luxury in a bottle, savoring every moment with friends and family. FOSH inspires unforgettable experiences with its bold character and refined elegance.",
    img: "/images/fosh3.png",
    rotation: 0.3,
  },
];


export default function App() {
  const [active, setActive] = useState(0);

  const handleDotClick = (index) => {
    setActive(index);

    // rotate bottle
    window.dispatchEvent(
      new CustomEvent("bottleRotate", { detail: slides[index].rotation })
    );

    // Animate text & image
    gsap.fromTo(
      ".content .text",
      { opacity: 0, x: -50, clipPath: "inset(0 100% 0 0)" },
      {
        opacity: 1,
        x: 0,
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power3.out",
      }
    );
    gsap.fromTo(
      ".content .image",
      { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "power3.out",
      }
    );
  };

  return (
    <div className="w-screen h-screen bg-[url('/images/foshhhbg.png')] bg-cover bg-center overflow-hidden relative">
      <Scene />

      {/* Main Content */}
      <div className="absolute inset-0 text-white font-[switzer] flex flex-col justify-between">
        <header className="px-10 py-8 flex items-center justify-between relative">
          <h3>Alcohol Bottle</h3>
          <img
            src="/images/fosh.svg"
            alt="Wine Bottle"
            className="scale-125 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1"
          />
          <nav className="flex gap-12">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Brand</a>
            <a href="#">Shop</a>
          </nav>
        </header>

        {/* Dynamic content */}
        <div className="content text-[#E9E9E9] px-52 flex justify-between items-center relative">
          <div className="text w-[35%]">
            <h1 className="text-[40px] leading-none">{slides[active].title}</h1>
            <p className="leading-none mt-3">{slides[active].desc}</p>
          </div>
          <div className="h-48 aspect-video overflow-hidden image">
            <img
              className="h-full w-full object-cover"
              src={slides[active].img}
              alt="party"
            />
          </div>
        </div>

        <footer className="px-10 py-6 flex justify-between items-end">
          <img src="/images/irish.svg" alt="irish" />
          <h2 className="font-[ppedit] text-[26px]">Since 1990.</h2>
        </footer>

        {/* Vertical Dots */}
        <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                active === i ? "bg-white scale-125" : "bg-white/50 scale-100"
              } hover:scale-125 hover:bg-white`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
