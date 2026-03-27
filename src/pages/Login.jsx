import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../services/api";
import {
  clearAuth,
  getStoredToken,
  isAdminUser,
  storeAuth,
} from "../services/auth";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Gendan tidligere login fra localStorage, så admin kan sendes direkte videre.
    const token = getStoredToken();
    if (!token) return;

    const payload = storeAuth(token);
    if (isAdminUser(payload)) {
      navigate("/backoffice", { replace: true });
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(apiUrl("auth/signin"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok" || !json?.data?.token) {
        throw new Error("Forkert e-mail eller adgangskode.");
      }

      const payload = storeAuth(json.data.token);

      // Kun admin må fortsætte til backoffice, øvrige brugere logges ud igen.
      if (!isAdminUser(payload)) {
        clearAuth();
        throw new Error("Kun admin har adgang til backoffice.");
      }

      navigate("/backoffice", { replace: true });
    } catch (requestError) {
      setError(requestError.message || "Der opstod en fejl. Prøv igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative w-full overflow-hidden bg-black">
        <img
          src="/images/studio.jpg"
          alt="Login hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1240px] px-5 py-14 text-center lg:px-10 lg:py-24">
          <h1 className="text-[38px] font-bold uppercase leading-none text-white lg:text-[82px]">
            LOGIN
          </h1>
          <p className="mt-5 text-[20px] font-bold uppercase leading-none tracking-[0.08em] text-[var(--color-accent)] lg:text-[24px]">
            CINETAR BACKOFFICE ADGANG
          </p>
        </div>
      </section>

      <section className="bg-black px-5 py-[100px] lg:px-10 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[520px] rounded-xl border border-white/15 bg-[#141414] p-6 lg:p-10">
          <h2 className="text-[30px] font-bold uppercase leading-none text-white lg:text-[48px]">
            LOG IND
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {error && (
              <p className="text-[16px] font-medium text-red-300">{error}</p>
            )}

            <label className="block h-[65px] w-full border-b border-l border-white/80">
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="h-full w-full bg-transparent px-5 text-[20px] font-normal text-white placeholder:text-[#9B9B9B] focus:outline-none"
              />
            </label>

            <label className="block h-[65px] w-full border-b border-l border-white/80">
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="h-full w-full bg-transparent px-5 text-[20px] font-normal text-white placeholder:text-[#9B9B9B] focus:outline-none"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex h-[63px] w-full items-center justify-center gap-2 border border-[var(--color-accent)] text-[20px] font-bold text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black disabled:opacity-60"
            >
              {loading ? "Logger ind..." : "Log ind"}
              <FiArrowRight className="text-[22px]" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
