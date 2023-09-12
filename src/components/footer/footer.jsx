/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./footer.css";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const Footer = ({ backgroundColor, textColor }) => {
  const { t } = useTranslation();
  return (
    <div
      className="footer"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <p>©&nbsp;{t('name-full')} ({t('name-short')})</p>
    </div>
  );
};

export default Footer;
