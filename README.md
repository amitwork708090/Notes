# 📝 Notes Application

A full-stack Notes Application built from scratch using the MERN stack.

This is my **first website that I built independently without following a step-by-step tutorial**. I used ChatGPT only for a little help with UI ideas and improvements.

🔗 **Live Demo:** https://notes-frontend-seven-beta.vercel.app

---

## 🚀 Features

- 🔐 User Sign Up & Sign In
- 🍪 JWT Authentication using HTTP-only Cookies
- ➕ Create Notes
- ✏️ Update Notes
- 🗑️ Delete Notes
- 📖 Read More for longer notes
- 👤 User Profile Dropdown
- 🚪 Logout
- 📱 Responsive UI
- 💾 MongoDB Database
- 🔌 REST API
- ☁️ Deployed on Vercel

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- React Toastify
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- CORS

### Deployment

- Vercel

---

## 📂 Project Structure

```
Notes-Application/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateNote.jsx
│   │   │   ├── NotesCard.jsx
│   │   │   ├── ReadMore.jsx
│   │   │   └── UpdateNote.jsx
│   │   │
│   │   ├── context/
│   │   │   └── UserContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── SignIn.jsx
│   │   │   └── SignUp.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── vercel.json
│
└── README.md
