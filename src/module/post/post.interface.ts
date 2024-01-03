import { ObjectId } from "mongodb";

interface IPost {
  title: string;
  author: string;
  content: string;
}

interface IPostCreate extends IPost {
  id?: ObjectId;
}

interface IPostUpdate extends IPost {
  id: ObjectId;
}

interface IPostService {
  getPosts(): any;
  getPostById(postId: ObjectId): any;
  createPost(post: IPostCreate): any;
  updatePost(post: IPostUpdate): any;
  deletePost(postId: ObjectId): any;
}

export { IPost, IPostCreate, IPostService, IPostUpdate };
