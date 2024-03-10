import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen pl-60">
      <div className="absolute left-0 top-0 w-60 h-full bg-sky-700 text-left pt-12 px-2 text-xl flex flex-col gap-2">
        <NavLink
          className={({ isActive }) =>
            `bg-white px-1 py-4 rounded font-bold cursor-pointer hover:border-sky-700 hover:text-sky-700 ${
              isActive
                ? "border-sky-700 text-sky-700"
                : "border-transparent text-sky-600"
            }`
          }
          to="profile"
        >
          {({ isActive }) => (
            <div
              className={`pl-4 border-l-4 ${
                isActive ? "border-sky-700" : "border-transparent"
              }`}
            >
              个人信息
            </div>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `bg-white px-1 py-4 rounded font-bold cursor-pointer hover:border-sky-700 hover:text-sky-700 ${
              isActive
                ? "border-sky-700 text-sky-700"
                : "border-transparent text-sky-600"
            }`
          }
          to="intro"
        >
          {({ isActive }) => (
            <div
              className={`pl-4 border-l-4 ${
                isActive ? "border-sky-700" : "border-transparent"
              }`}
            >
              简介列表
            </div>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `bg-white px-1 py-4 rounded font-bold cursor-pointer hover:border-sky-700 hover:text-sky-700 ${
              isActive
                ? "border-sky-700 text-sky-700"
                : "border-transparent text-sky-600"
            }`
          }
          to="worklist"
        >
          {({ isActive }) => (
            <div
              className={`pl-4 border-l-4 ${
                isActive ? "border-sky-700" : "border-transparent"
              }`}
            >
              作品列表
            </div>
          )}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
