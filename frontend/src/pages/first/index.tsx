import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Data {
  id: number;
  name: string;
  balance: number;
}

const First = () => {
  const navigate = useNavigate();

  const login = () => {
    axios.post<{ data: Data }>("http://127.0.0.1:8080/login").then((res) => {
      localStorage.setItem("login", JSON.stringify(res.data.data));
      navigate("/home");
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white w-[90%] max-w-md h-[80%] shadow-2xl border border-gray-200 m-auto px-8 py-12 rounded-3xl">
        <p className="flex w-full  mb-8 text-lg font-semibold">E-Wallet</p>
        <div className="text-center font-semibold">
          <p>Selamat Datang Di E-Wallet</p>
        </div>
        <div className="flex items-center justify-center h-full">
          <button
            className=" item-center bg-indigo-500 hover:bg-indigo-700 text-white h-12 w-48 rounded-lg text-lg font-semibold transition-colors"
            onClick={() => login()}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
};

export default First;
