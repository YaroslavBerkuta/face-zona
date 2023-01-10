import React, { useState } from "react";

export const Login = () => {
  const [login, setLogin] = useState<"login" | "auth">("login");

  if (login == "login") {
    return;
  } else {
    return;
  }
};
