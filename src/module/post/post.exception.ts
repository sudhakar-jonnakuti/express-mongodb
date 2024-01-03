import { BadRequest, NotFound, NotModified } from "@shared/error/client.error";
import { InternalServeError, NotImplemented } from "@shared/error/server.error";
import { ObjectId } from "mongodb";

const getPostsException = (error: unknown) => {
  throw new InternalServeError(error);
};

const getPostByIdException = (postId: ObjectId, error: unknown) => {
  if (error instanceof NotFound) {
    throw new NotFound(`The post with the id "${postId}" not found.`);
  } else {
    throw new InternalServeError(error);
  }
};

const createPostException = (error: unknown) => {
  if (error instanceof NotImplemented) {
    throw new NotImplemented(`Failed to create a new post.`);
  } else {
    throw new InternalServeError(error);
  }
};

const updatePostException = (postId: ObjectId, error: unknown) => {
  if (error instanceof NotFound) {
    throw new NotFound(`The post with the id "${postId}" not found.`);
  } else if (error instanceof NotModified) {
    throw new NotModified(`Post with id: ${postId} not updated`);
  } else {
    throw new InternalServeError(error);
  }
};

const deletePostException = (postId: ObjectId, error: unknown) => {
  if (error instanceof NotFound) {
    throw new NotFound(`The post with the id "${postId}" not found.`);
  } else if (error instanceof BadRequest) {
    throw new BadRequest(`Failed to remove post with id ${postId}`);
  } else {
    throw new InternalServeError(error);
  }
};

export {
  createPostException,
  deletePostException,
  getPostByIdException,
  getPostsException,
  updatePostException
};
