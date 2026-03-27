import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiUrl } from "../services/api";
import {
  clearAuth,
  getStoredToken,
  getStoredUser,
  isAdminUser,
} from "../services/auth";

const initialBlogForm = {
  id: "",
  title: "",
  teaser: "",
  description: "",
  file: null,
};

const initialFaqForm = {
  id: "",
  question: "",
  answer: "",
};

const truncateText = (value, maxChars = 120) => {
  const text = String(value || "").trim();
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars - 3)}...`;
};

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

const Backoffice = () => {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(getStoredUser());

  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const [blogCreateForm, setBlogCreateForm] = useState(initialBlogForm);
  const [blogEditForm, setBlogEditForm] = useState(initialBlogForm);
  const [faqCreateForm, setFaqCreateForm] = useState(initialFaqForm);
  const [faqEditForm, setFaqEditForm] = useState(initialFaqForm);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const resetFeedback = () => {
    setMessage("");
    setError("");
  };

  // Hent blogs og FAQ'er parallelt, så UI opdateres med et samlet datasæt.
  const fetchData = async () => {
    try {
      const [blogsRes, faqsRes] = await Promise.all([
        fetch(apiUrl("blogs")),
        fetch(apiUrl("faqs")),
      ]);

      const [blogsJson, faqsJson] = await Promise.all([
        blogsRes.json(),
        faqsRes.json(),
      ]);

      setBlogs(Array.isArray(blogsJson?.data) ? blogsJson.data : []);
      setFaqs(Array.isArray(faqsJson?.data) ? faqsJson.data : []);
    } catch {
      setError("Kunne ikke hente backoffice data.");
    }
  };

  useEffect(() => {
    // Verificer token mod backend, så udløbne/ugyldige sessioner ryddes korrekt.
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(apiUrl("auth/token"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const json = await response.json();

        // Ved ugyldigt token nulstilles auth-state, så brugeren sendes til login.
        if (!response.ok || json?.status !== "ok" || !json?.data) {
          clearAuth();
          setToken(null);
          setUser(null);
          return;
        }

        setUser(json.data);
      } catch {
        clearAuth();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  useEffect(() => {
    if (!loading && token && isAdminUser(user)) {
      fetchData();
    }
  }, [loading, token, user]);

  const handleLogout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  const handleBlogCreateChange = (event) => {
    const { name, value, files } = event.target;
    setBlogCreateForm((prev) => ({
      ...prev,
      [name]: name === "file" ? files?.[0] || null : value,
    }));
  };

  const handleBlogEditChange = (event) => {
    const { name, value, files } = event.target;
    setBlogEditForm((prev) => ({
      ...prev,
      [name]: name === "file" ? files?.[0] || null : value,
    }));
  };

  const handleFaqCreateChange = (event) => {
    const { name, value } = event.target;
    setFaqCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFaqEditChange = (event) => {
    const { name, value } = event.target;
    setFaqEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitBlogCreate = async (event) => {
    event.preventDefault();
    resetFeedback();

    // Send multipart/form-data, fordi blog-oprettelse kan inkludere billede.
    const formData = new FormData();
    formData.append("title", blogCreateForm.title);
    formData.append("teaser", blogCreateForm.teaser);
    formData.append("description", blogCreateForm.description);
    if (blogCreateForm.file) formData.append("file", blogCreateForm.file);

    try {
      const response = await fetch(apiUrl("blog"), {
        method: "POST",
        headers: authHeaders(token),
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke oprette blog.");
      }

      setMessage("Blog oprettet.");
      setBlogCreateForm(initialBlogForm);
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke oprette blog.");
    }
  };

  const submitBlogUpdate = async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!blogEditForm.id) {
      setError("Vaelg en blog at opdatere.");
      return;
    }

    // Opdatering bruger samme format som oprettelse, inkl. valgfri fil.
    const formData = new FormData();
    formData.append("id", blogEditForm.id);
    formData.append("title", blogEditForm.title);
    formData.append("teaser", blogEditForm.teaser);
    formData.append("description", blogEditForm.description);
    if (blogEditForm.file) formData.append("file", blogEditForm.file);

    try {
      const response = await fetch(apiUrl("blog"), {
        method: "PUT",
        headers: authHeaders(token),
        body: formData,
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke opdatere blog.");
      }

      setMessage("Blog opdateret.");
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke opdatere blog.");
    }
  };

  const deleteBlog = async (id) => {
    resetFeedback();

    if (!window.confirm("Er du sikker pa at du vil slette denne blog?")) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`blog/${id}`), {
        method: "DELETE",
        headers: authHeaders(token),
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke slette blog.");
      }

      setMessage("Blog slettet.");
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke slette blog.");
    }
  };

  const submitFaqCreate = async (event) => {
    event.preventDefault();
    resetFeedback();

    try {
      const response = await fetch(apiUrl("faq"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(token),
        },
        body: JSON.stringify({
          question: faqCreateForm.question,
          answer: faqCreateForm.answer,
        }),
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke oprette FAQ.");
      }

      setMessage("FAQ oprettet.");
      setFaqCreateForm(initialFaqForm);
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke oprette FAQ.");
    }
  };

  const submitFaqUpdate = async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!faqEditForm.id) {
      setError("Vaelg en FAQ at opdatere.");
      return;
    }

    try {
      const response = await fetch(apiUrl("faq"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(token),
        },
        body: JSON.stringify({
          id: faqEditForm.id,
          question: faqEditForm.question,
          answer: faqEditForm.answer,
        }),
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke opdatere FAQ.");
      }

      setMessage("FAQ opdateret.");
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke opdatere FAQ.");
    }
  };

  const deleteFaq = async (id) => {
    resetFeedback();

    if (!window.confirm("Er du sikker pa at du vil slette denne FAQ?")) {
      return;
    }

    try {
      const response = await fetch(apiUrl(`faq/${id}`), {
        method: "DELETE",
        headers: authHeaders(token),
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok") {
        throw new Error(json.message || "Kunne ikke slette FAQ.");
      }

      setMessage("FAQ slettet.");
      await fetchData();
    } catch (requestError) {
      setError(requestError.message || "Kunne ikke slette FAQ.");
    }
  };

  // Ingen token efter validering betyder, at brugeren skal tilbage til login.
  if (!token && !loading) {
    return <Navigate to="/login" replace />;
  }

  // Vis afventning mens token kontrolleres for at undgå flimmer i UI.
  if (loading) {
    return (
      <section className="bg-black px-5 py-[140px] text-center text-white">
        <p className="text-[24px] font-medium">Tjekker adgang...</p>
      </section>
    );
  }

  // Kun admin-brugere må se og bruge backoffice CRUD-funktionerne.
  if (!isAdminUser(user)) {
    return (
      <section className="bg-black px-5 py-[140px]">
        <div className="mx-auto w-full max-w-[900px] rounded-xl border border-white/20 bg-[#141414] p-8 text-center lg:p-12">
          <h1 className="text-[44px] font-bold uppercase leading-none text-white lg:text-[72px]">
            INGEN ADGANG
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] text-[20px] leading-[30px] text-white">
            Kun admin-brugere har adgang til backoffice.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-[55px] min-w-[180px] items-center justify-center border border-[var(--color-accent)] px-6 text-[18px] font-bold uppercase text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
            >
              Log ud
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
      <div className="mx-auto w-full max-w-[1240px] rounded-xl border border-white/20 bg-[#141414] p-6 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[20px] font-bold uppercase leading-none text-[var(--color-accent)]">
              CINESTAR
            </p>
            <h1 className="mt-2 text-[44px] font-bold uppercase leading-none text-white lg:text-[72px]">
              BACKOFFICE
            </h1>
            <p className="mt-4 text-[20px] font-medium leading-[30px] text-white">
              Logget ind som {user?.name || user?.email || "admin"}.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-[63px] w-[220px] items-center justify-center border border-[var(--color-accent)] text-[20px] font-bold text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
          >
            Log ud
          </button>
        </div>

        {(message || error) && (
          <div className="mt-8 rounded-xl border border-white/15 bg-black/40 p-4">
            {message && (
              <p className="text-[18px] font-medium text-green-300">
                {message}
              </p>
            )}
            {error && (
              <p className="text-[18px] font-medium text-red-300">{error}</p>
            )}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-white/20 bg-black p-5 lg:p-6">
            <h2 className="text-[30px] font-bold uppercase leading-none text-white">
              BLOG CRUD
            </h2>

            <form
              onSubmit={submitBlogCreate}
              className="mt-5 flex flex-col gap-3"
            >
              <input
                name="title"
                value={blogCreateForm.title}
                onChange={handleBlogCreateChange}
                placeholder="Titel"
                className="h-[52px] w-full border border-white/30 bg-black px-4 text-[18px] text-white placeholder:text-white/55 focus:outline-none"
                required
              />
              <input
                name="teaser"
                value={blogCreateForm.teaser}
                onChange={handleBlogCreateChange}
                placeholder="Teaser"
                className="h-[52px] w-full border border-white/30 bg-black px-4 text-[18px] text-white placeholder:text-white/55 focus:outline-none"
                required
              />
              <textarea
                name="description"
                value={blogCreateForm.description}
                onChange={handleBlogCreateChange}
                placeholder="Beskrivelse"
                className="h-[120px] w-full resize-none border border-white/30 bg-black px-4 py-3 text-[18px] text-white placeholder:text-white/55 focus:outline-none"
                required
              />
              <input
                type="file"
                name="file"
                onChange={handleBlogCreateChange}
                className="w-full border border-white/30 bg-black px-4 py-3 text-[16px] text-white file:mr-3 file:border file:border-[var(--color-accent)] file:bg-transparent file:px-3 file:py-1.5 file:text-[var(--color-accent)]"
              />

              <button
                type="submit"
                className="mt-1 h-[55px] w-full border border-[var(--color-accent)] text-[18px] font-bold uppercase text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
              >
                Opret blog
              </button>
            </form>

            <form
              onSubmit={submitBlogUpdate}
              className="mt-6 flex flex-col gap-3 border-t border-white/20 pt-5"
            >
              <select
                value={blogEditForm.id}
                onChange={(event) => {
                  const picked = blogs.find(
                    (blog) => blog._id === event.target.value,
                  );
                  if (!picked) {
                    setBlogEditForm(initialBlogForm);
                    return;
                  }

                  setBlogEditForm({
                    id: picked._id,
                    title: picked.title || "",
                    teaser: picked.teaser || "",
                    description: picked.description || "",
                    file: null,
                  });
                }}
                className="h-[52px] w-full border border-white/30 bg-black px-4 text-[18px] text-white focus:outline-none"
              >
                <option value="">Vælg blog at redigere</option>
                {blogs.map((blog) => (
                  <option key={blog._id} value={blog._id}>
                    {blog.title}
                  </option>
                ))}
              </select>

              <input
                name="title"
                value={blogEditForm.title}
                onChange={handleBlogEditChange}
                placeholder="Titel"
                className="h-[52px] w-full border border-white/30 bg-black px-4 text-[18px] text-white placeholder:text-white/55 focus:outline-none"
              />
              <input
                name="teaser"
                value={blogEditForm.teaser}
                onChange={handleBlogEditChange}
                placeholder="Teaser"
                className="h-[52px] w-full border border-white/30 bg-black px-4 text-[18px] text-white placeholder:text-white/55 focus:outline-none"
              />
              <textarea
                name="description"
                value={blogEditForm.description}
                onChange={handleBlogEditChange}
                placeholder="Beskrivelse"
                className="h-[120px] w-full resize-none border border-white/30 bg-black px-4 py-3 text-[18px] text-white placeholder:text-white/55 focus:outline-none"
              />
              <input
                type="file"
                name="file"
                onChange={handleBlogEditChange}
                className="w-full border border-white/30 bg-black px-4 py-3 text-[16px] text-white file:mr-3 file:border file:border-[var(--color-accent)] file:bg-transparent file:px-3 file:py-1.5 file:text-[var(--color-accent)]"
              />

              <button
                type="submit"
                className="mt-1 h-[55px] w-full border border-[var(--color-accent)] text-[18px] font-bold uppercase text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
              >
                Opdater blog
              </button>
            </form>

            <div className="mt-6 space-y-3 border-t border-white/20 pt-5">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="rounded-lg border border-white/15 bg-[#111] p-3"
                >
                  <p className="text-[18px] font-bold uppercase text-white">
                    {blog.title}
                  </p>
                  <p className="mt-2 text-[15px] leading-[22px] text-white/80">
                    {truncateText(blog.teaser || blog.description, 120)}
                  </p>
                  <button
                    type="button"
                    onClick={() => deleteBlog(blog._id)}
                    className="mt-3 inline-flex h-[38px] items-center justify-center border border-red-300 px-3 text-[14px] font-bold uppercase text-red-300 transition hover:bg-red-400/10"
                  >
                    Slet blog
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-white/20 bg-black p-5 lg:p-6">
            <h2 className="text-[30px] font-bold uppercase leading-none text-white">
              FAQ CRUD
            </h2>

            <form
              onSubmit={submitFaqCreate}
              className="mt-5 flex flex-col gap-3"
            >
              <input
                name="question"
                value={faqCreateForm.question}
                onChange={handleFaqCreateChange}
                placeholder="Spørgsmål"
                className="h-[52px] w-full border border-white/30 bg-black px-4 text-[18px] text-white placeholder:text-white/55 focus:outline-none"
                required
              />
              <textarea
                name="answer"
                value={faqCreateForm.answer}
                onChange={handleFaqCreateChange}
                placeholder="Svar"
                className="h-[120px] w-full resize-none border border-white/30 bg-black px-4 py-3 text-[18px] text-white placeholder:text-white/55 focus:outline-none"
                required
              />

              <button
                type="submit"
                className="mt-1 h-[55px] w-full border border-[var(--color-accent)] text-[18px] font-bold uppercase text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
              >
                Opret FAQ
              </button>
            </form>

            <form
              onSubmit={submitFaqUpdate}
              className="mt-6 flex flex-col gap-3 border-t border-white/20 pt-5"
            >
              <select
                value={faqEditForm.id}
                onChange={(event) => {
                  const picked = faqs.find(
                    (faq) => faq._id === event.target.value,
                  );
                  if (!picked) {
                    setFaqEditForm(initialFaqForm);
                    return;
                  }

                  setFaqEditForm({
                    id: picked._id,
                    question: picked.question || "",
                    answer: picked.answer || "",
                  });
                }}
                className="h-[52px] w-full border border-white/30 bg-black px-4 text-[18px] text-white focus:outline-none"
              >
                <option value="">Vælg FAQ at redigere</option>
                {faqs.map((faq) => (
                  <option key={faq._id} value={faq._id}>
                    {faq.question}
                  </option>
                ))}
              </select>

              <input
                name="question"
                value={faqEditForm.question}
                onChange={handleFaqEditChange}
                placeholder="Spørgsmål"
                className="h-[52px] w-full border border-white/30 bg-black px-4 text-[18px] text-white placeholder:text-white/55 focus:outline-none"
              />
              <textarea
                name="answer"
                value={faqEditForm.answer}
                onChange={handleFaqEditChange}
                placeholder="Svar"
                className="h-[120px] w-full resize-none border border-white/30 bg-black px-4 py-3 text-[18px] text-white placeholder:text-white/55 focus:outline-none"
              />

              <button
                type="submit"
                className="mt-1 h-[55px] w-full border border-[var(--color-accent)] text-[18px] font-bold uppercase text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
              >
                Opdater FAQ
              </button>
            </form>

            <div className="mt-6 space-y-3 border-t border-white/20 pt-5">
              {faqs.map((faq) => (
                <div
                  key={faq._id}
                  className="rounded-lg border border-white/15 bg-[#111] p-3"
                >
                  <p className="text-[18px] font-bold uppercase text-white">
                    {faq.question}
                  </p>
                  <p className="mt-2 text-[15px] leading-[22px] text-white/80">
                    {truncateText(faq.answer, 160)}
                  </p>
                  <button
                    type="button"
                    onClick={() => deleteFaq(faq._id)}
                    className="mt-3 inline-flex h-[38px] items-center justify-center border border-red-300 px-3 text-[14px] font-bold uppercase text-red-300 transition hover:bg-red-400/10"
                  >
                    Slet FAQ
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Backoffice;
