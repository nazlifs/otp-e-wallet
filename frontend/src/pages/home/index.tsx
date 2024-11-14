import { Transaction } from "@/types/transaction";
import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<User>();

  const [transaction, setTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = () => {
    const login = localStorage.getItem("login");
    if (login == null) {
      navigate("/");
    }

    const initialValue = JSON.parse(login!);
    getAuthUser(initialValue);
    getTransactions(initialValue);
  };

  const getAuthUser = async (user: User) => {
    try {
      const res = await axios.get<{ data: User }>(
        `http://127.0.0.1:8080/users/${user.id}`
      );
      setData(res.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getTransactions = async (user: User) => {
    try {
      const res = await axios.get<{ data: Transaction[] }>(
        `http://127.0.0.1:8080/users/${user.id}/transactions`
      );
      setTransaction(res.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  if (data == null) {
    return null;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white w-[90%] max-w-md h-[80%] shadow-2xl border border-gray-200 m-auto px-8 py-12 rounded-3xl">
        <div className=" w-full  mb-8 text-lg font-semibold grid text-right">
          <p>{data.name}</p>
          <p>{formatter.format(data.balance)}</p>
        </div>
        <div>
          <p className="font-medium mb-2">Riwayat transfer</p>
          <div className="bg-gray-300 rounded-xl h-52 w-96 p-6 mt-6 overflow-auto">
            {transaction.map((p, i) => (
              <div
                key={i.toString()}
                className="flex justify-between items-center mb-4 last:mb-0"
              >
                <p className="font-medium text-gray-700">{p.to_user.nama}</p>
                <p className="font-medium text-gray-700">
                  {p.user_id === data.id ? "-" : "+"}
                  {formatter.format(p.nominal)}
                </p>
                <p className={`font-medium text-gray-700`}>{p.status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center py-6 gap-y-1">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white h-12 w-48 rounded-lg text-lg font-semibold transition-colors"
            onClick={() => navigate("/daftar")}
          >
            Kirim Uang
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white h-12 w-48 rounded-lg text-lg font-semibold transition-colors"
            onClick={() => navigate("/")}
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
