import { PostService } from "@module/post/post.service";
import { SuccessOk } from "@shared/response/success/success.response";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import {
  createPostException,
  deletePostException,
  getPostByIdException,
  getPostsException,
  updatePostException
} from "./post.exception";

class PostController {
  postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  getPosts = async (request: Request, response: Response) => {
    try {
      const resultGetPosts = await this.postService.getPosts();
      SuccessOk(response, resultGetPosts);
    } catch (error: unknown) {
      getPostsException(error);
    }
  };

  getPostById = async (request: Request, response: Response) => {
    const id = request?.params?.id;
    const mongoId = new ObjectId(id);

    try {
      const resultGetPosts = await this.postService.getPostById(mongoId);
      SuccessOk(response, resultGetPosts);
    } catch (error: unknown) {
      getPostByIdException(mongoId, error);
    }
  };

  createPost = async (request: Request, response: Response) => {
    const postInput = request.body;

    try {
      const resultCreatedPost = await this.postService.createPost(postInput);
      SuccessOk(response, resultCreatedPost);
    } catch (error: unknown) {
      createPostException(error);
    }
  };

  updatePost = async (request: Request, response: Response) => {
    const id = request?.params?.id;
    const postInput = request.body;
    postInput.id = new ObjectId(id);

    try {
      await this.postService.getPostById(postInput.id);
      const resultUpdatePost = await this.postService.updatePost(postInput);
      SuccessOk(response, resultUpdatePost);
    } catch (error: unknown) {
      updatePostException(postInput.id, error);
    }
  };

  deletePost = async (request: Request, response: Response) => {
    const id = request?.params?.id;
    const mongoId = new ObjectId(id);

    try {
      await this.postService.getPostById(mongoId);
      const resultDeletePost = await this.postService.deletePost(mongoId);
      SuccessOk(response, resultDeletePost);
    } catch (error: unknown) {
      deletePostException(mongoId, error);
    }
  };
}

export { PostController };
