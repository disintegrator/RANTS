import axios, { AxiosResponse } from "axios";
import { Post, User } from "../../graphql/schema";

const posts = async (_: any, args: { [k: string]: any }) => {
  const params = args.user ? { userId: args.user } : {};
  const res: AxiosResponse<Post[]> = await axios({
    url: "https://jsonplaceholder.typicode.com/posts",
    params
  });
  return res.data.map(p => ({
    ...p,
    id: `${p.id}`,
    userId: `${p.userId}`
  }));
};

const user = async (_: any, args: { [k: string]: any }) => {
  const res: AxiosResponse<User> = await axios(
    `https://jsonplaceholder.typicode.com/users/${args.id}`
  );
  const u = res.data;
  u.id = `${u.id}`;
  return u;
};

const post = async (_: any, args: { [k: string]: any }) => {
  const res: AxiosResponse<Post> = await axios(
    `https://jsonplaceholder.typicode.com/posts/${args.id}`
  );
  const p = res.data;
  p.id = `${p.id}`;
  p.userId = `${p.userId}`;
  return p;
};

export { posts, user, post };
