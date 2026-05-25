# Backend Learning Documentation — Node.js + Express + MongoDB

## 📌 Project Overview

This project is a beginner-friendly backend architecture using:

- Node.js
- Express.js
- MongoDB
- Mongoose ORM
- JWT Authentication
- Nodemailer
- MVC Structure

The goal is to learn how professional backend applications are structured and built.

---

# 🚀 Step 1 — Create Project

## Create Folder

```bash
mkdir backend-learning
cd backend-learning
```

## Initialize Node Project

```bash
npm init -y
```

---

# 📁 Step 2 — Create Project Structure

```bash
backend-learning/
│
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── constants/
│   ├── app.js
│   └── index.js
│
├── .env
├── .gitignore
├── .prettierrc
├── package.json
└── README.md
```

---

# 📖 Folder Explanation

## controllers/

Used to store all business logic functions.

```js
const registerUser = async (req, res) => {
  res.json({
    message: "User Registered",
  });
};
```

---

## db/

Used for MongoDB database connection.

```js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database Error", error);
    process.exit(1);
  }
};

export default connectDB;
```

---

## middlewares/

Middleware handles request/response before controller execution.

```js
const authMiddleware = (req, res, next) => {
  console.log("Middleware Called");

  next();
};

export default authMiddleware;
```

---

## models/

Used to create MongoDB schemas and models.

```js
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
```

---

## routes/

Used to define API endpoints.

```js
import express from "express";

const router = express.Router();

router.post("/register", registerUser);

export default router;
```

---

## utils/

Used for reusable helper functions.

Examples:
- JWT helpers
- Mail helpers
- Async handlers
- API response helpers

---

# 🔥 Step 3 — Install Packages

## Main Packages

```bash
npm install express mongoose dotenv cors cookie-parser bcrypt jsonwebtoken nodemailer mailgen
```

## Dev Packages

```bash
npm install -D nodemon prettier
```

---

# ⚙️ Step 4 — Setup Prettier

## Create `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": false
}
```

---

# ⚙️ Step 5 — Setup Git

## Initialize Git

```bash
git init
```

## Create `.gitignore`

```bash
node_modules
.env
```

---

# 🔐 Step 6 — Create `.env`

```env
PORT=8000

MONGO_URI=your_mongodb_url

ACCESS_TOKEN_SECRET=access_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=refresh_secret
REFRESH_TOKEN_EXPIRY=7d
```

---

# 🚀 Step 7 — Create Express Server

## src/app.js

```js
import express from "express";

const app = express();

app.use(express.json());

export default app;
```

## src/index.js

```js
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
```

---

# 🩺 Step 8 — Health Check API

## Controller

```js
const healthCheck = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
};
```

## Route

```js
router.get("/health", healthCheck);
```

---

# 🔄 Step 9 — Async Handler

```js
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default asyncHandler;
```

---

# 📦 Step 10 — API Response Utility

```js
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
```

---

# ❌ Step 11 — API Error Utility

```js
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong") {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
  }
}

export default ApiError;
```

---

# 📌 Step 12 — Constants File

```js
export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
};
```

---

# 🍃 Step 13 — Connect MongoDB

Mongoose ORM helps:
- Create schemas
- Validate data
- Use hooks
- Query database easily

---

# 🧠 Step 14 — Mongoose Hooks

```js
import bcrypt from "bcrypt";

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});
```

---

# 🔐 Step 15 — JWT Authentication

JWT is used for:
- Authentication
- Secure APIs
- User Sessions

---

# 🔑 Access Token vs Refresh Token

| Access Token | Refresh Token |
|---|---|
| Short expiry | Long expiry |
| API access | Generate new access token |
| Stateless | Stored in DB |

---

# 🪙 Step 16 — Generate Tokens

## Access Token

```js
import jwt from "jsonwebtoken";

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
```

---

# 🔒 Step 17 — Temporary Token Using Crypto

```js
import crypto from "crypto";

const unHashedToken = crypto.randomBytes(20).toString("hex");

const hashedToken = crypto
  .createHash("sha256")
  .update(unHashedToken)
  .digest("hex");
```

---

# 📧 Step 18 — NodeMailer Setup

```js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export default transporter;
```

---

# 👤 Step 19 — Register User Flow

Steps:
1. Check existing user
2. Create user
3. Generate tokens
4. Send verification mail
5. Return response

---

# 🔐 Step 20 — Auth Routes

```js
router.post("/register", registerUser);
```

---

# 📮 Step 21 — Postman Setup

## Global Variable

| Key | Value |
|---|---|
| BASE_URL | http://localhost:8000/api/v1 |

## Test API

```http
GET {{BASE_URL}}/health
```

---

# ▶️ Step 22 — Run Server

## package.json

```json
"scripts": {
  "dev": "nodemon src/index.js"
}
```

## Start Server

```bash
npm run dev
```

---

# ✅ Final Learning Summary

You learned:
- Express Server
- MVC Architecture
- MongoDB
- Mongoose
- JWT Authentication
- Async Handler
- Nodemailer
- REST APIs
- Postman Testing

---

# 📚 Next Learning

1. Login API
2. Logout API
3. Refresh Token API
4. Forgot Password
5. OTP Verification
6. File Upload
7. Swagger Docs
8. Deployment
