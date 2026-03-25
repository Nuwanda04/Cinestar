import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBlogById } from "../services/blogs.service";

const fallbackBlog = {
  title: "OPTAGELSERNE TIL MUSIKALBUMMET AF RURI",
  image: "/images/photoshoot.jpg",
  created: "2025-01-30T00:00:00.000Z",
  description:
    "Et samarbejde, hvor kreativitet og teknologi forenes. Vi arbejdede tæt med Ruri for at skabe unikke visuelle elementer, der matcher albummets lydunivers og fortælling.\n\nOptagelserne var en dybt inspirerende proces, hvor vi kombinerede moderne filmteknikker med en kunstnerisk tilgang for at fange albummets sjæl.\n\nFra planlægningen af visuelle koncepter til det endelige produkt blev hvert trin nøje koordineret i tæt dialog med Ruri og hans team.",
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

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(fallbackBlog);

  useEffect(() => {
    let isMounted = true;

    const loadBlog = async () => {
      if (!id) return;

      try {
        const data = await fetchBlogById(id);
        if (!isMounted) return;

        setBlog({
          title: (data?.title || fallbackBlog.title).toUpperCase(),
          image: data?.image || fallbackBlog.image,
          created: data?.created || fallbackBlog.created,
          description: data?.description || fallbackBlog.description,
        });
      } catch {
        if (isMounted) {
          setBlog(fallbackBlog);
        }
      }
    };

    loadBlog();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const paragraphs = useMemo(() => {
    return String(blog.description || "")
      .split(/\n\s*\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [blog.description]);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-black">
        <img
          src="/images/studio.jpg"
          alt="Blog detail hero"
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
            /{" "}
            <Link
              to="/blog"
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              BLOG ARKIV
            </Link>{" "}
            / <span className="text-[var(--color-accent)]">BLOG</span>
          </p>
        </div>
      </section>

      <section className="w-full bg-black px-5 py-[72px] lg:px-10 lg:py-[120px]">
        <article className="mx-auto w-full max-w-[1240px] border border-white/40 bg-[#050505] p-4 lg:p-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-[197px] w-full object-cover lg:h-[440px]"
          />

          <h2 className="mt-8 font-sans text-[20px] font-medium uppercase leading-none text-[var(--color-accent)] lg:text-[34px]">
            {blog.title}
          </h2>

          <p className="mt-1 font-sans text-[15px] font-medium leading-none text-white lg:text-[18px]">
            {formatCreatedDate(blog.created)}
          </p>

          <div className="mt-5 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 24)}`}
                className="font-sans text-[20px] font-medium leading-[30px] text-white lg:text-[24px] lg:leading-[36px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </section>
    </>
  );
};

export default BlogDetail;
