<script>
  import Scrolly from "../components/Scrolly.svelte";
  import LadderChart from "../components/LadderChart.svelte";
  import CityCompare from "../components/CityCompare.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const ladderMode = $derived(currentStep === 0 ? "board" : "real");
  const ladderHighlight = $derived(currentStep === 2 ? "red" : null);
</script>

<section class="act" aria-label="Akt 1: Spelplanen" style="--act-accent: var(--ink-red);">
  <div class="act-head">
    <p class="act-kicker">Akt ett</p>
    <h2>Spelplanen</h2>
    <p class="act-dek">
      Svenska Monopol kom ut 1936: en prisstege genom Stockholm, från Söders
      och Gamla stans kvarter till paradgatorna. Stegen finns kvar. Priserna
      har spelat ett eget parti.
    </p>
  </div>

  <Scrolly onStepChange={(i) => (currentStep = i)}>
    {#snippet visual()}
      <div class="visual-frame-stack" style="--stack-height: 520px; --stack-height-mobile: 420px;">
        <div class="frame" class:is-active={currentStep <= 2}>
          <LadderChart data={data.board} mode={ladderMode} highlight={ladderHighlight} />
        </div>
        <div class="frame" class:is-active={currentStep >= 3}>
          <CityCompare data={data.cities} view={currentStep === 3 ? "dearest" : "central"} />
        </div>
      </div>
    {/snippet}

    <section class="scrolly-step">
      <p class="kicker">1936</p>
      <h3>Hornsgatan kostade 1 000 kronor</h3>
      <p>
        Brädet är en karta över klassernas Stockholm. Billigast: de bruna och
        ljusblå gatorna i Gamla stan och på Södermalm — Västerlånggatan,
        Hornsgatan, Götgatan — för 1 000–2 200 spel-kronor. Dyrast:
        Norrmalmstorg för 8 000.
      </p>
      <div class="callout">
        <p class="callout-num">8×</p>
        <p class="callout-label">
          så mycket dyrare var brädets finaste gata än dess billigaste. Stegen
          var brant — alla visste var man hörde hemma.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">2026</p>
      <h3>Spelplanen har förändrats</h3>
      <p>
        Samma gator, dagens priser. Brädets logik har kollapsat: Söder är inte
        längre botten — en kvadratmeter på <strong>Hornsgatan kostar runt
        95&nbsp;000&nbsp;kr</strong>, ungefär som på "fina" Drottninggatan. Hela
        stegen har tryckts ihop i toppen.
      </p>
      <p>
        Det som 1936 var 8 gånger skiljer idag inte ens en faktor två. På den
        här spelplanen finns inga billiga gator kvar att börja på.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Den röda gruppen</p>
      <h3>Strandvägen: Sveriges dyraste gata</h3>
      <p>
        På brädet en röd mellangata för 4 200 kronor. I verkligheten toppar
        <strong>Strandvägen</strong> hela landet:
        <strong>168&nbsp;360&nbsp;kr per kvadratmeter</strong> — en trea på 80
        kvadrat för drygt 13 miljoner.
      </p>
      <div class="callout">
        <p class="callout-num">10 av 10</p>
        <p class="callout-label">
          av Sveriges dyraste gator ligger i Stockholm (Bältgatan och
          Lützengatan följer närmast). Svensk Mäklarstatistik, apr 2025–mar 2026.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Resten av brädet</p>
      <h3>Ett Monopol — men tre olika spel</h3>
      <p>
        Byt stad och valörerna byter skala. Göteborgs dyraste gata,
        <strong>Lodjursstråket i Hovås</strong>, kostar hälften av Strandvägen.
        Malmös toppgata <strong>Vikingagatan i Limhamn</strong> ännu mindre. Och
        utanför storstäderna toppar — fjällturismens <strong>Årevägen</strong>.
      </p>
      <p>
        Samma land, samma regler, helt olika brädespel.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Snittpriserna</p>
      <h3>Tre gånger Malmö</h3>
      <p>
        Även bortom paradgatorna är skillnaden en spelplan i sig: en central
        kvadratmeter i Stockholm kostar runt <strong>119&nbsp;000 kr</strong> —
        ungefär 1,7 gånger centrala Göteborg och tre gånger centrala Malmö.
      </p>
      <p>
        Var du råkar födas, och när du råkar köpa, avgör vilken ruta du startar
        på. Nästa akt handlar om dem som fick tärningarna med sig.
      </p>
    </section>
  </Scrolly>
</section>
