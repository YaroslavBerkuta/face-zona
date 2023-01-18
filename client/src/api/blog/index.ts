import { IPaginationReq } from "../../typing/interfaces";
import api from "../http.service";
import {
  GetPost,
  GetPostCategory,
  GetPostList,
  GetPostPopular,
} from "./blog.interface";

export const getLastPostReq = (params?: any) => {
  return api.get<GetPost>("/blog/last", { params });
};

export const getPostList = (params: IPaginationReq) => {
  return api.get<GetPostList>("blog/list", { params });
};

export const getPostCategory = (params?: any) => {
  return api.get<GetPostCategory[]>("/blog/category", { params });
};

export const getPostPopular = (params?: any) => {
  return api.get<GetPostPopular[]>("/blog/popular", { params });
};
