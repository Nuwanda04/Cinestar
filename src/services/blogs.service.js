import { apiUrl, resolveApiAssetUrl } from "./api";

const normalizeDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const fetchBlogs = async () => {
  const response = await fetch(apiUrl("blogs"));

  if (!response.ok) {
    throw new Error("Kunne ikke hente blogindlæg");
  }

  const payload = await response.json();
  const blogs = Array.isArray(payload?.data) ? payload.data : [];

  return blogs
    .map((blog) => ({
      ...blog,
      image: resolveApiAssetUrl(blog?.image),
    }))
    .sort((a, b) => {
      const dateA = normalizeDate(a?.created)?.getTime() || 0;
      const dateB = normalizeDate(b?.created)?.getTime() || 0;
      return dateB - dateA;
    });
};

export const fetchLatestBlog = async () => {
  const blogs = await fetchBlogs();

  if (blogs.length === 0) return null;

  const latest = blogs[0];

  return latest;
};

export const fetchBlogById = async (id) => {
  const response = await fetch(apiUrl(`blog/${id}`));

  if (!response.ok) {
    throw new Error("Kunne ikke hente blogindlægget");
  }

  const payload = await response.json();
  const blog = payload?.data;

  if (!blog || typeof blog !== "object") {
    throw new Error("Blogindlæg blev ikke fundet");
  }

  return {
    ...blog,
    image: resolveApiAssetUrl(blog?.image),
  };
};
