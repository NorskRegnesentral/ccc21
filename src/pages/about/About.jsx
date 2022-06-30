import "./about.css";
import React, { useEffect, useState } from "react";
import Timeline from "../../components/timeline/timeline";

function About() {
  return (
    <div className="About">
      <h1>Hva er WCAG?</h1>
      <Timeline />
    </div>
  );
}

export default About;
