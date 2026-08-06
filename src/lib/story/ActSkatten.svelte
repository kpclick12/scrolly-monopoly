<script>
  import Scrolly from "../components/Scrolly.svelte";
  import TaxBoard from "../components/TaxBoard.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const view = $derived(["stamps", "cap", "gdp", "chance"][Math.min(currentStep, 3)]);
</script>

<section
  class="act"
  aria-label="Akt 4: Skatterutorna"
  style="--act-accent: var(--ink-amber); --step-min: 435px; --step-min-mobile: 502px;"
>
  <div class="act-head">
    <p class="act-kicker">Akt fyra</p>
    <h2>Skatterutorna</h2>
    <p class="act-dek">
      På det tidiga brädet finns rutorna Inkomstskatt och Extra skatt. I den
      här akten visas hur några svenska skatter på ägande har förändrats över
      tid och hur den kommunala fastighetsavgiften är utformad i dag.
    </p>
  </div>

  <Scrolly onStepChange={(i) => (currentStep = i)}>
    {#snippet visual()}
      <div class="visual-frame-stack" style="--stack-height: 480px; --stack-height-mobile: 530px;">
        <div class="frame is-active">
          <TaxBoard data={data.taxes} {view} />
        </div>
      </div>
    {/snippet}

    <section class="scrolly-step">
      <p class="kicker">2004 · 2007 · 2008</p>
      <h3>Tre skatter avskaffades</h3>
      <p>
        Arvs- och gåvoskatten avskaffades 2004 och förmögenhetsskatten 2007.
        År 2008 avskaffades den statliga <strong>fastighetsskatten</strong> på
        bostäder.
      </p>
      <p>
        För bostäder ersattes den statliga fastighetsskatten av en kommunal
        fastighetsavgift med ett årligt tak.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Taket</p>
      <h3>Avgiften når taket vid 1,39 miljoner</h3>
      <p>
        Ersättaren heter kommunal fastighetsavgift och ligger på 0,75 procent
        av taxeringsvärdet, men aldrig mer än
        <strong>10&nbsp;425 kronor om året</strong>. När taxeringsvärdet
        passerar 1,39 miljoner kronor blir avgiften inte högre. Därför blir
        avgiften densamma för taxeringsvärden på 1,5 och 20 miljoner kronor.
      </p>
      <div class="callout">
        <p class="callout-num">10 425 kr</p>
        <p class="callout-label">
          är högsta kommunala fastighetsavgiften för småhus under inkomståret
          2026. Taket nås vid ett taxeringsvärde på 1,39 miljoner kronor.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Jämförelsen</p>
      <h3>Lägre än EU-15-snittet</h3>
      <p>
        I OECD:s breda kategori motsvarade Sveriges skatter på egendom
        <strong>0,9 procent av BNP</strong> 2022. Ett oviktat snitt för EU-15
        var cirka 2,1 procent. Kategorien omfattar mer än bara den löpande
        fastighetsavgiften och ska därför inte läsas som ett direkt mått på
        villaägarens skatt.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Ränteavdraget</p>
      <h3>Skattereduktion för kapitalunderskott</h3>
      <p>
        <strong>Ränteavdraget</strong> innebär en skattereduktion på
        kapitalunderskott: 30 procent upp till 100&nbsp;000 kronor per år och
        21 procent på den del som ligger över gränsen. Från inkomstår 2026
        måste lånet uppfylla kraven på säkerhet och maximal belåningsgrad.
      </p>
    </section>
  </Scrolly>
</section>
