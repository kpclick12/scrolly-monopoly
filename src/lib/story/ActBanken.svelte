<script>
  import Scrolly from "../components/Scrolly.svelte";
  import DebtMountain from "../components/DebtMountain.svelte";
  import StatTiles from "../components/StatTiles.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const tiles = [
    { num: "5 530 mdr", label: "kronor i hushållsskulder första kvartalet 2026, mer än hela Sveriges BNP", accent: "var(--series-red)" },
    { num: "90 %", label: "av bostadens värde får bolånet täcka sedan april 2026. Kontantinsatsen är nere i 10 procent", accent: "var(--series-blue)" },
    { num: "2 %", label: "per år är det mesta man numera behöver amortera. Skärpningen från 2018 är slopad", accent: "var(--series-green)" },
    { num: "≈173 %", label: "av disponibel inkomst är hushållens skulder. Det är fortfarande bland de högsta i världen", accent: "var(--series-amber)" },
  ];
</script>

<section class="act" aria-label="Akt 5: Banken" style="--act-accent: var(--ink-green);">
  <div class="act-head">
    <p class="act-kicker">Akt fem</p>
    <h2>Banken</h2>
    <p class="act-dek">
      I Monopol kan den som hamnar i knipa alltid inteckna sina gator. Banken
      säger aldrig nej, den finns ju till för att spelet ska rulla vidare.
      Sverige byggde sin bostadsmarknad på samma husregel.
    </p>
  </div>

  <Scrolly onStepChange={(i) => (currentStep = i)}>
    {#snippet visual()}
      <div class="visual-frame-stack" style="--stack-height: 500px; --stack-height-mobile: 420px;">
        <div class="frame" class:is-active={currentStep <= 2}>
          <DebtMountain data={data.debt} step={currentStep} />
        </div>
        <div class="frame" class:is-active={currentStep >= 3}>
          <StatTiles {tiles} />
        </div>
      </div>
    {/snippet}

    <section class="scrolly-step">
      <p class="kicker">Inteckningarna</p>
      <h3>Skuldberget</h3>
      <p>
        För varje uppköpt gata växte lånestocken. I mitten av 90-talet låg
        hushållens skulder på omkring <strong>90 procent</strong> av en
        årsinkomst. På toppen 2021 var de uppe i nästan
        <strong>200 procent</strong>. Stigande priser kräver större lån, och
        större lån driver upp priserna. Varv efter varv.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Regleringarna</p>
      <h3>Nya regler mitt i partiet</h3>
      <p>
        Myndigheterna försökte bromsa utan att välta brädet.
        <strong>Bolånetak</strong> 2010, där max 85 procent fick lånas.
        <strong>Amorteringskrav</strong> 2016. <strong>Skärpt krav</strong>
        2018 för dem som lånat allra mest.
      </p>
      <div class="callout">
        <p class="callout-num">3 st</p>
        <p class="callout-label">
          åtstramningar på åtta år. Skuldkvoten fortsatte ändå uppåt, ända tills
          något helt annat tog i handbromsen.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Handbromsen</p>
      <h3>Räntan klarade det reglerna inte klarade</h3>
      <p>
        Räntechocken 2022–2023 gjorde det inga amorteringskrav lyckats med.
        Skuldkvoten föll från nästan 200 till runt
        <strong>173 procent</strong>. Inte för att lånen krympte, utan för att
        nya jättelån helt enkelt blev för dyra att ta.
      </p>
      <p>
        Vi är ändå ett av världens mest belånade folk. Riksbanken har pekat ut
        skuldberget som Sveriges största inhemska risk i över tio år.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">April 2026</p>
      <h3>Banken säger ja igen</h3>
      <p>
        Så vändes reglerna åt andra hållet, mitt i partiet. Bolånetaket höjdes
        till <strong>90 procent</strong>, det skärpta amorteringskravet
        slopades och nu amorterar man som mest 2 procent om året. Motivet är
        gott. Det handlar om att släppa in dem som står utanför brädet.
      </p>
      <p>
        Men mekaniken är sig lik. Mer lånekraft möter precis samma gator. Alla
        som spelat Monopol vet vad som händer med priset på en ruta när fler
        spelare får mer pengar i näven.
      </p>
    </section>
  </Scrolly>
</section>
