# 🎉 Frolic React App

**Frolic Celebrations** — College Fest Event Management System  
Converted from HTML + Bootstrap to a clean React SPA.

---

## 📁 Project Structure

```
frolic-react/
├── public/
│   └── index.html          # Bootstrap 5 CDN loaded here
├── src/
│   ├── data/
│   │   └── events.js       # All events & department data (single source of truth)
│   ├── components/
│   │   ├── Navbar.js       # Shared navbar (3 variants: public / user / admin)
│   │   ├── Footer.js       # Shared footer
│   │   └── EventCard.js    # Reusable event card component
│   ├── pages/
│   │   ├── Home.js              # Landing page with hero + all events
│   │   ├── Login.js             # User login
│   │   ├── Register.js          # User registration with validation
│   │   ├── AdminLogin.js        # Admin login
│   │   ├── AdminDashboard.js    # Full admin panel (tabs + modals)
│   │   ├── EventDetail.js       # Single event detail + register
│   │   ├── UserDashboard.js     # User home after login
│   │   ├── Participation.js     # Create groups
│   │   ├── Payment.js           # Fee payment form
│   │   └── Results.js           # Winners podium
│   ├── App.js              # React Router v6 routes
│   └── index.js            # Entry point
└── package.json
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open in browser
http://localhost:3000
```

---

## 🗺️ Routes

| Path | Page |
|---|---|
| `/` | Home (landing page) |
| `/login` | User Login |
| `/register` | User Registration |
| `/event/:slug` | Event Detail (e.g. `/event/NEURAL_SPHERE`) |
| `/dashboard` | User Dashboard |
| `/participation` | Participation / Group management |
| `/payment` | Event fee payment |
| `/results` | Winners results page |
| `/admin/login` | Admin Login |
| `/admin/dashboard` | Admin Dashboard |

---

## ✅ What's Improved Over HTML Version

| Feature | HTML | React |
|---|---|---|
| Navigation | Multi-page links | SPA with `react-router-dom` |
| Forms | No validation | Full client-side validation |
| Admin CRUD | Static HTML | useState-powered add/edit/delete |
| Modals | Bootstrap JS | React-controlled show/hide |
| Data | Hardcoded per page | Centralised in `data/events.js` |
| Components | Copy-pasted HTML | Reusable components |
| 404 Page | Not handled | Clean 404 route |
| Event detail | Separate HTML files | Dynamic `:slug` route |

---

## 🔌 Connecting a Real Backend

All API call points are marked with `// TODO: connect to real API`.

Key spots:
- `Login.js` — POST `/api/login`
- `Register.js` — POST `/api/register`
- `AdminLogin.js` — POST `/api/admin/login`
- `AdminDashboard.js` — GET/POST/PUT/DELETE for institutes, events, groups
- `Participation.js` — POST `/api/groups`
- `Payment.js` — POST `/api/payment`

---

## 🛠️ Tech Stack

- **React 18** with hooks (`useState`)
- **React Router DOM v6** for routing
- **Bootstrap 5.3** via CDN (no npm needed)
- **Bootstrap Icons** via CDN

---

## 📝 Notes

- All styling lives in `public/index.html` `<style>` tag for simplicity — move to a `.css` file if preferred.
- Images reference your dev tunnel URL — replace with your production URLs or put images in `/public/src/`.
- No Redux used intentionally — `useState` is sufficient for this project size.
