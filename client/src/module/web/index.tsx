import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home.page";

export const Web = () => {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};
