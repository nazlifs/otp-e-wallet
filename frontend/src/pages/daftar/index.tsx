import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Daftar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<User[]>([]);

  const handleClick = (user: User) => {
    navigate("/payment", { state: { user } });
  };

  useEffect(() => {
    const authStore = localStorage.getItem("login");
    const auth = JSON.parse(authStore!);
    axios
      .get<{ data: User[] }>("http://127.0.0.1:8080/users", {
        params: { id: auth.id },
      })
      .then((res) => {
        console.log({ res, data: res.data.data });
        setData(res.data.data);
      });
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white w-[90%] max-w-md h-[80%] shadow-2xl border border-gray-200 m-auto px-8 py-12 rounded-3xl">
        <p>Daftar Pengguna</p>
        <div className="bg-gray-300 rounded-xl h-52 w-96 p-6 mt-6 overflow-auto">
          {data.map((p, i) => (
            <div key={i.toString()}>
              <p
                className="my-2 w-full bg-gray-300 hover:bg-gray-400 cursor-pointer"
                onClick={() => handleClick(p)}
              >
                {p.email} ({p.name})
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center py-6">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white h-12 w-48 rounded-lg text-lg font-semibold transition-colors mb-2"
            onClick={() => navigate("/tambah")}
          >
            Tambah Pengguna
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white h-12 w-48 rounded-lg text-lg font-semibold transition-colors"
            onClick={() => navigate("/home")}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
