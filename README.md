 Product Management App

📌 Overview The Product Management App is a full-stack web application that allows users to manage products efficiently. Users can add, edit, delete, and search for products with filtering options such as category, price, and rating.

🚀 Tech Stack
Frontend:
* React (Vite for fast builds)
* Tailwind CSS (for styling)
* React Router (for navigation)

Backend:
* Node.js (Runtime)
* Express.js (Web framework)
* MongoDB (Database)
* Mongoose (ODM for MongoDB)
* JSON Web Token (JWT for authentication)
* bcryptjs (For password hashing)
  
Tools & Deployment:
* Postman (API testing)
* MongoDB Compass (DB visualization)
* GitHub (Version control)

🛠️ Setup Instructions

1️⃣ Clone the Repository
git clone https://github.com/dheeraj2488/product-management-app

cd productmanagement

2️⃣ Install Dependencies

  For Backend:
  
  npm install
  
  For Frontend:
  
  cd client ,
  npm install
  
3️⃣ Set Up Environment Variables

Create a .env file inside the root directory and add the following:
PORT=8081 , 
MONGO_URI=your_mongodb_connection_string , 
JWT_SECRET=your_secret_key

4️⃣ Run the Application

Start Backend Server : 
nodemon index.js / npm start

Start Frontend : 
cd client , 
npm run dev

The application will be available at http://localhost:5173 (or another port if configured).

🔑 Features

✅ User Authentication (Signup/Login with JWT-based auth) ✅ Add, Edit, Delete Products ✅ Search & Filter by Name, Category, Price, Rating ✅ Modern UI with Tailwind CSS ✅ Secure API with JWT Authentication

🤝 Contributing

Feel free to open issues or submit pull requests! 🚀

💡 Happy Coding! 🎉
