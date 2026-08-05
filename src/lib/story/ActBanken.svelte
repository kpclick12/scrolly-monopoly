<script>
  import Scrolly from "../components/Scrolly.svelte";
  import DebtMountain from "../components/DebtMountain.svelte";
  import StatTiles from "../components/StatTiles.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const tiles = [
    { num: "5 530 mdr", label: "kronor i hushållsskulder första kvartalet 2026 — cirka 83 procent av Sveriges BNP 2025", accent: "var(--series-red)" },
    { num: "90 %", label: "av bostadens värde får bolånet täcka sedan april 2026. Kontantinsatsen är nere i 10 procent", accent: "var(--series-blue)" },
    { num: "2 %", label: "per år är det mesta man numera behöver amortera. Skärpningen från 2018 är slopad", accent: "var(--series-green)" },
    { num: "≈173 %", label: "av disponibel inkomst är hushållens skulder 2025. Nivån är fortfarande hög", accent: "var(--series-amber)" },
  ];
</script>

<section
  class="act"
  aria-label="Akt 5: Banken"
  style="--act-accent: var(--ink-green); --step-min: 398px; --step-min-mobile: 448px;"
>
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
      <div class="visual-frame-stack" style="--stack-height: 500px; --stack-height-mobile: 350px;">
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
        <strong>173 procent</strong>. Skuldstocken fortsatte att växa, men de
        nominella inkomsterna växte snabbare; det högre ränteläget dämpade
        samtidigt nyutlåningen.
      </p>
      <p>
        Svenska hushåll är fortfarande högt belånade i ett internationellt
        perspektiv. Riksbanken har länge beskrivit hushållens skulder som en
        sårbarhet för svensk ekonomi.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">April 2026</p>
      <h3>Banken säger ja igen</h3>
      <p>
        Så vändes reglerna åt andra hållet, mitt i partiet. Bolånetaket höjdes
        till <strong>90 procent</strong> vid köp av ny bostad, det skärpta
        amorteringskravet slopades och grundkravet är som mest 2 procent om
        året. Tilläggslån får samtidigt högst nå 80 procents belåningsgrad.
      </p>
      <p>
        Men mekaniken är sig lik. Mer lånekraft möter precis samma gator. Alla
        som spelat Monopol vet vad som händer med priset på en ruta när fler
        spelare får mer pengar i näven.
      </p>
    </section>
  </Scrolly>
</section>
