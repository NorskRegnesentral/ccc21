Siden er hostet via github pages: https://kamillamortensen.github.io/contrastMatch/

# Hvordan kjøre koden i development-modus fra datamaskinen!
## Slik gjør du
1. Clone repository fra git
2. Gå inn i mappen i treminal

Du må ha npm/node installert på maskinen for de neste to trinn:

3. Kjør `npm install` for å installere avhengigheter
4. Kjør `npm start` for å starte
5. Nå burde siden komme opp i nettleseren automatisk, eller du kan åpne [http://localhost:3000](http://localhost:3000) i nettleseren! 

<kbd>![Skjermbilde 2022-07-06 kl  12 58 35](https://user-images.githubusercontent.com/55190927/177535411-0aac5e1f-ce19-438c-a25d-e83c2236038f.png )</kbd>

Når du gjør endringer i koden skal localhost:3000 oppdateres automatisk. 

# Litt om systemet!

## Mappestruktur / arkitektur
Inne i mappen til prosjektet ser det slik ut om du åpner den i en fil-editor: <br>
![Skjermbilde 2022-07-06 kl  12 49 18](https://user-images.githubusercontent.com/55190927/177533880-df8bbff6-0ba2-4050-a308-41f4fd9249fb.png)
<ul>
  <li><b>Components</b> inneholder alle komponentene som er i appen. Komponenter er biter med kode som kan brukes flere steder. Eksempler er meny, knapp, inputfelt, el.</li>
<li><b>Pages</b> er sidene i appen. I dette tilfellet er det alle sider som kan lastes når du skriver "nesside.no/xxxx" i nettleseren. Eksempler er Home (der vi sjekker kontrast) og About (planlagt å ha info om wcag)</li>
<li><b>Flere forklaringer kommer!</b></li>

</ul>




## Bibliotek 

<b>react-undraw-illustrations</b> er brukt for å vise illustrasjoner med de fargene som brukeren har valgt ut. <br>
React-undraw-illustrations tar inn illustrasjoner med FRI LISENS og gjør dem om til react-komponenter så det er enkelt å bruke dem og gjøre justeringer som å endre farge. <br>
Illustrasjonene kommer fra Undraw, en side hvor du kan finne svg-animasjoner på fri lisens: https://undraw.co/ <br>
Biblioteket har ikke alle illustrasjonene som Undraw har, men utvalget finnes her: https://graemefulton.github.io/. <br> 
En god bruksanvisning for hvordan man bruker komponentene er her:  https://github.com/GraemeFulton/react-undraw-illustrations.

