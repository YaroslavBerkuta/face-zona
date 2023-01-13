import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import logoWhite from "../../../../assets/img/logoWhite.svg";
import { Login } from "../Login/Login.component";
export const Header = () => {
  return (
    <>
      <header className={style.header}>
        <div
          className="container"
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.24)",
            paddingBottom: "20px",
          }}
        >
          <div className={style.headerFlex}>
            <div>
              <Link to="/">
                <img src={logoWhite} alt="logo" />
              </Link>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ul className={style.menu}>
                <li>
                  <Link to="/">Підбір косметики</Link>
                </li>
                <li>
                  <Link to="/">Процедури</Link>
                </li>
                <li>
                  <Link to="/">Школа догляду</Link>
                </li>
                <li>
                  <Link to="/">Для лікарів</Link>
                </li>
                <li>
                  <Link to="/">Блог</Link>
                </li>
                <li>
                  <Link to="/">Мій кабінет</Link>
                </li>
              </ul>
              <button
                className="btn"
                style={{ paddingLeft: "16px", paddingRight: "16px" }}
              >
                Пройти тест
              </button>
            </div>
          </div>
        </div>
      </header>
      <Login />
    </>
  );
};
