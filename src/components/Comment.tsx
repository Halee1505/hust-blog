import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import commentApi from "@/api/comment.api";
import { useEffect, useState } from "react";
import { useAsync } from "@/utils/useAsync";
import CommentItem from "./CommentItem";

const Comment = ({ blogId, customerId }: { blogId: number; customerId?: number }) => {
  const userInfo = useSelector((state: RootState) => state.userStore);
  const getComment = useAsync(commentApi.getComments);
  const createComment = useAsync(commentApi.postComment);
  const deleteComment = useAsync(commentApi.deleteComment);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getComment.execute({
      order: ["mCreated DESC"],
      where: {
        and: [{ mBlogId: blogId }, { mCommentParentId: null }],
      },

      include: [
        {
          relation: "mCustomer",
        },
      ],
    });
  }, [blogId, reload]);

  const handleNewComment = (commentId?: number) => {
    if (!commentId) {
      createComment
        .execute({
          mComment: newComment,
          mBlogId: blogId,
          mCustomerId: userInfo?.mId,
        })
        .then(() => {
          setNewComment("");
          setReload(!reload);
        });
    } else {
      createComment
        .execute({
          mComment: newComment,
          mBlogId: blogId,
          mCustomerId: userInfo?.mId,
          mCommentParentId: commentId,
        })
        .then(() => {
          setNewComment("");
          setReload(!reload);
        });
    }
  };

  return (
    <div className="comment-overlay">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 20,
          alignItems: "center",
          padding: "10px",
        }}
      >
        <h2>Nhận xét</h2>
        <label htmlFor="comment" className="blog-owner blog-detail-owner" style={{ paddingRight: "20px" }}>
          <img src={userInfo?.mAvatar} className="avatar" alt="" />
          <span>{userInfo?.mDisplayName}</span>
        </label>
      </div>
      <div className="comment-title">
        <div className="form__group field">
          <input
            id="comment"
            type="input"
            className="form__field"
            placeholder="Nhận xét"
            name="comment"
            required
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleNewComment();
              }
            }}
          />
        </div>
        <button
          className="button primary"
          onClick={() => {
            handleNewComment();
          }}
        >
          Gửi
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px",
          overflowY: "auto",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        {getComment.value?.map((comment) => (
          <CommentItem
            key={comment.mId}
            comment={comment}
            blogId={blogId}
            reload={reload}
            setReload={setReload}
            candelete={comment.mCustomerId === userInfo?.mId || customerId === userInfo?.mId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
