import express from "express";
import mongoose from "mongoose";
import {
  addSubscription,
  deleteSubscription,
  updateSubscription,
} from "../../handlers/subscriptions/subscription.handler.js";
import auth from "../../middleware/auth.middleware.js";

const subscriptionRoute = express.Router();

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

subscriptionRoute.post("/subscription", async (req, res) => {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();

    if (!email) {
      return res.status(400).send({
        status: "error",
        message: "Subscription email is required",
        data: [],
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).send({
        status: "error",
        message: "Please provide a valid email address",
        data: [],
      });
    }

    const model = { email };

    const result = await addSubscription(model);

    if (result.status === "conflict") {
      return res.status(409).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error in POST /subscription:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

subscriptionRoute.put("/subscription", auth, async (req, res) => {
  try {
    const { id, email } = req.body;

    if (!id || !email) {
      return res.status(400).send({
        status: "error",
        message: "Subscription ID and email are required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const model = { ...req.body };

    const result = await updateSubscription(model);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

subscriptionRoute.delete("/subscription/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Subscription ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteSubscription(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default subscriptionRoute;
