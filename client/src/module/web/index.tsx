import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Account } from "./pages/Account/Account.page";
import { Blog } from "./pages/Blog/Blog.page";
import { Home } from "./pages/Home/Home.page";

export const Web = () => {
  return (
    <Router>
      <Switch>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
