import { useEffect, useState } from "react";
import http from "../http";
import "./App.css";

function App() {
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const [intro, setIntro] = useState([]);
  const [works, setWorks] = useState([]);
  useEffect(() => {
    const load = async () => {
      const {
        data: { intro },
      } = await http.get("/intro");
      const {
        data: { avatar },
      } = await http.get("/avatar");
      const {
        data: { background },
      } = await http.get("/background");
      const {
        data: { works },
      } = await http.get("/works");
      setAvatar(avatar);
      setBackground(background);
      setIntro(intro);
      setWorks(works);
      // console.log(intro, avatar, background, works);
      console.log("avatar", avatar);
      console.log("background", background);
    };
    load();
  }, []);
  return (
    <div className="fixed left-0 top-0 w-screen h-screen px-12 py-6 flex text-left bg-black">
      <img
        className="absolute left-0 top-0 w-screen h-screen -z-10 object-cover opacity-20"
        src={`http://127.0.0.1:8080/uploads/${background}`}
      />
      <div className="flex flex-col">
        <div className="text-8xl font-bold text-sky-700 mb-12">
          闫东炜
          <span className=" font-mono italic text-6xl ml-4">Studio</span>
        </div>
        <img
          className="size-96 min-w-96 object-cover my-12 mr-40 rounded border-2 border-amber-300"
          src={`http://127.0.0.1:8080/uploads/${avatar}`}
        />
        <div className="text-3xl font-bold text-amber-300">全网粉丝超30万</div>
        <div className="text-5xl font-light text-amber-300 mt-8">
          全能音乐制作人
        </div>
        <div className="text-5xl font-light text-amber-300 mt-8">
          中国国风电子乐曲开创者
        </div>
        <div className="grow text-5xl font-light text-amber-300 mt-8">
          著名电音制作人、DJ
        </div>
        <div className="text-xl text-white/70">合作联系</div>
        <div className="text-xl text-white/70">微信：pansy32</div>
        <div className="text-xl text-white/70">QQ：1625964519</div>
      </div>
      <div className="grow px-12 text-white text-2xl">
        {intro.map((i) => (
          <div className="mt-8">- {i}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
