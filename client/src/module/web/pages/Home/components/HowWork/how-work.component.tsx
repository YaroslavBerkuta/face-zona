import React, { FC, ReactNode } from "react";
import style from "./how-work.module.scss";
interface IProps {
  icon: ReactNode;
  title: string;
  description: string;
}
export const HowWork: FC<IProps> = ({ icon, title, description }) => {
  return (
    <div className={style.block}>
      <div>{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
