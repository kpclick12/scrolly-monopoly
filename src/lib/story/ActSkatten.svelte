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
      På brädet finns två rutor som ingen vill hamna på. Inkomstskatt, betala
      4 000. Extra skatt, betala 2 000. I verkligheten gjorde vi tvärtom och
      plockade bort dem.
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
      <h3>Skatterna som försvann</h3>
      <p>
        På fyra år försvann tre skatter på ägande. Arvs- och gåvoskatten 2004,
        förmögenhetsskatten 2007 och till sist, 2008, den statliga
        <strong>fastighetsskatten</strong> på bostäder, efter ett av svensk
        politiks mest framgångsrika folkuppror.
      </p>
      <p>
        Kvar blev bara en liten avgift. Och det är den avgiften som är
        intressant.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Taket</p>
      <h3>Villan för 20 miljoner betalar lika mycket som villan för 1,5</h3>
      <p>
        Ersättaren heter kommunal fastighetsavgift och ligger på 0,75 procent
        av taxeringsvärdet, men aldrig mer än
        <strong>10&nbsp;074 kronor om året</strong>. Ovanför taket spelar
        husets värde ingen roll alls. Villan i Djursholm och villan i
        Hultsfred betalar exakt lika mycket.
      </p>
      <div class="callout">
        <p class="callout-num">10 074 kr</p>
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
        Sveriges egendomsskatter motsvarar ungefär <strong>1 procent av
        BNP</strong>. I EU-15 är snittet 2,3. Landet som en gång hade världens
        hårdaste skattetryck blev nästan ett skatteparadis för den som äger
        sitt boende.
      </p>
      <p>
        Ekonomerna är ovanligt eniga här. En löpande fastighetsskatt hör till
        de minst skadliga skatter som finns, och när den tas bort hamnar
        pengarna i stället i priset på bostaden. Rutan som skulle bromsa spelet
        finns helt enkelt inte kvar.
      </p>
    </section>

    <section class="scrolly-step">
      <p class="kicker">Chans-kortet</p>
      <h3>Banken betalar en tredjedel av din ränta</h3>
      <p>
        Spelet ger inte bara rabatt på ägandet. Det subventionerar själva
        lånandet. <strong>Ränteavdraget</strong> betalar tillbaka 30 procent av
        räntekostnaden, år efter år, hur stort lånet än är.
      </p>
      <p>
        Lägg ihop det hela. Ingen fastighetsskatt att tala om, ingen
        förmögenhetsskatt, ingen arvsskatt och dessutom avdrag på räntan. Då
        behöver ingen undra varför det blev så attraktivt att äga sitt boende.
        Återstår frågan var pengarna kom ifrån. Det handlar nästa akt om.
      </p>
    </section>
  </Scrolly>
</section>
