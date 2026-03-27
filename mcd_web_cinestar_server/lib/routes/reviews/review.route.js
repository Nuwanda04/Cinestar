import express from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  addReview,
  deleteReview,
  updateReview,
} from "../../handlers/reviews/review.handler.js";
import mongoose from "mongoose";

const reviewRoute = express.Router();

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

reviewRoute.post("/review", async (req, res) => {
  try {
    const { name, position, text, rating } = req.body;

    if (!name || !position || !text || !rating) {
      return res.status(400).send({
        status: "error",
        message: "Please provide all required fields",
        data: [],
      });
    }

    const model = {
      name,
      position,
      text,
      rating,
    };

    const result = await addReview(model);

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

reviewRoute.put("/review", async (req, res) => {
  try {
    const { id, name, position, text, rating } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Review ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    if (!name && !position && !text && !rating) {
      return res.status(400).send({
        status: "error",
        message:
          "At least one field (name, position, text, rating) must be provided for update",
        data: [],
      });
    }

    const model = { id, name, position, text, rating };

    const result = await updateReview(model);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

reviewRoute.delete("/review/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Review ID is required",
        data: {},
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteReview(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default reviewRoute;
