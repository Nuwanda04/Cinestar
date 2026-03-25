import { Link } from "react-router-dom";
import AllBlogsSection from "../components/AllBlogsSection";
import SoMeSection from "../components/SoMeSection";
import SubscribeSection from "../components/SubscribeSection";

const Blog = () => {
  return (
    <>
      <section className="relative w-full overflow-hidden bg-black">
        <img
          src="/images/studio.jpg"
          alt="Blog arkiv hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1240px] px-5 py-14 lg:px-10 lg:py-24">
          <h1 className="text-[38px] font-bold uppercase leading-none text-white lg:text-[82px]">
            BLOG ARKIV
          </h1>
          <p className="mt-5 text-[22px] font-bold leading-none text-white lg:text-[26px]">
            <Link
              to="/"
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              Forside
            </Link>{" "}
            / <span className="text-[var(--color-accent)]">BLOG ARKIV</span>
          </p>
        </div>
      </section>

      <AllBlogsSection />

      <SubscribeSection />

      <SoMeSection />
    </>
  );
};

export default Blog;
