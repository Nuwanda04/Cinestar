import { useEffect, useState } from "react";
import { fetchLatestBlog } from "../services/blogs.service";

const fallbackBlog = {
  title: "OPTAGELSERNE TIL MUSIKALBUMMET AF RURI",
  teaser:
    "Bag kulisserne på en kreativ proces, hvor hvert øjeblik tæller. Vi samarbejdede tæt med Ruri for at skabe en visuel fortælling, der komplementerer musikkens dybde og stemning.",
  image: "/images/photoshoot.jpg",
  created: "2025-01-30T00:00:00.000Z",
};

const formatCreatedDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Oprettet d. 30. januar, 2025";
  }

  const day = date.getDate();
  const month = date.toLocaleDateString("da-DK", { month: "long" });
  const year = date.getFullYear();

  return `Oprettet d. ${day}. ${month}, ${year}`;
};

const LatestBlogSection = () => {
  const [blog, setBlog] = useState(fallbackBlog);

  useEffect(() => {
    let isMounted = true;

    const loadLatestBlog = async () => {
      try {
        const latest = await fetchLatestBlog();
        if (!isMounted || !latest) return;

        setBlog({
          title: (latest.title || fallbackBlog.title).toUpperCase(),
          teaser: latest.teaser || fallbackBlog.teaser,
          image: latest.image || fallbackBlog.image,
          created: latest.created || fallbackBlog.created,
        });
      } catch {
        if (isMounted) {
          setBlog(fallbackBlog);
        }
      }
    };

    loadLatestBlog();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-[#212121] px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-9 lg:grid lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:items-start lg:gap-16">
        <header className="w-[350px] max-w-full lg:max-w-[430px]">
          <p className="text-[20px] font-bold uppercase leading-none text-[#f07232]">
            BLOG
          </p>
          <h2 className="mt-2 text-[30px] font-bold uppercase leading-none text-white lg:text-[62px]">
            VORES SENESTE BLOG
          </h2>
          <p className="mt-6 text-[20px] font-normal leading-[27px] text-white lg:text-[24px] lg:leading-[36px]">
            Hold dig opdateret med de seneste nyheder, indblik og historier fra
            Cinestar. Vi deler inspiration, tips og bag kulisserne fra vores
            spændende projekter og produktioner.
          </p>
        </header>

        <article className="w-[350px] max-w-full border border-white/40 lg:w-full lg:max-w-[760px]">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-[197px] w-full object-cover lg:h-[360px]"
          />

          <div className="flex min-h-[378px] flex-col px-[19px] py-6 lg:min-h-[320px] lg:px-8">
            <h3 className="w-[312px] max-w-full text-[30px] font-bold uppercase leading-none text-[var(--color-accent)] lg:w-full lg:text-[42px]">
              {blog.title}
            </h3>

            <p className="mt-6 w-[312px] max-w-full text-[20px] font-normal leading-[30px] text-white lg:w-full lg:text-[24px] lg:leading-[36px]">
              {blog.teaser}
            </p>

            <p className="mt-auto pt-8 text-right text-[13px] font-normal leading-[30px] text-white">
              {formatCreatedDate(blog.created)}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default LatestBlogSection;
