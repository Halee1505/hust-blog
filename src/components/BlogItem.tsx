import { Blog } from "@/models/blog.model";
import { formatDate } from "@/utils";

const BlogItem = ({ blog }: { blog: Blog }) => {
  return (
    <div className="blog-card">
      <img className="blog-img" src={blog.mImage} alt="" />

      <div className="blog-textBox">
        <div className="blog-textContent">
          <p className="blog-h1">
            <b>{blog.mTitle}</b>
          </p>
          <span className="blog-span">{formatDate(blog.mCreated ?? "")}</span>
        </div>
        <p className="blog-p">{blog.mDescription}</p>
        <div></div>
      </div>
    </div>
  );
};

export default BlogItem;
