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
      Alla som spelat Monopol kan strategin. Köp en billig gata, låt värdet
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
        Sedan 1996 har villapriserna stigit <strong>366&nbsp;procent</strong>
        och bostadsrätterna <strong>789&nbsp;procent</strong>. En medelvilla
        gick för 700&nbsp;000 kronor 1995. Idag kostar den runt 4,8 miljoner.
      </p>
      <p>
        Lönerna hängde inte med i närheten. Men något annat gjorde det:
        <span class="badge badge-amber">räntan</span>.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Bränslet</p>
      <h3>Pengar blev gratis</h3>
      <p>
        Titta på den undre panelen. Styrräntan föll i tjugofem år, och 2015
        hände det otänkbara: den blev <strong>negativ</strong>. I fyra år
        lönade det sig bokstavligen att låna. Under pandemin drog det iväg
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
      <p class="kicker">Chockrutan</p>
      <h3>2022: gå till fängelse, gå inte via GÅ</h3>
      <p>
        På arton månader gick styrräntan från noll till
        <strong>4 procent</strong>. Bostadspriserna föll omkring
        <strong>15 procent</strong>, det största tappet sedan 90-talskrisen.
        Sedan hämtade marknaden andan och räntan sänktes tillbaka mot
        1,75 procent.
      </p>
      <p>
        Men zooma ut. Kurvan står fortfarande nära nio gånger startrutan. Det
        var ett hack i stegen, inte ett nytt spel.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">GÅ-mekaniken</p>
      <h3>Inkassera när du passerar GÅ</h3>
      <p>
        Så här såg spelet ut inifrån. Två personer med samma 50&nbsp;000 kronor
        år 1999. Den ena köper en etta på Söder för en halv miljon. Den andra
        sätter in 1&nbsp;500 kronor i månaden på banken.
      </p>
      <p>
        Ägarens <span class="badge badge-blue">eget kapital</span> växer varje
        varv, inte för att hen gör något utan för att gatan hen står på stiger.
        Spararens <span class="badge badge-amber">konto</span> växer bara med
        det som sätts in.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Uppväxlingen</p>
      <h3>Etta blir tvåa blir villa</h3>
      <p>
        Efter tjugofem år står det drygt <strong>2 miljoner</strong> mot en
        knapp halv. I verkligheten går det ännu fortare än så, för vinsten
        belånas och växlas upp till nästa gata. Ettan blir tvåa, tvåan blir
        villa. Det är det vi menar när vi säger <em>bostadskarriär</em>.
      </p>
      <div class="callout">
        <p class="callout-num">×4,4</p>
        <p class="callout-label">
          mer än spararen i räkneexemplet, utan en enda extra arbetad timme. På
          brädet heter samma sak "avlöning 1 000 kr när ni passerar GÅ".
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Tröskeln</p>
      <h3>Muren runt brädet heter kontantinsats</h3>
      <p>
        Den som vill in i spelet idag möter först en mur. I Stockholm tog det i
        snitt <strong>tolv år</strong> att spara ihop kontantinsatsen till en
        etta, sju år med de nya reglerna från 2026. Och medan man sparar rullar
        tärningarna vidare. Målet flyttar sig för varje varv.
      </p>
      <p>
        Så långt de som står och väntar vid muren. Men många kom aldrig ens
        fram till den. Nästa akt räknar dem.
      </p>
    </section>
  </Scrolly>
</section>
