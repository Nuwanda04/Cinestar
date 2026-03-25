import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContactForm } from "../hooks/useContactForm";

const Kontakt = () => {
  const { contactData, isSubmitting, feedback, handleChange, handleSubmit } =
    useContactForm();

  return (
    <>
      <section className="relative w-full overflow-hidden bg-black">
        <img
          src="/images/studio.jpg"
          alt="Kontakt hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1240px] px-5 py-14 lg:px-10 lg:py-24">
          <h1 className="text-[38px] font-bold uppercase leading-none text-white lg:text-[82px]">
            KONTAKT
          </h1>
          <p className="mt-5 text-[22px] font-bold leading-none text-white lg:text-[26px]">
            <Link
              to="/"
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              Forside
            </Link>{" "}
            / <span className="text-[var(--color-accent)]">KONTAKT</span>
          </p>
        </div>
      </section>

      <section className="bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-[30px] lg:grid lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-14">
          <div className="w-[350px] max-w-full lg:w-full lg:max-w-[520px]">
            <p className="text-[20px] font-bold uppercase leading-none text-[var(--color-accent)]">
              KONTAKT
            </p>
            <h2 className="mt-2 text-[30px] font-bold uppercase leading-none text-white lg:text-[62px]">
              TØV IKKE MED AT
              <br />
              TAGE KONTAKT
            </h2>
            <p className="mt-6 text-[20px] font-medium leading-[30px] text-white lg:text-[24px] lg:leading-[36px]">
              Har du spørgsmål eller brug for mere information om vores
              tjenester og processer? Vores team står klar til at hjælpe dig.
              Kontakt os, og lad os tage en uforpligtende samtale om dine behov
              og idéer.
            </p>

            <div className="mt-8 flex w-[350px] max-w-full flex-col gap-[14px] py-[13px] lg:w-full">
              <div className="flex h-[60px] w-full items-center gap-[17px]">
                <FiPhone className="text-[30px] text-[var(--color-accent)] lg:text-[34px]" />
                <span className="text-[20px] font-medium leading-none text-white lg:text-[24px]">
                  +45 12 34 56 78
                </span>
              </div>
              <div className="flex h-[60px] w-full items-center gap-[17px]">
                <FiMapPin className="text-[30px] text-[var(--color-accent)] lg:text-[34px]" />
                <span className="text-[20px] font-medium leading-none text-white lg:text-[24px]">
                  Fotovej 66, 8456 Cineby
                </span>
              </div>
              <div className="flex h-[60px] w-full items-center gap-[17px]">
                <FiMail className="text-[30px] text-[var(--color-accent)] lg:text-[34px]" />
                <span className="text-[20px] font-medium leading-none text-white lg:text-[24px]">
                  cinestar@production.dk
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-[350px] max-w-full flex-col gap-9 py-[13px]"
          >
            <label className="block h-[65px] w-full border-b border-l border-white/80">
              <input
                type="text"
                name="name"
                value={contactData.name}
                onChange={handleChange}
                placeholder="Navn"
                className="h-full w-full bg-transparent px-5 text-[20px] font-normal text-white placeholder:text-[#9B9B9B] focus:outline-none lg:text-[24px]"
              />
            </label>

            <label className="block h-[65px] w-full border-b border-l border-white/80">
              <input
                type="text"
                name="subject"
                value={contactData.subject}
                onChange={handleChange}
                placeholder="Emne"
                className="h-full w-full bg-transparent px-5 text-[20px] font-normal text-white placeholder:text-[#9B9B9B] focus:outline-none lg:text-[24px]"
              />
            </label>

            <label className="block h-[165px] w-full border-b border-l border-white/80">
              <textarea
                name="description"
                value={contactData.description}
                onChange={handleChange}
                placeholder="Besked"
                className="h-full w-full resize-none bg-transparent px-5 py-4 text-[20px] font-normal text-white placeholder:text-[#9B9B9B] focus:outline-none lg:text-[24px]"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[63px] w-[249px] border border-[var(--color-accent)] text-[20px] font-bold text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black disabled:opacity-60 lg:text-[24px]"
            >
              {isSubmitting ? "Sender..." : "Send besked"}
            </button>

            {feedback.message && (
              <p
                className={`text-[18px] lg:text-[20px] ${
                  feedback.type === "success"
                    ? "text-green-300"
                    : "text-red-300"
                }`}
              >
                {feedback.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default Kontakt;
