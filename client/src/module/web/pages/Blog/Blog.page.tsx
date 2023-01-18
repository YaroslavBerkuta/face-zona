import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header.component";
import { Layout } from "../../components/Layout/Layout.component";
import blog from "../../../../assets/img/blog.png";
import { Link } from "react-router-dom";
import style from "./Blog.module.scss";
import { getLastPostReq } from "../../../../api/blog";
import { GetPost } from "../../../../api/blog/blog.interface";
import { BlogList } from "./components/BlogList";
import { BlogPopular } from "./components/BlogPopular";

export const Blog = () => {
  const [newPost, setNewPost] = useState<GetPost>();
  const getLastPost = async () => {
    const { data } = await getLastPostReq();
    setNewPost(data);
  };
  useEffect(() => {
    getLastPost();
  }, []);
  return (
    <Layout header={<Header mode="black" />}>
      <>
        <section className={style.hero}>
          <div className="container">
            <div className={style.bloghero}>
              <div className={style.heroDeck}>
                <span>{newPost?.category.name}</span>
                <h3>{newPost?.title}</h3>
                <p>{newPost?.shortDescription}</p>
                <Link to={`/post/${newPost?.id}`} className="btn btn-fill">
                  Читати далі
                </Link>
              </div>
              <div className={style.heroImg}>
                <img src={newPost?.coverImg} alt="blog" />
              </div>
            </div>
          </div>
        </section>
        <BlogPopular />
        <section style={{ padding: "100px 0" }}>
          <div className="container">
            <BlogList />
          </div>
        </section>
      </>
    </Layout>
  );
};
