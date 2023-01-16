import React from "react";
import { Header } from "../../components/Header/Header.component";
import { Layout } from "../../components/Layout/Layout.component";
import blog from "../../../../assets/img/blog.png";
import { Link } from "react-router-dom";
import style from "./Blog.module.scss";

export const Blog = () => {
  return (
    <Layout header={<Header mode="black" />}>
      <section className={style.hero}>
        <div className="container">
          <div className={style.bloghero}>
            <div className={style.heroDeck}>
              <span>Догляд за шкірою</span>
              <h3>Як захистити шкіру від сонця або інше у два рядки</h3>
              <p>
                Доводиться досліджувати, що означають латинські хімічні назви та
                розбиратись в механізмах дії компонентів? Ще складніше -
                побудувати цілісну систему догляду з міжнародної асоціації
                медицини антистаріння естетич асоціації медици...
              </p>
              <Link to="post" className="btn btn-fill">
                Читати далі
              </Link>
            </div>
            <div className={style.heroImg}>
              <img src={blog} alt="blog" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
