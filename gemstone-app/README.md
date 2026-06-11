# 💎 GemGuide – Gemstone Recommendation App

> Personalised gemstone recommendations based on zodiac sign, personal needs, and budget.
> Built for the Humara Pandit placement assignment.

---

## 🚀 Live Demo
_Deploy on Vercel (frontend) + Render (backend) after cloning._

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18 + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (bcryptjs) |
| Styling | Custom CSS (no framework) |
| Version Control | Git + GitHub |

---

## 🗂️ Project Structure

```
gemstone-app/
├── server/
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── gemstoneData.js     # Knowledge base (12 gems, 15 needs)
│   ├── controllers/
│   │   ├── authController.js   # Register, Login, GetMe
│   │   └── recommendationController.js  # Engine + CRUD
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT protect middleware
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Recommendation.js  # Recommendation schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── recommendationRoutes.js
│   └── server.js
│
├── client/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── GemCard.jsx     # Reusable gem display
│       │   └── PrivateRoute.jsx
│       ├── context/
│       │   └── AuthContext.jsx # Global auth state
│       ├── pages/
│       │   ├── Home.jsx        # Landing page
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Recommend.jsx   # Main feature page
│       │   ├── History.jsx     # Saved sessions
│       │   └── Gems.jsx        # Full catalogue
│       ├── utils/
│       │   └── api.js          # Axios instance
│       ├── App.jsx
│       └── index.css           # All styles
│
└── AI_USAGE.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js ≥ 18
- MongoDB running locally (or MongoDB Atlas URI)

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/gemstone-app.git
cd gemstone-app
```

### 2. Backend setup
```bash
cd server
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_SECRET
npm install
npm run dev
```

### 3. Frontend setup
```bash
cd client
npm install
npm run dev
```

### 4. Run both together (from root)
```bash
npm install           # installs concurrently
npm run dev
```

Open: **http://localhost:5173**

---

## 🔑 Environment Variables

Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gemstone-app
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register user |
| POST | `/api/auth/login` | ❌ | Login |
| GET | `/api/auth/me` | ✅ | Get current user |

### Recommendations
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/recommendations/gemstones` | ❌ | All gemstones |
| POST | `/api/recommendations/generate` | ✅ | Get recommendations |
| GET | `/api/recommendations/history` | ✅ | User history |
| GET | `/api/recommendations/:id` | ✅ | Single record |
| PATCH | `/api/recommendations/:id/save` | ✅ | Toggle save |
| DELETE | `/api/recommendations/:id` | ✅ | Delete |

---

##  Recommendation Engine

The engine scores all 12 gemstones against user input:

| Signal | Points |
|--------|--------|
| Zodiac sign match | +40 |
| Exact need match | +20 each |
| Partial need match | +5 each |
| Within budget | +10 |

Top 5 gems by score are returned with match reasoning.

---

## Features

- **Auth**: JWT-based register/login with password hashing (bcrypt)
- **Zodiac auto-detection**: Enter birth date → zodiac sign computed server-side
- **Smart recommendation**: Multi-factor scoring with transparent match reasons
- **Gemstone catalogue**: 12 gems, searchable by name/need/zodiac/chakra/planet
- **History**: Full CRUD on past recommendations — save, expand, delete
- **Responsive**: Works on mobile and desktop

---

## 🔮 Gemstones Included
Ruby · Emerald · Blue Sapphire · Amethyst · Rose Quartz · Citrine · Pearl · Turquoise · Garnet · Moonstone · Lapis Lazuli · Tiger's Eye

---

## 🚀 Future Improvements
- Admin panel to add/edit gemstones
- Integration with real gemstone vendors (API / affiliate)
- AI/ML-based scoring using embeddings
- Image upload for gem photos (Cloudinary)
- Email notifications for saved recommendations
- PWA support

---

## 👩‍💻 Author
**Drishti** 3rd Year B.Tech CSE, Chitkara University
