import apiBase from "./base";
import { Blog } from "@/models/blog.model";
import { LpFilter, LpWhere } from "@/models/loopback-filter";
const getBlogs = async (filter?: LpFilter): Promise<Blog[]> => {
  const res = await apiBase.get(`${process.env.NEXT_PUBLIC_API}/blogs`, {
    params: {
      filter: filter,
    },
  });
  return res.data;
};

const getBlog = async (id: number, filter?: LpFilter): Promise<Blog> => {
  const res = await apiBase.get(`${process.env.NEXT_PUBLIC_API}/blogs/${id}`, {
    params: {
      filter: filter,
    },
  });
  return res.data;
};
const getBlogCount = async (where?: LpWhere): Promise<number> => {
  const res = await apiBase.get("/blogs/count", {
    params: {
      where: where,
    },
  });
  return res.data.count;
};
const createBlog = async (blog: Blog): Promise<Blog> => {
  const res = await apiBase.post(`${process.env.NEXT_PUBLIC_API}/blogs`, blog);
  return res.data;
};
const updateBlog = async (blog: Blog): Promise<Blog> => {
  const res = await apiBase.put(`${process.env.NEXT_PUBLIC_API}/blogs`, blog);
  return res.data;
};
const deleteBlog = async (id: number): Promise<Blog> => {
  const res = await apiBase.delete(`${process.env.NEXT_PUBLIC_API}/blogs/${id}`);
  return res.data;
};
const blogApi = {
  getBlogs,
  getBlog,
  getBlogCount,
  createBlog,
  updateBlog,
  deleteBlog,
};
export default blogApi;
