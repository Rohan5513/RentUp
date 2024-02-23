import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Signup from "../signup/signup";
import Login from "../login/login";
import Profile from "../profile/Profile";
import PropertyManagement from "../property/Property";
import ForgotPass from "../forgot_pass/forgot_pass";
import ChangePass from "../forgot_pass/Change_pass";
import ListedProperty from "../property/ListedProperty";

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/property" component={PropertyManagement} />
          <Route path="/add" component={PropertyManagement} />
          <Route exact path="/ListedProperty" component={ListedProperty} />
          <Route exact path="/forgot-password" component={ForgotPass} />
          <Route exact path="/change-password" component={ChangePass} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
