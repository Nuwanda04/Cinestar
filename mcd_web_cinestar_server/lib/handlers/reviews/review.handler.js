import dbConnect from "../../db/dbConnect.js";
import reviewModel from "../../db/models/review.model.mjs";

export const addReview = async (body) => {
  try {
    await dbConnect();

    const review = await reviewModel.create(body);

    return {
      status: "ok",
      message: "Review created successfully",
      data: review,
    };
  } catch (error) {
    console.error("Error adding review:", error);
    return {
      status: "error",
      message: "An error occurred while creating the review",
      data: [],
      error: error.message,
    };
  }
};

export const updateReview = async (body) => {
  try {
    await dbConnect();

    const review = await reviewModel.findById(body.id);
    if (!review) {
      return {
        status: "not_found",
        message: "Review not found",
        data: [],
      };
    }

    const updatedReview = await reviewModel.findByIdAndUpdate(body.id, body, {
      new: true,
    });

    return {
      status: "ok",
      message: "Review updated successfully",
      data: updatedReview,
    };
  } catch (error) {
    console.error("Error updating review:", error);
    return {
      status: "error",
      message: "An error occurred while updating the review",
      data: [],
      error: error.message,
    };
  }
};

export const deleteReview = async (id) => {
  try {
    await dbConnect();

    const deletedReview = await reviewModel.findByIdAndDelete(id);

    if (!deletedReview) {
      return {
        status: "not_found",
        message: "Review not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "Review deleted successfully",
      data: deletedReview,
    };
  } catch (error) {
    console.error("Error deleting review:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the review",
      data: [],
      error: error.message,
    };
  }
};
