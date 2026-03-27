import userModel from "../../models/user.model.mjs";
import dbConnect from "../../dbConnect.js";
import blogModel from "../../models/blog.model.mjs";
import messageModel from "../../models/message.model.mjs";
import reviewModel from "../../models/review.model.mjs";
import faqModel from "../../models/faq.model.mjs";
import subscriptionModel from "../../models/subscription.model.mjs";


    Create new User

 */
export const seedUser = async (user) => {
  console.log("-- User --");
  console.log(user);
  console.log("--\n");

  await dbConnect();

  try {
    user.picture = process.env.SERVER_HOST + user.picture;
    let newUser = await userModel.create(user);

    return newUser;
  } catch (error) {
    console.log(error);
  }
};


    Create new Blog

 */
export const seedBlog = async (blog) => {
  console.log("-- Blog --");
  console.log(blog);
  console.log("--\n");

  await dbConnect();

  try {
    blog.image = process.env.SERVER_HOST + blog.image;
    let newBlog = await blogModel.create(blog);

    return newBlog;
  } catch (error) {
    console.log(error);
  }
};


    Create new Message

 */
export const seedMessage = async (message) => {
  console.log("-- Message --");
  console.log(message);
  console.log("--\n");

  await dbConnect();

  try {
    let newMessage = await messageModel.create(message);
    return newMessage;
  } catch (error) {
    console.log(error);
  }
};


    Create new Review

 */
export const seedReview = async (review) => {
  console.log("-- Review --");
  console.log(review);
  console.log("--\n");

  await dbConnect();

  try {
    review.image = process.env.SERVER_HOST + review.image;
    let newReview = await reviewModel.create(review);
    return newReview;
  } catch (error) {
    console.log(error);
  }
};


    Create new faq

 */
export const seedFaq = async (faq) => {
  console.log("-- Faq --");
  console.log(faq);
  console.log("--\n");

  await dbConnect();

  try {
    let newFaq = await faqModel.create(faq);
    return newFaq;
  } catch (error) {
    console.log(error);
  }
};


    Create new subscriber

 */
export const seedSubscriber = async (faq) => {
  console.log("-- Subscriber --");
  console.log(faq);
  console.log("--\n");

  await dbConnect();

  try {
    let newSubscriber = await subscriptionModel.create(faq);
    return newSubscriber;
  } catch (error) {
    console.log(error);
  }
};
