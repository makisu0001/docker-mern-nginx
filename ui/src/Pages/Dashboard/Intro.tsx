import { useEffect, useRef, useState } from "react";
import http from "../../http";

const Intro = () => {
  const [intro, setIntro] = useState<string[]>([]);
  const [edit, setEdit] = useState(-1);
  const [notice, setNotice] = useState("");
  const editEl = useRef<HTMLInputElement>(null);
  const insertEl = useRef<HTMLInputElement>(null);
  const handleSync = async () => {
    try {
      const res = await http.put("/intro", {
        intro,
      });
      if (res.data.code !== 1) throw new Error("更新失败");
      setNotice("更新成功");
    } catch (err) {
      setNotice("更新失败");
    }
  };
  const handleEdit = (index: number) => {
    setEdit(index);
  };
  const handleEditConfirm = () => {
    if (!editEl.current?.value)
      setIntro([...intro.slice(0, edit), ...intro.slice(edit + 1)]);
    else
      setIntro([
        ...intro.slice(0, edit),
        editEl.current?.value,
        ...intro.slice(edit + 1),
      ]);
    setEdit(-1);
  };
  const handleInsert = () => {
    const value = insertEl.current?.value;
    if (!value) return;
    setIntro([...intro, value]);
    insertEl.current.value = "";
  };
  useEffect(() => {
    if (edit === -1) return;
    if (!editEl.current) return;
    editEl.current.value = intro[edit];
  }, [edit]);
  useEffect(() => {
    const getIntro = async () => {
      try {
        const res = await http.get("/intro");
        const intro = res.data.intro;
        if (!intro) throw new Error("No Data Found");
        setIntro(intro);
      } catch (err) {
        setNotice("数据加载失败");
      }
    };
    getIntro();
  }, []);
  return (
    <div className="h-full px-12 py-6 overflow-auto">
      <div className="flex justify-start items-center gap-6">
        <div
          className="flex items-center justify-center w-40 h-12 text-xl font-bold bg-sky-700 text-white rounded cursor-pointer hover:bg-sky-800"
          onClick={handleSync}
        >
          同步
        </div>
        <div className="text-green-600">{notice}</div>
      </div>
      {intro?.map((item, index) => {
        return edit === index ? (
          <div
            className="flex items-center justify-center gap-12 w-full mt-4"
            onClick={handleInsert}
          >
            <input
              className="grow h-12 border-2 px-2"
              type="text"
              ref={editEl}
              placeholder="请输入简介事项"
            />
            <div
              className="min-w-12 h-8 rounded bg-sky-700 text-white text-sm flex items-center justify-center cursor-pointer hover:bg-sky-800"
              onClick={handleEditConfirm}
            >
              确定
            </div>
          </div>
        ) : (
          <div
            className="flex text-left text-xl mt-2 pb-2 border-b-2 border-gray-400"
            key={index}
          >
            {index + 1}. <div className="grow ml-4">{item}</div>
            <div
              className="min-w-12 h-6 text-sm flex items-center justify-center bg-sky-700 text-white rounded cursor-pointer hover:bg-sky-800"
              onClick={() => handleEdit(index)}
            >
              编辑
            </div>
          </div>
        );
      })}
      <div
        className="flex items-center justify-center gap-12 w-full mt-4"
        onClick={handleInsert}
      >
        <input
          className="grow h-12 border-2 px-2"
          type="text"
          ref={insertEl}
          placeholder="请输入简介事项"
        />
        <div className="size-12 rounded-full bg-sky-700 text-white text-4xl cursor-pointer hover:bg-sky-800">
          +
        </div>
      </div>
    </div>
  );
};

export default Intro;
