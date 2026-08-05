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
      På brädet finns två rutor som ingen vill hamna på. Inkomstskatt, betala
      4 000. Extra skatt, betala 2 000. I verkligheten gjorde vi tvärtom och
      plockade bort dem.
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
      <h3>Skatterna som försvann</h3>
      <p>
        På fyra år försvann tre skatter på ägande. Arvs- och gåvoskatten 2004,
        förmögenhetsskatten 2007 och till sist, 2008, den statliga
        <strong>fastighetsskatten</strong> på bostäder, efter en lång och
        politiskt laddad debatt om skatten.
      </p>
      <p>
        Kvar blev bara en liten avgift. Och det är den avgiften som är
        intressant.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Taket</p>
      <h3>Taxeringsvärde 20 miljoner betalar lika mycket som 1,5</h3>
      <p>
        Ersättaren heter kommunal fastighetsavgift och ligger på 0,75 procent
        av taxeringsvärdet, men aldrig mer än
        <strong>10&nbsp;425 kronor om året</strong>. Ovanför taket spelar
        taxeringsvärdet ingen roll för avgiften. I exemplet ligger både
        20 miljoner och 1,5 miljoner över takgränsen 1,39 miljoner.
      </p>
      <div class="callout">
        <p class="callout-num">10 425 kr</p>
        <p class="callout-label">
          är maxavgiften 2026. Ungefär en månadsavgift för en vanlig
          bostadsrättstvåa, för att äga ett hus som får kosta hur mycket som
          helst.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Jämförelsen</p>
      <h3>Bland de lägsta i västvärlden</h3>
      <p>
        I OECD:s breda kategori motsvarade Sveriges skatter på egendom
        <strong>0,9 procent av BNP</strong> 2022. Ett oviktat snitt för EU-15
        var cirka 2,1 procent. Kategorien omfattar mer än bara den löpande
        fastighetsavgiften och ska därför inte läsas som ett direkt mått på
        villaägarens skatt.
      </p>
      <p>
        OECD bedömer återkommande skatt på fast egendom som mindre skadlig för
        tillväxt än många alternativ. Hur en sådan skatt bör utformas och
        fördelas är däremot en politisk fråga. Den svenska avgiften har ett tak,
        vilket gör den mindre proportionell ju högre taxeringsvärdet blir.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Chans-kortet</p>
      <h3>Staten tar en del av räntekostnaden</h3>
      <p>
        Spelet ger inte bara rabatt på ägandet. Det subventionerar själva
        lånandet. <strong>Ränteavdraget</strong> ger 30 procents skattereduktion
        på kapitalunderskott upp till 100&nbsp;000 kronor per år och 21 procent
        på den del som ligger över gränsen.
      </p>
      <p>
        Lägg ihop det hela. En kommunal fastighetsavgift med tak, ingen
        förmögenhetsskatt, ingen arvsskatt och dessutom avdrag på räntan. Då
        behöver ingen undra varför det blev så attraktivt att äga sitt boende.
        Återstår frågan var pengarna kom ifrån. Det handlar nästa akt om.
      </p>
    </section>
  </Scrolly>
</section>
