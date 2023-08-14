import React, { useEffect } from "react";
import "./Try.css";
import { useScrollTrigger } from "@material-ui/core";

function Tryasure() {
  // Check if geolocation is supported by the browser

  // useEffect(() => {
  //   async function fetchData(inputData) {
  //     try {
  //       console.log("chalja");
  //       const inputData = {
  //         name: "naman",
  //         date: "June",
  //       };

  //       const response = await fetch("/abcd", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(inputData),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok.");
  //       }

  //       const data = await response.json();
  //       console.log("Encoded Data:", data.encodedData);
  //       console.log("QR Code Data URL:", data.qrDataURL);
  //     } catch (err) {
  //       console.error("Error:", err.message);
  //     }
  //   }

  //   fetchData();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      const liq = document.getElementById("liq");

      liq.style.position = "fixed";
      liq.style.zIndex = 100;
      liq.style.display = "flex";
      liq.style.alignItems = "center";
      liq.style.borderRadius = "15vw";

      var per = 75;
      var id = null;
      var pos = 0;
      var wi = 0;
      var he = 0;
      var ra = 10;
      var pos2 = 0;

      clearInterval(id);

      id = setInterval(frame, 100);

      function frame() {
        wi++;
        he++;
        ra++;
        pos += 1;
        // pos2 += 1;
        liq.style.width = `${15}` + "vw";
        liq.style.height = `${15}` + "vw";
        liq.style.transform = `rotate(${Math.cos(pos) + "deg"})`;
        liq.style.background = `linear-gradient(to top, red ${
          pos + "%"
        } , white ${pos2 + "%"})`;

        if (wi === 50) {
          clearInterval(id);
        }
      }
    }, 1000);
  }, []);

  return (
    <>
      <div className="tryasureCotainer">
        kuch
        <div id="liq"></div>
      </div>
    </>
  );
}

export default Tryasure;
