import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useContactForm } from "../hooks/useContactForm";

const ContactSection = () => {
  const { contactData, isSubmitting, feedback, handleChange, handleSubmit } =
    useContactForm();

  return (
    <section className="relative overflow-hidden bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <img
        src="/images/studie2.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-[30px] lg:grid lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-16">
        <div className="w-[350px] max-w-full">
          <p className="text-[20px] font-bold uppercase leading-none text-[#F07232]">
            KONTAKT
          </p>
          <h2 className="mt-2 text-[30px] font-bold uppercase leading-none text-white lg:text-[62px]">
            BOOK EN SAMTALE MED
            <br />
            OS
          </h2>
          <p className="mt-6 text-[20px] font-normal leading-[27px] text-white lg:text-[24px] lg:leading-[36px]">
            Har du spørgsmål eller ønsker du at vide mere om, hvordan vi kan
            hjælpe med dit næste projekt? Udfyld formularen, og vi kontakter dig
            hurtigst muligt. Vi ser frem til at samarbejde med dig!
          </p>

          <div className="mt-8 flex w-[350px] max-w-full flex-col gap-[14px] py-[13px]">
            <div className="flex h-[60px] w-full items-center gap-[17px]">
              <FiPhone className="text-[30px] text-[#F07232] lg:text-[34px]" />
              <span className="text-[20px] font-medium leading-none text-white lg:text-[24px]">
                +45 12 34 56 78
              </span>
            </div>
            <div className="flex h-[60px] w-full items-center gap-[17px]">
              <FiMapPin className="text-[30px] text-[#F07232] lg:text-[34px]" />
              <span className="text-[20px] font-medium leading-none text-white lg:text-[24px]">
                Fotovej 66, 8456 Cineby
              </span>
            </div>
            <div className="flex h-[60px] w-full items-center gap-[17px]">
              <FiMail className="text-[30px] text-[#F07232] lg:text-[34px]" />
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
            className="h-[63px] w-[249px] border border-[#F07232] text-[20px] font-bold text-[#F07232] transition hover:bg-[#F07232] hover:text-black disabled:opacity-60 lg:text-[24px]"
          >
            {isSubmitting ? "Sender..." : "Send besked"}
          </button>

          {feedback.message && (
            <p
              className={`text-[18px] lg:text-[20px] ${
                feedback.type === "success" ? "text-green-300" : "text-red-300"
              }`}
            >
              {feedback.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
