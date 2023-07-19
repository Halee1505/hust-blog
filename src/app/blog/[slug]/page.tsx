"use client";

import Header from "@/components/Header";
import { Blog } from "@/models/blog.model";
import { useEffect } from "react";
import { useAsync } from "@/utils/useAsync";
import blogApi from "@/api/blog.api";
import { formatDate } from "@/utils";
import Comment from "@/components/Comment";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
interface IPost {
  post: Blog;
}
const BlogDetail = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.userStore);
  if (!userInfo?.mId) {
    router.push("/login");
  }
  const blogDetail = useAsync(blogApi.getBlog);
  useEffect(() => {
    blogDetail.execute(params.slug, {
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
      <div className="blog-detail-overlay">
        <div className="blog-detail">
          <div className="blog-owner blog-detail-owner">
            <img src={blogDetail.value?.mAdmin?.mAvatar} className="avatar" alt="" />
            <span>{blogDetail.value?.mAdmin?.mDisplayName}</span>
          </div>

          <h1>{blogDetail.value?.mTitle}</h1>
          <span className="datetime">ngày đăng: {formatDate(blogDetail.value?.mCreated ?? "")}</span>
          <p>{blogDetail.value?.mDescription}</p>

          <div>
            <img src={blogDetail.value?.mImage} alt="dasd" />
          </div>

          <div
            className="blog-detail-content"
            dangerouslySetInnerHTML={{
              __html: blogDetail.value?.mHtmlContent ?? "",
            }}
          ></div>
        </div>
      </div>
      {blogDetail.value?.mId && <Comment blogId={blogDetail.value?.mId} customerId={blogDetail.value?.mAdminId} />}
    </div>
  );
};

export default BlogDetail;
