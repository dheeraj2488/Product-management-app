import React ,{  useState  , useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import backgroundimage from "../pages/photo/product.avif";
const LoginPage = () => {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login ,user } = useAuth();

  useEffect(() => {
  
    if (user) {
      navigate("/homePage");
    }
  }, [user, navigate]);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post("http://localhost:8081/api/user/login", {
        
        email,
        password,
      });
      if (res.data.success) {

        localStorage.setItem("token", res.data.token);
        console.log("data login page mai " , res.data.user);
        login(res.data.user);
        navigate("/homepage");

      } else {

        alert(res.data.message);

      }
    } catch (error) {

      alert("Login failed!");

    }
  };

  return (

      <div className="relative w-full h-screen flex justify-center items-center">

        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center blur-sm"
          style={{
            backgroundImage: `url(${backgroundimage})`
          }}
        ></div>
  
        <div className="relative z-10 bg-gray-400 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin}>
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
              Login
            </button>
          </form>
          <p className="mt-2 text-sm text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    
  );
};

export default LoginPage;
