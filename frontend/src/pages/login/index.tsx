import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { User } from "@/types/user";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post<{ data: User }>(
        "http://127.0.0.1:8080/login",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("login", JSON.stringify(res.data.data));
      navigate("/home");
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <div className="w-full h-screen flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white w-[90%] max-w-md h-[80%] shadow-2xl border border-gray-200 m-auto px-8 py-12 rounded-3xl">
        <div className="mb-16">
          <span className="text-3xl font-semibold space-y-64">Login</span>
          <p className="text-2xl">to get started</p>
        </div>
        <div className="space-y-5">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-full h-[66px] border-[1px] border-[#EAEAEA] rounded-lg p-[24px]"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Pasword"
            className="w-full h-[66px] border-[1px] border-[#EAEAEA] rounded-lg p-[24px]"
          />
        </div>
        <button
          onClick={login}
          className="bg-indigo-500 hover:bg-indigo-700 w-full py-3 rounded-lg text-white my-2"
        >
          {loading ? "loading" : "continue"}
        </button>

        <div className="text-center">
          <span className="mr-1">New User?</span>
          <button onClick={() => navigate("/SignUp")} className="font-semibold">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
