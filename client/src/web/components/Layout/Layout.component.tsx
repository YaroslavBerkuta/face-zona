import React, { FC } from "react";
interface IProps {
  children: JSX.Element;
  header: JSX.Element;
}
export const Layout: FC<IProps> = ({ header, children }) => {
  return (
    <div>
      {header}
      <main>{children}</main>
    </div>
  );
};
