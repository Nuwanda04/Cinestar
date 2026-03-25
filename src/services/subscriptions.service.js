import { apiUrl } from "./api";

export const createSubscription = async (email) => {
  const response = await fetch(apiUrl("subscription"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const payload = await response.json();

  if (!response.ok || payload?.status === "error") {
    throw new Error(payload?.message || "Kunne ikke tilmelde nyhedsbrev");
  }

  return payload;
};
