import React from "react";
import { Header } from "../../components/Header/Header.component";
import { Layout } from "../../components/Layout/Layout.component";
import baner from "../../../assets/img/main.png";
import style from "./Home.module.scss";

export const Home = () => {
  return (
    <Layout header={<Header />}>
      <div className={style.hero}>
        <div className="hero__img">
          <img src={baner} alt="main" width={"100%"} height={900} />
        </div>
        <div className={style.heroDescription}>
          <h1>
            <span>Справді індивідуальний</span> догляд за обличчям, який працює
          </h1>
          <p>
            Професійні рекомендації для <span>81 типу</span> шкіри. Відкрий
            підхід до своєї шкіри за 10 хвилин.
          </p>
        </div>
      </div>
    </Layout>
  );
};
