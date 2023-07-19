"use client";

import Header from "@/components/Header";
import React, { ChangeEvent, useRef, useState } from "react";
import uploadApi from "@/api/upload.api";
import { useAsync } from "@/utils/useAsync";
import { Editor } from "@tinymce/tinymce-react";
import { Blog } from "@/models/blog.model";
import blogApi from "@/api/blog.api";
import { ToastContainer, toast } from "react-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const CreateBlog = () => {
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.userStore);
  if (!userInfo?.mId) {
    router.push("/login");
  }
  const upload = useAsync(uploadApi.getPresignedUrl);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const editorRef = useRef<any>(null);
  const [titleImage, setTitleImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setTitleImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  const log = async () => {
    if (editorRef.current && title !== "" && description !== "" && titleImage) {
      const imageUrl = await upload.execute(titleImage);
      const newBlog: Blog = {
        mTitle: title,
        mDescription: description,
        mHtmlContent: editorRef.current.getContent(),
        mImage: imageUrl,
        mAdminId: userInfo?.mId,
      };
      await blogApi
        .createBlog(newBlog)
        .then((res) => {
          if (res) {
            toast.success("Tạo mới thành công");
            setTitle("");
            setDescription("");
            setPreviewImage(null);
            setTitleImage(null);
            editorRef.current.setContent("");
          }
        })
        .catch((err) => {
          toast.error("Tạo mới thất bại");
        });
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin");
    }
  };
  return (
    <>
      <Header />
      <div className="create-layout">
        <div className="create-layout-title">
          <h1>Tiêu đề:</h1>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="create-layout-title">
          <textarea
            className="create-layout-description"
            placeholder="Mô tả:"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <label
            style={{
              width: "20%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              position: "relative",
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            htmlFor="file-input"
          >
            {previewImage ? (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    zIndex: 1,
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setPreviewImage(null);
                    setTitleImage(null);
                  }}
                >
                  x
                </div>
                <img
                  src={previewImage}
                  alt="Image Preview"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </>
            ) : (
              <p>No image selected</p>
            )}
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              id="file-input"
              style={{
                position: "absolute",
                width: 0,
                height: 0,
              }}
            />
          </label>

          <div
            style={{
              width: "80%",
              height: "100%",
              borderRadius: "5px",
            }}
          >
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              init={{
                height: 500,
                menubar: false,

                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "image",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help" +
                  "link image ",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
        </div>
        <div className="button-create-group">
          <button className="button secondary" onClick={log}>
            Huỷ
          </button>
          <button className="button primary" onClick={log}>
            Tạo mới
          </button>
        </div>
        <ToastContainer position="top-center" delay={2000} />
      </div>
    </>
  );
};

export default CreateBlog;
