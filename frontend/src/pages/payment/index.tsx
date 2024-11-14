import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useLocation, useNavigate } from "react-router-dom";
// import { User } from "@/types/user";
import axios from "axios";
import { User } from "@/types/user";
import { Transaction } from "@/types/transaction";

const Payment = () => {
  const navigate = useNavigate();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  // const { state } = useLocation(); // Mendapatkan data pengguna yang dikirim dari halaman sebelumnya
  const [nominal, setNominal] = useState<number>();
  const [auth, setAuth] = useState<Partial<User>>();
  const [otp, setOtp] = useState<string>(""); //
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const { state } = useLocation();
  const { user } = state as { user: User };

  useEffect(() => {
    const data = localStorage.getItem("login");
    if (data == null) return navigate("/", { replace: true });
    const decode = JSON.parse(data);
    setAuth(decode);
  }, []);

  const handlePayment = () => {
    if (auth == undefined) return;
    axios
      .post<{ data: Transaction }>(
        `http://127.0.0.1:8080/users/${auth.id}/transactions`,
        {
          user_id: user.id,
          nominal: nominal,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Transaksi berhasil:", response.data);
        setTransactionId(response.data.data.id); //mentimpan id transaksi
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan dalam transaksi:",
          error.response.data
        );
      });
    setIsPopUpOpen(true); //membuka popUp OTP
  };

  // const [otp, setOtp] = ('')

  const handleVerifyOtp = () => {
    if (transactionId === null) return; //ngecek jika transaksi belum ada

    console.log({ transactionId, otp });
    axios
      .patch(
        "http://127.0.0.1:8080/secure-otp",
        {
          transaction_id: transactionId, //menggunakan id transaksi yang disimpan
          otp_code: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("OTP berhasil diverifikasi dan transaksi selesai!"); //pesan sukses verifikasi OTP
        setIsPopUpOpen(false); // menutup popUp setelah verifikasi berhasil
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        console.error("verifikasi OTP gagal:", error.response.data);
        alert("verifikasi OTP gagal!"); // pesan gagal verifikasi
        setIsPopUpOpen(false);
        setOtp("");
      });
  };

  // const handleOtpChange = (value: string, index: number) => {
  //   const newOtp = otp.split("");
  //   newOtp[index] = value;
  //   setOtp(newOtp.join(""));
  // };

  // const handleSendClick = () => {
  //   setIsPopUpOpen(true);
  // };

  // const closePopUp = () => {
  //   setIsPopUpOpen(false);
  // };

  // const location = useLocation();
  // console.log({ location });
  // const { user } = location.state as { user: User };

  // const navigate = useNavigate ()

  return (
    <div className="w-full h-screen flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white w-[90%] max-w-md h-[80%] shadow-2xl border border-gray-200 m-auto px-8 py-12 rounded-3xl">
        <div className="text-2xl mb-8 font-semibold">
          <p>Kirim ke:</p>
        </div>
        <div className="flex gap-x-11">
          <p>nama: {user.name}</p>
          <p>email: {user.email}</p>
        </div>
        <div className="flex-grow my-8">
          <input
            type="number"
            placeholder="Rp.0"
            value={nominal}
            min={0}
            onChange={(e) => setNominal(Number(e.target.value))}
            className="w-full h-[66px] border-[1px] border-[#EAEAEA] rounded-lg p-[24px]"
          />
        </div>
        <div className="mt-auto">
          <button
            onClick={handlePayment} // untuk mengirim transaksi dan meminta kode OTP
            className="bg-indigo-500 hover:bg-indigo-700 w-full py-3 rounded-lg text-white my-2"
          >
            Kirim
          </button>
          <button
            onClick={() => navigate("/daftar")}
            className="bg-indigo-500 hover:bg-indigo-700 w-full py-3 rounded-lg text-white"
          >
            Batal
          </button>
        </div>
      </div>
      {isPopUpOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">OTP Terkirim!</h3>
            <InputOTP
              value={otp}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              onChange={(e) => setOtp(e)} // menyimpan OTP yang dimasukkan
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <div className="flex items-center justify-center">
              <button
                onClick={handleVerifyOtp}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 "
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
