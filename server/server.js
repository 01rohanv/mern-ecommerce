import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDb } from "./db/db.js";
import authRouter from "./routes/auth/auth-routes.js";
import adminProductsRouter from "./routes/admin/product-route.js";
import adminOrderRouter from "./routes/admin/order-route.js";
import shopProductsRouter from "./routes/shop/product-route.js";
import shopCartRouter from "./routes/shop/cart-route.js";
import shopAddressRouter from "./routes/shop/address-route.js";
import shopOrderRouter from "./routes/shop/order-route.js";
import shopSearchRouter from "./routes/shop/search-route.js";
import shopReviewRouter from "./routes/shop/review-route.js";
import commonFeatureRouter from "./routes/common/feature-route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectToDb();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("Running on port:" + PORT);
});
