export interface IPaginationReq {
  limit?: number;
  page?: number;
  sortField?: string;
  sort?: string;
  skip?: number;
  searchString?: string;
  status?: string;
}
