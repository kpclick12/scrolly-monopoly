<script>
  import Scrolly from "../components/Scrolly.svelte";
  import PriceJourney from "../components/PriceJourney.svelte";
  import EquityRace from "../components/EquityRace.svelte";
  import StatTiles from "../components/StatTiles.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const tiles = [
    { num: "12 år", label: "tog det att spara ihop kontantinsatsen till en etta i Stockholm, innan reglerna lättades", accent: "var(--series-red)" },
    { num: "7 år", label: "tar det med de nya reglerna från april 2026. Fortfarande en lång väntan", accent: "var(--series-blue)" },
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
      Alla som spelat Monopol kan strategin. Köp en billig gata, låt värdet
      stiga, växla upp till en dyrare. I trettio år har det varit Sveriges
      inofficiella folksport.
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
      <p class="kicker">De vilda åren</p>
      <h3>Villor: +412 procent</h3>
      <p>
        SCB:s fastighetsprisindex visar att villapriserna steg
        <strong>412&nbsp;procent</strong> 1996–2025. En genomsnittlig permanent
        småhusfastighet kostade cirka 651&nbsp;000 kronor 1995 och 3,91 miljoner
        2025. Den uppskattade bostadsrättsserien i diagrammet har en annan källa
        och landar nära nio gånger 1996 års nivå.
      </p>
      <p>
        Lönerna hängde inte med i närheten. Men något annat gjorde det:
        <span class="badge badge-amber">räntan</span>.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Bränslet</p>
      <h3>Pengar blev nästan gratis</h3>
      <p>
        Titta på den undre panelen. Styrräntan föll under långa perioder, och 2015
        hände det otänkbara: den blev <strong>negativ</strong>. Bankernas
        bolåneräntor var fortfarande positiva, men de historiskt billiga
        pengarna gav låntagarna större räckvidd. Under pandemin drog det iväg
        ytterligare ett snäpp, med budgivningar via mobilen från sommarstugan.
      </p>
      <div class="callout">
        <p class="callout-num">−0,5 %</p>
        <p class="callout-label">
          var styrräntan 2016. Banken hade lagt till en husregel: den som
          intecknar mest vinner.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">2022</p>
      <h3>Sedan kom räntechocken</h3>
      <p>
        På arton månader gick styrräntan från noll till
        <strong>4 procent</strong>. Bostadspriserna föll omkring
        <strong>11 procent</strong> från toppen i diagrammets årsserie.
        Sedan hämtade marknaden andan och räntan sänktes tillbaka mot
        1,75 procent.
      </p>
      <p>
        Men zooma ut. Kurvan står fortfarande nära nio gånger startrutan. Det
        var ett hack i stegen, inte ett nytt spel.
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
        Ägarens <span class="badge badge-blue">eget kapital</span> växer år för
        år, inte för att hon gör något särskilt utan för att bostaden stiger i
        värde. Spararens <span class="badge badge-amber">konto</span> växer
        bara med det som sätts in.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Uppväxlingen</p>
      <h3>Etta blir tvåa blir villa</h3>
      <p>
        Efter tjugosex år står det drygt <strong>2,2 miljoner</strong> mot drygt
        en halv miljon. I verkligheten kan utvecklingen bli både bättre och sämre;
        i exemplet kan vinsten belånas och växlas upp till nästa gata. Ettan blir
        tvåa, tvåan blir villa. Det är det vi menar när vi säger
        <em>bostadskarriär</em>.
      </p>
      <div class="callout">
        <p class="callout-num">≈×4,3</p>
        <p class="callout-label">
          mer än spararen i det förenklade räkneexemplet. Räntor, avgifter,
          hyra, amortering och avkastning på sparandet ingår inte.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Tröskeln</p>
      <h3>Tolv år för att spara ihop kontantinsatsen</h3>
      <p>
        Innan man kan köpa något måste man ha pengar på fickan. I Stockholm tog
        det i snitt <strong>tolv år</strong> att spara ihop kontantinsatsen
        till en etta, sju år med de nya reglerna från 2026. Problemet är att
        priserna stiger under tiden man sparar. Målet flyttar sig.
      </p>
      <p>
        Så långt de som står och väntar. Men många kom aldrig ens så långt.
        Nästa akt handlar om dem.
      </p>
    </section>
  </Scrolly>
</section>
