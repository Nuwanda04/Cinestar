import { useState } from "react";
import { createMessage } from "../services/messages.service";

const initialForm = {
  name: "",
  subject: "",
  description: "",
};

export const useContactForm = () => {
  const [contactData, setContactData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!contactData.name || !contactData.subject || !contactData.description) {
      setFeedback({
        type: "error",
        message: "Udfyld venligst navn, emne og besked.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback({ type: "", message: "" });

      const response = await createMessage(contactData);

      setFeedback({
        type: "success",
        message: response?.message || "Din besked er sendt.",
      });
      setContactData(initialForm);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error?.message || "Der opstod en fejl. Prøv igen.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    contactData,
    isSubmitting,
    feedback,
    handleChange,
    handleSubmit,
  };
};
