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
      Monopol började inte som en hyllning till fastighetsaffärer. Förlagan
      hette The Landlord's Game och patenterades 1904 av Lizzie Magie. Det var
      menat som en <em>varning</em>. Spelet skulle visa vad som händer i en
      ekonomi där värdet av mark och läge tillfaller den som råkar äga rutan,
      tills en spelare har allt och de andra ingenting. Det var propaganda för
      jordvärdeskatt. Vi gjorde det till familjeunderhållning, och sedan, i
      Sverige, till nationalekonomi.
    </p>
    <p>
      Jämförelsen är inte bokstavlig, men den synliggör ett mönster: bostadspriserna
      steg kraftigt, ägare fick del av värdeökningen, flera skatter på ägande
      avskaffades och hushållens skulder växte. Många hyresgäster fick inte del
      av samma bostadskapital. Ett brädspel tar slut när de sista går i konkurs och en
      vinnare räknar sedlar. Ett land kan inte sluta så. Här måste även nästa
      generation få plats runt bordet. Efter trettio vilda år är frågan inte
      vem som vann, för det vet vi. Frågan är vilka regler nästa parti ska
      spelas efter.
    </p>
  </div>
</section>

<section class="sources" aria-label="Metod och källor">
  <div class="sources-inner">
    <h2>Metod &amp; källor</h2>
    <p class="sources-intro">
      Siffrorna nedan är antingen officiella värden, sekundära uppskattningar
      eller illustrativa räkneexempel. Varje diagram anger vilket. Årtal,
      population och mått redovisas för att jämförelserna ska gå att kontrollera.
    </p>
    <ul>
      <li>
        <strong>Spelplanen</strong> — det klassiska svenska Monopol-brädet
        (Stockholmsgator), utgivet av Åhlén &amp; Åkerlunds förlag vid årsskiftet
        1936/37. Källor anger både 1936 och 1937; sidan använder därför båda
        årtalen. Det var Albert
        Bonnier Jr, teknisk chef på förlaget, som lät en medarbetare vandra runt
        i Stockholm och välja gatorna; Norrmalmstorg blev dyrast (Di Weekend,
        "Åttio år i centrum", Johanna Lundsgård). Priserna är avlästa direkt
        från ett tidigt bräde i Nordiska museets samling (DigitaltMuseum, id
        021028370534): köpesummor 1&nbsp;000–8&nbsp;000 spel-kronor med
        Norrmalmstorg dyrast (8&nbsp;000) och Västerlånggatan/Hornsgatan
        billigast (1&nbsp;000), samt rutorna Inkomstskatt (betala 4&nbsp;000)
        och Extra skatt (betala 2&nbsp;000). Senare svenska utgåvor använder
        andra valörer.
      </li>
      <li>
        <strong>Dyraste gator</strong> — <a href="https://www.mynewsdesk.com/se/fastighetsbyran/pressreleases/sveriges-dyraste-gator-adresserna-laen-foer-laen-3445561">Fastighetsbyråns kartläggning</a> på
        siffror från Svensk Mäklarstatistik, försäljningar april 2025–mars
        2026 (gator med färre än fem affärer exkluderade): Strandvägen
        168&nbsp;360 kr/kvm; Kjellmansgatan i Göteborg 89&nbsp;689;
        Kattviksvägen i Båstad 87&nbsp;854; Kungsgatan i Växjö 34&nbsp;691.
        Rapportens nationella topp tio består samtidigt helt av Stockholmsgator.
        Stapeldiagrammet visar däremot utvalda länstoppar, inte den nationella listan.
        Kvadratmeterpriser för brädets övriga gator är
        ungefärliga områdesnivåer (Svensk Mäklarstatistik-baserad rapportering)
        — endast Strandvägens siffra är ett observerat gatpris. Resten används
        som illustration och ska inte läsas som en jämförbar gatprisstatistik.
      </li>
      <li>
        <strong>Snittpriser per stad</strong> — <a href="https://mb.cision.com/Main/1330/4332344/4027690.pdf">Svensk Mäklarstatistik, mars 2026</a>:
        centrala Stockholm 119&nbsp;380 kr/kvm, centrala Göteborg 69&nbsp;159,
        centrala Malmö 40&nbsp;157 och riket 49&nbsp;089. Samma månad och bostadstyp används.
      </li>
      <li>
        <strong>Prisutveckling 1996–2025</strong> — villaindexet är omräknat
        direkt från <a href="https://www.scb.se/hitta-statistik/statistik-efter-amne/boende-bebyggelse-och-mark/fastigheter/fastighetspriser-och-lagfarter/pong/tabell-och-diagram/fastighetsprisindex-fastpi/">SCB FASTPI</a>:
        185 år 1996 och 948 år 2025, alltså +412&nbsp;%. Genomsnittspris för
        permanenta småhus: cirka 651&nbsp;000 kr 1995 och 3,913 Mkr 2025.
        Bostadsrättskurvan (+789&nbsp;%) är en separat sekundär uppskattning från
        Ekonomifokus; mellanliggande värden är interpolerade och märks så i diagrammet.
      </li>
      <li>
        <strong>Styrräntan</strong> — <a href="https://www.riksbank.se/sv/penningpolitik/penningpolitisk-rapport/2026/penningpolitiskt-beslut-juni-2026/">Riksbanken</a>:
        minusränta 2015–2019, toppen 4,00&nbsp;% september 2023 och 1,75&nbsp;%
        från 24 juni 2026. Nästa besked kommer 20 augusti 2026.
      </li>
      <li>
        <strong>Utanför brädet</strong> — <a href="https://www.scb.se/hitta-statistik/statistik-efter-amne/boende-bebyggelse-och-mark/bostader-och-boende/hushallens-boende/pong/statistiknyhet/hushallens-boende-2024/">SCB:s boendeformer 2024</a>:
        38&nbsp;% ägt småhus, 29&nbsp;% hyresrätt i flerbostadshus, 21&nbsp;%
        bostadsrätt i flerbostadshus och 12&nbsp;% övrigt. <a href="https://www.scb.se/hitta-statistik/statistik-efter-amne/hushallens-ekonomi/hushallens-utgifter/hushallens-boendeutgifter/pong/statistiknyhet/hushallens-boendeutgifter-20242/">Medianandel av disponibel inkomst</a>:
        hyresrätt 27&nbsp;%, bostadsrätt 21&nbsp;%, ägt småhus 18&nbsp;%. Bostadskön:
        894&nbsp;592 registrerade hos Bostadsförmedlingen i Stockholm 31 dec
        2025; vanliga förmedlade bostäder hade 9,0 års genomsnittlig kötid,
        eller 12,4 år i Stockholms kommun. Det är inte återstående väntetid.
        Unga vuxna 20–27 år: 21&nbsp;% (204&nbsp;000 av 963&nbsp;600) bor kvar
        hemma, 9 av 10 ofrivilligt, 184&nbsp;000 vill flytta men kan inte
        (Hyresgästföreningen, Unga vuxnas boende 2025).
      </li>
      <li>
        <strong>Skatterna</strong> — arvs- och gåvoskatt avskaffad 2004,
        förmögenhetsskatt 2007, statlig fastighetsskatt på bostäder 2008;
        <a href="https://www.skatteverket.se/privat/fastigheterochbostad/fastighetsavgiftochfastighetsskatt.4.69ef368911e1304a625800013531.html">kommunal fastighetsavgift</a>
        0,75&nbsp;% av taxeringsvärdet, max 10&nbsp;425 kr för inkomståret 2026.
        Taket nås vid 1,39 Mkr i taxeringsvärde. OECD Revenue Statistics 2024,
        data för 2022: Sverige 0,9&nbsp;% av BNP i den breda kategorin
        <a href="https://www.oecd.org/en/publications/revenue-statistics-2024_c87a3da5-en/full-report/component-5.html">taxes on property</a>;
        EU-15 cirka 2,1&nbsp;% som oviktat medel från landtabellen.
        Ränteavdrag 30&nbsp;% upp till 100&nbsp;000 kr/år, 21&nbsp;% därutöver
        (regler 2026).
      </li>
      <li>
        <strong>Skulderna</strong> — <a href="https://www.scb.se/hitta-statistik/statistik-efter-amne/nationalrakenskaper/finansrakenskaper/sparbarometern/pong/tabell-och-diagram/hushallens-finansiella-stallningsvarden-2025-kv12026-kv1/">SCB:s finansräkenskaper</a>:
        skulder exklusive periodiseringar 5&nbsp;530,49 miljarder kr Q1 2026,
        cirka 83&nbsp;% av Sveriges BNP 2025; skuldkvot ≈173&nbsp;% av
        disponibel inkomst 2025, topp ≈200&nbsp;% 2021 (Ekonomifakta,
        Riksbanken). Regleringar: bolånetak 85&nbsp;% (2010), amorteringskrav
        (2016), skärpt krav (2018); från 1 april 2026 tak 90&nbsp;%, slopad
        skärpning, max 2&nbsp;%/år. Vid köp får belåningsgraden vara 90&nbsp;%,
        medan tilläggslån begränsas till 80&nbsp;% (<a href="https://www.regeringen.se/rattsliga-dokument/proposition/2026/02/prop.-202526119">prop. 2025/26:119</a>). Spartid
        för kontantinsats: SBAB/SEB-beräkningar (≈12 år → ≈7 år i Stockholm).
      </li>
      <li>
        <strong>Räkneexemplet i akt två</strong> är illustrativt: en etta köpt
        1999 vars värde följer den sekundära bostadsrättsserien, mot ett banksparande på
        1&nbsp;500 kr/mån. Räntor, avgifter, hyra, amortering och avkastning på
        sparandet ingår inte — exemplet visar mekanismen, inte en privatekonomisk kalkyl.
        Barnbidragsrutan visar 1&nbsp;250 kr × 144 månader = 180&nbsp;000 kr:
        dagens nivå i tolv år, inte vad som historiskt betalats ut under en viss tolårsperiod.
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
    Sidan är gjord för att förklara hur något fungerar, inte för att ge råd om
    bostadsköp. Om du bara tar med dig en sak härifrån, låt det bli Lizzie
    Magies poäng: reglerna avgör hur partiet slutar.
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
