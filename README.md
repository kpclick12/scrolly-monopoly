# Spelplanen har förändrats

En scrollytelling-berättelse (på svenska) om den svenska
fastighetsmarknaden, berättad genom Monopol. Den öppnar med en
scrolldriven 3D-scen — ett Monopolbräde där husen växer till hotell och
färggrupperna till slut reser sig som torn efter gatmedianer, gatusnitt
och ett tydligt märkt områdesproxyvärde — och går sedan igenom datat i fem akter: gatorna
(Strandvägen 168 360 kr/kvm mot brädets 4 200 kr), bostadskarriären
(SCB:s villaindex +412 % 1996–2025 och bostadsrätternas genomsnittliga
kvadratmeterpris +789 % 1996–2024),
boendeformer och kötid (894 592 registrerade i Stockholms bostadskö),
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

Varje siffra på sidan är antingen ett publicerat värde eller en
**transparent sammanställning, avrundad för läsbarhet** —
full källförteckning finns i sektionen "Metod & källor" längst ned på
sidan. I korthet:

- **Brädets gator, kr/kvm** — gatmedianer från listade lägenhetsslutpriser
  under 2025 (Hemnet/Booli), Strandvägens publicerade gatusnitt från
  Fastighetsbyrån/Svensk Mäklarstatistik och Vasastan–Norrmalms
  tolvmånaderssnitt som uttryckligt proxyvärde för Norrmalmstorg
- **Prisutveckling** — SCB FASTPI (villor +412 % 1996–2025) och Svensk
  Mäklarstatistik via Stockholms Handelskammare (bostadsrätter +789 %
  1996–2024, nationellt genomsnittligt kr/kvm; mellanår ungefärliga)
- **Styrräntan** — Riksbanken (topp 4,00 % sep 2023; 1,75 % jun 2026)
- **Utanför brädet** — SCB (boendeformer; boendeutgifter per
  upplåtelseform), Bostadsförmedlingen i Stockholm (kötider),
  Hyresgästföreningen (Unga vuxnas boende 2025)
- **Skatterna** — Skatteverket (fastighetsavgiftens tak 10 425 kr för inkomståret 2026),
  OECD Revenue Statistics 2024 (bred kategori för skatter på egendom, data 2022)
- **Skulderna** — SCB (5 530,49 mdkr exklusive periodiseringar Q1 2026),
  2026 års ekonomiska vårproposition (över 80 % bolån) och
  Regeringen/Finansinspektionen (bolåneregler apr 2026)
- **The Landlord's Game** — Lizzie Magie, patent 1904

## Deploy

Deployas till GitHub Pages via `.github/workflows/deploy.yml`, som
bygger med `npm run build` och publicerar `dist/` vid varje push till
`main`. Vite-basvägen (`/scrolly-monopoly/`) sätts i `vite.config.js`
för både produktionsbygget och `vite preview`.

### Delningsbild (og:image)

`public/og-image.png` (1200×630) är den bild som visas när länken delas
på LinkedIn, Reddit, Slack och X. Den är en skärmdump av 3D-hjältens
tornvy (scrollposition ≈0,97 av hero-sektionen, med `.hero-card` och
`.hero-chip` dolda) med rubriken pålagd. Vill du göra om den: rendera
om plåten, lägg på texten och ersätt filen — måtten och filnamnet ska
vara desamma, eftersom `index.html` pekar på den med en **absolut**
URL (relativa sökvägar ignoreras av de flesta länkförhandsvisare).
