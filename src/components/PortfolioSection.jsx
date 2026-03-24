import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    id: "daughter_mom",
    image: "/images/daughter_mom.jpg",
    alt: "Daughter vs Mom projekt",
  },
  {
    id: "school_life",
    image: "/images/school_life.jpg",
    alt: "School Life projekt",
  },
  {
    id: "into_your_heart",
    image: "/images/into_your_heart.jpg",
    alt: "Into your heart projekt",
  },
];

const PortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full bg-[#212121] px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-[30px] lg:grid lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-14">
        <div className="contents lg:flex lg:flex-col lg:gap-8">
          <header className="order-1 w-[314px] lg:order-none lg:w-full">
            <p className="text-[20px] font-bold uppercase leading-none text-[#F07232]">
              PORTFOLIO
            </p>
            <h2 className="mt-2 text-[30px] font-bold uppercase leading-none text-white lg:text-[62px]">
              UDVALGTE
              <br />
              PROJEKTER
            </h2>
          </header>

          <div className="order-3 w-[330px] text-[20px] font-normal leading-[27px] text-white lg:order-none lg:mt-0 lg:w-full lg:max-w-[430px] lg:text-[30px] lg:leading-[42px]">
            <p>
              Her præsenterer vi et udvalg af de{" "}
              <strong>produktioner, vi er stolte af at have skabt.</strong>
            </p>
            <p className="mt-5">
              Hvert projekt fortæller sin unikke historie og illustrerer vores
              ambition om at levere høj kvalitet, originalitet og visuel
              gennemslagskraft.
            </p>
            <p className="mt-5">
              Gå på opdagelse, og lad dig inspirere af vores arbejde.
            </p>
          </div>
        </div>

        <div className="order-2 w-full lg:order-none lg:self-center">
          <div className="relative h-[236px] w-[390px] max-w-full overflow-hidden lg:h-[500px] lg:w-full lg:max-w-[780px]">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].alt}
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={previousSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-[54px] leading-none text-[#F07232] lg:left-4 lg:text-[86px]"
              aria-label="Forrige slide"
            >
              <FiChevronLeft />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[54px] leading-none text-[#F07232] lg:right-4 lg:text-[86px]"
              aria-label="Næste slide"
            >
              <FiChevronRight />
            </button>
          </div>

          <div className="mx-auto mt-[14px] flex h-[25px] w-[196px] items-center justify-center gap-[10px] lg:mt-5 lg:w-[240px]">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-[18px] w-[18px] rounded-full transition-colors lg:h-[22px] lg:w-[22px] ${
                  currentIndex === index ? "bg-[#F4A63F]" : "bg-[#5B5B5B]"
                }`}
                aria-label={`Gå til slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
