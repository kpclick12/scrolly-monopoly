<script>
  import { scaleLinear } from "d3-scale";

  // The mortgage mountain: household debt as share of disposable income,
  // 1996–2025, with the regulation flags planted where each rule landed.
  // One series — the area is the story — so no legend box; the title
  // names it.
  let { data, step = 0 } = $props();

  const W = 620;
  const H = 430;
  const M = { top: 40, right: 30, bottom: 40, left: 52 };

  const ratio = $derived(data.ratio);
  const x = $derived(scaleLinear([1996, 2026], [M.left, W - M.right]));
  const y = $derived(scaleLinear([0, 220], [H - M.bottom, M.top]));

  const linePath = $derived(
    ratio.map((d, i) => `${i ? "L" : "M"}${x(d.year).toFixed(1)},${y(d.pct).toFixed(1)}`).join("")
  );
  const areaPath = $derived(
    `${linePath}L${x(ratio[ratio.length - 1].year).toFixed(1)},${y(0)}L${x(ratio[0].year).toFixed(1)},${y(0)}Z`
  );
  const peak = $derived(ratio.reduce((a, b) => (b.pct > a.pct ? b : a)));
  const last = $derived(ratio[ratio.length - 1]);

  // Regulations appear from step 1; the 2026 easing flag from step 2.
  const flags = $derived(
    data.regulations.filter((r) => (step >= 2 ? true : step >= 1 ? r.dir === "åtstramning" : false))
  );
  const pctAt = (yr) => {
    for (let i = 0; i < ratio.length - 1; i++) {
      const a = ratio[i];
      const b = ratio[i + 1];
      if (yr >= a.year && yr <= b.year) return a.pct + ((b.pct - a.pct) * (yr - a.year)) / (b.year - a.year || 1);
    }
    return ratio[ratio.length - 1].pct;
  };
</script>

<figure class="chart">
  <figcaption>Hushållens skulder i procent av disponibel inkomst, 1996–2025</figcaption>
  <svg
    viewBox="0 0 {W} {H}"
    role="img"
    aria-label="Ytdiagram 1996 till 2025: hushållens skuldkvot stiger från cirka 90 procent till en topp på nästan 200 procent 2021 och faller sedan tillbaka till cirka 173 procent. Flaggor markerar bolånetaket 2010, amorteringskraven 2016 och 2018 samt lättnaderna 2026."
  >
    {#each [0, 50, 100, 150, 200] as tick}
      <line class="grid" x1={M.left} x2={W - M.right} y1={y(tick)} y2={y(tick)} />
      <text class="tick" x={M.left - 8} y={y(tick) + 4} text-anchor="end">{tick} %</text>
    {/each}
    {#each [2000, 2010, 2020] as tick}
      <text class="tick" x={x(tick)} y={H - M.bottom + 20} text-anchor="middle">{tick}</text>
    {/each}

    <path class="area" d={areaPath} />
    <path class="traj" d={linePath} />

    {#if step >= 2}
      <circle class="dot" cx={x(peak.year)} cy={y(peak.pct)} r="5" />
      <text class="peak-lbl" x={x(peak.year) - 7} y={y(peak.pct) + 25} text-anchor="end">Toppen {peak.year}:</text>
      <text class="peak-lbl strong" x={x(peak.year) - 7} y={y(peak.pct) + 41} text-anchor="end">≈{peak.pct} %</text>
      <text class="peak-lbl" x={x(last.year) - 4} y={y(last.pct) + 22} text-anchor="end">{last.year}: ≈{last.pct} %</text>
    {/if}

    {#each flags as f (f.year)}
      {@const lift = f.year === 2018 ? 56 : 26}
      {@const fy = y(pctAt(Math.min(f.year, 2025))) - 14}
      <g class="flag" class:ease={f.dir === "lättnad"}>
        <line x1={x(f.year)} x2={x(f.year)} y1={fy + 14} y2={fy - lift} />
        <circle cx={x(f.year)} cy={fy - lift - 4} r="4" />
        <text
          x={x(f.year) + (f.year >= 2016 ? -8 : 8)}
          y={fy - lift - 12}
          text-anchor={f.year >= 2016 ? "end" : "start"}
        >{f.label}</text>
      </g>
    {/each}
    <line class="axis" x1={M.left} x2={W - M.right} y1={H - M.bottom} y2={H - M.bottom} />
  </svg>
  <p class="legend">
    Ungefärliga årsvärden (SCB, Riksbanken, SEB). 2026-markören ligger efter
    seriens sista observation 2025. I kronor: {(data.totalDebtMdkr).toLocaleString("sv-SE")} miljarder
    i skulder första kvartalet 2026, varav {data.mortgageShare} är bolån.
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
    margin-bottom: 6px;
  }
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .grid {
    stroke: var(--gridline);
  }
  .axis {
    stroke: var(--baseline);
    stroke-width: 1.5;
  }
  .tick {
    font-size: 11.5px;
    fill: var(--text-muted);
  }
  .area {
    fill: var(--series-red);
    opacity: 0.16;
  }
  .traj {
    fill: none;
    stroke: var(--series-red);
    stroke-width: 2.4;
    stroke-linejoin: round;
  }
  .dot {
    fill: var(--series-red);
    stroke: var(--surface-1);
    stroke-width: 2;
  }
  .peak-lbl {
    font-size: 12px;
    fill: var(--text-secondary);
  }
  .peak-lbl.strong {
    font-weight: 700;
    fill: var(--ink-red);
    font-size: 13px;
  }
  .flag line {
    stroke: var(--baseline);
    stroke-width: 1.4;
    stroke-dasharray: 3 3;
  }
  .flag circle {
    fill: var(--series-blue);
  }
  .flag text {
    font-size: 11.5px;
    font-weight: 700;
    fill: var(--ink-blue);
  }
  .flag.ease circle {
    fill: var(--series-green);
  }
  .flag.ease text {
    fill: var(--ink-green);
  }
  .legend {
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
    margin: 8px 0 0;
  }
</style>
