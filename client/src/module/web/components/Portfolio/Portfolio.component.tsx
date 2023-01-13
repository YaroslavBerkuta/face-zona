import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper";
import style from "./Portfolio.module.scss";
import oksanaFull from "../../../../assets/img/oksanaFull.png";
import videoPoster from "../../../../assets/img/videoPoster.png";
import logoGold from "../../../../assets/img/logoGold.svg";
import diplom from "../../../../assets/img/diplom.jpg";
import "swiper/css/bundle";
export const Portfolio = () => {
  return (
    <section className={style.section}>
      <div className="container">
        <div className={style.detail}>
          <div style={{ maxWidth: "600px" }}>
            <h2>Оксана Пашковська</h2>
            <span>Лікар-дерматолог</span>
            <p>
              Експерт міжнародної асоціації медицини антистаріння Член
              Мультидисциплінарного естетичного товариства Міжнародний тренер
              ін'єкційної косметології
            </p>
            <ul style={{ display: "flex" }}>
              <li>
                <span>14+</span>
                <p>Років клінічної практики</p>
              </li>
              <li>
                <span>70+</span>
                <p>Майстер класів для лікарів</p>
              </li>
              <li>
                <img src={logoGold} alt="" />
                <p>Засновник клініки в місті Київ</p>
              </li>
            </ul>
          </div>
          <div className={style.avatar}>
            <img src={oksanaFull} alt="oksanaFull" />
          </div>
        </div>
        <div className={style.playerContent}>
          <div className={style.player}>
            <video
              src=""
              controls
              poster={videoPoster}
              style={{ width: "100%" }}
            ></video>
          </div>
          <div style={{ maxWidth: "450px" }}>
            <h4>Спікер міжнародних конгресів:</h4>
            <ul>
              <li>"IMCAS, International Master Course on Aging Science"</li>
              <li>"Kolkhida, International Caucasian Congress"</li>
              <li>"Marathon of Victorious Clinical Cases"</li>
              <li>"S-congress, Secret of Aesthetic & Anti-aging Medicine"</li>
              <li>"АМВС, Days of Advanced Aesthetic Medicine"</li>
              <li>"May Aesthetics Meeting"</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="section__title">
            <h2 style={{ color: "white" }}>Сертифікати</h2>
          </div>
          <div>
            <Swiper
              className="diplom"
              style={{ marginTop: "50px" }}
              effect={"coverflow"}
              centeredSlides={true}
              initialSlide={2}
              slidesPerView={3}
              coverflowEffect={{
                rotate: 0,
                stretch: 180,
                depth: 150,
                modifier: 1,
                slideShadows: false,
              }}
              navigation={true}
              modules={[EffectCoverflow, Navigation]}
            >
              <SwiperSlide>
                <img src={diplom} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={diplom} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={diplom} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={diplom} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={diplom} alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
