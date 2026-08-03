<script>
  import Scrolly from "../components/Scrolly.svelte";
  import LadderChart from "../components/LadderChart.svelte";
  import CityCompare from "../components/CityCompare.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const ladderMode = $derived(currentStep === 0 ? "board" : "real");
  const ladderHighlight = $derived(currentStep === 2 ? "red" : null);
</script>

<section
  class="act"
  aria-label="Akt 1: Spelplanen"
  style="--act-accent: var(--ink-red); --step-min: 435px; --step-min-mobile: 530px;"
>
  <div class="act-head">
    <p class="act-kicker">Akt ett</p>
    <h2>Spelplanen</h2>
    <p class="act-dek">
      Svenska Monopol kom ut 1937 och är en prisstege genom Stockholm, från
      Gamla stan och Söder upp till paradgatorna. Stegen finns kvar. Priserna
      har sedan dess spelat ett helt eget parti.
    </p>
  </div>

  <Scrolly onStepChange={(i) => (currentStep = i)}>
    {#snippet visual()}
      <div class="visual-frame-stack" style="--stack-height: 520px; --stack-height-mobile: 350px;">
        <div class="frame" class:is-active={currentStep <= 2}>
          <LadderChart data={data.board} mode={ladderMode} highlight={ladderHighlight} />
        </div>
        <div class="frame" class:is-active={currentStep >= 3}>
          <CityCompare data={data.cities} view={currentStep === 3 ? "dearest" : "central"} />
        </div>
      </div>
    {/snippet}

    <section class="scrolly-step">
      <p class="kicker">1937</p>
      <h3>Hornsgatan kostade 1 000 kronor</h3>
      <p>
        Brädet är en klasskarta över Stockholm. En anställd på Åhlén &amp;
        Åkerlund fick i uppdrag att gå runt i stan och rangordna gatorna efter
        status, och det är den promenaden vi fortfarande spelar på. Billigast
        blev Gamla stan och Söder: Västerlånggatan och Hornsgatan för tusen
        kronor styck. Dyrast blev Norrmalmstorg, åttatusen.
      </p>
      <div class="callout">
        <p class="callout-num">8×</p>
        <p class="callout-label">
          skilde det mellan den finaste gatan och den billigaste. Alla som satt
          runt bordet visste var de hörde hemma.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">2026</p>
      <h3>Spelplanen har förändrats</h3>
      <p>
        Samma gator, dagens priser. Nu stämmer ingenting. Söder är inte längre
        botten: en kvadratmeter på <strong>Hornsgatan går för runt
        95&nbsp;000&nbsp;kronor</strong>, ungefär vad du betalar på "fina"
        Drottninggatan. Hela stegen har tryckts ihop uppåt.
      </p>
      <p>
        1937 skilde det åtta gånger mellan billigast och dyrast. Idag inte ens
        dubbelt. Det finns ingen billig gata kvar att börja på.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Den röda gruppen</p>
      <h3>Strandvägen: Sveriges dyraste gata</h3>
      <p>
        På brädet är den en röd medelgata för 4 200. I verkligheten är
        <strong>Strandvägen</strong> dyrast i hela landet:
        <strong>168&nbsp;360&nbsp;kronor kvadratmetern</strong>. En trea på 80
        kvadrat kostar drygt 13 miljoner.
      </p>
      <div class="callout">
        <p class="callout-num">10 av 10</p>
        <p class="callout-label">
          av Sveriges dyraste gator ligger i Stockholm. Närmast efter
          Strandvägen kommer Bältgatan och Lützengatan. Svensk Mäklarstatistik,
          apr 2025–mar 2026.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Resten av brädet</p>
      <h3>Ett Monopol, tre olika spel</h3>
      <p>
        Byt stad och siffrorna byter storlek. Dyrast i Göteborg är
        <strong>Lodjursstråket i Hovås</strong>, ungefär halva Strandvägen.
        Malmös <strong>Vikingagatan i Limhamn</strong> ligger lägre än så. Och
        utanför storstäderna toppar en gata som inte ens ligger i en stad:
        <strong>Årevägen</strong> i fjällen.
      </p>
      <p>
        Samma land, samma regler, tre helt olika partier.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Snittpriserna</p>
      <h3>Tre gånger dyrare än Malmö</h3>
      <p>
        Skillnaden syns långt utanför paradgatorna. En central kvadratmeter i
        Stockholm kostar omkring <strong>119&nbsp;000 kronor</strong>. Det är
        1,7 gånger Göteborg och tre gånger Malmö.
      </p>
      <p>
        Var du föddes och när du köpte avgör vilken ruta du börjar på. Nästa
        akt handlar om dem som hade turen med sig.
      </p>
    </section>
  </Scrolly>
</section>
