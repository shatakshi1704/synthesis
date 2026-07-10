<p align="center">
  <img src="frontend/public/media/images/fulllogo.png" alt="Synthesis Logo" width="100%">
</p>

# Synthesis — AI-Integrated FinTech Ecosystem

A scalable, full-stack financial management platform featuring real-time portfolio analytics, AI-driven market intelligence, and a context-aware Chrome Extension micro-terminal.

[![Live Demo](https://img.shields.io/badge/Live-Demo-deepmaroon?style=flat-square)](https://synthesis-peach.vercel.app/)
[![React](https://img.shields.io/badge/React-v18.x-blue?style=flat-square)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-green?style=flat-square)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success?style=flat-square)](https://mongodb.com)
[![Gemini API](https://img.shields.io/badge/Google_Gemini-AI-orange?style=flat-square)](https://deepmind.google/technologies/gemini/)
[![Chrome Extension](https://img.shields.io/badge/Manifest_V3-Extension-yellow?style=flat-square)](https://developer.chrome.com/docs/extensions/)

[View Live Web Dashboard](https://synthesis-peach.vercel.app/)

---

## Table of Contents
- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture & Data Flow](#architecture--data-flow)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [API Routes](#api-routes)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Author](#author)

---

## About the Project

**Synthesis** is an enterprise-grade financial workspace designed to bridge the gap between active asset tracking and real-time market sentiment. By offloading heavy mathematical computations to the database layer and integrating Google's Gemini API via a secure backend proxy, Synthesis delivers ultra-low-latency portfolio insights. 

The ecosystem includes a fully decoupled Web Dashboard, a public landing frontend, and a companion Manifest V3 Chrome Extension, allowing users to execute trades and analyze market news directly from their browser sidebar without tab-switching friction.

---

## Key Features

| Feature | Description |
| :--- | :--- |
| **Server-Side Aggregation** | Computes core metrics (Invested Capital, Net Worth, P&L) via MongoDB pipelines to prevent client-side DOM thrashing. |
| **Alpha Intelligence Engine** | Scrapes live financial web feeds and utilizes an NLP pipeline to dynamically tag news as `BULLISH`, `BEARISH`, or `NEUTRAL`. |
| **Secure Multi-Tenancy** | Strict JWT-based authentication using HTTP-only cookies and indexed `userId` queries for absolute data encapsulation. |
| **Client-Side Validation** | Real-time `useEffect` state guards block invalid trades (e.g., negative quantities or insufficient funds) before API execution. |
| **Companion Chrome Extension** | A highly secure Manifest V3 micro-terminal utilizing ephemeral Service Workers and `chrome.storage.local` session syncing. |
| **Dynamic PDF Reporting** | Native export engine utilizing `@media print` stylesheets to re-flow grid structures into clean, downloadable 5-page financial records. |

---

## Tech Stack

### Backend Compute Layer (API Server)
- **Node.js & Express**: Stateless HTTP REST API handling complex financial endpoints.
- **MongoDB & Mongoose**: Database layer utilizing Aggregation Pipelines, Multi-Document Transactions, and strict schema validation.
- **JWT & Bcrypt**: Secure session management and credential hashing.

### Frontend Presentation Layers (Dashboard & Landing)
- **React**: Component-driven UI framework with optimistic state synchronization.
- **Context API**: Global state management (`GeneralContext.js`) for themes and user sessions.
- **Chart.js**: Dynamic, virtualized rendering for Asset Allocation (DoughnutChart) and Portfolio Growth (VerticalGraph) visualizations.

### AI & Browser Integration
- **Google Gemini API**: Natural Language Processing (NLP) model for semantic sentiment analysis.
- **Manifest V3**: Chrome Extension framework utilizing isolated popup views and background content scripts.

---

## Architecture & Data Flow

```text
[Web Dashboard / Extension] 
           │                                            
           └──────── (JWT Authorization Headers) ───────┐
                                                        │
                                                        ▼
         [Express API & Auth Proxy (Render Container)] ───> [Google Gemini API]
                                │ (NLP Sentiment Processing)
                                ▼
         [MongoDB Atlas (Indexed Multi-Tenant Cluster)]

```

---

## Project Structure

```text
synthesis/
├── backend/                             # Core Express API & Database Logic
│   ├── controllers/
│   │   └── AuthController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── model/                           # Mongoose Models
│   │   ├── HoldingsModel.js
│   │   ├── IntelModel.js
│   │   ├── OrdersModel.js
│   │   ├── PositionsModel.js
│   │   ├── TicketModel.js
│   │   ├── UserModel.js
│   │   └── WatchlistModel.js
│   ├── routes/
│   │   └── AuthRoute.js
│   ├── schemas/                         # DB Validation Schemas
│   │   ├── HoldingsSchema.js
│   │   ├── OrdersSchema.js
│   │   └── PositionsSchema.js
│   ├── util/
│   ├── .gitignore
│   ├── index.js                         # Server entry point
│   ├── package.json
│   └── seed.js                          # Database seeder
├── dashboard/                           # React Frontend (Main App Interface)
│   ├── public/
│   │   ├── index.html
│   │   ├── letterlogo.png
│   │   ├── logo.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── components/                  # UI Modules (Holdings, Orders, Charts)
│       │   ├── Apps.js
│       │   ├── Dashboard.js
│       │   ├── DoughnutChart.js
│       │   ├── Funds.js
│       │   ├── GeneralContext.js
│       │   ├── Holdings.js
│       │   ├── Home.js
│       │   ├── Menu.js
│       │   ├── MyPortfolio.css
│       │   ├── MyPortfolio.js
│       │   ├── OrderWindow.css
│       │   ├── OrderWindow.js
│       │   ├── Orders.js
│       │   ├── PortfolioAssistant.css
│       │   ├── PortfolioAssistant.js
│       │   ├── Positions.js
│       │   ├── Summary.js
│       │   ├── TopBar.js
│       │   ├── VerticalGraph.js
│       │   ├── WatchList.js
│       │   └── Welcome.js
│       ├── ProtectedRoute.js            # Route authorization wrapper
│       ├── api.js                       # Axios instance configurations
│       ├── index.css
│       └── index.js
├── extension/                           # Chrome Extension (Manifest V3)
│   ├── background.js                    # Ephemeral Service Worker
│   ├── content.js                       # Web scraper / DOM interaction
│   └── manifest.json                    # Extension permissions blueprint
└── frontend/                            # React Frontend (Marketing/Landing Page)
    ├── public/
    │   ├── font-awesome-4.7.0/
    │   ├── media/images/                
    │   │   ├── console.png
    │   │   ├── extension.png
    │   │   ├── fulllogo.png
    │   │   ├── kite.png
    │   │   ├── letterlogo.png
    │   │   ├── logo.png
    │   │   ├── manifest.json
    │   │   └── myphoto.png
    │   ├── index.html
    │   ├── logo.png
    │   ├── manifest.json
    │   └── robots.txt
    └── src/
        ├── landing_page/
        │   ├── about/                   # About Us Page Components
        │   │   ├── AboutPage.js
        │   │   ├── Hero.js
        │   │   └── Team.js
        │   ├── home/                    # Landing Page Modules
        │   │   ├── Awards.js
        │   │   ├── Education.js
        │   │   ├── Hero.js
        │   │   ├── HomePage.js
        │   │   ├── Pricing.js
        │   │   └── Stats.js
        │   ├── login/                   # Authentication (Sign In)
        │   │   └── Login.js
        │   ├── pricing/                 # Pricing & Brokerage Info
        │   │   ├── Brokerage.js
        │   │   ├── Hero.js
        │   │   └── PricingPage.js
        │   ├── products/                # Platform Offerings
        │   │   ├── Hero.js
        │   │   ├── LeftSection.js
        │   │   ├── ProductsPage.js
        │   │   ├── RightSection.js
        │   │   └── Universe.js
        │   ├── signup/                  # Authentication (Registration)
        │   │   └── Signup.js
        │   ├── support/                 # Ticketing & Help Center
        │   │   ├── CreateTicket.js
        │   │   ├── FAQ.js
        │   │   ├── Hero.js
        │   │   └── SupportPage.js
        │   ├── Footer.js                # Global Footer
        │   ├── Navbar.js                # Global Navigation
        │   ├── NotFound.js              # 404 Error View
        │   └── OpenAccount.js           # CTA Component
        ├── PrivateRoute.js              # Auth Guard Wrapper
        ├── api.js                       # Axios Configs
        ├── index.css                    # Global Styles
        └── index.js                     # React DOM Entry
```

---

## Data Models

### User Schema (`UserModel.js`)

```javascript
{
  email:         { type: String, required: true, unique: true },
  password:      { type: String, required: true },
  createdAt:     { type: Date, default: new Date() }
}

```

Here is the complete, fully expanded **Data Models** section for your `README.md`. This includes every exact schema you shared from your backend folder, plus the separated schema architecture you used for the core financial modules [cite: Screenshot 2026-07-10 at 8.39.50 AM.png, Screenshot 2026-07-10 at 8.39.52 AM.png, Screenshot 2026-07-10 at 8.39.56 AM.png, Screenshot 2026-07-10 at 8.39.59 AM.png, Screenshot 2026-07-10 at 8.40.01 AM.png, Screenshot 2026-07-10 at 8.40.05 AM.png, Screenshot 2026-07-10 at 8.40.09 AM.png].

Copy and paste this to replace the current Data Models section in your README:

## Data Models

The backend utilizes **Mongoose** for strict NoSQL data validation. The architecture splits core application data directly into the `model/` directory, while heavy financial transactional structures are isolated into a dedicated `schemas/` folder.

### Core Entity Models

#### 1. User Schema (`UserModel.js`)
Handles secure authentication credentials and user profile initialization.
```javascript
const userSchema = new mongoose.Schema({
  email:     { type: String, required: [true, "Email is required"], unique: true },
  username:  { type: String, required: [true, "Username is required"] },
  password:  { type: String, required: [true, "Password is required"] },
  createdAt: { type: Date, default: Date.now },
});

```

#### 2. Alpha Intelligence Schema (`IntelModel.js`)

Stores parsed financial news articles and pre-computed NLP sentiment tags.

```javascript
const IntelSchema = new mongoose.Schema({
  title:     String,
  snippet:   String,
  url:       String,
  source:    String,
  sentiment: { type: String, default: "NEUTRAL" },
  date:      { type: Date, default: Date.now }
});

```

#### 3. Support Ticket Schema (`TicketModel.js`)

Manages user-submitted platform support requests.

```javascript
const ticketSchema = new mongoose.Schema({
  subject:     { type: String, required: true },
  description: { type: String, required: true },
  status:      { type: String, default: "Open" },
  createdAt:   { type: Date, default: Date.now }
});

```

#### 4. Market Watchlist Schema (`WatchlistModel.js`)

Tracks volatile market assets for rapid visual monitoring on the dashboard.

```javascript
const WatchlistSchema = new Schema({
  name:      String,
  price:     Number,
  percent:   String,
  isDown:    Boolean,
});

```

---

### Transactional Schemas (Modularized)

To keep the model definitions clean, the heavy financial ledgers are decoupled into the `schemas/` directory and imported into their respective model files (`HoldingsModel.js`, `OrdersModel.js`, `PositionsModel.js`).

#### 5. Orders Ledger (`schemas/OrdersSchema.js`)

Immutable audit log recording every execution event.

```javascript
const OrdersSchema = new Schema({
  name:      String,
  qty:       Number,
  price:     Number,
  mode:      String, // 'BUY' or 'SELL'
});

```

#### 6. Active Holdings (`schemas/HoldingsSchema.js`)

Represents the user's current long-term active inventory.

```javascript
const HoldingsSchema = new Schema({
  name:      String,
  qty:       Number,
  avg:       Number,
  price:     Number,
  net:       String,
  day:       String,
});

```

#### 7. Volatile Positions (`schemas/PositionsSchema.js`)

Tracks short-term intraday trades and daily market momentum.

```javascript
const PositionsSchema = new Schema({
  name:      String,
  qty:       Number,
  avg:       Number,
  price:     Number,
  net:       String,
  day:       String,
  isLoss:    Boolean,
});

```

```

```

---

## Application Routing Architecture

The platform's routing is strictly decoupled into two layers: the **Backend API Endpoints** (handling database transactions) and the **Frontend Client Routes** (handling React UI navigation).

### 1. Backend API Routes (Node.js / Express)
*These endpoints handle data mutations, aggregations, and communicate directly with MongoDB.*

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/signup` | Create a new user profile and hash credentials | No |
| `POST` | `/login` | Authenticate user and issue JWT token | No |
| `GET` | `/allHoldings` | Fetch active inventory for the authenticated user | Yes |
| `GET` | `/allPositions` | Fetch daily/live volatile positions | Yes |
| `POST` | `/newOrder` | Execute atomic trade transaction | Yes |

### 2. Frontend Client Routes (React Router)
*These paths control the visual UI layers across the Landing Page and the secure Dashboard.*

| Path | App Interface | Renders Component | Route Protection |
| --- | --- | --- | --- |
| `/` | Landing Page | `HomePage.js` | Public |
| `/about` | Landing Page | `AboutPage.js` | Public |
| `/products` | Landing Page | `ProductsPage.js` | Public |
| `/pricing` | Landing Page | `PricingPage.js` | Public |
| `/support` | Landing Page | `SupportPage.js` | Public |
| `/signup` | Landing Page | `Signup.js` | Public |
| `/login` | Landing Page | `Login.js` | Public |
| `/dashboard` | Dashboard | `Dashboard.js` | **Protected (JWT Required)** |

---

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* MongoDB instance (Atlas recommended)
* Google Gemini API Key

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/shatakshi1704/synthesis.git](https://github.com/shatakshi1704/synthesis.git)
cd synthesis

```

2. Install Backend Dependencies:

```bash
cd backend
npm install

```

3. Install Dashboard & Frontend Dependencies:

```bash
cd ../dashboard
npm install
cd ../frontend
npm install

```

4. Set up your `.env` files in the respective root directories.
5. Start the development servers:

```bash
# Terminal 1 (Backend)
cd backend && npm start

# Terminal 2 (Dashboard)
cd dashboard && npm start

# Terminal 3 (Landing Page)
cd frontend && npm start

```

---

## Environment Variables

Create `.env` files where required with the appropriate configurations:

```env
PORT=3002
MONGO_URL=your_mongodb_connection_string
TOKEN_KEY=your_jwt_super_secret_key
GEMINI_API_KEY=your_google_gemini_key

```

---

## Deployment

The application utilizes a decoupled deployment architecture:

* **Frontend / Dashboard (Vercel):** Connected directly to GitHub for automated edge network deployments.
* **Backend (Render):** Hosted as a Node Web Service connected securely to MongoDB Atlas.
* **Chrome Extension:** Load locally via Chrome's `Developer Mode` by selecting the `extension/` directory.

---

## Screenshots

---

## Author

**Shatakshi**

* GitHub: [@shatakshi1704](https://www.google.com/search?q=https://github.com/shatakshi1704)

```

```
