import axios, { AxiosResponse } from "axios";
import { Post, Comment } from "../../graphql/schema";

const comments = async (obj: Post) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${obj.id}/comments`;
  const res: AxiosResponse<Comment[]> = await axios(url);
  return res.data.map(c => ({
    ...c,
    id: `${c.id}`,
    postId: `${c.postId}`
  }));
};

export { comments };
