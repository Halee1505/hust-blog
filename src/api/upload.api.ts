import apiBase from "./base";

const getPresignedUrl = async (file: File) => {
  try {
    const response = await apiBase.post(`${process.env.NEXT_PUBLIC_API}/upload/file`, {
      fileName: file.name,
    });
    await uploadFile(response.data.preSignUrl, file);

    return response.data.url;
  } catch (err) {
    console.log(err);
  }
};

const uploadFile = async (presignedUrl: string, file: File) => {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
  });
  return response;
};

const uploadApi = {
  getPresignedUrl,
};

export default uploadApi;
