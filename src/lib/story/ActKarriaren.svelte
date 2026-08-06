<script>
  import Scrolly from "../components/Scrolly.svelte";
  import PriceJourney from "../components/PriceJourney.svelte";
  import EquityRace from "../components/EquityRace.svelte";
  import StatTiles from "../components/StatTiles.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const tiles = [
    { num: "knappt 12 år", label: "i SBAB:s räkneexempel för kontantinsatsen till en etta i Stockholm med 15 procents insats", accent: "var(--series-red)" },
    { num: "drygt 7 år", label: "i samma räkneexempel med 10 procents kontantinsats från april 2026", accent: "var(--series-blue)" },
    { num: "180 000 kr", label: "blir tolv år med dagens barnbidrag på 1 250 kr/mån, utan avkastning", accent: "var(--series-amber)" },
    { num: "10 %", label: "räcker i kontantinsats sedan april 2026, mot 15 tidigare. Tröskeln sänktes men finns kvar", accent: "var(--series-green)" },
  ];
</script>

<section
  class="act"
  aria-label="Akt 2: Bostadskarriären"
  style="--act-accent: var(--ink-blue); --step-min: 405px; --step-min-mobile: 460px;"
>
  <div class="act-head">
    <p class="act-kicker">Akt två</p>
    <h2>Bostadskarriären</h2>
    <p class="act-dek">
      Med bostadskarriär menas att du först köper en mindre bostad och senare
      kan byta till en större eller mer attraktiv, om priserna har stigit och
      du har byggt upp ett eget kapital. Lite som i Monopol, där du efter hand
      kan byta upp dig till en mer attraktiv gata.
    </p>
  </div>

  <Scrolly onStepChange={(i) => (currentStep = i)}>
    {#snippet visual()}
      <div class="visual-frame-stack" style="--stack-height: 520px; --stack-height-mobile: 415px;">
        <div class="frame" class:is-active={currentStep <= 2}>
          <PriceJourney data={data.journey} step={currentStep} />
        </div>
        <div class="frame" class:is-active={currentStep === 3 || currentStep === 4}>
          <EquityRace data={data.journey} step={currentStep - 3} />
        </div>
        <div class="frame" class:is-active={currentStep >= 5}>
          <StatTiles {tiles} />
        </div>
      </div>
    {/snippet}

    <section class="scrolly-step">
      <p class="kicker">Prisutvecklingen</p>
      <h3>Villor: +412 procent</h3>
      <p>
        SCB:s fastighetsprisindex visar att villapriserna steg
        <strong>412&nbsp;procent</strong> 1996–2025. En genomsnittlig permanent
        småhusfastighet kostade cirka 651&nbsp;000 kronor 1995 och 3,91 miljoner
        2025. Bostadsrättsserien, som mäter genomsnittligt kvadratmeterpris,
        steg <strong>789&nbsp;procent</strong> 1996–2024 och har en annan källa.
      </p>
      <p>
        <span class="badge badge-amber">Ränteläget</span> var en viktig faktor
        bakom bostadsprisernas utveckling.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Ränteläget</p>
      <h3>Historiskt låga räntor</h3>
      <p>
        Styrräntan låg på historiskt låga nivåer under delar av perioden och var
        <strong>negativ 2015–2019</strong>. Bankernas bolåneräntor var fortfarande
        positiva, men de lägre räntekostnaderna ökade låntagarnas köpkraft.
        Under pandemin steg bostadspriserna ytterligare.
      </p>
      <div class="callout">
        <p class="callout-num">−0,5 %</p>
        <p class="callout-label">
          var styrräntan 2016, den lägsta nivån under perioden.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">2022</p>
      <h3>Räntorna steg snabbt</h3>
      <p>
        På arton månader gick styrräntan från noll till
        <strong>4 procent</strong>. Bostadspriserna föll omkring
        <strong>11 procent</strong> från toppen i diagrammets årsserie.
        Därefter steg priserna igen och styrräntan sänktes till 1,75 procent.
      </p>
      <p>
        Sett över hela perioden låg bostadsrättsserien 2024 fortfarande nära
        nio gånger 1996 års nivå.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Räkneexemplet</p>
      <h3>Den som köpte och den som sparade</h3>
      <p>
        Så här kunde det se ut. Två personer med samma 50&nbsp;000 kronor år
        1999. Den ena köper en etta på Söder för en halv miljon. Den andra
        sätter in 1&nbsp;500 kronor i månaden på banken.
      </p>
      <p>
        Ägarens <span class="badge badge-blue">eget kapital</span> förändras
        när bostadens värde förändras, medan lånet hålls oförändrat i exemplet.
        Spararens <span class="badge badge-amber">konto</span> ökar med
        insättningarna.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Uppväxlingen</p>
      <h3>Eget kapital kan användas vid nästa köp</h3>
      <p>
        Efter tjugofem år står det drygt <strong>2,2 miljoner</strong> mot
        en halv miljon. I exemplet kan det egna kapitalet användas för att köpa
        en större bostad. I verkligheten kan utfallet bli både bättre och sämre.
        Det är den här möjligheten som brukar kallas <em>bostadskarriär</em>.
      </p>
      <div class="callout">
        <p class="callout-num">≈×4,5</p>
        <p class="callout-label">
          mer än spararen i det förenklade räkneexemplet. Räntor, avgifter,
          hyra, amortering och avkastning på sparandet ingår inte.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Tröskeln</p>
      <h3>Spartid för kontantinsatsen</h3>
      <p>
        Ett bostadsköp kräver normalt en kontantinsats. I SBAB:s räkneexempel
        för Stockholm minskar spartiden från <strong>knappt tolv år</strong>
        till <strong>drygt sju år</strong> när insatsen sänks från 15 till 10
        procent. Beräkningen antar bland annat ett sparande på 4&nbsp;000 kronor
        i månaden samt årliga förändringar i priser, sparande och avkastning.
      </p>
    </section>
  </Scrolly>
</section>
