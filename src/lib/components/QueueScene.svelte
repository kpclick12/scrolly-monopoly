<script>
  // Stockholms bostadskö as a board: a line of tokens snaking toward one
  // green door (a rental contract — not even ownership). The two rulers
  // below give the real waiting times. Illustrative person density; the
  // numbers are the data.
  let { data } = $props();

  const W = 600;
  const H = 400;
  const q = $derived(data.queue);
  const fmt = (n) => n.toLocaleString("sv-SE");

  // A snake of queue tokens: three rows, right → left → right, ending at
  // the door. Spacing tightens near the door — the way real queues bunch.
  const rows = [
    { y: 96, from: 545, to: 60, n: 16 },
    { y: 168, from: 60, to: 545, n: 16 },
    { y: 240, from: 545, to: 120, n: 14 },
  ];
  const tokens = rows.flatMap((r, ri) =>
    Array.from({ length: r.n }, (_, i) => ({
      id: `${ri}-${i}`,
      x: r.from + ((r.to - r.from) * i) / (r.n - 1),
      y: r.y + Math.sin(i * 2.1 + ri) * 4,
    }))
  );
</script>

<figure class="chart">
  <figcaption>Bostadskön i Stockholm — kön till en enda grön dörr</figcaption>
  <svg
    viewBox="0 0 {W} {H}"
    role="img"
    aria-label="Illustration av Stockholms bostadskö: en lång slingrande kö av spelpjäser mot en enda dörr märkt hyreskontrakt. 894 592 personer stod i kön vid årsskiftet 2025/26. Genomsnittlig kötid 9 år, drygt 21 år för innerstan."
  >
    <!-- the door: one rental contract -->
    <g transform="translate(58 218)">
      <rect x="-26" y="-56" width="52" height="78" rx="5" class="door" />
      <rect x="-16" y="-40" width="32" height="62" rx="3" class="door-leaf" />
      <circle cx="8" cy="-6" r="2.6" class="door-knob" />
      <text class="door-lbl" x="0" y="42" text-anchor="middle">Hyres-</text>
      <text class="door-lbl" x="0" y="56" text-anchor="middle">kontrakt</text>
    </g>

    {#each tokens as t (t.id)}
      <g class="pawn" transform="translate({t.x} {t.y})">
        <circle cx="0" cy="-9" r="4.4" />
        <path d="M -5.4 8 C -5.4 -1 5.4 -1 5.4 8 Z" />
      </g>
    {/each}
    <text class="more" x="548" y="276" text-anchor="end">… och {fmt(q.registered - 46)} till</text>

    <!-- waiting-time rulers -->
    <g class="ruler">
      <line x1="60" x2="545" y1="316" y2="316" />
      {#each [0, 5, 10, 15, 20] as yr}
        <line class="rt" x1={60 + (485 * yr) / 22} x2={60 + (485 * yr) / 22} y1="311" y2="321" />
        <text class="rt-lbl" x={60 + (485 * yr) / 22} y="338" text-anchor="middle">{yr} år</text>
      {/each}
      <g class="marker avg" transform="translate({60 + (485 * q.avgYears) / 22} 316)">
        <circle r="5" />
        <text y="-14" text-anchor="middle">Snittet: {String(q.avgYears).replace(".0", "")} år</text>
      </g>
      <g class="marker inner" transform="translate({60 + (485 * q.innerCityYears) / 22} 316)">
        <circle r="5" />
        <text y="-14" text-anchor="middle">Innerstan: ≈{q.innerCityYears} år</text>
      </g>
    </g>
    <text class="big" x="60" y="386">{fmt(q.registered)}</text>
    <text class="big-lbl" x="248" y="386">personer i kön ({q.asOf})</text>
  </svg>
  <p class="legend">
    Bostadsförmedlingen i Stockholm: genomsnittlig kötid för en vanlig hyresrätt
    under 2025, längst för innerstadens lägenheter. Kön leder till ett hyreskontrakt —
    inte till en egen ruta på brädet.
  </p>
</figure>

<style>
  .chart {
    margin: 0;
    width: min(640px, 100%);
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
  .door {
    fill: var(--series-green);
  }
  .door-leaf {
    fill: var(--surface-1);
    opacity: 0.25;
  }
  .door-knob {
    fill: var(--surface-1);
  }
  .door-lbl {
    font-size: 11px;
    font-weight: 700;
    fill: var(--ink-green);
  }
  .pawn circle,
  .pawn path {
    fill: var(--text-muted);
  }
  .pawn:nth-child(4n) circle,
  .pawn:nth-child(4n) path {
    fill: var(--baseline);
  }
  .more {
    font-size: 12px;
    fill: var(--text-muted);
    font-style: italic;
  }
  .ruler line {
    stroke: var(--baseline);
    stroke-width: 1.5;
  }
  .ruler .rt {
    stroke: var(--baseline);
    stroke-width: 1;
  }
  .rt-lbl {
    font-size: 11px;
    fill: var(--text-muted);
  }
  .marker circle {
    stroke: var(--surface-1);
    stroke-width: 2;
  }
  .marker.avg circle {
    fill: var(--series-blue);
  }
  .marker.inner circle {
    fill: var(--series-red);
  }
  .marker text {
    font-size: 12px;
    font-weight: 700;
  }
  .marker.avg text {
    fill: var(--ink-blue);
  }
  .marker.inner text {
    fill: var(--ink-red);
  }
  .big {
    font-family: var(--serif);
    font-size: 34px;
    font-weight: 800;
    fill: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }
  .big-lbl {
    font-size: 13px;
    fill: var(--text-secondary);
  }
  .legend {
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
    margin: 8px 0 0;
  }
</style>
