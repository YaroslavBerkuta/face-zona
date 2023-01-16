import React, { useState, FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { signUp } from "../../../../services/domain/auth.service";
import style from "./Sign-up.module.scss";
interface SingUp {
  username: string;
  usersurname: string;
  email: string;
  password: string;
  phoneNumber: string;
  comparePassword: string;
}
interface IProps {
  setLogin: any;
}
export const SignUp: FC<IProps> = ({ setLogin }) => {
  const history = useHistory();
  const [view, setView] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SingUp>();
  const onSingUp: SubmitHandler<SingUp> = async (data: SingUp) => {
    try {
      await signUp(data);
      history.push({
        pathname: "/account",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.content}>
      <h4>Реєстрація</h4>
      <div className={style.signUp}>
        <div className={style.inputWrapper}>
          <label>
            Ім’я <span>*</span>
          </label>
          <div className={style.input}>
            <input
              type="text"
              {...register("username", { required: "Це поле обовязкове" })}
            />
          </div>
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div className={style.inputWrapper}>
          <label>
            Прізвище <span>*</span>
          </label>
          <div className={style.input}>
            <input
              type="text"
              {...register("usersurname", { required: "Це поле обовязкове" })}
            />
          </div>
          {errors.usersurname && <span>{errors.usersurname.message}</span>}
        </div>
        <div className={style.inputWrapper}>
          <label>
            Email <span>*</span>
          </label>
          <div className={style.input}>
            <input
              type="email"
              {...register("email", { required: "Це поле обовязкове" })}
            />
          </div>
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className={style.inputWrapper}>
          <label>Номер телефону</label>
          <div className={style.input}>
            <input
              type="tel"
              {...register("phoneNumber", { required: "Це поле обовязкове" })}
            />
          </div>
          {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
        </div>
        <div className={style.inputWrapper}>
          <label>
            Пароль <span>*</span>
          </label>
          <div className={style.input}>
            <input
              type={view ? "text" : "password"}
              {...register("password", {
                required: "Це поле обовязкове",
              })}
            />
            <div
              onClick={() => setView(!view)}
              style={{ width: 25, height: 25 }}
            >
              {view ? (
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 5.25C5 5.25 2 12 2 12C2 12 5 18.75 12.5 18.75C20 18.75 23 12 23 12C23 12 20 5.25 12.5 5.25Z"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5 15.75C14.5711 15.75 16.25 14.0711 16.25 12C16.25 9.92893 14.5711 8.25 12.5 8.25C10.4289 8.25 8.75 9.92893 8.75 12C8.75 14.0711 10.4289 15.75 12.5 15.75Z"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.8531 11.9344L21 15.6376"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.4562 13.9969L15.1218 17.7751"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.53434 13.9874L8.86871 17.7749"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.13754 11.9344L2.99066 15.6563"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 9.83423C4.575 11.7842 7.4625 14.2499 12 14.2499C16.5375 14.2499 19.425 11.7842 21 9.83423"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className={style.inputWrapper}>
          <label>
            Повторити пароль <span>*</span>
          </label>
          <div className={style.input}>
            <input
              type={view ? "text" : "password"}
              {...register("comparePassword", {
                required: "Це поле обовязкове",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Пароль не  співпадавє";
                  }
                },
              })}
            />
            <div
              onClick={() => setView(!view)}
              style={{ width: 25, height: 25 }}
            >
              {view ? (
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 5.25C5 5.25 2 12 2 12C2 12 5 18.75 12.5 18.75C20 18.75 23 12 23 12C23 12 20 5.25 12.5 5.25Z"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5 15.75C14.5711 15.75 16.25 14.0711 16.25 12C16.25 9.92893 14.5711 8.25 12.5 8.25C10.4289 8.25 8.75 9.92893 8.75 12C8.75 14.0711 10.4289 15.75 12.5 15.75Z"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.8531 11.9344L21 15.6376"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.4562 13.9969L15.1218 17.7751"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.53434 13.9874L8.86871 17.7749"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.13754 11.9344L2.99066 15.6563"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 9.83423C4.575 11.7842 7.4625 14.2499 12 14.2499C16.5375 14.2499 19.425 11.7842 21 9.83423"
                    stroke="#333333"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
          {errors.comparePassword && (
            <span>{errors.comparePassword.message}</span>
          )}
        </div>
      </div>
      <button
        onClick={handleSubmit(onSingUp)}
        className="btn btn-fill"
        style={{ paddingLeft: 75, paddingRight: 75 }}
      >
        Зберегти
      </button>
      <button onClick={() => setLogin("auth")} className={style.switch}>
        Я вже зареєстрований
      </button>
    </div>
  );
};
