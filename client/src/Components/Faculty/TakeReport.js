import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar";

const Header = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

const Footer = () => {
  return (
    <>
      <Footer />
    </>
  );
};

const Body = () => {
  return (
    <>
      <div className="onConstruction">
        <div className="block">
          <div className="">
            <img
              className="block-33img"
              src="https://media.discordapp.net/attachments/1110615388682727524/1128422505162489906/How-to-Make-Under-Construction-Page-WordPress-transformed.jpeg?width=1132&height=663"
            />
          </div>
        </div>
      </div>
    </>
  );
};

function TakeReport() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default TakeReport;
