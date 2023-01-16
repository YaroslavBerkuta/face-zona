import React, { FC, useState } from "react";
import { SignIn } from "../Sign-in/Sign-in.component";
import { SignUp } from "../Sign-up/Sign-up.component";
import style from "./Login.module.scss";
interface IProps {
  view: any;
}
export const Login: FC<IProps> = ({ view }) => {
  const [login, setLogin] = useState<"login" | "auth">("auth");
  return (
    <div className={`${style.wrapper}`}>
      <div className={style.close} onClick={() => view(false)}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.625 4.375L4.375 15.625"
            stroke="#D08F8A"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.625 15.625L4.375 4.375"
            stroke="#D08F8A"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {login == "login" ? (
        <SignUp setLogin={setLogin} />
      ) : (
        <SignIn setLogin={setLogin} />
      )}
    </div>
  );
};
