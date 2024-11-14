import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "@/types/user";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const create = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post<{ data: User }>("http://127.0.0.1:8080/signup", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("login", JSON.stringify(res.data.data));
        navigate("/home");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setName("");
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="w-full h-screen flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white w-[90%] max-w-md h-[80%] shadow-2xl border border-gray-200 m-auto px-8 py-12 rounded-3xl">
        <div className="mb-7">
          <span className="text-3xl font-semibold space-y-64">Signup</span>
          <p className="text-2xl">to get started</p>
        </div>
        <div className="space-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full h-[66px] border-[1px] border-[#EAEAEA] rounded-lg p-[24px]"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="aaaa@gmail.com"
            className="w-full h-[66px] border-[1px] border-[#EAEAEA] rounded-lg p-[24px]"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="w-full h-[66px] border-[1px] border-[#EAEAEA] rounded-lg p-[24px]"
          />
        </div>
        <button
          onClick={create}
          className="bg-indigo-500 hover:bg-indigo-700 w-full py-3 rounded-lg text-white my-2"
        >
          Continue
        </button>
        <div className="text-center">
          <span className="mr-1">Already registered?</span>
          <button onClick={() => navigate("/")} className="font-semibold">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
