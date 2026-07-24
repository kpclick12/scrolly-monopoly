<script>
  import Scrolly from "../components/Scrolly.svelte";
  import PriceJourney from "../components/PriceJourney.svelte";
  import EquityRace from "../components/EquityRace.svelte";
  import StatTiles from "../components/StatTiles.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const tiles = [
    { num: "12 år", label: "tog det att spara ihop kontantinsatsen till en etta i Stockholm — innan reglerna lättades", accent: "var(--series-red)" },
    { num: "7 år", label: "med de nya reglerna från april 2026 — fortfarande en hel spelomgång innan man ens får slå", accent: "var(--series-blue)" },
    { num: "360 000 kr", label: "har den som sparat hela barnbidraget i tolv år — ungefär en kontantinsats", accent: "var(--series-amber)" },
    { num: "10 %", label: "räcker i kontantinsats från april 2026, mot tidigare 15 — muren sänktes, men den står kvar", accent: "var(--series-green)" },
  ];
</script>

<section class="act" aria-label="Akt 2: Bostadskarriären" style="--act-accent: var(--ink-blue);">
  <div class="act-head">
    <p class="act-kicker">Akt två</p>
    <h2>Bostadskarriären</h2>
    <p class="act-dek">
      Alla som spelat Monopol kan strategin: köp en billig gata, låt värdet
      stiga, växla upp till en dyrare. I trettio år har det varit Sveriges
      inofficiella folksport.
    </p>
  </div>

  <Scrolly onStepChange={(i) => (currentStep = i)}>
    {#snippet visual()}
      <div class="visual-frame-stack" style="--stack-height: 520px; --stack-height-mobile: 430px;">
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
      <h3>+789 procent</h3>
      <p>
        Sedan 1996 har svenska villapriser stigit med
        <strong>366&nbsp;procent</strong> och bostadsrätterna med
        <strong>789&nbsp;procent</strong>. En medelvilla som kostade
        700&nbsp;000 kr 1995 kostar idag runt 4,8 miljoner.
      </p>
      <p>
        Lönerna följde inte med på långa vägar. Det gjorde något annat:
        <span class="badge badge-amber">räntan</span>.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Bränslet</p>
      <h3>Pengar blev gratis</h3>
      <p>
        Följ den undre panelen: styrräntan föll i tjugofem år, och 2015 hände
        det otänkbara — den blev <strong>negativ</strong>. I fyra år betalade
        det sig bokstavligen att låna. Under pandemin sattes sedan tempot
        ytterligare ett snäpp upp: budgivningar via mobilen från sommarstugan.
      </p>
      <div class="callout">
        <p class="callout-num">−0,5 %</p>
        <p class="callout-label">
          styrräntan 2016 — Monopol-banken lade till en husregel: den som
          intecknar mest vinner.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Chockrutan</p>
      <h3>2022: gå till fängelse, gå inte via GÅ</h3>
      <p>
        På arton månader gick styrräntan från noll till <strong>4 procent</strong>.
        Bostadspriserna föll omkring <strong>15 procent</strong> — det största
        tappet sedan 90-talskrisen — innan marknaden hämtade andan och räntan
        sänktes tillbaka mot 1,75 procent.
      </p>
      <p>
        Men zooma ut: kurvan står fortfarande nära nio gånger startrutan. Ett
        hack i stegen, inte ett nytt spel.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">GÅ-mekaniken</p>
      <h3>Inkassera när du passerar GÅ</h3>
      <p>
        Så här såg spelet ut inifrån. Två spelare med samma 50&nbsp;000 kr år
        1999: en köper en etta på Söder för en halv miljon, en sätter in
        1&nbsp;500 kr i månaden på banken.
      </p>
      <p>
        Ägarens <span class="badge badge-blue">eget kapital</span> växer för
        varje varv — inte för att hen gör något, utan för att gatan hen står på
        stiger. Spararens <span class="badge badge-amber">konto</span> växer
        bara med insättningarna.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Uppväxlingen</p>
      <h3>Etta blir tvåa blir villa</h3>
      <p>
        Efter tjugofem år: drygt <strong>2 miljoner</strong> mot en knapp halv.
        Och det verkliga spelet är starkare än exemplet — vinsten belånas och
        växlas upp till nästa, dyrare gata. Ettan blir tvåa, tvåan blir villa.
        Det är det svenskar menar med ordet <em>bostadskarriär</em>.
      </p>
      <div class="callout">
        <p class="callout-num">×4,4</p>
        <p class="callout-label">
          mer än spararen, i räkneexemplet — utan en enda arbetad extra timme.
          I Monopol heter samma sak "inkassera 200 kr när du passerar GÅ".
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Tröskeln</p>
      <h3>Muren runt brädet: kontantinsatsen</h3>
      <p>
        Den som vill in i spelet idag möter först en mur. I Stockholm tog det
        i snitt <strong>tolv år</strong> att spara ihop kontantinsatsen till en
        etta — sju med de nya reglerna från 2026. Och medan man sparar rullar
        tärningarna vidare: målet flyttar sig för varje GÅ-varv.
      </p>
      <p>
        Så långt de som köar vid muren. Men många kom aldrig ens fram till
        den. Nästa akt räknar dem.
      </p>
    </section>
  </Scrolly>
</section>
