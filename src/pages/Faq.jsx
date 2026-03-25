import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import SoMeSection from "../components/SoMeSection";
import { fetchFaqs } from "../services/faqs.service";

const fallbackFaqs = [
  {
    _id: "fallback-1",
    question: "HVAD GØR CINESTAR SPECIEL?",
    answer:
      "Cinestar skiller sig ud ved at kombinere kreativt håndværk med teknisk ekspertise. Vi tror på at fortælle historier, der berører, inspirerer og efterlader et varigt indtryk. Vores dedikerede team arbejder passioneret for at skabe unikke produktioner med høj kvalitet og et personligt præg, der gør hver film og hvert projekt helt specielt.",
  },
  {
    _id: "fallback-2",
    question: "HVORFOR VÆLGE CINESTAR?",
    answer:
      "Vi tilbyder en komplet produktionsproces med tæt dialog, høj kvalitet og kreativ retning fra start til slut.",
  },
  {
    _id: "fallback-3",
    question: "HVAD KOSTER DET?",
    answer:
      "Prisen afhænger af projektets omfang. Vi udarbejder altid et gennemsigtigt tilbud, så du ved præcis, hvad du får.",
  },
  {
    _id: "fallback-4",
    question: "HVORDAN BETALER JEG?",
    answer:
      "Vi tilbyder fleksible betalingsmuligheder og aftaler betalingsplan ud fra projektets størrelse og tidsplan.",
  },
];

const Faq = () => {
  const [faqs, setFaqs] = useState(fallbackFaqs);
  const [openId, setOpenId] = useState(fallbackFaqs[0]._id);

  useEffect(() => {
    let isMounted = true;

    const loadFaqs = async () => {
      try {
        const data = await fetchFaqs();
        if (!isMounted) return;

        if (data.length > 0) {
          setFaqs(data);
          setOpenId(data[0]?._id || null);
        }
      } catch {
        if (isMounted) {
          setFaqs(fallbackFaqs);
          setOpenId(fallbackFaqs[0]._id);
        }
      }
    };

    loadFaqs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-black">
        <img
          src="/images/studio.jpg"
          alt="FAQ hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1240px] px-5 py-14 lg:px-10 lg:py-24">
          <h1 className="text-[38px] font-bold uppercase leading-none text-white lg:text-[82px]">
            FAQ
          </h1>
          <p className="mt-5 text-[22px] font-bold leading-none text-white lg:text-[26px]">
            <Link
              to="/"
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              Forside
            </Link>{" "}
            / <span className="text-[var(--color-accent)]">FAQ</span>
          </p>
        </div>
      </section>

      <section className="w-full bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[1240px]">
          <div className="w-[350px] max-w-full lg:mx-auto lg:w-full lg:max-w-[980px] lg:text-center">
            <p className="text-[20px] font-bold uppercase leading-none text-[var(--color-accent)]">
              OFTE STILLEDE SPØRGSMÅL
            </p>
            <h2 className="mt-2 text-[32px] font-bold uppercase leading-none text-white lg:text-[62px] lg:leading-[0.95]">
              DE MEST ALMINDELIGE
              <br />
              SPØRGSMÅL, VI FÅR
            </h2>
            <p className="mt-6 text-[20px] font-medium leading-[27px] text-white lg:mx-auto lg:max-w-[900px] lg:text-[30px] lg:leading-[40px]">
              Her finder du svar på de spørgsmål, vi oftest bliver stillet om
              vores processer, tjenester og produktioner. Har du brug for
              yderligere information? Tøv ikke med at kontakte os!
            </p>
          </div>

          <div className="mt-10 flex w-[350px] max-w-full flex-col gap-6 lg:mx-auto lg:mt-12 lg:w-full lg:max-w-[980px] lg:items-center">
            {faqs.map((item) => {
              const id = item._id || item.question;
              const isOpen = openId === id;

              return (
                <div key={id} className="w-full max-w-[350px] lg:max-w-[980px]">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId((prev) => (prev === id ? null : id))
                    }
                    className={`flex h-[119px] w-full items-center justify-between px-[6px] text-left transition-colors lg:h-[101px] lg:px-8 ${
                      isOpen
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-white text-[#212121]"
                    }`}
                  >
                    <span className="w-[251px] font-sans text-[20px] font-bold uppercase leading-none lg:w-auto lg:text-[30px]">
                      {item.question}
                    </span>
                    <span className="grid h-[62px] w-[62px] place-items-center">
                      {isOpen ? (
                        <FiChevronUp className="text-[42px] lg:text-[52px]" />
                      ) : (
                        <FiChevronDown className="text-[42px] lg:text-[52px]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mx-[6px] w-[338px] max-w-[calc(100%-12px)] pt-0 text-[20px] font-normal leading-[27px] text-white lg:mx-auto lg:w-full lg:max-w-[980px] lg:text-center lg:text-[30px] lg:leading-[42px]">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SoMeSection />
    </>
  );
};

export default Faq;
