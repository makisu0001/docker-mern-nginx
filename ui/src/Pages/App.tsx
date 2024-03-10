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
    <div className="fixed left-0 top-0 w-screen h-screen px-12 py-6 flex text-left">
      <img
        className="absolute left-0 top-0 w-screen h-screen -z-10 object-cover opacity-20"
        src={`http://127.0.0.1:8080/uploads/${background}`}
      />
      <div>
        <div className="text-8xl font-bold text-sky-700 mb-12">闫东炜</div>
        <img
          className="w-80 h-80 object-cover my-12"
          src={`http://127.0.0.1:8080/uploads/${avatar}`}
        />
        <div className="text-xl font-bold">全网粉丝超30万</div>
      </div>
      <div className="grow px-12">
        {intro.map((i) => (
          <div className="">- {i}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
