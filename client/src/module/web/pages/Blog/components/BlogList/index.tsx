import React, { useEffect, useState } from "react";
import { getPostCategory, getPostList } from "../../../../../../api/blog";
import {
  GetPost,
  GetPostCategory,
} from "../../../../../../api/blog/blog.interface";
import { usePaginationList } from "../../../../../../core/hooks";
import { BlogItem } from "../BlogItem";
import style from "./BlogList.module.scss";
export const BlogList = () => {
  const [category, setCategory] = useState<number | null>();
  const [search, setSearch] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<GetPostCategory[]>();
  const getCategory = async () => {
    const { data } = await getPostCategory();
    setCategoryList(data);
  };
  useEffect(() => {
    getCategory();
  }, []);
  const list = usePaginationList<GetPost>({
    fetchItems: getPostList,
    needInit: true,
    clearWhenReload: false,
    limit: 8,
    page: 10,
  });

  useEffect(() => {
    list.setLoadParams({ category, searchString: search });
  }, [category, search]);

  return (
    <div className={style.wrapper}>
      <div className={style.filter}>
        <div className={style.search}>
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z"
                stroke="#333333"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.4438 16.4438L21.0001 21.0001"
                stroke="#333333"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Пошук..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <ul>
          <li onClick={() => setCategory(null)}>Всі</li>
          {categoryList?.map((it) => (
            <li key={it.id} onClick={() => setCategory(it.id)}>
              {it.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={style.wrapperList}>
        {list.items.map((it) => (
          <BlogItem
            id={it.id}
            key={it.id}
            category={it.category.name}
            cover={it.coverImg}
            short={it.shortDescription}
            title={it.title}
          />
        ))}
      </div>
    </div>
  );
};
