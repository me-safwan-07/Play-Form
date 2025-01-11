# 🏆 Match Form - Player Registration and Survey Platform  

**Match Form** is a dynamic player registration and form management platform built using **React, TypeScript, and Vite**. The project allows users to create, edit, and analyze forms for player registration, event planning, and surveys.  

---  

## 🌟 Features  
- **📋 Form Creation & Management** – Create and customize various forms for player registration and surveys.  
- **🎨 Modern UI** – Built with **Tailwind CSS** for responsive and sleek design.  
- **🔄 Dynamic Components** – Modular form components including dropdowns, checkboxes, and input fields.  
- **📊 Analysis & Reporting** – Visualize and filter form responses with analytics tools.  
- **🔐 Authentication** – User authentication with Firebase for secure access.  
- **📂 File Uploads** – Integrated uploader for adding company logos and media.  
- **⚡ Fast Performance** – Powered by **Vite** for lightning-fast development and build times.  

---  

## 🏗️ Project Structure  
```bash
match-form/
│
├── client/                       # Frontend (React + Vite)
│   ├── public/                   # Static assets
│   ├── src/                      # Source code
│   │   ├── components/           # UI and core components
│   │   │   ├── core/             # Core functionality
│   │   │   ├── ui/               # Reusable UI components
│   │   │   └── forms/            # Form components (creation, dropdowns, inputs)
│   │   ├── pages/                # Pages (Auth, Analysis, Form Creation)
│   │   ├── services/             # API services (user, auth, forms)
│   │   ├── lib/                  # Utility functions and configuration
│   │   └── App.tsx               # Main React App component
│   ├── vite.config.ts            # Vite configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── package.json              # Client dependencies
│   └── index.html                # Main HTML file
│
└── server/                       
    ├── src/                      # Source code for server  
    │   ├── controllers/          # Route controllers (form, user, response)  
    │   ├── services/             # Business logic and data handling  
    │   ├── routes/               # Express routes for APIs  
    │   ├── database/             # Prisma ORM for database schema  
    │   ├── middleware/           # Authentication and token verification  
    │   ├── utils/                # Utility functions (error handling, validation)  
    │   └── index.ts              # Main server entry point  
    ├── package.json              # Server dependencies  
    ├── prisma/                   # Prisma configuration and schema  
    └── nodemon.json              # Nodemon configuration for development  
```  

---  

## ⚙️ Setup Instructions  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js** (v18 or higher)  
- **MongoDB** (for backend database)  
- **Vite** (for frontend development)  
- **Prisma** (for database ORM)  

### Installation  
1. **Clone the repository**  
   ```bash  
   git clone https://github.com/your-username/match-form.git  
   ```  

2. **Install dependencies for both client and server**  
   ```bash  
   npm run install:client  
   npm run install:server  
   ```  

3. **Set up environment variables**  
   - Create `.env` files in both the `client` and `server` directories.  
   - Fill in the required fields such as:  
     ```dotenv  
     DATABASE_URL=mongodb://localhost:27017/match-form  
     JWT_SECRET=your_jwt_secret  
     FIREBASE_API_KEY=your_firebase_key  
     ```  

4. **Run the development server**  
   ```bash  
   npm run dev  
   ```  
   This will concurrently start both the frontend and backend servers.  

5. **Access the application**  
   - Frontend: `http://localhost:5173`  
   - Backend API: `http://localhost:3000/api`  

---  

## 🔑 Environment Variables  

### Client (`client/.env`):  
```ini  
VITE_APP_BASE_URL=http://localhost:3000/api  
VITE_FIREBASE_API_KEY=your_firebase_api_key  
```  

### Server (`server/.env`):  
```ini  
DATABASE_URL=mongodb://localhost:27017/match-form  
JWT_SECRET=your_jwt_secret  
FIREBASE_SERVICE_ACCOUNT=./src/lib/serviceAccountKey.json  
```  

---  

## 📡 API Endpoints  
### User Routes  
- **`POST /api/auth/signup`** – User registration  
- **`POST /api/auth/login`** – User login  
- **`POST /api/auth/forgot-password`** – Reset password request  

### Form Routes  
- **`GET /api/forms`** – Retrieve all forms  
- **`POST /api/forms/create`** – Create a new form  
- **`PUT /api/forms/:id`** – Update form by ID  
- **`DELETE /api/forms/:id`** – Delete form by ID  

### Response Routes  
- **`GET /api/responses`** – Fetch all responses  
- **`POST /api/responses/:formId`** – Submit form responses  

---  

## 🛠️ Technologies Used  
- **Frontend:**  
  - React + Vite  
  - TypeScript  
  - Tailwind CSS  
  - Axios  
  - React Hook Form  
  - Firebase Authentication  
- **Backend:**  
  - Node.js  
  - Express.js  
  - Prisma (ORM)  
  - MongoDB  
  - JWT for Authentication  
- **Deployment & Tools:**  
  - Vercel (Frontend)  
  - DigitalOcean (Backend)  
  - ESLint, PostCSS, Prettier  

---  

## 🚀 Roadmap  
- [x] UI/UX Design – Completed in November  
- [x] Welcome Card Page – November 22, 2024  
- [x] Thank You Card Page – November 23, 2024  
- [ ] Form Menu – Half completed by November 24, 2024  
- [ ] Question UI – Completed by November 25, 2024  
- [ ] Multiple Choice Question – November 26, 2024  

---  

## 🤝 Contributing  
Contributions are welcome! If you have ideas to improve the project, please follow these steps:  
1. Fork the repository  
2. Create a new branch (`feature/new-feature`)  
3. Commit your changes  
4. Push to the branch  
5. Open a Pull Request  

---  

## 📜 License  
This project is licensed under the **ISC License**.
