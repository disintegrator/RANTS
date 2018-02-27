export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  name: string;
  email: string | null;
  body: string | null;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string | null;
  suite: string | null;
  city: string | null;
  zipcode: string | null;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string | null;
  bs: string | null;
}

export interface User {
  id: string;
  username: string;
  name: string | null;
  email: string | null;
  address: Address;
  phone: string | null;
  website: string | null;
  company: Company;
  posts: Post[];
}
