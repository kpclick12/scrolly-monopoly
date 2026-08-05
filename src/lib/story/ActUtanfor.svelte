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
      Monopols första regel är att alla får lika mycket av banken innan partiet
      börjar. Så började aldrig det svenska partiet. En stor del av Sverige
      blev aldrig ens inbjuden att spela.
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
      <h3>Alla började inte med lika mycket</h3>
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
      <p class="kicker">Ägandet</p>
      <h3>Boendeformerna är fler än två</h3>
      <p>
        SCB:s huvudkategorier visar att 38 procent bor i ägt småhus och 21
        procent i bostadsrätt i flerbostadshus. 29 procent bor i hyresrätt i
        flerbostadshus och 12 procent i andra boendeformer. Därför visar vi
        inte statistiken som ett förenklat tvådelat äga–hyra-tal.
      </p>
      <p>
        Den som hyr bygger inget eget bostadskapital genom hyran och fick inte
        del av bostädernas prisuppgång på samma sätt som en ägare.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Hyran</p>
      <h3>Dyrast för den som har minst</h3>
      <p>
        Hyresgästerna lägger i snitt <strong>27 procent</strong> av sin
        disponibla inkomst på boendet. För ägt småhus är motsvarande medianandel
        18 procent. Det jämför andelar av inkomsten, inte boendekostnader i kronor,
        och skillnaden påverkas både av kostnader och av hushållens inkomster.
      </p>
      <div class="callout">
        <p class="callout-num">0 kr</p>
        <p class="callout-label">
          av de trettio årens värdestegring gick till den som hyrde. Att stå
          utanför blev dyrt.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Kön</p>
      <h3>894 592 personer väntar på tur</h3>
      <p>
        Alternativet till att köpa är att köa. Vid årsskiftet stod nästan
        <strong>900 000 personer</strong> i Stockholms bostadskö, fler än det
        bor i hela Göteborg. De vanliga hyresrätter som förmedlades under 2025
        hade i snitt <strong>9,0 års kötid</strong>; i Stockholms kommun var
        genomsnittet <strong>12,4 år</strong>.
      </p>
      <p>
        Det är utfall för bostäder som faktiskt förmedlades, inte ett mått på
        hur många år dagens genomsnittliga kömedlem har kvar. Kontraktet gäller
        dessutom en hyresrätt, inte en ägd ruta.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Väntrummet</p>
      <h3>En generation i föräldrahemmet</h3>
      <p>
        Där kön och priserna möts uppstår ett väntrum.
        <strong>204 000 unga vuxna</strong> bor kvar hos sina föräldrar, nio av
        tio ofrivilligt i Hyresgästföreningens mätning 2025. Organisationen
        beskriver nivån som den högsta i sin mätserie, men metoden har ändrats
        mellan upplagor. De sparar mot en kontantinsats som kan flytta sig med
        priserna, samtidigt som kötiderna mäts i år.
      </p>
      <p>
        Det är den gruppen de nya lånereglerna från 2026 säger sig vilja hjälpa
        in. Men först ska vi titta på det som gjorde ägandet så billigt för dem
        som redan sitter vid bordet.
      </p>
    </section>
  </Scrolly>
</section>
