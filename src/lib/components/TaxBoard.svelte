<script>
  import { scaleLinear } from "d3-scale";

  // The tax squares of the Swedish game, in four frames:
  //   stamps — the three property-adjacent taxes Sweden abolished, drawn as
  //            board squares with an AVSKAFFAD rubber stamp
  //   cap    — two tax assessment values above the cap threshold
  //   gdp    — property taxes as share of GDP, Sweden vs EU-15
  //   chance — ränteavdraget as the Chans card it effectively is
  let { data, view = "stamps" } = $props();

  const W = 560;
  const H = 300;
  const gdp = $derived(data.gdpShare);
  const y = $derived(scaleLinear([0, 2.6], [H - 48, 30]));
  const fmtKr = (n) => n.toLocaleString("sv-SE");
</script>

<div class="taxwrap">
  {#if view === "stamps"}
    <div class="squares">
      {#each data.abolished as t}
        <div class="square">
          <div class="square-band"></div>
          <p class="square-title">{t.tax}</p>
          <p class="square-pay">BETALA</p>
          <p class="stamp">AVSKAFFAD {t.year}</p>
        </div>
      {/each}
    </div>
    <p class="legend">
      Tre skatter på ägande försvann på fyra år: arvs- och gåvoskatten 2004, förmögenhetsskatten
      2007 och den statliga fastighetsskatten 2008.
    </p>
  {:else if view === "cap"}
    <div class="cap">
      <svg viewBox="0 0 {W} 280" role="img" aria-label="Två villor med taxeringsvärden på 20 miljoner respektive 1,5 miljoner kronor. Båda betalar samma kommunala fastighetsavgift, {fmtKr(data.avgift.capKr)} kronor per år.">
        <!-- stor villa -->
        <g transform="translate(120 150)">
          <rect x="-72" y="-52" width="144" height="92" rx="4" class="house big" />
          <path d="M -84 -52 L 0 -118 L 84 -52 Z" class="roof big" />
          <rect x="-14" y="0" width="28" height="40" rx="2" class="door" />
          <text class="hval" x="0" y="66" text-anchor="middle">Taxeringsvärde 20 Mkr</text>
          <text class="hfee" x="0" y="92" text-anchor="middle">{fmtKr(data.avgift.capKr)} kr/år</text>
        </g>
        <!-- liten villa -->
        <g transform="translate(408 150)">
          <rect x="-34" y="-16" width="68" height="56" rx="3" class="house small" />
          <path d="M -42 -16 L 0 -50 L 42 -16 Z" class="roof small" />
          <rect x="-8" y="16" width="16" height="24" rx="2" class="door" />
          <text class="hval" x="0" y="66" text-anchor="middle">Taxeringsvärde 1,5 Mkr</text>
          <text class="hfee" x="0" y="92" text-anchor="middle">{fmtKr(data.avgift.capKr)} kr/år</text>
        </g>
        <text class="eq" x="264" y="140" text-anchor="middle">=</text>
      </svg>
      <p class="legend">
        Avgiften är 0,75 % av taxeringsvärdet — men aldrig mer än {fmtKr(data.avgift.capKr)} kr
        ({data.avgift.capYear}). Ovanför taket påverkar taxeringsvärdet inte avgiften.
      </p>
    </div>
  {:else if view === "gdp"}
    <p class="cap">Skatter på egendom, 2022 — andel av BNP</p>
    <svg viewBox="0 0 {W} {H}" role="img" aria-label="Stapeldiagram: skatter på egendom som andel av BNP 2022 — Sverige 0,9 procent, EU-15 i genomsnitt cirka 2,1 procent.">
      {#each [0, 1, 2] as tick}
        <line class="grid" x1="70" x2={W - 24} y1={y(tick)} y2={y(tick)} />
        <text class="tick" x="62" y={y(tick) + 4} text-anchor="end">{tick} %</text>
      {/each}
      {#each gdp as g, i}
        <rect
          class="bar"
          class:se={g.id === "se"}
          x={130 + i * 220}
          y={y(g.pct)}
          width="120"
          height={H - 48 - y(g.pct)}
          rx="4"
        >
          <title>{g.name}: ≈{String(g.pct).replace(".", ",")} % av BNP</title>
        </rect>
        <text class="value" x={190 + i * 220} y={y(g.pct) - 10} text-anchor="middle">≈{String(g.pct).replace(".", ",")} %</text>
        <text class="tick city" x={190 + i * 220} y={H - 24} text-anchor="middle">{g.name}</text>
      {/each}
      <line class="axis" x1="70" x2={W - 24} y1={y(0)} y2={y(0)} />
    </svg>
    <p class="legend">
      OECD Revenue Statistics 2024, data för 2022. EU-15 är ett oviktat snitt
      beräknat från landtabellen. Kategorien är bred och omfattar bland annat
      löpande fastighetsskatt, arv/förmögenhet och transaktionsskatter.
    </p>
  {:else}
    <div class="chance">
      <p class="chance-head">CHANS</p>
      <p class="chance-q">?</p>
      <p class="chance-body">
        Staten minskar din skatt med upp till <strong>{data.ranteavdrag.pct} %</strong> av ränteutgiften.
      </p>
      <p class="chance-sub">Gäller lån med godkänd säkerhet och förutsätter tillräcklig skatt att reducera.*</p>
      <p class="chance-fine">
        *Regler {data.avgift.capYear}: 30 % på kapitalunderskott upp till 100 000 kr,
        21 % på den del som ligger över gränsen.
      </p>
    </div>
  {/if}
</div>

<style>
  .taxwrap {
    width: min(620px, 100%);
  }
  .cap {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-secondary);
    margin: 0 0 6px;
  }
  .squares {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
  }
  .square {
    position: relative;
    background: var(--surface-1);
    border: 2px solid var(--text-primary);
    border-radius: 4px;
    padding: 0 10px 18px;
    text-align: center;
    overflow: hidden;
    min-height: 150px;
  }
  .square-band {
    height: 26px;
    margin: 0 -10px 12px;
    background: var(--board-green);
    border-bottom: 2px solid var(--text-primary);
  }
  .square-title {
    font-weight: 700;
    /* The three-across square is only ~121px wide and "Förmögenhetsskatt"
       is one unbreakable 17-character word. At 14px it overran the square
       and got clipped mid-word; at this size each tax name fits its line,
       so "Fastighetsskatt (bostäder)" wraps at its space instead of
       stranding a letter. break-word is the safety net for narrower
       squares, not the everyday mechanism. */
    font-size: 13.5px;
    line-height: 1.3;
    color: var(--text-primary);
    min-height: 38px;
    overflow-wrap: break-word;
    hyphens: auto;
  }
  .square-pay {
    font-size: 11px;
    letter-spacing: 0.14em;
    color: var(--text-muted);
    margin-top: 8px;
    text-decoration: line-through;
  }
  /* The stamp sits in the flow, after the struck-through BETALA it cancels
     — never absolutely positioned. A percentage offset collides with the
     title the moment that title wraps to a second line, which it does at
     every square width under ~200px: the three-across desktop layout and
     the phone both hit it. In flow it cannot reach the title at any width.
     `max-width` keeps the rotated box inside the square's rounded border. */
  .stamp {
    display: inline-block;
    margin-top: 10px;
    transform: rotate(-6deg);
    border: 3px solid var(--series-red);
    color: var(--ink-red);
    font-weight: 900;
    font-size: 13px;
    letter-spacing: 0.08em;
    padding: 4px 8px;
    border-radius: 4px;
    line-height: 1.25;
    max-width: 100%;
  }
  .legend {
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
    margin: 10px 0 0;
  }
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .house.big { fill: var(--series-blue); }
  .roof.big { fill: var(--ink-blue); }
  .house.small { fill: var(--series-blue); }
  .roof.small { fill: var(--ink-blue); }
  .door {
    fill: var(--surface-1);
  }
  .hval {
    font-size: 14px;
    font-weight: 700;
    fill: var(--text-primary);
  }
  .hfee {
    font-size: 15px;
    font-weight: 800;
    fill: var(--ink-red);
    font-variant-numeric: tabular-nums;
  }
  .eq {
    font-size: 40px;
    font-weight: 800;
    fill: var(--text-muted);
  }
  .grid {
    stroke: var(--gridline);
  }
  .axis {
    stroke: var(--baseline);
    stroke-width: 1.5;
  }
  .tick {
    font-size: 12px;
    fill: var(--text-muted);
  }
  .tick.city {
    font-size: 13px;
    font-weight: 600;
    fill: var(--text-secondary);
  }
  .bar {
    fill: var(--series-amber);
    stroke: var(--surface-1);
    stroke-width: 2;
  }
  .bar.se {
    fill: var(--series-blue);
  }
  .value {
    font-size: 14px;
    font-weight: 700;
    fill: var(--text-secondary);
    font-variant-numeric: tabular-nums;
  }
  .chance {
    background: var(--grp-orange);
    color: #241d08;
    border-radius: 10px;
    padding: 26px 30px 20px;
    max-width: 420px;
    margin: 0 auto;
    text-align: center;
    box-shadow: 0 6px 24px rgba(10, 26, 20, 0.25);
  }
  .chance-head {
    font-weight: 900;
    letter-spacing: 0.3em;
    font-size: 15px;
    color: #241d08;
  }
  .chance-q {
    font-family: var(--serif);
    font-size: 64px;
    font-weight: 900;
    line-height: 1;
    margin: 6px 0 10px;
    color: #241d08;
  }
  .chance-body {
    font-size: 19px;
    line-height: 1.45;
    color: #241d08;
    margin-bottom: 6px;
  }
  .chance-sub {
    font-size: 14px;
    color: rgba(36, 29, 8, 0.85);
  }
  .chance-fine {
    font-size: 11.5px;
    color: rgba(36, 29, 8, 0.7);
    margin-top: 12px;
  }
  @media (max-width: 640px) {
    .squares {
      grid-template-columns: minmax(0, 1fr);
      gap: 10px;
    }
    .square {
      min-height: 0;
      padding-bottom: 14px;
    }
    .square-title {
      min-height: 0;
    }
    /* One square per row here, so the stamp has width to spare and can sit
       flatter. Everything else about it is inherited — the in-flow
       positioning that keeps it off the title is in the base rule, not a
       phone-only patch. */
    .stamp {
      transform: rotate(-3deg);
    }
    .square-pay {
      margin-top: 6px;
    }
  }
</style>
