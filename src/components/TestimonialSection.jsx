import { useEffect, useState } from "react";
import { fetchReviews } from "../services/reviews.service";

const fallbackReviews = [
  {
    _id: "fallback-review",
    name: "Louise Madsen",
    position: "Kreativ direktør hos VisionWorks Studios",
    text: "Cinestar leverer altid resultater i topklasse. Deres team er dedikeret, detaljeorienteret og ekstremt kreative. Uanset projektets størrelse formår de at bringe visioner til live med imponerende kvalitet og professionalisme.",
    rating: 5,
  },
];

const staticHeadlineQuote =
  "Cinestar er en fantastisk samarbejdspartner, der formår at kombinere kreativitet med professionalisme. Deres evne til at skabe unikke og engagerende produktioner er imponerende, og resultatet taler altid for sig selv.";

const TestimonialSection = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 390,
  );

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        if (!isMounted) return;

        if (data.length > 0) {
          setReviews(data);
          return;
        }

        setReviews(fallbackReviews);
      } catch {
        if (isMounted) {
          setReviews(fallbackReviews);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasMultiple = reviews.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;

    const timerId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);

    return () => {
      window.clearInterval(timerId);
    };
  }, [hasMultiple, reviews.length]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isDesktop = viewportWidth >= 1024;
  const cardOffset = isDesktop ? 390 : 313;

  return (
    <section className="w-full bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-[30px] lg:gap-12">
        <header className="w-[350px] max-w-full text-center lg:w-full lg:max-w-[980px]">
          <p className="text-[20px] font-bold uppercase leading-none text-[#F07232]">
            UDTALELSER
          </p>

          <h2 className="mt-2 text-[30px] font-bold uppercase leading-none text-white lg:text-[62px] lg:leading-[0.95]">
            HVAD SIGER VORES
            <br />
            SAMARBEJDSPARTNERE
            <br />
            OM OS?
          </h2>

          <p className="mt-6 text-center text-[18px] font-medium leading-[27px] text-white lg:mx-auto lg:max-w-[720px] lg:text-[32px] lg:leading-[44px]">
            “{staticHeadlineQuote}”
          </p>
        </header>

        <div className="relative flex h-[263px] w-[915px] max-w-full items-center justify-center overflow-hidden lg:h-[300px] lg:w-[1180px]">
          {reviews.length > 0 &&
            reviews.map((review, index) => {
              const offset = index - currentIndex;
              let translateX = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 20;

              if (
                offset === -1 ||
                (currentIndex === 0 && index === reviews.length - 1)
              ) {
                translateX = -cardOffset;
                scale = 0.92;
                opacity = 0.45;
                zIndex = 10;
              }

              if (
                offset === 1 ||
                (currentIndex === reviews.length - 1 && index === 0)
              ) {
                translateX = cardOffset;
                scale = 0.92;
                opacity = 0.45;
                zIndex = 10;
              }

              if (Math.abs(offset) > 1 && reviews.length > 2) {
                opacity = 0;
              }

              return (
                <article
                  key={review._id || `${review.name}-${index}`}
                  className="absolute h-[225px] w-[303px] bg-[#1f1f1f] px-[9px] py-[15px] text-left transition-all duration-300 lg:h-[260px] lg:w-[360px] lg:px-4 lg:py-4"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="flex items-center gap-[2px] text-[#F4C542]">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <span
                        key={`${review._id || index}-star-${starIndex}`}
                        className="text-[16px] leading-none lg:text-[18px]"
                      >
                        {starIndex < (review.rating || 0) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 h-[101px] w-[285px] text-[12px] font-normal leading-[20px] text-white/95 lg:h-[125px] lg:w-[320px] lg:text-[14px] lg:leading-[24px]">
                    “{review.text}”
                  </p>

                  <div className="mt-4 w-[268px] lg:w-[320px]">
                    <p className="text-[20px] font-bold uppercase leading-none text-[#F07232] lg:text-[24px]">
                      {review.name}
                    </p>
                    <p className="mt-1 text-[14px] font-normal leading-none text-white/95 lg:text-[16px]">
                      {review.position}
                    </p>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
