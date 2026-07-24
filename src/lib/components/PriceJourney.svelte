<script>
  import { scaleLinear } from "d3-scale";

  // The thirty wild years: price indices for bostadsrätter and villor
  // (1996 = 100) in the main panel, and Riksbankens styrränta in its own
  // small panel below — two measures of different scale, so two charts
  // sharing one x-axis, never a dual axis.
  let { data, step = 0 } = $props();

  const W = 620;
  const H1 = 330; // price panel
  const H2 = 120; // rate panel
  const H = H1 + H2;
  const M = { top: 26, right: 92, bottom: 26, left: 46 };
  const GAP = 34; // between panels

  const years = $derived(data.years);
  const x = $derived(scaleLinear([1996, 2025], [M.left, W - M.right]));
  const yP = $derived(scaleLinear([0, 950], [H1 - 10, M.top]));
  const yR = $derived(scaleLinear([-1, 4.5], [H - M.bottom, H1 + GAP]));

  function line(key, yScale) {
    return years.map((d, i) => `${i ? "L" : "M"}${x(d.year).toFixed(1)},${yScale(d[key]).toFixed(1)}`).join("");
  }
  const brfPath = $derived(line("brf", yP));
  const villaPath = $derived(line("villa", yP));
  const ratePath = $derived(line("rate", yR));
  const last = $derived(years[years.length - 1]);

  // Which era the current step spotlights: 1 = the cheap-money years,
  // 2 = the rate shock.
  const bands = $derived(
    step === 1
      ? [{ from: 2014, to: 2021, label: "Nollränta och minusränta" }]
      : step >= 2
        ? [{ from: 2021.6, to: 2023.6, label: "Räntechocken: −15 %" }]
        : []
  );
</script>

<figure class="chart">
  <figcaption>Bostadspriser (index, 1996 = 100) och styrräntan som eldade på dem</figcaption>
  <p class="key" aria-hidden="true">
    <span><i class="sw sw-blue"></i>Bostadsrätter</span>
    <span><i class="sw sw-green"></i>Villor</span>
    <span><i class="sw sw-amber"></i>Styrränta</span>
  </p>
  <svg
    viewBox="0 0 {W} {H}"
    role="img"
    aria-label="Två paneler med samma tidsaxel 1996 till 2025. Övre: prisindex där bostadsrätter når 889 och villor 466, med en topp 2021–22 och en svacka på cirka 15 procent. Undre: styrräntan, från cirka 4 procent på 1990-talet ner till minusränta 2015–2019, upp till 4 procent 2023 och ner till 1,75 procent."
  >
    <!-- price panel -->
    {#each [100, 300, 500, 700, 900] as tick}
      <line class="grid" x1={M.left} x2={W - M.right} y1={yP(tick)} y2={yP(tick)} />
      <text class="tick" x={M.left - 8} y={yP(tick) + 4} text-anchor="end">{tick}</text>
    {/each}

    {#each bands as b}
      <rect class="era" x={x(b.from)} y={M.top - 8} width={x(b.to) - x(b.from)} height={H - M.bottom - M.top + 8} rx="6" />
      <text class="era-label" x={(x(b.from) + x(b.to)) / 2} y={M.top + 6} text-anchor="middle">{b.label}</text>
    {/each}

    <path class="traj brf" d={brfPath} />
    <path class="traj villa" d={villaPath} />
    <circle class="dot brf-dot" cx={x(last.year)} cy={yP(last.brf)} r="4.5" />
    <circle class="dot villa-dot" cx={x(last.year)} cy={yP(last.villa)} r="4.5" />
    <text class="serie brf-ink" x={x(last.year) + 10} y={yP(last.brf) + 4}>+{data.totals.brfPct} %</text>
    <text class="serie villa-ink" x={x(last.year) + 10} y={yP(last.villa) + 4}>+{data.totals.villaPct} %</text>
    <text class="serie brf-ink" x={x(2013)} y={yP(600)} text-anchor="end">Bostadsrätter</text>
    <text class="serie villa-ink" x={x(2016)} y={yP(300)} text-anchor="start">Villor</text>

    <!-- rate panel -->
    <text class="panel-title" x={M.left} y={H1 + GAP - 10}>Styrräntan, %</text>
    {#each [0, 2, 4] as tick}
      <line class="grid" x1={M.left} x2={W - M.right} y1={yR(tick)} y2={yR(tick)} />
      <text class="tick" x={M.left - 8} y={yR(tick) + 4} text-anchor="end">{tick}</text>
    {/each}
    <line class="zero" x1={M.left} x2={W - M.right} y1={yR(0)} y2={yR(0)} />
    <path class="traj rate" d={ratePath} />
    <text class="serie rate-ink" x={x(last.year) + 10} y={yR(last.rate) + 4}>{String(last.rate).replace(".", ",")} %</text>

    {#each [2000, 2010, 2020] as tick}
      <text class="tick" x={x(tick)} y={H - M.bottom + 18} text-anchor="middle">{tick}</text>
    {/each}
  </svg>
  <p class="legend">
    Ungefärliga årsvärden, förankrade i publicerade totaler (+789 % för bostadsrätter,
    +366 % för villor 1996–2025). Styrräntan: Riksbanken.
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
  .zero {
    stroke: var(--baseline);
    stroke-width: 1.5;
  }
  .tick {
    font-size: 11.5px;
    fill: var(--text-muted);
  }
  .panel-title {
    font-size: 11.5px;
    font-weight: 700;
    fill: var(--text-secondary);
    letter-spacing: 0.06em;
  }
  .traj {
    fill: none;
    stroke-width: 2.4;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
  .brf {
    stroke: var(--series-blue);
  }
  .villa {
    stroke: var(--series-green);
  }
  .rate {
    stroke: var(--series-amber);
    stroke-width: 2;
  }
  .dot {
    stroke: var(--surface-1);
    stroke-width: 2;
  }
  .brf-dot { fill: var(--series-blue); }
  .villa-dot { fill: var(--series-green); }
  .serie {
    font-size: 12px;
    font-weight: 700;
  }
  .brf-ink { fill: var(--ink-blue); }
  .villa-ink { fill: var(--ink-green); }
  .rate-ink { fill: var(--ink-amber); }
  .era {
    fill: var(--series-amber);
    opacity: 0.13;
  }
  .era-label {
    font-size: 11.5px;
    font-weight: 700;
    fill: var(--ink-amber);
  }
  .legend {
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
    margin: 8px 0 0;
  }
  .key {
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: var(--text-secondary);
    margin: 0 0 8px;
    flex-wrap: wrap;
  }
  .key span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .sw {
    width: 14px;
    height: 4px;
    border-radius: 2px;
    display: inline-block;
  }
  .sw-blue { background: var(--series-blue); }
  .sw-green { background: var(--series-green); }
  .sw-amber { background: var(--series-amber); }
</style>
