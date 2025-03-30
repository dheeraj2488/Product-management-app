import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import backgroundImage from "../pages/photo/product.avif";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(()=>{
    if(user){
      navigate("/homePage");
    }
  },[user , navigate]);


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // console.log("chl rha hai idhr tk");
      const res = await axios.post("http://localhost:8081/api/user/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {

        alert("Signup successful! Please login.");
        navigate("/login");

      } else {

        alert(res.data.message);

      }
    } catch (error) {

      alert("Signup failed!");

    }
  };

  return (
    
    <div className="relative w-full h-screen flex justify-center items-center">
    
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center blur-sm"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      <div className="relative z-10 bg-gray-400 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-gray-900 w-full text-white p-2">
            Sign Up
          </button>
        </form>
        <p className="mt-2 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
