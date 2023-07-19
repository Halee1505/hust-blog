"use client";

import store, { RootState } from "@/redux/store";
import userStore from "@/redux/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();
  const [showLogOut, setShowLogOut] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.userStore);
  useEffect(() => {
    setShowLogOut(false);
  }, [router]);
  useEffect(() => {
    if (!userInfo?.mId) {
      const user = localStorage.getItem("INFO");
      if (user) {
        const userObj = JSON.parse(user);
        store.dispatch(userStore.actions.fetchProfile(userObj));
      }
    }
  }, []);
  return (
    <header className="header">
      <h1
        style={{
          cursor: "pointer",
          fontSize: "30px",
          fontWeight: 600,
          color: "#fff",
          whiteSpace: "nowrap",
        }}
      >
        HUST BLOG
      </h1>
      <div className="side-bar">
        <h1
          onClick={() => {
            router.push("/blog");
          }}
        >
          Danh sách blog
        </h1>
        <h1
          onClick={() => {
            router.push("/blog/my");
          }}
        >
          Blog của tôi{" "}
        </h1>
        <h1
          onClick={() => {
            router.push("/blog/create");
          }}
        >
          Tạo mới
        </h1>
        <div
          className="blog-owner blog-detail-owner"
          style={{
            position: "relative",
          }}
          onClick={() => {
            setShowLogOut(!showLogOut);
          }}
        >
          <img src={userInfo?.mAvatar} className="avatar" alt="" />
          <span>{userInfo?.mDisplayName}</span>

          <div
            style={{
              position: "absolute",
              top: "120%",
              left: "50%",
              transition: "all 0.3s ease",

              transform: !showLogOut ? "translate(250%, 0)" : "translate(-50%, 0px)",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              boxShadow: "0 0 5px #ccc",
              zIndex: 1,
              width: "100%",
              textAlign: "center",
            }}
          >
            <span
              onClick={() => {
                setShowLogOut(false);
                store.dispatch(userStore.actions.clear());
                localStorage.removeItem("INFO");
                router.push("/login");
              }}
            >
              Đăng xuất
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
