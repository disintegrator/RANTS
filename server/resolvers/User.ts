import axios, { AxiosResponse } from "axios";
import { Post, User } from "../../graphql/schema";

const posts = async (obj: User) => {
  const res: AxiosResponse<Post[]> = await axios({
    url: "https://jsonplaceholder.typicode.com/posts",
    params: {
      userId: obj.id
    }
  });
  return res.data.map(p => ({
    ...p,
    id: `${p.id}`,
    userId: `${p.userId}`
  }));
};

export { posts };
