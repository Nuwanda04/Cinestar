import { FiFilm, FiImage, FiMusic, FiVideo } from "react-icons/fi";

const services = [
  {
    title: "FILM PRODUKTION",
    description:
      "Vi skaber professionelle filmproduktioner, der formidler dit budskab klart, engagerende og visuelt overbevisende.",
    icon: FiFilm,
  },
  {
    title: "EN KREATIV RETNING",
    description:
      "Vi sikrer en kreativ retning, der løfter dit projekt fra almindeligt til uforglemmeligt.",
    icon: FiImage,
  },
  {
    title: "TV PRODUKTION",
    description:
      "Vi leverer komplette løsninger inden for formatudvikling, optagelse og redigering.",
    icon: FiVideo,
  },
  {
    title: "MUSIK VIDEO",
    description:
      "Lad din musik træde frem i et visuelt univers, der forstærker din lyd og dit budskab.",
    icon: FiMusic,
  },
];

const ServiceSection = () => {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <img
        src="/images/liquifer.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-10"
      />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-[30px]">
        <header className="mx-auto w-[310px] text-center lg:w-full lg:max-w-[760px]">
          <p className="text-[20px] font-bold uppercase leading-none text-[#F07232]">
            SERVICE
          </p>
          <h2 className="mt-2 text-[30px] font-bold uppercase leading-none text-white lg:text-[62px]">
            HVILKEN SERVICE
            <br />
            TILBYDER VI ?
          </h2>
        </header>

        <div className="flex flex-col gap-[30px] lg:flex-row lg:items-stretch lg:justify-between lg:gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="flex w-full max-w-[350px] items-center gap-[25px] px-0 py-5 lg:max-w-none lg:flex-1 lg:flex-col lg:items-start lg:gap-6"
              >
                <div className="shrink-0 rounded-xl bg-[#F07232] p-3 text-black">
                  <Icon className="h-10 w-10" />
                </div>

                <div className="text-left">
                  <h3 className="text-[20px] font-bold uppercase leading-[22px] text-white lg:text-[28px] lg:leading-[30px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[18px] font-medium leading-[23px] text-white lg:text-[22px] lg:leading-[30px]">
                    {item.description}
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

export default ServiceSection;
