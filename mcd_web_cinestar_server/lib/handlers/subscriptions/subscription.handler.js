import dbConnect from "../../db/dbConnect.js";
import subscriptionModel from "../../db/models/subscription.model.mjs";

export const addSubscription = async (body) => {
  try {
    await dbConnect();

    const subscription = await subscriptionModel.create(body);

    return {
      status: "ok",
      message: "Subscription created successfully",
      data: subscription,
    };
  } catch (error) {
    console.error("Error adding subscription:", error);

    if (error?.code === 11000) {
      return {
        status: "conflict",
        message: "Email is already subscribed",
        data: [],
        error: error.message,
      };
    }

    return {
      status: "error",
      message: "An error occurred while creating the subscription",
      data: [],
      error: error.message,
    };
  }
};

export const updateSubscription = async (body) => {
  try {
    await dbConnect();

    const subscription = await subscriptionModel.findById(body.id);
    if (!subscription) {
      return {
        status: "not_found",
        message: "Subscription not found",
        data: [],
      };
    }

    const updatedSubscription = await subscriptionModel.findByIdAndUpdate(
      body.id,
      body,
      {
        new: true,
      },
    );

    return {
      status: "ok",
      message: "Subscription updated successfully",
      data: updatedSubscription,
    };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return {
      status: "error",
      message: "An error occurred while updating the subscription",
      data: [],
      error: error.message,
    };
  }
};

export const deleteSubscription = async (id) => {
  try {
    await dbConnect();

    const deletedSubscription = await subscriptionModel.findByIdAndDelete(id);

    if (!deletedSubscription) {
      return {
        status: "not_found",
        message: "Subscription not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "Subscription deleted successfully",
      data: deletedSubscription,
    };
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the subscription",
      data: [],
      error: error.message,
    };
  }
};
