import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./Header.module.scss";
import logoWhite from "../../../../assets/img/logoWhite.svg";
import logoBlack from "../../../../assets/img/logoBlack.svg";
import { Login } from "../Login/Login.component";
import { selectAccount } from "../../../../store/account/selectors";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { appService } from "../../../../services/domain/app.service";
interface IProps {
  mode?: "white" | "black";
}
export const Header = ({ mode = "white" }) => {
  const history = useHistory();
  useEffect(() => {
    appService.load();
  }, []);
  const [login, setLogin] = useState(false);
  const account = useSelector(selectAccount);
  const cheackAuth = () => {
    if (isEmpty(account.data)) {
      setLogin(true);
    } else {
      history.push({
        pathname: "/account",
      });
    }
  };
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
                {mode == "black" ? (
                  <img src={logoBlack} alt="logo" />
                ) : (
                  <img src={logoWhite} alt="logo" />
                )}
              </Link>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ul
                className={`${style.menu} ${
                  mode == "black" && style.menuBlack
                }`}
              >
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
                  <Link to="/blog">Блог</Link>
                </li>
                <li>
                  <p onClick={() => cheackAuth()}>Мій кабінет</p>
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
      {login && <Login view={setLogin} />}
    </>
  );
};
