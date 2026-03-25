import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../services/blogs.service";

const fallbackBlogs = [
  {
    _id: "fallback-1",
    title: "OPTAGELSERNE TIL MUSIKALBUMMET AF RURI",
    teaser:
      "Et samarbejde, hvor kreativitet og teknologi forenes. Vi arbejdede tæt med Ruri for at skabe unikke visuelle elementer.",
    image: "/images/photoshoot.jpg",
    created: "2025-01-30T00:00:00.000Z",
  },
];

const formatCreatedDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Oprettet d. 30. januar, 2025";

  const day = date.getDate();
  const month = date.toLocaleDateString("da-DK", { month: "long" });
  const year = date.getFullYear();
  return `Oprettet d. ${day}. ${month}, ${year}`;
};

const AllBlogsSection = () => {
  const [blogs, setBlogs] = useState(fallbackBlogs);

  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        if (!isMounted) return;
        if (data.length > 0) {
          setBlogs(data);
        }
      } catch {
        if (isMounted) {
          setBlogs(fallbackBlogs);
        }
      }
    };

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <div className="mx-auto grid w-full max-w-[1240px] gap-8 lg:grid-cols-3 lg:gap-10">
        {blogs.map((blog) => (
          <article
            key={blog._id || blog.title}
            className="flex min-h-[575px] w-full max-w-[350px] flex-col border border-white/40 bg-[#141414]"
          >
            <img
              src={blog.image || "/images/photoshoot.jpg"}
              alt={blog.title}
              className="h-[197px] w-full object-cover"
            />

            <div className="flex flex-1 flex-col px-4 py-5">
              <h2 className="text-[var(--color-accent)] text-[20px] font-medium uppercase leading-[30px] lg:text-[28px] lg:leading-[38px]">
                {(blog.title || "BLOGINDLÆG").toUpperCase()}
              </h2>

              <p className="mt-5 text-[20px] font-normal leading-[30px] text-white">
                {blog.teaser || "Læs mere om dette indlæg."}
              </p>

              <div className="mt-auto pt-8">
                <Link
                  to={blog._id ? `/blog/${blog._id}` : "/blog"}
                  className="inline-flex h-[63px] w-[212px] items-center justify-center border border-[#f07232] text-[24px] font-bold text-[#f07232] transition hover:bg-[#f07232]/10 hover:text-[#f07232]"
                >
                  LÆS MERE
                </Link>
              </div>

              <p className="mt-5 text-right text-[13px] font-normal leading-[30px] text-white">
                {formatCreatedDate(blog.created)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AllBlogsSection;
