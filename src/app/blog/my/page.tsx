"use client";

import Header from "@/components/Header";
import blogApi from "@/api/blog.api";
import { useAsync } from "@/utils/useAsync";
import { useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const Blog = () => {
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.userStore);
  if (!userInfo?.mId) {
    router.push("/login");
  }
  const listBlogs = useAsync(blogApi.getBlogs);

  useEffect(() => {
    listBlogs.execute({
      where: {
        mAdminId: userInfo.mId,
      },

      include: [
        {
          relation: "mAdmin",
        },
      ],
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="blog-overlay">
        {listBlogs.value?.map((item) => (
          <BlogCard key={item.mId} blog={item} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
