import { useEffect, useRef } from "react";
import http from "../../http";

const Profile = () => {
  const avatarEl = useRef<HTMLInputElement>(null);
  const backgroundEl = useRef<HTMLInputElement>(null);
  const handleAvatarUpload = async () => {
    const file = avatarEl.current?.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append("avatar", file);
    try {
      await http.post("/uploadAvatar", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      location.reload();
    } catch (err) {
      // console.log(res);
    }
  };
  const handleBackgroundUpload = async () => {
    const file = backgroundEl.current?.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append("background", file);
    try {
      await http.post("/uploadBackground", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      location.reload();
    } catch (err) {
      // console.log(res);
    }
  };
  useEffect(() => {
    const getAvatar = async () => {
      try {
        await http.get("/avatar");
      } catch (err) {}
    };
    getAvatar();
  }, []);
  return (
    <div className="h-full px-12 py-6 overflow-auto">
      <div className="mt-12 text-left">
        头像
        <label
          className="relative flex items-center justify-center size-24 border-2 mt-2 text-transparent border-sky-700 rounded text-sm align-middle font-light mr-12 cursor-pointer hover:opacity-80 hover:text-white"
          htmlFor="avatar"
        >
          Upload File
          <img
            className="absolute left-0 top-0 -z-10 size-full object-cover"
            src="http://127.0.0.1:8080/uploads/avatar.jpg"
            alt="avatar"
          />
        </label>
        <input
          className="invisible"
          ref={avatarEl}
          id="avatar"
          type="file"
          onChange={handleAvatarUpload}
        />
      </div>
      <div className="mt-12 text-left">
        背景
        <label
          className="relative flex items-center justify-center size-24 border-2 mt-2 text-transparent border-sky-700 rounded text-sm align-middle font-light mr-12 cursor-pointer hover:opacity-80 hover:text-white"
          htmlFor="background"
        >
          Upload File
          <img
            className="absolute left-0 top-0 -z-10 size-full object-cover"
            src="http://127.0.0.1:8080/uploads/background.jpg"
            alt="avatar"
          />
        </label>
        <input
          className="invisible"
          ref={backgroundEl}
          id="background"
          type="file"
          onChange={handleBackgroundUpload}
        />
      </div>
    </div>
  );
};

export default Profile;
