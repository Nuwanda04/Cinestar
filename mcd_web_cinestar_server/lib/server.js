import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/mcd/www/index.route.js";
import authRouter from "./routes/auth/auth.js";
import authTokenRouter from "./routes/auth/token.js";
import userRouter from "./routes/users/user.route.js";
import usersRouter from "./routes/users/users.route.js";

import * as path from "path";
import * as url from "url";
import messageRoute from "./routes/messages/message.route.js";
import messagesRouter from "./routes/messages/messages.route.js";
import reviewRoute from "./routes/reviews/review.route.js";
import reviewsRouter from "./routes/reviews/reviews.route.js";
import blogRoute from "./routes/blogs/blog.route.js";
import blogsRouter from "./routes/blogs/blogs.route.js";
import faqRoute from "./routes/faqs/faq.route.js";
import faqsRouter from "./routes/faqs/faqs.route.js";
import subscriptionRoute from "./routes/subscriptions/subscription.route.js";
import subscriptionsRouter from "./routes/subscriptions/subscriptions.route.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);

const server = {};
const expressServer = express();

expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));
expressServer.use(cors());
expressServer.use(cookieParser());

expressServer.use(express.static("[mcd]"));
expressServer.use(express.static("public"));
expressServer.use(express.static("sites"));

/*
  Routes
*/

expressServer.use(indexRouter);

expressServer.use(authRouter);
expressServer.use(authTokenRouter);

expressServer.use(usersRouter);
expressServer.use(userRouter);

expressServer.use(blogsRouter);
expressServer.use(blogRoute);

expressServer.use(messageRoute);
expressServer.use(messagesRouter);

expressServer.use(reviewRoute);
expressServer.use(reviewsRouter);

expressServer.use(faqRoute);
expressServer.use(faqsRouter);

expressServer.use(subscriptionRoute);
expressServer.use(subscriptionsRouter);

expressServer.use(express.static(path.join(__dirname, "../sites", "poc")));
expressServer.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../sites", "poc", "index.html"));
});

expressServer.use(express.static(path.join(__dirname, "../sites", "preview")));
expressServer.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../sites", "preview", "index.html"));
});

expressServer.use(express.static(path.join(__dirname, "../sites", "www")));
expressServer.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../sites", "www", "index.html"));
});

expressServer.use(express.static(path.join(__dirname, "../sites", "vanilla")));
expressServer.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../sites", "vanilla", "index.html"));
});

/*
  Run Server
*/
server.run = () => {
  console.log("\n\n---------------------");
  console.log("Server Started", process.env.NODE_ENV, process.env.SERVER_HOST);
  console.log("\n\n---------------------");

  expressServer.listen(process.env.SERVER_PORT, () =>
    console.log(`Running : ${process.env.SERVER_PORT}`)
  );
};

export default server;
