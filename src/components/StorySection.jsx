const StorySection = () => {
  return (
    <section className="w-full bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-[30px] lg:grid lg:grid-cols-[minmax(0,560px)_minmax(0,520px)] lg:items-start lg:justify-between lg:gap-20">
        <div className="order-3 lg:order-1 lg:self-center">
          <article className="w-[350px] max-w-full lg:w-[520px]">
            <div className="w-[214px] max-w-full lg:w-[320px]">
              <p className="text-[24px] font-bold uppercase leading-none text-[#F07232]">
                DYAS KARDINAL
              </p>
              <p className="mt-1 text-[24px] font-medium uppercase leading-none text-white">
                CEO AF CINESTAR
              </p>
            </div>

            <img
              src="/images/filming.jpg"
              alt="Dyas Kardinal bag kameraet"
              className="mt-3 h-[231px] w-[350px] max-w-full object-cover lg:h-[340px] lg:w-[520px]"
            />
          </article>
        </div>

        <div className="order-1 w-[350px] max-w-full lg:order-2 lg:w-full lg:max-w-[520px]">
          <p className="text-[20px] font-bold uppercase leading-none text-[#F07232]">
            HISTORIEN
          </p>

          <h2 className="mt-2 text-[30px] font-bold uppercase leading-none text-white lg:text-[62px]">
            HISTORIEN BAG
            <br />
            CINESTAR
          </h2>

          <p className="mt-[18px] text-[18px] font-normal leading-[27px] text-white lg:mt-8 lg:max-w-[520px] lg:text-[24px] lg:leading-[40px]">
            Cinestar blev grundlagt med en passion for at fortælle historier,
            der fanger og bevæger sit publikum. Virksomheden begyndte som en
            lille uafhængig film- og tv-produktionsenhed med et klart fokus på
            originalt og visuelt engagerende indhold.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
