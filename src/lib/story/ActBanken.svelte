<script>
  import Scrolly from "../components/Scrolly.svelte";
  import DebtMountain from "../components/DebtMountain.svelte";
  import StatTiles from "../components/StatTiles.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const tiles = [
    { num: "5 530 mdr", label: "i hushållsskulder exklusive periodiseringar första kvartalet 2026", accent: "var(--series-red)" },
    { num: "90 %", label: "av bostadens värde får bolånet täcka sedan april 2026. Kontantinsatsen är nere i 10 procent", accent: "var(--series-blue)" },
    { num: "2 %", label: "per år är det mesta man numera behöver amortera. Skärpningen från 2018 är slopad", accent: "var(--series-green)" },
    { num: ">80 %", label: "av hushållens skulder är bolån enligt 2026 års ekonomiska vårproposition", accent: "var(--series-amber)" },
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
      I Monopol kan fastigheter intecknas för att frigöra kapital. På den svenska
      bostadsmarknaden har lån en central roll: över 80 procent av hushållens
      skulder är bolån.
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
      <p class="kicker">Skuldstocken</p>
      <h3>5 530 miljarder kronor</h3>
      <p>
        Första kvartalet 2026 uppgick hushållens skulder exklusive
        periodiseringar till <strong>5&nbsp;530,49 miljarder kronor</strong>.
        Det är ett ställningsvärde vid kvartalets slut, inte ett årsflöde.
        Enligt 2026 års ekonomiska vårproposition är över 80 procent bolån.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Regleringarna</p>
      <h3>Bolåneregler 2010–2018</h3>
      <p>
        Tre nationella åtgärder infördes mellan 2010 och 2018:
        <strong>bolånetak</strong> 2010, där max 85 procent fick lånas,
        <strong>amorteringskrav</strong> 2016 och
        <strong>skärpt amorteringskrav</strong> 2018 för dem som lånat allra mest.
      </p>
      <div class="callout">
        <p class="callout-num">3 st</p>
        <p class="callout-label">
          åtgärder som begränsade belåning eller krävde amortering infördes på
          åtta år.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Sammansättningen</p>
      <h3>Bolån står för merparten</h3>
      <p>
        Eftersom över 80 procent av skulderna är bolån påverkas många hushåll av
        förändrade bolåneräntor. Skuldstocken visar hur mycket hushållen är
        skyldiga totalt, men inte hur skulder och betalningsförmåga är fördelade
        mellan olika hushåll.
      </p>
      <p>
        Riksbanken beskriver hushållens höga skuldsättning och korta
        räntebindningstider som en sårbarhet för svensk ekonomi.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">April 2026</p>
      <h3>Reglerna ändrades 2026</h3>
      <p>
        Från den 1 april 2026 höjdes bolånetaket till
        <strong>90 procent</strong> vid köp av ny bostad, det skärpta
        amorteringskravet slopades och grundkravet är som mest 2 procent om
        året. Tilläggslån får samtidigt högst nå 80 procents belåningsgrad.
      </p>
      <p>
        Förändringarna ökar det möjliga låneutrymmet vid köp. Effekten på priser
        och skulder beror samtidigt på bland annat inkomster, räntor och utbudet
        av bostäder.
      </p>
    </section>
  </Scrolly>
</section>
