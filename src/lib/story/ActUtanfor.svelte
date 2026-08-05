<script>
  import Scrolly from "../components/Scrolly.svelte";
  import TenureWaffle from "../components/TenureWaffle.svelte";
  import QueueScene from "../components/QueueScene.svelte";
  import StatTiles from "../components/StatTiles.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const tiles = [
    { num: "204 000", label: "unga vuxna mellan 20 och 27 år bor kvar hemma hos föräldrarna, 21 procent av alla (2025)", accent: "var(--series-red)" },
    { num: "9 av 10", label: "av dem uppger i Hyresgästföreningens mätning 2025 att de bor kvar ofrivilligt", accent: "var(--series-amber)" },
    { num: "184 000", label: "vill flytta hemifrån men kan inte (2025)", accent: "var(--series-blue)" },
    { num: "Olika start", label: "inkomst, sparande och familjehjälp påverkade vem som kunde köpa; Monopol-liknelsen är inte en statistisk mätning", accent: "var(--series-green)" },
  ];

  const waffleView = $derived(currentStep === 0 ? "all" : currentStep === 1 ? "split" : "rent");
</script>

<section
  class="act"
  aria-label="Akt 3: Utanför brädet"
  style="--act-accent: var(--ink-pink); --step-min: 390px; --step-min-mobile: 472px;"
>
  <div class="act-head">
    <p class="act-kicker">Akt tre</p>
    <h2>Utanför brädet</h2>
    <p class="act-dek">
      I Monopol får alla samma startkapital. På bostadsmarknaden skiljer sig
      hushållens förutsättningar åt, bland annat genom inkomst, sparande och
      möjligheten att få ekonomiskt stöd.
    </p>
  </div>

  <Scrolly onStepChange={(i) => (currentStep = i)}>
    {#snippet visual()}
      <div class="visual-frame-stack" style="--stack-height: 640px; --stack-height-mobile: 490px;">
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
      <h3>Olika förutsättningar att köpa</h3>
      <p>
        I spelet är startkapitalet lika stort. På bostadsmarknaden har
        hushåll olika inkomster, sparande och möjligheter till stöd från
        familjen. Det påverkar möjligheten att köpa och tidpunkten för ett köp.
      </p>
      <p>
        Prisuppgången på ägda bostäder har därför påverkat hushåll olika,
        beroende på om och när de ägde sin bostad.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Ägandet</p>
      <h3>Boendeformerna är fler än två</h3>
      <p>
        SCB:s huvudkategorier visar att 38 procent bor i ägt småhus och 21
        procent i bostadsrätt i flerbostadshus. 29 procent bor i hyresrätt i
        flerbostadshus och 12 procent i andra boendeformer. Därför visar vi
        inte statistiken som ett förenklat tvådelat äga–hyra-tal.
      </p>
      <p>
        Den som hyr äger inte bostaden och deltar därför inte direkt i dess
        prisförändring. Det säger däremot inte något om hushållets övriga
        sparande eller ekonomi.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Hyran</p>
      <h3>Boendekostnad som andel av inkomsten</h3>
      <p>
        Medianandelen av disponibel inkomst som går till boendet är
        <strong>27 procent</strong> för hyresrätt och 18 procent för ägt småhus.
        Det jämför andelar av inkomsten, inte boendekostnader i kronor, och
        skillnaden påverkas både av kostnader och av hushållens inkomster.
      </p>
      <div class="callout">
        <p class="callout-num">27 % / 18 %</p>
        <p class="callout-label">
          Medianandel av disponibel inkomst för hyresrätt respektive ägt småhus
          enligt SCB:s statistik för 2024.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Kön</p>
      <h3>894 592 personer väntar på tur</h3>
      <p>
        En väg till hyresrätt är att köa. Vid årsskiftet stod nästan
        <strong>900 000 personer</strong> registrerade i Stockholms bostadskö.
        De vanliga hyresrätter som förmedlades under 2025 hade i snitt
        <strong>9,0 års kötid</strong>; i Stockholms kommun var genomsnittet
        <strong>12,4 år</strong>.
      </p>
      <p>
        Det är utfall för bostäder som faktiskt förmedlades, inte ett mått på
        hur många år dagens genomsnittliga kömedlem har kvar. Kontraktet gäller
        dessutom en hyresrätt, medan ägande är en annan boendeform.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Unga vuxna</p>
      <h3>Unga vuxna i föräldrahemmet</h3>
      <p>
        I Hyresgästföreningens undersökning 2025 uppger
        <strong>204 000 unga vuxna</strong> mellan 20 och 27 år att de bor kvar
        hos sina föräldrar. Nio av tio uppger att de gör det ofrivilligt, och
        184 000 uppger att de vill flytta men inte kan. Jämförelser med tidigare
        upplagor bör göras försiktigt eftersom undersökningens metod har ändrats.
      </p>
      <p>
        Från 2026 förändrades vissa låneregler. Nästa avsnitt beskriver skatter
        och regler som påverkar hushållens boendeekonomi.
      </p>
    </section>
  </Scrolly>
</section>
