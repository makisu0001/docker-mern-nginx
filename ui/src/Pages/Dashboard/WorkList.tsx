import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import http from "../../http";

const WorkList = () => {
  const [works, setWorks] = useState<
    { name: string; cover: string; resource: string; _id: string }[]
  >([]);
  const [cover, setCover] = useState("");
  const [resource, setResource] = useState("");
  const nameEl = useRef<HTMLInputElement>(null);
  const coverEl = useRef<HTMLInputElement>(null);
  const resourceEl = useRef<HTMLInputElement>(null);
  const getWorks = useCallback(async () => {
    try {
      const res = await http.get("/works");
      const works = res.data.works;
      if (!works) throw new Error("No Data Found");
      setWorks(works);
    } catch (err) {
      //   setNotice("数据加载失败");
    }
  }, []);
  const handleCoverUpload = async () => {
    const file = coverEl.current?.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append("cover", file);
    try {
      const res = await http.post("/uploadCover", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCover(res.data.filename);
    } catch (err) {
      // console.log(res);
    }
  };
  const handleResourceUpload = async () => {
    const file = resourceEl.current?.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append("resource", file);
    try {
      const res = await http.post("/uploadResource", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResource(res.data.filename);
    } catch (err) {
      // console.log(res);
    }
  };
  const handleInsert = async () => {
    const name = nameEl.current?.value?.trim?.();
    if (!name) return;
    if (!cover) return;
    if (!resource) return;
    try {
      const res = await http.put("/work", {
        work: {
          name,
          cover,
          resource,
        },
      });
      if (res.data.code !== 1) throw new Error("save failed");
      await getWorks();
      if (nameEl.current) nameEl.current.value = "";
      setCover("");
      setResource("");
    } catch (err) {
      //console.log(err)
    }
  };
  const handleRemove = (id: string) => async () => {
    try {
      const res = await http.post("/removeWork", {
        id,
      });
      if (res.data.code !== 1) throw new Error("save failed");
      await getWorks();
    } catch (err) {
      //console.log(err)
    }
  };

  useEffect(() => {
    getWorks();
  }, []);
  return (
    <div className="h-full px-12 py-6 overflow-auto">
      <div className="mt-4 grid grid-cols-4 gap-4 text-left items-center">
        <div>作品名称</div>
        <div>封面图片</div>
        <div>资源地址</div>
        <div>操作</div>
        {works.map(({ name, cover, resource, _id }, index) => (
          <Fragment key={_id}>
            <div>{name}</div>
            <img
              className="w-full h-24 object-cover"
              src={`http://127.0.0.1:8080/uploads/${cover}`}
              alt="cover"
            />
            <div>{resource}</div>
            <div
              className="w-24 h-10 leading-10 text-center text-white rounded bg-red-700 cursor-pointer hover:opacity-80"
              onClick={handleRemove(_id)}
            >
              删除
            </div>
          </Fragment>
        ))}
        <input
          className="grow h-12 border-2 px-2"
          type="text"
          ref={nameEl}
          placeholder="请输入作品名称"
        />
        <div className="size-full">
          {cover ? (
            <img
              className="w-full h-24 object-cover"
              src={`http://127.0.0.1:8080/uploads/${cover}`}
              alt="cover"
            />
          ) : (
            <>
              <label
                className="relative flex items-center justify-center w-full h-24 border-2 text-sky-700 border-sky-700 rounded text-sm align-middle font-light cursor-pointer hover:opacity-80"
                htmlFor="cover"
              >
                上传封面
              </label>
              <input
                className="invisible block h-0"
                ref={coverEl}
                id="cover"
                type="file"
                onChange={handleCoverUpload}
              />
            </>
          )}
        </div>
        <div className="size-full">
          {resource || (
            <>
              <label
                className="relative flex items-center justify-center w-full h-24 border-2 text-sky-700 border-sky-700 rounded text-sm align-middle font-light cursor-pointer hover:opacity-80"
                htmlFor="resource"
              >
                上传资源
              </label>
              <input
                className="invisible block h-0"
                ref={resourceEl}
                id="resource"
                type="file"
                onChange={handleResourceUpload}
              />
            </>
          )}
        </div>
        <div
          className="w-24 h-10 leading-10 text-center text-white rounded bg-sky-700 cursor-pointer hover:opacity-80"
          onClick={handleInsert}
        >
          添加
        </div>
      </div>
    </div>
  );
};

export default WorkList;
