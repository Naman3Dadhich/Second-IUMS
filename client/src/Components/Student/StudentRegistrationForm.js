import React, { Component, useEffect } from "react";
import UserForm from "./RegistrationForm/UserForm";
import { useNavigate } from "react-router-dom";

const Header = () => {
  return <></>;
};

const Body = () => {
  return (
    <>
      <div>
        <UserForm />
      </div>
    </>
  );
};

const Footer = () => {
  return <></>;
};

function StudentRegistrationForm() {
  //middleware

  const navigate = useNavigate();

  const callMiddleware = async () => {
    try {
      const res = await fetch("/m1", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/Student/StudentLogin");
    }
  };

  useEffect(() => {
    callMiddleware();
  }, []);
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default StudentRegistrationForm;
