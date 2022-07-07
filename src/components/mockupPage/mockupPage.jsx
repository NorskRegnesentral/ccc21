import "./mockupPage.css";
import React, { useState, useEffect } from "react";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import { getContrastList } from "../../contrast-calculations";
import { UndrawBrainstorming } from "react-undraw-illustrations";

const MockupPage = ({ contrastMatrix }) => {
  const [allColorCombos, setAllColorCombos] = useState(
    getContrastList(contrastMatrix, 1.0, 21)
  );

  useEffect(() => {
    setAllColorCombos(getContrastList(contrastMatrix, 1.0, 21.0));
  }, [contrastMatrix]);

  const getColor1 = () => {
    return allColorCombos.length > 0 ? allColorCombos[0].farge1 : "#ffffff";
  };

  const getColor2 = () => {
    return allColorCombos.length > 0 ? allColorCombos[0].farge2 : "#000000";
  };

  return (
    <div className="mockupPage">
      <NavBar
        className="mockupNav"
        title="mockup website"
        backgroundColor={getColor1()}
        textColor={getColor2()}
        topFixed={false}
      ></NavBar>
      <div className="mockupRow">
        <div className="rowItem-50 textBox">
          <h1
            style={{
              color: getColor1(),
            }}
          >
            En typisk coorporate webside
          </h1>
          <p
            className="helloP"
            style={{
              color: getColor1(),
            }}
          >
            Virker foreløpig bare på de to første fargene. Viser deg hvordan
            fargene dine påvirker lesbarhet og design!
          </p>
        </div>
        <div className="rowItem-50">
          <UndrawBrainstorming
            primaryColor={getColor1()}
            secondaryColor={getColor2()}
            accentColor={getColor2()}
            height="80%"
          />
        </div>
      </div>
      <div className="mocupRow">
        <div className="rowItem-50">
          <form
            className="mockupForm"
            style={{
              backgroundColor: getColor2(),
            }}
          >
            <h1>test form</h1>
            <div>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1"> Jeg har en katt</label>
            </div>
            <div>
              {" "}
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1"> Jeg er fornøyd</label>
            </div>
          </form>
        </div>
        <div className="rowItem-50"></div>
      </div>
      <Footer
        backgroundColor={getColor1()}
        textColor={getColor2()}
        text={"this is a footer text"}
      />
    </div>
  );
};

export default MockupPage;
