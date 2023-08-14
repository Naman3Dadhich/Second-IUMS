import Navbar from "./Components/Navbar";
import React from "react";
import { useParams } from "react-router-dom";

const Header = () => {
  let url = useParams();
  console.log(window.location.href);

  return <></>;
};

const Body = () => {
  return (
    <>
      <button onClick={() => window.location.reload()}>
        Back
        <div
          style={{ width: 99 + "vw", height: 100 + "%", background: "grey" }}
        >
          <img
            src="https://cdn.discordapp.com/attachments/1110615388682727524/1128422505162489906/How-to-Make-Under-Construction-Page-WordPress-transformed.jpeg"
            style={{
              width: 100 + "%",
              height: 100 + "vh",
              background: "transparent",
            }}
          ></img>
        </div>
      </button>
    </>
  );
};

const Footer = () => {
  return <></>;
};

function UnderCondtruction() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default UnderCondtruction;
