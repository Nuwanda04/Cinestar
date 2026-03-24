const HeroSection = () => {
  return (
    <section className="w-full bg-black">
      <div className="relative h-[535px] overflow-hidden lg:h-[760px]">
        <img
          src="/images/studio.jpg"
          alt="Cinestar studio"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.13) 0%, rgba(0, 0, 0, 1) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col items-center justify-center gap-7 px-[37px] pb-[100px] pt-[100px] text-center lg:items-start lg:gap-7 lg:px-12 lg:pb-0 lg:pt-0 lg:text-left">
          <div className="w-full max-w-[390px] lg:max-w-[620px]">
            <p className="text-[24px] font-bold uppercase leading-none text-white lg:text-[38px]">
              CINESTAR STUDIO
            </p>

            <h1 className="mt-2 text-[48px] font-bold uppercase leading-none text-white lg:text-[72px]">
              FILM &amp; TV
              <br />
              <span className="text-[#F07232]">PRODUKTION</span>
            </h1>
          </div>

          <p className="w-[316px] text-center text-[20px] font-normal leading-[22px] text-white lg:w-[560px] lg:text-left lg:text-[24px] lg:leading-[30px]">
            Vi skaber levende fortællinger, der fanger dit publikum. Fra idé til
            færdigt produkt leverer vi professionelle film- og tv-løsninger, der
            gør din historie uforglemmelig.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] bg-black">
        <div className="mx-auto flex w-[261px] flex-col gap-10 pb-12 pt-[74px] lg:w-full lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:px-10 lg:py-[70px]">
          <img
            src="/images/awards/award1.png"
            alt="Sundance award"
            className="w-full max-w-[261px] lg:max-w-[320px]"
          />
          <img
            src="/images/awards/award2.png"
            alt="Winner award"
            className="w-full max-w-[261px] lg:max-w-[320px]"
          />
          <img
            src="/images/awards/award3.png"
            alt="Sundance award"
            className="w-full max-w-[261px] lg:max-w-[320px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
