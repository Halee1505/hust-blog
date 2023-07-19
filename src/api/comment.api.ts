import { Comment } from "@/models/comment.model";
import apiBase from "./base";
import { LpFilter } from "@/models/loopback-filter";

export const getComments = async (filter?: LpFilter): Promise<Comment[]> => {
  const response = await apiBase.get(`${process.env.NEXT_PUBLIC_API}/comments`, {
    params: {
      filter: filter,
    },
  });
  return response.data;
};

export const postComment = async (comment: Comment) => {
  const response = await apiBase.post(`${process.env.NEXT_PUBLIC_API}/comments`, comment);
  return response.data;
};

export const deleteComment = async (commentId: string) => {
  const response = await apiBase.delete(`${process.env.NEXT_PUBLIC_API}/comments/${commentId}`);
  return response.data;
};

const commentApi = {
  getComments,
  postComment,
  deleteComment,
};

export default commentApi;
