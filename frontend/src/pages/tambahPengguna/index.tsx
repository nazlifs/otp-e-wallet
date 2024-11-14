import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "@/types/user";

const TambahPengguna = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const create = () => {
    const data = {
      name: name,
      email: email,
    };
    axios
      .post<{ data: User }>("http://127.0.0.1:8080/signup", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        navigate("/daftar");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setName("");
        setEmail("");
      });
  };

  return (
    <div className="w-full h-screen flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white w-[90%] max-w-md h-[80%] shadow-2xl border border-gray-200 m-auto px-8 py-12 rounded-3xl">
        <div className="mb-7">
          <span className="text-3xl font-semibold space-y-64">
            Tambah Pengguna
          </span>
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
        </div>
        <button
          onClick={create}
          className="bg-indigo-500 hover:bg-indigo-700 w-full py-3 rounded-lg text-white my-2"
        >
          Continue
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white h-12 w-full rounded-lg text-lg font-semibold transition-colors"
          onClick={() => navigate("/daftar")}
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default TambahPengguna;
