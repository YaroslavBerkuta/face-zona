import React, { FC } from "react";
import { Footer } from "../Footer/Footer.component";
interface IProps {
  children: JSX.Element;
  header: JSX.Element;
}
export const Layout: FC<IProps> = ({ header, children }) => {
  return (
    <div>
      {header}
      <main>{children}</main>
      <Footer />
    </div>
  );
};
