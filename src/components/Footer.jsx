const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black">
      <img
        src="/images/liquifer.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-10"
      />

      <div className="relative mx-auto flex min-h-[220px] w-full max-w-[1280px] flex-col items-center justify-center px-6 py-10 text-center lg:min-h-[260px]">
        <img
          src="/images/logo.png"
          alt="Cinestar"
          className="h-[34px] w-auto sm:h-[40px]"
        />
        <p className="mt-6 w-full max-w-[366px] text-center text-[18px] font-normal uppercase leading-[29px] tracking-[0] text-[#FFFFFF]">
          COPYRIGHT 202 © CINESTAR |
          <br />
          POWERED BY ROMETHEM E STUDIO
        </p>
      </div>
    </footer>
  );
};

export default Footer;
