import {
  stubBlogs,
  stubReviews,
  stubMessages,
  stubUsers,
  stubFaqs,
  stubSubscribers,
} from "./seed.data.js";
import {
  seedBlog,
  seedReview,
  seedMessage,
  seedUser,
  seedFaq,
  seedSubscriber,
} from "./seed.helper.js";

export const seedUsers = async () => {
  for (let i = 0; i < stubUsers.length; i++) {
    await seedUser(stubUsers[i]);
  }
};

export const seedBlogs = async () => {
  for (let i = 0; i < stubBlogs.length; i++) {
    await seedBlog(stubBlogs[i]);
  }
};

export const seedMessages = async () => {
  for (let i = 0; i < stubMessages.length; i++) {
    await seedMessage(stubMessages[i]);
  }
};

export const seedReviews = async () => {
  for (let i = 0; i < stubReviews.length; i++) {
    await seedReview(stubReviews[i]);
  }
};

export const seedFaqs = async () => {
  for (let i = 0; i < stubFaqs.length; i++) {
    await seedFaq(stubFaqs[i]);
  }
};

export const seedSubscribers = async () => {
  for (let i = 0; i < stubSubscribers.length; i++) {
    await seedSubscriber(stubSubscribers[i]);
  }
};
