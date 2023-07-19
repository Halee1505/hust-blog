import commentApi from "@/api/comment.api";
import { Comment } from "@/models/comment.model";
import { RootState } from "@/redux/store";
import { formatDate } from "@/utils";
import { useAsync } from "@/utils/useAsync";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CommentItem = ({
  comment,
  reload,
  setReload,
  blogId,
  candelete,
}: {
  comment: Comment;
  reload: boolean;
  setReload: (reload: boolean) => void;
  blogId: number;
  candelete?: boolean;
}) => {
  const userInfo = useSelector((state: RootState) => state.userStore);
  const getComment = useAsync(commentApi.getComments);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [showReply, setShowReply] = useState<boolean>(false);
  const createComment = useAsync(commentApi.postComment);
  const deleteComment = useAsync(commentApi.deleteComment);
  const [newComment, setNewComment] = useState("");
  const handleNewComment = () => {
    createComment
      .execute({
        mComment: newComment,
        mBlogId: blogId,
        mCustomerId: userInfo?.mId,
        mCommentParentId: comment.mId,
      })
      .then(() => {
        setNewComment("");
        setReload(!reload);
      });
  };

  const handleDeleteComment = () => {
    deleteComment.execute(comment.mId).then(() => {
      setReload(!reload);
    });
  };

  return (
    <div>
      <div className="comment-item-card">
        <div
          className="comment-item-card_load"
          style={{
            backgroundImage: `url(${comment.mCustomer?.mAvatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="comment-item-card_load_extreme">
          <div className="comment-item-card_load_extreme_title">{comment.mCustomer?.mDisplayName}</div>
          <div className="comment-item-card_load_extreme_description">{comment.mComment}</div>
          <div className="tool">
            <span className="datetime">{formatDate(comment?.mCreated ?? "")}</span>

            {/* <a
              onClick={() => {
                if (!isLoadMore) {
                  getComment
                    .execute({
                      order: ["mCreated DESC"],
                      where: {
                        mCommentParentId: comment.mId,
                      },

                      include: [
                        {
                          relation: "mCustomer",
                        },
                      ],
                    })
                    .then(() => {
                      setIsLoadMore(true);
                    });
                }
              }}
            >
              Xem thêm
            </a>
            <a
              onClick={() => {
                setShowReply(!showReply);
              }}
            >
              Trả lời
            </a> */}
            {candelete && (
              <a
                style={{
                  color: "red",
                }}
                onClick={() => {
                  handleDeleteComment();
                }}
              >
                xoá
              </a>
            )}
          </div>
        </div>
      </div>
      {/* {showReply && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            gap: "10px",
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
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
      )}
      {getComment.value?.map((item) => (
        <CommentItem
          key={item.mId}
          comment={item}
          reload={reload}
          setReload={setReload}
          blogId={blogId}
          candelete={userInfo?.mId === item.mCustomerId}
        />
      ))} */}
    </div>
  );
};

export default CommentItem;
