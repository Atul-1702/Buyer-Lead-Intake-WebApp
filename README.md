# Buyer Lead Intake Web App

🚀 A full-stack web application to manage and process buyer leads efficiently.  
Deployed on **Vercel** → [Live Demo](https://buyer-lead-intake-web-app.vercel.app/)  
GitHub Repository → [https://github.com/Atul-1702/Buyer-Lead-Intake-WebApp.git](https://github.com/Atul-1702/Buyer-Lead-Intake-WebApp.git)

---

## 📌 Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [SCSS](https://sass-lang.com/) + HTML + CSS  
- **Backend**: [Prisma](https://www.prisma.io/) ORM + [PostgreSQL](https://www.postgresql.org/)  
- **Authentication & Security**: JWT ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)), [jose](https://github.com/panva/jose), [bcrypt](https://github.com/kelektiv/node.bcrypt.js)  

---

## 👤 User Credentials
You can use these test accounts to log in:

| Role   | Email                  | Password  |
|--------|------------------------|-----------|
| Admin  | atul123@gmail.com      | atul123   |
| Dealer | kunal@gmail.com        | kunal123  |

---

## 📦 External Libraries
- **Authentication & Security**: `jsonwebtoken`, `jose`, `bcrypt`  
- **Form Handling & Validation**: `react-hook-form`, `zod`  
- **UI Enhancements**: `react-hot-toast` (notifications)  
- **State Management**: `redux`  
- **CSV Parsing**: `csv-parse`  

---

## 🚀 Major Feature Implementations
- 🔐 **Authentication & Authorization**
  - Secure login with JWT-based authentication.
  - Middleware guard to protect buyer-related routes.
  - Role-based access control.

- 📝 **Buyer Lead Intake**
  - Capture buyer details through dynamic forms.
  - Client-side + server-side validation using `zod` and `react-hook-form`.

- 📊 **Data Management**
  - Store and query buyer information using Prisma ORM with PostgreSQL.
  - Import CSV files and parse buyer data via `csv-parse`.

- 🎨 **UI/UX Enhancements**
  - Responsive, modern UI with SCSS modules.
  - Toast notifications (`react-hot-toast`) for success/error feedback.

- ⚡ **State Management**
  - Centralized global state handling with `redux`.

- 🛡️ **Security**
  - Encrypted passwords with `bcrypt`.
  - JWT verification in API routes and middleware using `jose`.

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Atul-1702/Buyer-Lead-Intake-WebApp.git
cd Buyer-Lead-Intake-WebApp
