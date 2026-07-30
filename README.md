[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Made with Express](https://img.shields.io/badge/Backend-Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Made with React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Made with Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Frontend on Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Backend on Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)](https://render.com/)
# RetroFit

**A Sustainable Marketplace for Pre-Owned Fashion**
RetroFit connects people who want to sell clothes they no longer wear with buyers looking for affordable, quality second-hand fashion — reducing textile waste while making sustainable shopping accessible.

---

## Overview

The fashion industry generates significant textile waste — many clothes in good condition are stored unused or discarded rather than reused. Meanwhile, budget-conscious shoppers, especially students, struggle to find affordable, fashionable clothing.

**RetroFit** solves this by providing an online marketplace where users can sell pre-owned clothing and buy quality second-hand fashion at reasonable prices — promoting environmentally responsible consumption while creating economic value for sellers.

**Target Users:**
- **Buyers** — browse, search, wishlist, and purchase affordable pre-owned clothing
- **Sellers** — list and manage clothes they no longer wear, track sales via a dashboard
- **Administrators** — moderate listings, manage users, and maintain platform quality

---

## Features

### Core Features (MVP)

- Secure user registration and login (JWT-based authentication)
- User profile management
- Product listing with images, descriptions, price, size, brand, and condition
- Product search and filtering by category, brand, size, price, and condition
- Detailed product pages
- Shopping cart
- Wishlist
- Order placement and order history
- Seller dashboard — add, edit, update, and remove listings; monitor sales
- Admin dashboard — manage users, approve/remove listings, monitor platform activity

### Optional / Advanced Features (if time permits)

- Secure online payment integration
- Product ratings and reviews
- In-app buyer–seller chat
- Email notifications for orders and account activity
- AI-based clothing recommendations
- Recently viewed products
- Sales analytics for sellers
- Fully responsive design across devices

### Out of Scope (v1)

International shipping/logistics, live video selling or auctions, AI recommendations, multi-language support, physical warehouse/inventory management, and native mobile apps are not part of the initial release. RetroFit v1 is a responsive web application only.

---

## Main Modules

| Module | Description |
|---|---|
| **User Module** | Account creation, secure login, profile management, browsing, buying, and listing clothes |
| **Product Module** | Manages product images, descriptions, categories, sizes, brands, prices, and availability |
| **Marketplace Module** | Browsing, search, filtering, wishlist, cart, and order placement |
| **Seller Dashboard** | Add, edit, update, and remove listings; monitor sales and order status |
| **Admin Dashboard** | Manage users, approve/remove listings, review reports, maintain platform integrity |
| **Authentication Module** | Registration, login, and role-based access control |
| **Order Management Module** | Order placement, tracking, and purchase history for buyers and sellers |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JSON Web Token (JWT) |
| Image Storage | Cloudinary |
| Version Control | Git & GitHub |
| Deployment | Vercel (Frontend), Render (Backend) |
| Other Tools | Postman (API testing), Figma (UI/UX design) |

**Why MERN?** React provides a fast, responsive UI; Node.js/Express handle server-side logic and APIs efficiently; MongoDB/Mongoose offer a flexible, scalable database for users, products, and orders. JWT secures authentication, and Cloudinary manages product images efficiently.

---

## System Architecture

```
   React.js Frontend
         │
         ▼
Node.js + Express.js Backend
         │
         ▼
MongoDB Database (Mongoose)
```

---

## Project Structure

```
retrofit/
├── client/          # React frontend (deployed on Vercel)
├── server/          # Express backend (deployed on Render)
├── LICENSE
└── README.md
```

> Note: Since the frontend and backend deploy separately (Vercel + Render), no `/api` serverless wrapper or `vercel.json` rewrite is needed — the client simply calls the backend's Render URL via an environment variable.

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account (for image uploads)

### 1. Clone the repo

```bash
git clone https://github.com/Zawad0/retrofit.git
cd retrofit
```

### 2. Install dependencies

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 3. Set up environment variables

`server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

`client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Run locally

```bash
# Terminal 1 — backend
cd server
npm run dev

# Terminal 2 — frontend
cd client
npm run dev
```

Frontend: `http://localhost:5173` · Backend: `http://localhost:5000`

---

## Deployment

- **Frontend** deployed on [Vercel](https://vercel.com/), pointed at the `client/` directory
- **Backend** deployed on [Render](https://render.com/) free tier, pointed at the `server/` directory
- Environment variables are set separately in each platform's dashboard
- The client's `VITE_API_URL` is updated to point to the live Render backend URL after deployment

> **Note on Render's free tier:** the backend runs on Render's free web service plan, which spins down after 15 minutes of inactivity. The first request after idle time may take 30–60 seconds to respond while the server wakes up — this is expected behavior, not a bug. If demoing live, visit the site a minute beforehand to "warm it up."

---

## Project Timeline

| Phase | Activities |
|---|---|
| 1 | Planning and Requirement Analysis |
| 2 | System Design and UI/UX Design (Figma) |
| 3 | Backend Development (Node.js, Express.js, MongoDB) |
| 4 | Frontend Development (React.js) |
| 5 | System Integration and API Testing |
| 6 | Testing, Bug Fixing, and Deployment (Vercel & Render) |
| 7 | Final Documentation and Project Presentation |

---

## Risks & Challenges

- **Authentication** — securely implementing JWT and role-based access control
- **Deployment** — coordinating frontend (Vercel) and backend (Render) across separate platforms
- **Database design** — modeling users, products, and orders with consistent relationships
- **Image management** — efficient upload/retrieval via Cloudinary
- **Data validation & security** — preventing invalid inputs, duplicate listings, and unauthorized access
- **Time management** — delivering all planned features within the semester timeline

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Why RetroFit Matters

By encouraging the reuse of clothing, RetroFit helps reduce textile waste and extend the life cycle of garments — while helping sellers earn from clothes they no longer wear and helping buyers find quality fashion at affordable prices.
