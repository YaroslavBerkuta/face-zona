import React from "react";
import advice from "../../../../../assets/img/advice.png";
import style from "./Advices.module.scss";
export const Advices = () => {
  return (
    <div className={style.advice}>
      <div style={{ marginBottom: "16px" }}>
        <img src={advice} alt="advice" />
      </div>
      <div>
        <h3 style={{ marginBottom: "16px" }}>Не можете обрати</h3>
        <p>
          Реклама, магазини, блогери, журнали - всі кажуть, яку косметику вам
          слід негайно купити. Цей інфо-шум заважає зробити вибір та розчаровує
          десятками неефективних флаконів на поличках.
        </p>
      </div>
      <div
        style={{
          borderTop: "1px solid #d0b86f",
          marginTop: "12px",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <span>
          Отримайте поетапну схему з конкретних засобів, які працюють. Чітко та
          просто.
        </span>
      </div>
    </div>
  );
};
