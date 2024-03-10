import { useRef, useState } from "react";
import http from "../http";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [errorMsg, setErrorMsg] = useState("");
  const accountEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    const account = accountEl.current?.value;
    const password = passwordEl.current?.value;
    try {
      const res = await http.post("/login", {
        account,
        password,
      });
      if (res?.data?.code === 1) navigate("/dashboard/intro");
      else throw new Error("login failed");
    } catch (err) {
      if ((err as Error).message === "login failed")
        setErrorMsg("账号或密码错误");
      else setErrorMsg("服务器故障");
    }
  };
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center"
      onKeyDown={handleLogin}
    >
      <div className="w-1/3 h-1/3 border-2 border-black rounded-xl flex flex-col p-12 gap-12 text-left">
        <div className="text-3xl">管理</div>
        <input
          className=" h-12 border-b-2 outline-none p-2"
          ref={accountEl}
          type="account"
          placeholder="账号"
        />
        <input
          className=" h-12 border-b-2 outline-none p-2"
          ref={passwordEl}
          type="password"
          placeholder="密码"
        />
        <div className="w-full h-12">
          <button
            className="w-full mb-2 bg-cyan-600 text-white"
            onClick={handleLogin}
          >
            登 录
          </button>
          <div className="text-center text-red-500 text-sm">{errorMsg}</div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
