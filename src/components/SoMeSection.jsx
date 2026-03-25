const socialLinks = [
  { label: "FACEBOOK", href: "https://www.facebook.com" },
  { label: "TWITTER", href: "https://x.com" },
  { label: "LINKEDIN", href: "https://www.linkedin.com" },
  { label: "INSTAGRAM", href: "https://www.instagram.com" },
  { label: "YOUTUBE", href: "https://www.youtube.com" },
];

const SoMeSection = () => {
  return (
    <section className="w-full bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center text-center">
        <div className="w-[344px] max-w-full lg:w-full lg:max-w-[1400px]">
          <h2 className="text-[32px] font-bold uppercase leading-none text-white lg:text-[64px] lg:leading-[0.95]">
            <span className="lg:hidden">
              HAR DU EN IDÉ I
              <br />
              TANKERNE?
              <br />
              LAD OS STARTE DIT
              <br />
              PROJEKT SAMMEN
            </span>
            <span className="hidden lg:block">
              HAR DU EN IDÉ I TANKERNE?
              <br />
              LAD OS STARTE DIT PROJEKT SAMMEN
            </span>
          </h2>

          <div className="mt-8 text-[20px] font-bold leading-[30px] text-[#F07232] lg:text-[28px] lg:leading-[40px]">
            <p>Cinestar Studio</p>
            <p>+123-456-789</p>
            <p>hello@awesomesite.com</p>
          </div>
        </div>

        <div className="mt-10 grid w-[332px] max-w-full grid-cols-2 justify-items-center gap-y-4 text-white lg:mt-12 lg:w-full lg:max-w-[920px] lg:grid-cols-5">
          {socialLinks.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`text-[24px] font-bold uppercase leading-[1.1] transition-colors hover:text-[#F07232] ${
                index === socialLinks.length - 1
                  ? "col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoMeSection;
