<script>
  import Scrolly from "../components/Scrolly.svelte";
  import TaxBoard from "../components/TaxBoard.svelte";

  let { data } = $props();
  let currentStep = $state(0);

  const view = $derived(["stamps", "cap", "gdp", "chance"][Math.min(currentStep, 3)]);
</script>

<section class="act" aria-label="Akt 4: Skatterutorna" style="--act-accent: var(--ink-amber);">
  <div class="act-head">
    <p class="act-kicker">Akt fyra</p>
    <h2>Skatterutorna</h2>
    <p class="act-dek">
      På brädet finns två rutor alla fruktar: Inkomstskatt — betala 200, och
      Lyxskatt — betala 100. I det svenska partiet gjorde vi något som inte
      står i regelboken: vi plockade bort rutorna.
    </p>
  </div>

  <Scrolly onStepChange={(i) => (currentStep = i)}>
    {#snippet visual()}
      <div class="visual-frame-stack" style="--stack-height: 480px; --stack-height-mobile: 430px;">
        <div class="frame is-active">
          <TaxBoard data={data.taxes} {view} />
        </div>
      </div>
    {/snippet}

    <section class="scrolly-step">
      <p class="kicker">2004 · 2007 · 2008</p>
      <h3>Rutorna som lyftes bort</h3>
      <p>
        På fyra år försvann tre skatter på ägande: arvs- och gåvoskatten 2004,
        förmögenhetsskatten 2007 — och 2008 den statliga
        <strong>fastighetsskatten</strong> på bostäder, efter ett av svensk
        politiks mest framgångsrika folkuppror.
      </p>
      <p>
        Kvar på brädet blev bara en liten avgift. Och det är där det blir
        intressant.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Taket</p>
      <h3>Villan för 20 miljoner betalar som villan för 1,5</h3>
      <p>
        Ersättaren, den kommunala fastighetsavgiften, är 0,75 procent av
        taxeringsvärdet — men aldrig mer än <strong>10&nbsp;074 kr per år</strong>.
        Ovanför taket är avgiften platt: Djursholmsvillan och Hultsfredsvillan
        betalar exakt lika.
      </p>
      <div class="callout">
        <p class="callout-num">10 074 kr</p>
        <p class="callout-label">
          maxavgiften 2026 — ungefär en månadsavgift för en normal
          bostadsrättstvåa, för att äga ett hus utan övre gräns i värde.
        </p>
      </div>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Jämförelsen</p>
      <h3>Bland de lägsta i västvärlden</h3>
      <p>
        Sveriges egendomsskatter motsvarar ungefär <strong>1 procent av
        BNP</strong>, mot cirka 2,3 procent i EU-15. Landet med världens en gång
        hårdaste skattetryck blev — för den som äger sitt boende — närmast ett
        skatteparadis.
      </p>
      <p>
        Ekonomkåren är ovanligt enig: en löpande fastighetsskatt är en av de
        minst skadliga skatter som finns, och dess frånvaro kapitaliseras rakt
        in i priserna. Rutan som skulle bromsa spelet finns inte längre.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Chans-kortet</p>
      <h3>Banken betalar din ränta. En tredjedel av den.</h3>
      <p>
        Och spelet ger inte bara ägandet rabatt — det subventionerar själva
        lånandet. <strong>Ränteavdraget</strong> ger tillbaka 30 procent av
        räntekostnaden, år efter år, utan tak i lånets storlek.
      </p>
      <p>
        Räkna ihop akten: ingen fastighetsskatt att tala om, ingen
        förmögenhetsskatt, ingen arvsskatt — och en rabattkupong på att belåna
        sig. Det är inte konstigt att alla ville köpa rutor. Frågan är var
        pengarna kom ifrån. Svar: nästa akt.
      </p>
    </section>
  </Scrolly>
</section>
