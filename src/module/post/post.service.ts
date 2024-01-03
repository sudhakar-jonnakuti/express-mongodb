import { AppMongoClient } from "@database/mongo/mongo.client";
import { IPostCreate, IPostService, IPostUpdate } from "@module/post/post.interface";
import { BadRequest, NotFound, NotModified } from "@shared/error/client.error";
import { NotImplemented } from "@shared/error/server.error";
import mongoSanitize from "express-mongo-sanitize";
import { MongoClient, ObjectId } from "mongodb";

import {
  createPostException,
  deletePostException,
  getPostByIdException,
  getPostsException,
  updatePostException
} from "./post.exception";
class PostService implements IPostService {
  getPosts = async () => {
    const client: MongoClient = await AppMongoClient();

    try {
      await client.connect();
      console.log("Connect to the MongoDB cluster");
      const database = client.db("blog");
      const collection = database.collection("post");
      return await collection.find({}).toArray();
    } catch (error: unknown) {
      getPostsException(error);
    } finally {
      await client.close();
      console.log("Close connect to the MongoDB cluster");
    }
  };

  getPostById = async (postId: ObjectId) => {
    const client: MongoClient = await AppMongoClient();
    const query = { _id: new ObjectId(postId) };
    try {
      await client.connect();
      console.log("Connect to the MongoDB cluster");
      const database = client.db("blog");
      const collection = database.collection("post");
      mongoSanitize.sanitize(query);
      const resultGetPostById = await collection.findOne(query);
      if (resultGetPostById) {
        return resultGetPostById;
      } else {
        throw new NotFound(`The post with the id "${postId}" not found.`);
      }
    } catch (error: unknown) {
      getPostByIdException(postId, error);
    } finally {
      await client.close();
      console.log("Close connect to the MongoDB cluster");
    }
  };

  createPost = async (post: IPostCreate) => {
    const client: MongoClient = await AppMongoClient();
    try {
      await client.connect();
      console.log("Connect to the MongoDB cluster");
      const database = client.db("blog");
      const collection = database.collection("post");
      mongoSanitize.sanitize({ ...post });
      const result = await collection.insertOne({ ...post });
      if (result && result.insertedId) {
        return { id: result.insertedId, message: `Created a post with id ${result.insertedId}` };
      } else {
        throw new NotImplemented(`Failed to create a new post.`);
      }
    } catch (error: unknown) {
      createPostException(error);
    } finally {
      await client.close();
      console.log("Close connect to the MongoDB cluster");
    }
  };

  updatePost = async (post: IPostUpdate) => {
    const client: MongoClient = await AppMongoClient();
    const query = { _id: new ObjectId(post.id) };
    const updatedValues = {
      $set: {
        title: post.title,
        author: post.author,
        content: post.content
      }
    };

    try {
      await client.connect();
      console.log("Connect to the MongoDB cluster");
      const database = client.db("blog");
      const collection = database.collection("post");
      mongoSanitize.sanitize(query);
      const resultUpdatePost = await collection.updateOne(query, updatedValues);
      if (resultUpdatePost) {
        return { id: post.id, message: `Updated post with id ${post.id}` };
      } else {
        throw new NotModified(`Post with id: ${post.id} not updated`);
      }
    } catch (error: unknown) {
      updatePostException(post.id, error);
    } finally {
      await client.close();
      console.log("Close connect to the MongoDB cluster");
    }
  };

  deletePost = async (postId: ObjectId) => {
    const client: MongoClient = await AppMongoClient();
    const query = { _id: new ObjectId(postId) };
    try {
      await client.connect();
      console.log("Connect to the MongoDB cluster");
      const database = client.db("blog");
      const collection = database.collection("post");
      mongoSanitize.sanitize(query);
      const resultDeletePost = await collection.deleteOne(query);
      if (resultDeletePost && resultDeletePost.deletedCount) {
        return { id: postId, message: `Removed post with id ${postId}` };
      } else if (!resultDeletePost) {
        throw new BadRequest(`Failed to remove post with id ${postId}`);
      } else if (!resultDeletePost.deletedCount) {
        throw new NotFound(`The post with the id "${postId}" not found.`);
      }
    } catch (error: unknown) {
      deletePostException(postId, error);
    } finally {
      await client.close();
      console.log("Close connect to the MongoDB cluster");
    }
  };
}

export { PostService };
