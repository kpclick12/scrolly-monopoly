<script>
  let { data, step = 0 } = $props();

  const fmtMdkr = (n) =>
    n.toLocaleString("sv-SE", { maximumFractionDigits: 0 });

  const isVisible = (regulation) =>
    step >= 2 || (step >= 1 && regulation.dir === "åtstramning");
</script>

<figure class="chart">
  <figcaption>Hushållens skulder, första kvartalet 2026</figcaption>

  <div
    class="summary"
    role="img"
    aria-label="Hushållens skulder exklusive periodiseringar var 5 530 miljarder kronor första kvartalet 2026. Över 80 procent av skulderna var bolån."
  >
    <div class="metric total">
      <p class="eyebrow">Skulder exklusive periodiseringar</p>
      <p class="number">{fmtMdkr(data.totalDebtMdkr)}</p>
      <p class="unit">miljarder kronor</p>
      <p class="date">Första kvartalet 2026</p>
    </div>

    <div class="metric share">
      <p class="eyebrow">Skuldens sammansättning</p>
      <p class="number">över 80 %</p>
      <p class="unit">är bolån</p>
      <p class="date">2026 års ekonomiska vårproposition</p>
    </div>
  </div>

  <div class="rules" aria-label="Tidslinje över bolåneregler">
    <p class="rules-title">Bolåneregler</p>
    <ol class="timeline">
      {#each data.regulations as regulation}
        <li
          class:visible={isVisible(regulation)}
          class:ease={regulation.dir === "lättnad"}
          aria-hidden={!isVisible(regulation)}
        >
          <span class="dot"></span>
          <span class="year">{regulation.year}</span>
          <span class="event">{regulation.label}</span>
        </li>
      {/each}
    </ol>
  </div>

  <p class="legend">
    Skuldstock: SCB:s finansräkenskaper. Bolånens andel: 2026 års ekonomiska
    vårproposition. Tidslinjen visar regeländringar, inte skuldutvecklingen.
  </p>
</figure>

<style>
  .chart {
    margin: 0;
    width: min(660px, 100%);
  }
  figcaption {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 10px;
  }
  .summary {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    border: 1px solid var(--baseline);
    border-top: 8px solid var(--series-red);
    border-radius: 6px;
    background: var(--surface-1);
    overflow: hidden;
  }
  .metric {
    padding: 24px 26px 22px;
    min-width: 0;
  }
  .share {
    border-left: 1px solid var(--gridline);
  }
  .eyebrow {
    margin: 0 0 10px;
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }
  .number {
    margin: 0;
    color: var(--ink-red);
    font-size: clamp(34px, 6vw, 56px);
    font-weight: 800;
    line-height: 0.95;
    font-variant-numeric: tabular-nums;
  }
  .share .number {
    color: var(--ink-blue);
    font-size: clamp(28px, 4.7vw, 44px);
  }
  .unit {
    margin: 7px 0 0;
    color: var(--text-primary);
    font-size: 16px;
    font-weight: 700;
  }
  .date {
    margin: 8px 0 0;
    color: var(--text-muted);
    font-size: 11.5px;
    line-height: 1.35;
  }
  .rules {
    margin-top: 25px;
  }
  .rules-title {
    margin: 0 0 13px;
    color: var(--text-secondary);
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }
  .timeline {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .timeline::before {
    position: absolute;
    top: 6px;
    right: 8%;
    left: 8%;
    height: 1px;
    background: var(--baseline);
    content: "";
  }
  .timeline li {
    position: relative;
    display: grid;
    justify-items: center;
    text-align: center;
    opacity: 0.14;
    transform: translateY(3px);
    transition: opacity 280ms ease, transform 280ms ease;
  }
  .timeline li.visible {
    opacity: 1;
    transform: none;
  }
  .dot {
    z-index: 1;
    width: 13px;
    height: 13px;
    border: 2px solid var(--surface-1);
    border-radius: 50%;
    background: var(--series-blue);
  }
  .ease .dot {
    background: var(--series-green);
  }
  .year {
    margin-top: 8px;
    color: var(--ink-blue);
    font-size: 13px;
    font-weight: 800;
  }
  .ease .year {
    color: var(--ink-green);
  }
  .event {
    margin-top: 3px;
    color: var(--text-secondary);
    font-size: 11px;
    font-weight: 650;
    line-height: 1.3;
  }
  .legend {
    margin: 18px 0 0;
    color: var(--text-muted);
    font-size: 12px;
    line-height: 1.5;
  }

  @media (max-width: 520px) {
    .summary {
      grid-template-columns: 1fr 1fr;
    }
    .metric {
      padding: 17px 15px 16px;
    }
    .eyebrow {
      min-height: 28px;
      font-size: 9px;
    }
    .number {
      font-size: 34px;
    }
    .share .number {
      font-size: 27px;
    }
    .unit {
      font-size: 13px;
    }
    .date {
      font-size: 9.5px;
    }
    .rules {
      margin-top: 17px;
    }
    .timeline {
      gap: 5px;
    }
    .event {
      font-size: 9px;
    }
    .legend {
      margin-top: 12px;
      font-size: 10.5px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .timeline li {
      transition: none;
    }
  }
</style>
