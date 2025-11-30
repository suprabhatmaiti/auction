# 🚀 Auction Central

**Auction Central** is a real-time, full-stack online auction platform where users can bid on unique items, list their own products for sale, and engage in a dynamic, competitive bidding environment.

## ✨ Features

### Frontend (React)

- **Secure Authentication:** User registration and login with JWT and refresh token handling.
- **Protected Routing:** Ensures only authenticated users can access profile, dashboard, and auction creation pages.
- **Real-time Bidding:** Instant updates on current bid price and bidding history using Socket.IO.
- **Intuitive UI/UX:** A clean, modern interface built with Tailwind CSS.
- **Filtering and Sorting:** Advanced controls to filter auctions by category, price range, and sort by highest bid, end time, or newest first.
- **Auction Listing Form:** A dedicated page for sellers to easily list items, including image upload and compression.
- **Countdown Timer:** Real-time timer on auction cards and detail pages.

### Backend (Node.js/Express)

- **RESTful API:** Robust endpoints for authentication and auction management.
- **PostgreSQL Database:** Reliable and scalable data storage.
- **Secure Auth:** User registration/login with **bcrypt** for password hashing and **JWT** for token-based authentication. Refresh tokens are handled via HTTP-only cookies.
- **Real-time Bidding Engine (Socket.IO):**
  - Optimistic UI updates with server-side sequence (seq) tracking to ensure data consistency.
  - **Transactional Bidding:** Uses PostgreSQL transactions (`BEGIN`/`COMMIT`/`ROLLBACK`) to ensure bids are atomic.
  - **Anti-Sniping Logic:** Extends the auction end time when a bid is placed close to the deadline.
- **Image Handling:** Uses **Multer** for file uploads and **Sharp** for image compression/resizing to optimize performance.
- **Auction Management:** Endpoints for creating auctions and retrieving detailed, filterable, and paginated lists of active auctions.

## 🛠️ Tech Stack

| Component        | Technology                                 | Description                                            |
| :--------------- | :----------------------------------------- | :----------------------------------------------------- |
| **Frontend**     | `React` (Vite)                             | Main UI library                                        |
| **Styling**      | `Tailwind CSS`                             | Utility-first styling for a modern, responsive design. |
| **Global State** | `useAuth` Context, `useAuctionListContext` | Custom context and reducers for auth and auction data. |
| **Real-time**    | `socket.io-client`                         | Client-side real-time communication.                   |
| **Backend**      | `Node.js`, `Express.js`                    | Fast, unopinionated server-side framework.             |
| **Database**     | `PostgreSQL` (`pg`)                        | Robust transactional database.                         |
| **Real-time**    | `socket.io`                                | Server-side WebSocket handling for bidding.            |
| **Security**     | `jsonwebtoken`, `bcrypt`, `cookie-parser`  | Access/Refresh token management and password hashing.  |
| **File Upload**  | `multer`, `sharp`                          | Handling file uploads and optimizing images.           |

## 📂 Project Structure

The project separates client and server logic under the `src/` directory. Static files and the main server process live at the root.

```
.
├── uploads/                    # 🖼️ User-uploaded files (images, avatars)
│   ├── avatars/                # Stored user profile images
│   └── product-images/         # Stored auction item images
├── src/
│   ├── client/                 # ⚛️ Frontend Source Code (Vite/React)
│   │   ├── components/         # Reusable UI components
│   │   ├── hooks/              # Custom React Hooks
│   │   ├── pages/              # Application views/pages
│   │   └── utils/              # Frontend utilities (API client, Socket setup)
│   └── server/                 # 🌐 Backend Source Code (Node/Express)
│       ├── config/             # DB connection
│       ├── controllers/        # REST API business logic
│       ├── lib/                # Backend utilities (Upload config)
│       ├── middleware/         # Express middleware
│       ├── routes/             # Express router definitions
│       └── socket/             # Real-time bidding engine logic
├── main.js                     # 🚀 Root Server Entry Point (Express, Socket.IO, ViteExpress)
└── package.json                # Dependencies and scripts
```

## ⚙️ Setup and Installation

### Prerequisites

- Node.js (v14+)
- PostgreSQL

### 1. Installation

```bash
# Clone the repository
git clone [COPY_AND_PASTE THE _REPO_URL]
cd [project-folder]

# Install dependencies for the full stack
npm install
```

### 2. Database Setup

Create a PostgreSQL database and configure your environment variables.

#### A. Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=3000

# PostgreSQL Configuration
DATABASE_URL=postgres://user:password@host:port/database_name

# Security Secrets
JWT_SECRET=a_strong_secret_for_access_token
REFRESH_TOKEN_SECRET=a_strong_secret_for_refresh_token
```

#### B. Table Creation SQL

Use the following SQL commands to set up the necessary tables in your PostgreSQL database:

```sql
-- USERS Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name character varying(100),
    email character varying(100) NOT NULL UNIQUE,
    password text NOT NULL,
    role character varying(20) DEFAULT 'buyer'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- AUCTIONS Table
CREATE TABLE auctions (
    id SERIAL PRIMARY KEY,
    title character varying(255),
    description text,
    image_url text,
    category character varying(100),
    start_price numeric,
    current_price numeric,
    seller_id integer REFERENCES users(id),
    start_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    end_time timestamp without time zone,
    is_active boolean DEFAULT true,
    min_increment numeric DEFAULT 1,
    seq integer DEFAULT 0,
    status character varying(20) DEFAULT 'open'::character varying,
    current_highest_bid_id integer
);

-- BIDS Table
CREATE TABLE bids (
    id SERIAL PRIMARY KEY,
    auction_id integer REFERENCES auctions(id),
    bidder_id integer REFERENCES users(id),
    amount numeric,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Run the Application

The `main.js` file uses `ViteExpress.bind` to serve the React frontend and run the Express backend simultaneously.

```bash
npm run dev # or the script configured to run main.js
# Application will be accessible on http://localhost:3000
```

---

**Built with dedication and skill by SUPRABHAT MAITI**
