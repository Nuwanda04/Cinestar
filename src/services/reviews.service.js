import { apiUrl } from "./api";

export const fetchReviews = async () => {
  const response = await fetch(apiUrl("reviews"));

  if (!response.ok) {
    throw new Error("Kunne ikke hente anmeldelser");
  }

  const payload = await response.json();
  return Array.isArray(payload?.data) ? payload.data : [];
};
