<script>
  import Scrolly from "../components/Scrolly.svelte";
  import TenureWaffle from "../components/TenureWaffle.svelte";
  import QueueScene from "../components/QueueScene.svelte";
  import StatTiles from "../components/StatTiles.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const ya = data.outside.youngAdults;
  const tiles = [
    { num: "204 000", label: "unga vuxna (20–27 år) bor kvar i föräldrahemmet — 21 procent av alla", accent: "var(--series-red)" },
    { num: "9 av 10", label: "av dem bor kvar ofrivilligt — den högsta andelen som någonsin uppmätts", accent: "var(--series-amber)" },
    { num: "184 000", label: "vill flytta men kan inte — de väntar på att få börja spela", accent: "var(--series-blue)" },
    { num: "1 500 kr", label: "får varje spelare av banken när Monopol börjar. Verklighetens motsvarighet heter föräldrabanken — och alla har ingen", accent: "var(--series-green)" },
  ];

  const waffleView = $derived(currentStep === 0 ? "all" : currentStep === 1 ? "split" : "rent");
</script>

<section class="act" aria-label="Akt 3: Utanför brädet" style="--act-accent: var(--ink-pink);">
  <div class="act-head">
    <p class="act-kicker">Akt tre</p>
    <h2>Utanför brädet</h2>
    <p class="act-dek">
      Monopols första regel är att alla får lika mycket av banken innan partiet
      börjar. Den regeln hoppade vi över. En stor del av Sverige blev aldrig
      ens inbjuden att spela.
    </p>
  </div>

  <Scrolly onStepChange={(i) => (currentStep = i)}>
    {#snippet visual()}
      <div class="visual-frame-stack" style="--stack-height: 520px; --stack-height-mobile: 440px;">
        <div class="frame" class:is-active={currentStep <= 2}>
          <TenureWaffle data={data.outside} view={waffleView} />
        </div>
        <div class="frame" class:is-active={currentStep === 3}>
          <QueueScene data={data.outside} />
        </div>
        <div class="frame" class:is-active={currentStep >= 4}>
          <StatTiles {tiles} />
        </div>
      </div>
    {/snippet}

    <section class="scrolly-step">
      <p class="kicker">Startkapitalet</p>
      <h3>Regeln som aldrig fanns</h3>
      <p>
        I spelet är starten rättvis. Samma sedelbunt till alla, samma GÅ-ruta,
        samma tärningar. Verkligheten började annorlunda. Vem som kunde köpa en
        ruta på 90-talet avgjordes av inkomst, arv och var i landet man råkade
        bo.
      </p>
      <p>
        De trettio vilda åren delade inte ut vinster till alla som bodde i
        Sverige. Bara till dem som ägde rutorna.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">De 34 rutorna</p>
      <h3>En tredjedel äger ingenting på brädet</h3>
      <p>
        Ungefär <strong>två tredjedelar</strong> av hushållen äger sitt boende.
        Drygt vart tredje hyr. Översatt till spelet: de landar varje månad på
        någon annans gata och betalar hyra, men äger inte en enda ruta själva.
      </p>
      <p>
        När bostadsrätterna steg 789 procent gick varenda krona av
        värdestegringen till de <span class="badge badge-blue">blå</span>
        rutorna. De <span class="badge badge-amber">gula</span> fick
        hyreshöjningarna.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Hyran</p>
      <h3>Dyrast för den som har minst</h3>
      <p>
        Hyresgästerna lägger i snitt <strong>27 procent</strong> av sin
        disponibla inkomst på boendet. Villaägaren, som har lägst
        boendekostnad och trettio års värdestegring i ryggen, lägger 18. Det
        beror inte på att hyrorna är högre. Det beror på att hyresgästerna
        tjänar mindre.
      </p>
      <div class="callout">
        <p class="callout-num">0 kr</p>
        <p class="callout-label">
          av de trettio årens värdestegring gick till den som hyrde. Att stå
          utanför brädet blev de vilda årens dyraste plats.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Kön</p>
      <h3>894 592 personer väntar på tur</h3>
      <p>
        Alternativet till att köpa är att köa. Vid årsskiftet stod nästan
        <strong>900 000 personer</strong> i Stockholms bostadskö, fler än det
        bor i hela Göteborg. Snittet är <strong>9 års</strong> väntan. Vill du
        ha en lägenhet i innerstan får du räkna med drygt
        <strong>20 år</strong>.
      </p>
      <p>
        Tjugo år i kö, och då inte för att få köpa en ruta utan för att få
        <em>hyra</em> en. Någon sådan regel finns inte i Monopol. Ingen hade
        gått med på den.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Väntrummet</p>
      <h3>En generation i föräldrahemmet</h3>
      <p>
        Där kön och priserna möts uppstår ett väntrum.
        <strong>204 000 unga vuxna</strong> bor kvar hos sina föräldrar, nio av
        tio ofrivilligt. Så hög har andelen aldrig varit. De sparar mot en
        kontantinsats som växer fortare än sparandet, i en kö som mäts i
        decennier.
      </p>
      <p>
        Det är dem de nya lånereglerna från 2026 säger sig vilja släppa in. Men
        först ska vi titta på rutorna som gjorde ägandet så billigt för dem som
        redan sitter vid bordet.
      </p>
    </section>
  </Scrolly>
</section>
