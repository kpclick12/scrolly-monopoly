<script>
  import Scrolly from "../components/Scrolly.svelte";
  import DebtMountain from "../components/DebtMountain.svelte";
  import StatTiles from "../components/StatTiles.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const tiles = [
    { num: "5 530 mdr", label: "kronor i hushållsskulder första kvartalet 2026 — mer än Sveriges hela BNP", accent: "var(--series-red)" },
    { num: "90 %", label: "får bolånet täcka från april 2026 — kontantinsatsen sänkt till 10 procent", accent: "var(--series-blue)" },
    { num: "2 %", label: "per år är numera det maximala amorteringskravet — skärpningen från 2018 är slopad", accent: "var(--series-green)" },
    { num: "≈173 %", label: "av disponibel inkomst är hushållens skulder — fortfarande bland de högsta i världen", accent: "var(--series-amber)" },
  ];
</script>

<section class="act" aria-label="Akt 5: Banken" style="--act-accent: var(--ink-green);">
  <div class="act-head">
    <p class="act-kicker">Akt fem</p>
    <h2>Banken</h2>
    <p class="act-dek">
      I Monopol kan en spelare i knipa alltid inteckna sina gator — banken
      säger aldrig nej, den finns ju för att spelet ska fortsätta. Sverige
      byggde sin bostadsmarknad på samma husregel.
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
        För varje uppköpt gata växte lånestocken. I mitten av 90-talet var
        hushållens skulder cirka <strong>90 procent</strong> av en årsinkomst;
        på toppen 2021 nästan <strong>200 procent</strong>. Priser som stiger
        kräver större lån, större lån driver priserna — GÅ-varv efter GÅ-varv.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Spelledaren ingriper</p>
      <h3>Nya regler mitt i partiet</h3>
      <p>
        Myndigheterna försökte bromsa utan att välta brädet:
        <strong>bolånetak</strong> 2010 — max 85 procent får lånas.
        <strong>Amorteringskrav</strong> 2016. <strong>Skärpt krav</strong> 2018
        för de högst belånade.
      </p>
      <div class="callout">
        <p class="callout-num">3 st</p>
        <p class="callout-label">
          åtstramningar på åtta år — och skuldkvoten fortsatte ändå uppåt,
          tills något annat tog i handbromsen.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Handbromsen</p>
      <h3>Det räntan gjorde som reglerna inte gjorde</h3>
      <p>
        Räntechocken 2022–2023 åstadkom det inga amorteringskrav klarat:
        skuldkvoten föll, från nästan 200 till runt
        <strong>173 procent</strong>. Inte för att lånen krympte — utan för att
        nya jättelån blev för dyra att ta.
      </p>
      <p>
        Fortfarande ett av världens mest belånade folk. Riksbanken har pekat på
        skuldberget som Sveriges största inhemska risk i över ett decennium.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">April 2026</p>
      <h3>Banken säger ja igen</h3>
      <p>
        Så, mitt i partiet, vändes reglerna åt andra hållet: bolånetaket höjt
        till <strong>90 procent</strong>, det skärpta amorteringskravet slopat,
        max 2 procent i årlig amortering. Motivet är gott — släppa in dem som
        står utanför brädet.
      </p>
      <p>
        Men mekaniken är densamma som alltid: mer lånekraft möter samma gator.
        Alla som spelat Monopol vet vad som händer med priset på en ruta när
        fler spelare får mer pengar i näven.
      </p>
    </section>
  </Scrolly>
</section>
