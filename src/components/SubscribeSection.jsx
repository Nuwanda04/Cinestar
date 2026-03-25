import { useState } from "react";
import { createSubscription } from "../services/subscriptions.service";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setFeedback({ type: "error", message: "Indtast en e-mailadresse." });
      return;
    }

    try {
      const response = await createSubscription(email.trim());
      setFeedback({
        type: "success",
        message: response?.message || "Tak for din tilmelding!",
      });
      setEmail("");
    } catch (error) {
      setFeedback({
        type: "error",
        message: error?.message || "Tilmelding kunne ikke gennemføres.",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <img
        src="/images/liquifer.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-10"
      />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-8 lg:max-w-[920px] lg:text-center">
        <h2 className="text-[20px] font-bold uppercase leading-[30px] text-[#F07232] lg:text-[40px] lg:leading-[50px]">
          EN BLOG, DER KAN INSPIRERE OG HJÆLPE DIG
        </h2>
        <p className="text-[20px] font-normal leading-[30px] text-white lg:text-[24px] lg:leading-[36px]">
          Få de nyeste opdateringer, tips og indsigter direkte i din indbakke.
          Vores blog deler viden, inspiration og historier, der kan hjælpe dig
          med at tage dine projekter til det næste niveau.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex h-[55px] w-[350px] max-w-full items-stretch lg:mx-auto lg:h-[63px] lg:w-[640px]"
        >
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="h-full w-[93px] border-b border-l border-t border-white bg-transparent px-[9px] text-[20px] text-white placeholder:text-white/65 focus:outline-none lg:w-full lg:px-4"
          />
          <button
            type="submit"
            className="h-full w-[256px] rounded-r-[5px] border border-[#F07232] px-4 text-[20px] font-bold text-[#F07232] transition hover:bg-[#F07232]/10 hover:text-[#F07232] lg:min-w-[220px] lg:text-[24px]"
          >
            TILMELD NU
          </button>
        </form>

        {feedback.message && (
          <p
            className={`text-[18px] ${
              feedback.type === "success" ? "text-green-300" : "text-red-300"
            }`}
          >
            {feedback.message}
          </p>
        )}
      </div>
    </section>
  );
};

export default SubscribeSection;
