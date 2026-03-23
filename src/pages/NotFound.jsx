import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page-shell">
      <div className="page-content">
        <p className="page-kicker">404</p>
        <h1 className="page-title">Siden blev ikke fundet</h1>
        <p className="page-text">Den side findes ikke endnu i projektet.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-[#F07232] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-[#ff8f56]"
        >
          Til forsiden
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
