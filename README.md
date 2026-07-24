# Spelplanen har förändrats

En scrollytelling-berättelse (på svenska) om den svenska
fastighetsmarknaden, berättad genom Monopol. Den öppnar med en
scrolldriven 3D-scen — ett Monopolbräde där husen växer till hotell och
färggrupperna till slut reser sig som torn i höjd med gatornas verkliga
kvadratmeterpriser — och går sedan igenom datat i fem akter: gatorna
(Strandvägen 168 360 kr/kvm mot brädets 220 kr), bostadskarriären
(+789 % för bostadsrätter sedan 1996), de som aldrig fick spela (en
tredjedel av hushållen äger ingen ruta; 894 592 i Stockholms bostadskö),
skatterutorna som plockades bort (fastighetsskatten 2008) och banken
(5 530 miljarder i hushållsskulder).

Live: https://kpclick12.github.io/scrolly-monopoly/

## Teknik

- **[Svelte 5](https://svelte.dev)** (runes: `$state`, `$derived`,
  `$props`) + **[Vite](https://vite.dev)** för bygget
- **[Three.js](https://threejs.org)** för prologen: ett procedurellt
  Monopolbräde (tärningar, hattpjäs, hus, hotell och GÅ-ruta ritade med
  canvas-texturer — inga modellfiler), styrt av ett enda
  scroll-easat `game`-värde
- **[d3-scale](https://d3js.org)** för diagramskalor — diagrammen är
  handbyggd SVG, så varje stapel och linje kan stylas och animeras med
  vanlig CSS/Svelte
- Inget UI-ramverk, inget CSS-ramverk — en delad stylesheet
  (`src/app.css`) håller alla design-tokens (färg, typografi, det
  delade `.scrolly-step`-kortet och `.visual-frame-stack`-mönstret)
- Självhostad Playfair Display med variabel vikt (`public/fonts/`) —
  inga tredjepartsanrop

## Projektstruktur

```
src/
  App.svelte              hero, aktordning, avslutning, metod/källor
  app.css                 design-tokens: färg, typografi, delade kortstilar
  data/                   en JSON-fil per dataset (se Källor nedan)
  lib/
    components/           MonopolyHero (3D), Scrolly, LadderChart,
                           CityCompare, PriceJourney, EquityRace,
                           TenureWaffle, QueueScene, TaxBoard,
                           DebtMountain, StatTiles
    story/                en Svelte-komponent per akt (ActSpelplanen,
                           ActKarriaren, ActUtanfor, ActSkatten, ActBanken)
    data/load.js           importerar och exporterar alla data/*.json
```

Varje akt följer samma mönster som
[scrolly-wealth](https://github.com/kpclick12/scrolly-wealth) och
[scrolly-butterflyeffect](https://github.com/kpclick12/scrolly-butterflyeffect):
en `Scrolly.svelte`-wrapper parar en sticky visuell panel med en kolumn
stegkort; när läsaren scrollar förbi ett korts mittpunkt blir det aktivt
och styr vilket diagram, läge eller highlight panelen visar. Visualerna
monteras aldrig om mellan steg — en och samma diagraminstans lever kvar
och bara dess läge ändras.

## npm-skript

```
npm install       installera beroenden
npm run dev       starta Vite-dev-servern
npm run build     produktionsbygge till dist/
npm run preview   servera produktionsbygget lokalt (respekterar
                   GitHub Pages-basvägen /scrolly-monopoly/)
```

## Källor

Varje siffra på sidan är en **approximation, avrundad för läsbarhet** —
full källförteckning finns i sektionen "Metod & källor" längst ned på
sidan. I korthet:

- **Dyraste gator, kr/kvm** — Fastighetsbyrån på siffror från Svensk
  Mäklarstatistik, försäljningar apr 2025–mar 2026
- **Prisutveckling 1996–2025** — Ekonomifokus sammanställning av
  SCB / Svensk Mäklarstatistik (villor +366 %, bostadsrätter +789 %)
- **Styrräntan** — Riksbanken (topp 4,00 % sep 2023; 1,75 % jun 2026)
- **Utanför brädet** — SCB (boendeformer; boendeutgifter per
  upplåtelseform), Bostadsförmedlingen i Stockholm (kötider),
  Hyresgästföreningen (Unga vuxnas boende 2025)
- **Skatterna** — Skatteverket (fastighetsavgiftens tak 10 074 kr),
  SNS/LO-sammanställningar av OECD-data (egendomsskatt som andel av BNP)
- **Skulderna** — SCB/SEB (5 530 mdkr Q1 2026), Ekonomifakta/Riksbanken
  (skuldkvot ≈173 %, topp ≈200 % 2021), Regeringen/Finansinspektionen
  (bolåneregler apr 2026)
- **The Landlord's Game** — Lizzie Magie, patent 1904

## Deploy

Deployas till GitHub Pages via `.github/workflows/deploy.yml`, som
bygger med `npm run build` och publicerar `dist/` vid varje push till
`main`. Vite-basvägen (`/scrolly-monopoly/`) sätts i `vite.config.js`
för både produktionsbygget och `vite preview`.
