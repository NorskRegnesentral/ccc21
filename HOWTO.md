# Hvordan bruke CCC 2.1 / How to use CCC 2.1

Denne filen innholder informasjon om hvordan installere og bruker CCC 2.1. /
This document contains information on how to install and use CCC 2.1.

## Hvordan kjøre koden i development-modus fra datamaskinen?

1. Clone repository fra git
2. Gå inn i mappen i treminal

Du må ha npm/node installert på maskinen for de neste to trinn:

3. Kjør `npm install` for å installere avhengigheter
4. Kjør `npm start` for å starte
5. Nå burde siden komme opp i nettleseren automatisk, eller du kan åpne [http://localhost:3000](http://localhost:3000) i nettleseren! 

Når du gjør endringer i koden skal localhost:3000 oppdateres automatisk. 

## Hvordan deploye react-koden til github pages?

Det du må gjøre i dette prosjektet er å sørge for at du og den nye koden er på master branch. Deretter kan du kjøre `npm run deploy` fra terminalen, og siden skal oppdateres! <br>
Tutorial til oppsett og endring av host-side: https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/

##  Hvordan legge til default fargepaletter?

Gå til src > variables.
Legg til under defaultColorPalettes.

## Litt om systemet

### Litt om mappestruktur og arkitekturen

Inne i mappen til prosjektet ser det slik ut om du åpner den i en fil-editor: <br>
![Skjermbilde 2022-07-06 kl  12 49 18](https://user-images.githubusercontent.com/55190927/177533880-df8bbff6-0ba2-4050-a308-41f4fd9249fb.png)
<ul>
  <li><b>Components</b> inneholder alle komponentene som er i appen. Komponenter er biter med kode som kan brukes flere steder. Eksempler er meny, knapp, inputfelt, el.</li>
<li><b>Pages</b> er sidene i appen. I dette tilfellet er det alle sider som kan lastes når du skriver "nesside.no/xxxx" i nettleseren. Eksempler er Home (der vi sjekker kontrast) og About (her planla jeg å ha info om wcag, men ble aldri brukt)</li>
<li><b>color-checker.js</b> er viktig: den inneholder koden som finner kontrastene mellom farger. Er hentet fra https://colorcontrast.dev/api/</li>
<li><b>contrast-calbulations.js</b> er en fil med andre metoder som gjør diverse kalkulasjoner som har med fargekontraster å gjøre</li>
<li><b>viarbles.css og variables.js</b> er filer som inneholder variabler som går igjen på tvers av sider og filer. Endres de, så endres variablen alle steder de har blitt brukt. </li>
</ul>

## Litt om biblioteker og dependencies

<b>react i18next</b> er brukt for å enkelt kunne oversette siden mellom norsk og andre språk om det skulle bli ønskelig. Lenke: https://react.i18next.com/

<b>Mui material icons</b> er bruk for å vise profesjonelle ikoner. Se ikonene: https://mui.com/material-ui/material-icons/?query=text og les litt om hvordan de brukes i react:  https://blog.wrappixel.com/how-to-use-mui-icons-in-react/. 

<b>react-undraw-illustrations</b> er brukt for å vise illustrasjoner med de fargene som brukeren har valgt ut. <br>
React-undraw-illustrations tar inn illustrasjoner med FRI LISENS og gjør dem om til react-komponenter så det er enkelt å bruke dem og gjøre justeringer som å endre farge. <br>
Illustrasjonene kommer fra Undraw, en side hvor du kan finne svg-animasjoner på fri lisens: https://undraw.co/ <br>
Biblioteket har ikke alle illustrasjonene som Undraw har, men utvalget finnes her: https://graemefulton.github.io/. <br> 
En god bruksanvisning for hvordan man bruker komponentene er her:  https://github.com/GraemeFulton/react-undraw-illustrations.