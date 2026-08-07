<script>
  import { appData as data } from "./lib/data/load.js";
  import MonopolyHero from "./lib/components/MonopolyHero.svelte";
  import ActSpelplanen from "./lib/story/ActSpelplanen.svelte";
  import ActKarriaren from "./lib/story/ActKarriaren.svelte";
  import ActUtanfor from "./lib/story/ActUtanfor.svelte";
  import ActSkatten from "./lib/story/ActSkatten.svelte";
  import ActBanken from "./lib/story/ActBanken.svelte";
</script>

<MonopolyHero groups={data.board.groups} gaBonus={data.board.gaBonus} />

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
    <h2>En spelplan som förändras</h2>
    <p>
      Monopols förlaga hette The Landlord's Game och patenterades 1904 av
      Lizzie Magie. Spelet utformades för att illustrera olika synsätt på
      markägande och beskattning. Den svenska utgåvan blev senare ett
      familjespel med Stockholmsgator på brädet.
    </p>
    <p>
      Liknelsen med Monopol förenklar förstås hur bostadsmarknaden fungerar.
      Siffrorna bakom texten och visualiseringarna kommer däremot från verkliga
      källor. Du hittar dem samlade här nedanför.
    </p>
  </div>
</section>

<section class="sources" aria-label="Metod och källor">
  <div class="sources-inner">
    <h2>Metod &amp; källor</h2>
    <p class="sources-intro">
      Siffrorna nedan är antingen officiella värden, egna sammanställningar
      av publicerade slutpriser eller illustrativa räkneexempel. Varje diagram anger vilket. Årtal,
      population och mått redovisas för att jämförelserna ska gå att kontrollera.
    </p>
    <ul>
      <li>
        <strong>Spelplanen</strong> — det klassiska svenska Monopol-brädet
        (Stockholmsgator), utgivet av Åhlén &amp; Åkerlunds förlag 1937.
        Nordiska museet beskriver exemplaret som sannolikt den första svenska
        utgåvan; produktionen är uppskattad till 1937–1938. Det var Albert
        Bonnier Jr, teknisk chef på förlaget, som lät en medarbetare vandra runt
        i Stockholm och välja gatorna; Norrmalmstorg blev dyrast (Di Weekend,
        "Åttio år i centrum", Johanna Lundsgård). Priserna är avlästa direkt
        från <a href="https://digitaltmuseum.se/021028370534/sallskapsspel">brädet i Nordiska museets samling</a>
        (DigitaltMuseum, id 021028370534): köpesummor 1&nbsp;000–8&nbsp;000 spel-kronor med
        Norrmalmstorg dyrast (8&nbsp;000) och Västerlånggatan/Hornsgatan
        billigast (1&nbsp;000), rutorna Inkomstskatt (betala 4&nbsp;000) och
        Extra skatt (betala 2&nbsp;000), samt GÅ-rutans "Avlöning kr. 4&nbsp;000
        när ni passerar GÅ". Senare svenska utgåvor använder andra valörer.
      </li>
      <li>
        <strong>Brädets gator i dag</strong> — egen sammanställning av
        listade lägenhetsförsäljningar under kalenderåret 2025. Diagrammet
        visar avrundad median i kr/kvm för
        <a href="https://www.hemnet.se/salda/lagenhet/stockholms-kommun/hornsgatan">Hornsgatan</a>
        110&nbsp;300 (n=68),
        <a href="https://www.hemnet.se/salda/lagenhet/stockholms-kommun/gotgatan">Götgatan</a>
        98&nbsp;600 (n=44),
        <a href="https://www.hemnet.se/salda/lagenhet/stockholms-kommun/odengatan">Odengatan</a>
        134&nbsp;600 (n=23),
        <a href="https://www.booli.se/sok/slutpriser?areaIds=90881&amp;objectType=L%C3%A4genhet">Karlavägen</a>
        143&nbsp;900 (n=43),
        <a href="https://www.booli.se/sok/slutpriser?areaIds=104488&amp;objectType=L%C3%A4genhet">Kungsgatan</a>
        125&nbsp;100 (n=12) och
        <a href="https://www.booli.se/sok/slutpriser?areaIds=99298&amp;objectType=L%C3%A4genhet">Drottninggatan</a>
        117&nbsp;300 (n=22). Endast objekt med redovisat slutpris per
        kvadratmeter ingår; poster märkta ”Sista bud” är exkluderade. Hemnet
        används för de tre första gatorna och Booli för de tre senare, vilket
        innebär att täckningen kan skilja sig mellan delarna av urvalet.
      </li>
      <li>
        <strong>Strandvägen och Norrmalmstorg</strong> — Strandvägens
        168&nbsp;360 kr/kvm kommer från
        <a href="https://www.mynewsdesk.com/se/fastighetsbyran/pressreleases/sveriges-dyraste-gator-adresserna-laen-foer-laen-3445561">Fastighetsbyråns kartläggning</a>
        med Svensk Mäklarstatistik, april 2025–mars 2026; gator med färre än
        fem affärer redovisas inte. Norrmalmstorg saknar registrerade
        lägenhetsslutpriser hos
        <a href="https://www.booli.se/sok/slutpriser?areaIds=426245">Booli</a>
        och <a href="https://www.hemnet.se/salda/lagenhet/stockholms-kommun/norrmalmstorg">Hemnet</a>.
        Därför används 127&nbsp;700 kr/kvm som områdesproxy: det avrundade
        tolvmånaderssnittet 127&nbsp;704 för bostadsrätter i
        <a href="https://www.maklarstatistik.se/omrade/riket/stockholms-lan/stockholm/vasastan-norrmalm/">Vasastan–Norrmalm</a>,
        uppdaterat 8 juli 2026 och baserat på 3&nbsp;139 försäljningar.
      </li>
      <li>
        <strong>Dyraste gator</strong> — samma Fastighetsbyrån-kartläggning
        anger Strandvägen 168&nbsp;360 kr/kvm, Kjellmansgatan i Göteborg
        89&nbsp;689, Kattviksvägen i Båstad 87&nbsp;854 och Kungsgatan i
        Växjö 34&nbsp;691. Rapportens nationella topp tio för kr/kvm består
        helt av Stockholmsadresser. Stapeldiagrammet visar däremot utvalda
        länstoppar, inte den nationella listan.
      </li>
      <li>
        <strong>Snittpriser per stad</strong> — <a href="https://mb.cision.com/Main/1330/4332344/4027690.pdf">Svensk Mäklarstatistik, mars 2026</a>:
        centrala Stockholm 119&nbsp;380 kr/kvm, centrala Göteborg 69&nbsp;159,
        centrala Malmö 40&nbsp;157 och riket 49&nbsp;089. Samma månad och bostadstyp används.
      </li>
      <li>
        <strong>Prisutveckling</strong> — villaindexet är omräknat
        direkt från <a href="https://www.scb.se/hitta-statistik/statistik-efter-amne/boende-bebyggelse-och-mark/fastigheter/fastighetspriser-och-lagfarter/pong/tabell-och-diagram/fastighetsprisindex-fastpi/">SCB FASTPI</a>:
        185 år 1996 och 948 år 2025, alltså +412&nbsp;%. Genomsnittspris för
        permanenta småhus: cirka 651&nbsp;000 kr 1995 och 3,913 Mkr 2025.
        Bostadsrättskurvans ändpunkter (+789&nbsp;% 1996–2024) kommer från
        <a href="https://stockholmshandelskammare.se/wp-content/uploads/2025/09/shk-rapport-fran-reglering-till-rorlighet-vagar-mot-en-fungerande-hyresmarknad.pdf">Stockholms Handelskammares rapport</a>,
        som bygger på Svensk Mäklarstatistiks nationella årsgenomsnitt i kr/kvm.
        Mellanliggande värden är ungefärliga; serien är inte ett kvalitetsjusterat prisindex.
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
        894&nbsp;592 registrerade enligt <a href="https://bostad.stockholm.se/statistik/summering-av-aret-20242/">Bostadsförmedlingen i Stockholms årssummering</a> 31 dec
        2025; vanliga förmedlade bostäder hade 9,0 års genomsnittlig kötid,
        eller 12,4 år i Stockholms kommun. Det är inte återstående väntetid.
        Unga vuxna 20–27 år: 21&nbsp;% (204&nbsp;000 av 963&nbsp;600) bor kvar
        hemma, 9 av 10 ofrivilligt, 184&nbsp;000 vill flytta men kan inte
        (<a href="https://www.hyresgastforeningen.se/bostadsfakta/rapporter/unga-vuxna/">Hyresgästföreningen, Unga vuxnas boende 2025</a>).
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
        <a href="https://www.skatteverket.se/privat/deklaration/avdragforprivatpersoner/avdragforranteutgifter.106.1b39a64a1919eabb488b87.html">Ränteavdrag enligt Skatteverket</a>:
        30&nbsp;% upp till 100&nbsp;000 kr/år och 21&nbsp;% därutöver; från
        inkomstår 2026 krävs att lånet uppfyller kraven på säkerhet och maximal
        belåningsgrad.
      </li>
      <li>
        <strong>Skulderna</strong> — <a href="https://www.scb.se/hitta-statistik/statistik-efter-amne/nationalrakenskaper/finansrakenskaper/sparbarometern/pong/tabell-och-diagram/hushallens-finansiella-stallningsvarden-2025-kv12026-kv1/">SCB:s finansräkenskaper</a>:
        skulder exklusive periodiseringar 5&nbsp;530,49 miljarder kr Q1 2026.
        Enligt <a href="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/proposition/2026-ars-ekonomiska-varproposition_hd03100/html/">2026 års ekonomiska vårproposition</a>
        är över 80&nbsp;% bolån. Skuldkvoten visas inte eftersom SCB korrigerade
        den disponibla inkomsten den 24 juni 2026 och uppdaterar serien den 17
        september. Regleringar: bolånetak 85&nbsp;% (2010), amorteringskrav
        (2016), skärpt krav (2018); från 1 april 2026 tak 90&nbsp;%, slopad
        skärpning, max 2&nbsp;%/år. Vid köp får belåningsgraden vara 90&nbsp;%,
        medan tilläggslån begränsas till 80&nbsp;% (<a href="https://www.regeringen.se/rattsliga-dokument/proposition/2026/02/prop.-202526119">prop. 2025/26:119</a>). Spartid
        för kontantinsats: <a href="https://www.sbab.se/1/privat/tips_och_kunskap/nyheter/artiklar/2026-02-16_nytt_bolanetak_sa_mycket_snabbare_kan_du_na_kontantinsatsen.html">SBAB:s beräkning</a>
        (knappt 12 år → drygt 7 år i Stockholm). Den antar att ettan följer
        2025 års medelslutpris, att bostadspriserna stiger 4&nbsp;% per år, att
        individen sparar 4&nbsp;000 kr/mån, att sparandet ökar 4&nbsp;% per år
        och ger 4&nbsp;% årlig avkastning efter skatt samt att hushållet klarar
        bankens kreditprövning. <a href="https://www.riksbank.se/sv/press-och-publicerat/tal-och-presentationer/2026/thedeen-hoga-skulder-och-korta-rantebindningstider-gor-svenska-hushall-sarbara/">Riksbanken beskriver hög skuldsättning och korta räntebindningstider som en sårbarhet</a>
        för hushållen.
      </li>
      <li>
        <strong>Räkneexemplet i akt två</strong> är illustrativt: en etta köpt
        1999 vars värde följer den ungefärliga bostadsrättsserien till 2024, mot ett banksparande på
        1&nbsp;500 kr/mån. Räntor, avgifter, hyra, amortering och avkastning på
        sparandet ingår inte. Exemplet är till för att visa mekanismen och ska
        inte läsas som en privatekonomisk kalkyl.
        Barnbidragsrutan visar 1&nbsp;250 kr × 144 månader = 180&nbsp;000 kr:
        dagens nivå i tolv år, inte vad som historiskt betalats ut under en viss tolårsperiod.
      </li>
      <li>
        <strong>The Landlord's Game</strong> — Lizzie Magies
        <a href="https://patents.google.com/patent/US748626A/en">patent US748626A</a>
        publicerades 1904. Spelets bakgrund och kopplingen till idéer om
        markägande beskrivs även av
        <a href="https://www.americanhistory.si.edu/explore/stories/playing-monopoly-and-its-discontents-its-80th-anniversary">Smithsonian National Museum of American History</a>.
      </li>
    </ul>
  </div>
</section>

<footer>
  <p>
    Sidan är gjord för att förklara och jämföra statistik, inte för att ge råd
    om bostadsköp eller ta ställning i bostadspolitiska frågor.
  </p>
  <p class="footer-home">
    <a href="https://plainx.dev/">Fler berättelser på (<i>x</i>)plain</a>
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
  .footer-home {
    margin-top: 18px;
  }
  .footer-home a {
    color: var(--text-muted);
    text-decoration-color: var(--border);
    text-underline-offset: 3px;
  }
  .footer-home a:hover {
    color: var(--text-primary);
  }
  .footer-home i {
    font-style: italic;
  }
</style>
