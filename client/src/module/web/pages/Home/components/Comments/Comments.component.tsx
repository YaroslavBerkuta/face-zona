import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import oksana from "../../../../../../assets/img/oksana.png";
import style from "./Commets.module.scss";
export const Comments = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <div className="container">
      <Swiper
        className={style.wrapper}
        slidesPerView={3}
        loop={true}
        spaceBetween={20}
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
        <div className="section__title" style={{ marginBottom: "50px" }}>
          <h2
            style={{
              fontFamily: "Adventure",
              color: "#D0B86F",
              fontSize: 48,
            }}
          >
            Якісний Догляд = Якість Вашої Шкіри
          </h2>
        </div>
        <div className={style.navigation}>
          <button ref={navigationPrevRef}>
            <svg
              width="12"
              height="22"
              viewBox="0 0 12 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 21L1 11L11 1"
                stroke="#D08F8A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button ref={navigationNextRef}>
            <svg
              width="12"
              height="22"
              viewBox="0 0 12 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11L1 21"
                stroke="#D08F8A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <SwiperSlide className={style.itemWrapper}>
          <div className={style.avatar}>
            <img src={oksana} alt="user" />
          </div>
          <div className={style.detail}>
            <span>Міла</span>
            <p>
              Вибір шрифту та розміру шрифту, за допомогою якого Lorem ipsum
              відтворюється, відповідає на конкретні потреби, які виходять за
              рамки просто...
              <span>Читати відгук</span>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={style.itemWrapper}>
          <div className={style.avatar}>
            <img src={oksana} alt="user" />
          </div>
          <div className={style.detail}>
            <span>Міла</span>
            <p>
              Вибір шрифту та розміру шрифту, за допомогою якого Lorem ipsum
              відтворюється, відповідає на конкретні потреби, які виходять за
              рамки просто...
              <span>Читати відгук</span>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={style.itemWrapper}>
          <div className={style.avatar}>
            <img src={oksana} alt="user" />
          </div>
          <div className={style.detail}>
            <span>Міла</span>
            <p>
              Вибір шрифту та розміру шрифту, за допомогою якого Lorem ipsum
              відтворюється, відповідає на конкретні потреби, які виходять за
              рамки просто...
              <span>Читати відгук</span>
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
