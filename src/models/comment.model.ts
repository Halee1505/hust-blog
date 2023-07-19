import { Admin } from "./admin.model";

export interface Comment {
  mId?: number;
  mComment: string;
  mCreated?: string;
  mModified?: string;
  mBlogId: number;
  mCommentParentId?: number;
  mCustomerId: number;
  comments?: Comment[];
  mCustomer?: Admin;
}
