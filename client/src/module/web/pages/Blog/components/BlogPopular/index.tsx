import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import style from "./BlogPopular.module.scss";
import { getPostPopular } from "../../../../../../api/blog";
import { GetPostPopular } from "../../../../../../api/blog/blog.interface";
import { Link } from "react-router-dom";
import _ from "lodash";
export const BlogPopular = () => {
  const [popular, setPopular] = useState<GetPostPopular[]>([]);
  const getPopular = async () => {
    const { data } = await getPostPopular();
    setPopular(data);
  };
  useEffect(() => {
    getPopular();
  }, []);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <section className={style.section}>
      <Swiper
        className={style.wrapper}
        slidesPerView={4}
        loop={true}
        spaceBetween={32}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        modules={[Navigation]}
      >
        <div className="section__title" style={{ marginBottom: 50 }}>
          <h2 style={{ color: "white" }}>Найпопулярніше на сайті</h2>
        </div>
        <div className={style.navigation}>
          <button ref={navigationPrevRef}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.4">
                <path
                  d="M20 26L10 16L20 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
          <button ref={navigationNextRef}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.4">
                <path
                  d="M12 6L22 16L12 26"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
        {popular.map((it) => (
          <SwiperSlide className={style.itemWrapper} key={it.id}>
            <Link to={`/post/${it.id}`}>
              <img src={it.coverImg} alt={it.title} />
            </Link>
            <div>
              <p>
                {_.truncate(it.title, {
                  length: 49,
                  separator: "...",
                })}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
