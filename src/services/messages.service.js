import { apiUrl } from "./api";

export const createMessage = async ({ name, subject, description }) => {
  const response = await fetch(apiUrl("message"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, subject, description }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || "Kunne ikke sende beskeden");
  }

  return payload;
};
