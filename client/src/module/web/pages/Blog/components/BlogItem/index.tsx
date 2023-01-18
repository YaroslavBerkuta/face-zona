import _ from "lodash";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import style from "./BlogItem.module.scss";
interface IProps {
  id: number;
  cover: string;
  title: string;
  short: string;
  category: string;
}

export const BlogItem: FC<IProps> = ({ category, cover, title, short, id }) => {
  function limit(string = "", limit = 0) {
    return string.substring(0, limit);
  }
  return (
    <div className={style.item}>
      <div className={style.itemImg}>
        <img src={cover} alt={title} />
        <span>{category}</span>
      </div>
      <div className={style.itemContent}>
        <h2>
          {_.truncate(title, {
            length: 49,
            separator: "...",
          })}
        </h2>
        <p>
          {_.truncate(short, {
            length: 231,
            separator: "...",
          })}
          <Link to={`/post/${id}`}>Читати далі</Link>
        </p>
      </div>
    </div>
  );
};
