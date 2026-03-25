import { apiUrl } from "./api";

export const fetchFaqs = async () => {
  const response = await fetch(apiUrl("faqs"));

  if (!response.ok) {
    throw new Error("Kunne ikke hente FAQs");
  }

  const payload = await response.json();
  return Array.isArray(payload?.data) ? payload.data : [];
};
