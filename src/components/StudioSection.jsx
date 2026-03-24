import { useEffect, useState } from "react";
import { FiPlay } from "react-icons/fi";
import { fetchStudioVideoUrl } from "../services/studio.service";

const StudioSection = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadVideo = async () => {
      const resolvedVideoUrl = await fetchStudioVideoUrl();
      if (isMounted) {
        setVideoUrl(resolvedVideoUrl);
      }
    };

    loadVideo();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-[30px] lg:gap-12">
        <div className="w-[346px] lg:w-full lg:max-w-[740px]">
          <p className="text-[20px] font-bold uppercase leading-none text-[#F07232]">
            CINESTAR STUDIO
          </p>
          <h2 className="mt-2 text-[30px] font-bold uppercase leading-none text-white lg:text-[62px]">
            HAR DU EN IDÉ TIL DIT
            <br />
            NÆSTE PROJEKT ?
          </h2>
          <p className="mt-4 text-[20px] font-medium leading-[27px] text-white lg:max-w-[720px] lg:text-[30px] lg:leading-[40px]">
            Lad os omsætte dine visioner til levende billeder, der fænger dit
            publikum. Hos os får du en professionel, kreativ proces fra
            ideudvikling til færdig produktion.
          </p>
        </div>

        <div className="w-full">
          <div>
            <div className="relative h-[166px] w-[332px] overflow-hidden lg:h-[520px] lg:w-full lg:max-w-[1160px]">
              <img
                src="/images/studio3.jpg"
                alt="Studio video preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => videoUrl && setIsVideoOpen(true)}
                className="absolute inset-0 grid place-items-center"
                aria-label="Afspil video"
              >
                <span className="grid h-[70px] w-[70px] place-items-center rounded-full border-[8px] border-[#F07232] bg-black/50 text-[#F07232] lg:h-[112px] lg:w-[112px] lg:border-[10px]">
                  <FiPlay className="ml-1 text-[30px] lg:text-[56px]" />
                </span>
              </button>
            </div>

            <h3 className="mt-5 w-[326px] text-[20px] font-bold uppercase leading-none text-white lg:mt-8 lg:w-[760px] lg:text-[42px]">
              TØV IKKE MED AT VÆLGE CINESTAR TIL DIT NÆSTE FILM-PROJEKT
            </h3>

            <p className="mt-5 w-[336px] text-[20px] font-medium leading-[27px] text-white lg:mt-8 lg:w-[760px] lg:text-[30px] lg:leading-[42px]">
              Hos Cinestar kombinerer vi vores passion for historiefortælling
              med et skarpt øje for detaljen. Med moderne udstyr og et erfarent
              team sikrer vi, at din produktion løfter sig fra skitse til
              strålende slutresultat - hver gang.
            </p>
          </div>

          <div className="flex w-[350px] flex-col items-center gap-5 pt-6 text-center lg:w-full lg:flex-row lg:items-start lg:justify-start lg:gap-16 lg:pt-10">
            <div className="h-[74px] w-full lg:h-auto lg:w-[250px]">
              <p className="text-[40px] font-bold leading-[32px] text-[#F07232] lg:text-[72px] lg:leading-[62px]">
                250+
              </p>
              <p className="mt-[10px] text-[20px] font-bold uppercase leading-[32px] text-white lg:text-[24px] lg:leading-[34px]">
                FILM PRODUKTION
              </p>
            </div>
            <div className="h-[74px] w-full lg:h-auto lg:w-[250px]">
              <p className="text-[40px] font-bold leading-[32px] text-[#F07232] lg:text-[72px] lg:leading-[62px]">
                78+
              </p>
              <p className="mt-[10px] text-[20px] font-bold uppercase leading-[32px] text-white lg:text-[24px] lg:leading-[34px]">
                MUSIK VIDEO
              </p>
            </div>
          </div>
        </div>
      </div>

      {isVideoOpen && videoUrl && (
        <div
          className="fixed inset-0 z-[80] bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-auto flex h-full w-full max-w-[980px] flex-col justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="self-end rounded border border-white/40 px-4 py-2 text-sm uppercase tracking-[0.08em] text-white"
            >
              Luk video
            </button>
            <video className="w-full" controls autoPlay src={videoUrl}>
              Din browser understøtter ikke videoafspilning.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudioSection;
