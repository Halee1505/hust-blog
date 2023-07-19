import { Admin } from "./admin.model";

export interface Blog {
  mId?: number;
  mTitle: string;
  mDescription: string;
  mHtmlContent: string;
  mImage: string;
  mStatus?: string;
  mWatch?: number;
  mCreated?: string;
  mModified?: string;
  mAdminId?: number;
  mAdmin?: Admin;
}
