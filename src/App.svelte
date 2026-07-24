<script>
  import { appData as data } from "./lib/data/load.js";
  import MonopolyHero from "./lib/components/MonopolyHero.svelte";
  import ActSpelplanen from "./lib/story/ActSpelplanen.svelte";
  import ActKarriaren from "./lib/story/ActKarriaren.svelte";
  import ActUtanfor from "./lib/story/ActUtanfor.svelte";
  import ActSkatten from "./lib/story/ActSkatten.svelte";
  import ActBanken from "./lib/story/ActBanken.svelte";
</script>

<MonopolyHero groups={data.board.groups} />

<main>
  <ActSpelplanen {data} />
  <ActKarriaren {data} />
  <ActUtanfor {data} />
  <ActSkatten {data} />
  <ActBanken {data} />
</main>

<section class="closing" aria-label="Avslutning">
  <div class="closing-inner">
    <svg class="closing-house" viewBox="0 0 64 56" aria-hidden="true">
      <path d="M32 4 L58 26 H50 V50 H14 V26 H6 Z" fill="#d93a2b" />
      <rect x="27" y="34" width="10" height="16" fill="#f2e9cf" />
    </svg>
    <h2>Spelet som skulle varna oss</h2>
    <p>
      Monopol började inte som en hyllning till fastighetsaffärer. Förlagan,
      The Landlord's Game, patenterades 1904 av Lizzie Magie — som en
      <em>varning</em>: den skulle visa vad som händer i en ekonomi där värdet
      av mark och läge tillfaller den som råkar äga rutan, tills en spelare har
      allt och de andra inget. Spelet var propaganda för jordvärdeskatt. Vi
      gjorde det till familjeunderhållning — och sedan, i Sverige, till
      nationalekonomi.
    </p>
    <p>
      För det svenska partiet följde regelboken hon varnade för, punkt för
      punkt: stigande rutpriser, inkassering varje varv för de som äger,
      skatterutorna bortplockade, banken som alltid säger ja — och en
      tredjedel av spelarna som aldrig fick något startkapital. Ett brädspel
      slutar när de sista spelarna går i konkurs och en vinnare räknar sedlar.
      Ett land har inte den möjligheten — här måste även nästa generation få en
      plats runt brädet. Frågan efter trettio vilda år är inte vem som vann.
      Det vet vi. Frågan är vilka regler nästa parti spelas efter.
    </p>
  </div>
</section>

<section class="sources" aria-label="Metod och källor">
  <div class="sources-inner">
    <h2>Metod &amp; källor</h2>
    <p class="sources-intro">
      Varje siffra på den här sidan är en <strong>approximation, avrundad för
      läsbarhet</strong>. Det här är en förklarande berättelse, inte
      primärstatistik — läs varje tal som "ungefär", inte "exakt".
    </p>
    <ul>
      <li>
        <strong>Spelplanen</strong> — det klassiska svenska Monopol-brädet
        (Stockholmsgator, original 1932) med tryckta köpesummor 60–400
        spel-kronor, inklusive rutorna Inkomstskatt (200 kr) och Lyxskatt
        (100 kr) samt regeln "inkassera 200 kr när du passerar GÅ".
      </li>
      <li>
        <strong>Dyraste gator</strong> — Fastighetsbyråns kartläggning på
        siffror från Svensk Mäklarstatistik, försäljningar april 2025–mars
        2026 (gator med färre än fem affärer exkluderade): Strandvägen
        168&nbsp;360 kr/kvm, Bältgatan 161&nbsp;597, Lützengatan 159&nbsp;333;
        Lodjursstråket Göteborg 82&nbsp;432; Vikingagatan Malmö 75&nbsp;572;
        Årevägen Åre 83&nbsp;436. Kvadratmeterpriser för brädets gator är
        ungefärliga områdesnivåer (Svensk Mäklarstatistik-baserad rapportering)
        — endast Strandvägens siffra är exakt.
      </li>
      <li>
        <strong>Snittpriser per stad</strong> — Svensk
        Mäklarstatistik-baserade sammanställningar, tidigt 2026: centrala
        Stockholm ≈119&nbsp;000 kr/kvm, centrala Göteborg ≈69&nbsp;000,
        centrala Malmö ≈40&nbsp;000, riket (bostadsrätter) ≈46&nbsp;000.
      </li>
      <li>
        <strong>Prisutveckling 1996–2025</strong> — Ekonomifokus sammanställning
        av SCB / Svensk Mäklarstatistik: villor +366&nbsp;%, bostadsrätter
        +789&nbsp;%; medelvilla ≈700&nbsp;000 kr (1995) → ≈4,8 Mkr (2025);
        korrigeringen 2022–23 ≈−15&nbsp;% från toppen. Årsvärdena i diagrammet
        är interpolerade mot dessa ankare.
      </li>
      <li>
        <strong>Styrräntan</strong> — Riksbanken: minusränta 2015–2019, toppen
        4,00&nbsp;% september 2023, 1,75&nbsp;% vid beslutet i juni 2026.
      </li>
      <li>
        <strong>Utanför brädet</strong> — boendeformer: ungefär två
        tredjedelar av hushållen äger (villa eller bostadsrätt), en tredjedel
        hyr (SCB, Boende i Sverige, 2024). Boendeutgift som andel av
        disponibel inkomst: hyresrätt 27&nbsp;%, bostadsrätt 21&nbsp;%, ägt
        småhus 18&nbsp;% (SCB, hushållens boendeutgifter 2024). Bostadskön:
        894&nbsp;592 registrerade hos Bostadsförmedlingen i Stockholm 31 dec
        2025; genomsnittlig kötid 9,0 år under 2025, ≈21 år för innerstan.
        Unga vuxna 20–27 år: 21&nbsp;% (204&nbsp;000 av 963&nbsp;600) bor kvar
        hemma, 9 av 10 ofrivilligt, 184&nbsp;000 vill flytta men kan inte
        (Hyresgästföreningen, Unga vuxnas boende 2025).
      </li>
      <li>
        <strong>Skatterna</strong> — arvs- och gåvoskatt avskaffad 2004,
        förmögenhetsskatt 2007, statlig fastighetsskatt på bostäder 2008;
        kommunal fastighetsavgift 0,75&nbsp;% av taxeringsvärdet, max
        10&nbsp;074 kr (deklarationen 2026, Skatteverket). Egendomsskatter som
        andel av BNP: Sverige ≈1&nbsp;%, EU-15 ≈2,3&nbsp;% (SNS/LO-sammanställningar
        av OECD-data). Ränteavdrag 30&nbsp;% upp till 100&nbsp;000 kr/år, 21&nbsp;%
        därutöver.
      </li>
      <li>
        <strong>Skulderna</strong> — SCB finansräkenskaper via SEB: hushållens
        skulder ≈5&nbsp;530 miljarder kr Q1 2026; skuldkvot ≈173&nbsp;% av
        disponibel inkomst 2025, topp ≈200&nbsp;% 2021 (Ekonomifakta,
        Riksbanken). Regleringar: bolånetak 85&nbsp;% (2010), amorteringskrav
        (2016), skärpt krav (2018); från 1 april 2026 tak 90&nbsp;%, slopad
        skärpning, max 2&nbsp;%/år (Regeringen, Finansinspektionen). Spartid
        för kontantinsats: SBAB/SEB-beräkningar (≈12 år → ≈7 år i Stockholm).
      </li>
      <li>
        <strong>Räkneexemplet i akt två</strong> är illustrativt: en etta köpt
        1999 vars värde följer bostadsrättsindexet, mot ett banksparande på
        1&nbsp;500 kr/mån. Räntor, avgifter, hyra och amortering ingår inte —
        exemplet visar mekanismen, inte en kalkyl.
      </li>
      <li>
        <strong>The Landlord's Game</strong> — Lizzie Magie, patent 1904;
        spelets georgistiska ursprung är väldokumenterad spelhistoria.
      </li>
    </ul>
  </div>
</section>

<footer>
  <p>
    Byggd för att förklara en mekanism, inte för att ge råd om bostadsköp.
    Om en enda idé ska följa med härifrån är det Lizzie Magies: reglerna
    avgör hur partiet slutar.
  </p>
</footer>

<style>
  main {
    max-width: 1100px;
    margin: 0 auto;
  }

  .closing {
    background: radial-gradient(120% 90% at 50% 0%, var(--felt) 0%, var(--felt-deep) 100%);
    color: #ffffff;
    text-align: center;
  }
  .closing-inner {
    max-width: 640px;
    margin: 0 auto;
    padding: 96px 24px 104px;
  }
  .closing-house {
    width: 72px;
    height: auto;
    margin-bottom: 22px;
  }
  .closing h2 {
    font-family: var(--serif);
    font-size: clamp(30px, 5vw, 42px);
    color: #ffffff;
    margin: 0 0 20px;
  }
  .closing p {
    font-size: 17px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.92);
    margin: 0 0 16px;
  }
  .closing p:last-child {
    margin-bottom: 0;
  }

  .sources {
    background: var(--surface-1);
    border-top: 1px solid var(--border);
  }
  .sources-inner {
    max-width: 680px;
    margin: 0 auto;
    padding: 64px 24px;
  }
  .sources h2 {
    font-family: var(--serif);
    font-size: 22px;
    margin: 0 0 16px;
    color: var(--text-primary);
  }
  .sources-intro {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-secondary);
    margin: 0 0 20px;
  }
  .sources ul {
    margin: 0;
    padding-left: 20px;
  }
  .sources li {
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--text-muted);
    margin-bottom: 10px;
  }
  .sources li:last-child {
    margin-bottom: 0;
  }
  footer {
    padding: 40px 24px 80px;
    text-align: center;
    color: var(--text-muted);
    font-size: 13px;
    border-top: 1px solid var(--border);
    background: var(--page-plane);
  }
  footer p {
    max-width: 480px;
    margin: 0 auto;
  }
</style>
