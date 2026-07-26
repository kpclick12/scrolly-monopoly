<script>
  import { scaleBand, scaleLinear } from "d3-scale";

  // The board's own price ladder (60 → 400 spel-kronor), morphing into the
  // same streets' REAL price per m² today. Same rows, same colors — only the
  // scale changes, which is the whole point: on the board the dearest group
  // costs 6.7× the cheapest; in 2026 the whole city has compressed into
  // luxury. Group colors are identity (the board's own), and every bar
  // carries a direct label, so color is never the only carrier.
  let { data, mode = "board", highlight = null } = $props();

  const W = 620;
  const H = 460;
  const M = { top: 30, right: 96, bottom: 34, left: 164 };

  const groups = $derived(data.groups);
  const y = $derived(scaleBand(groups.map((g) => g.id), [M.top, H - M.bottom]).padding(0.3));
  const maxVal = $derived(mode === "board" ? 8400 : 175000);
  const x = $derived(scaleLinear([0, maxVal], [M.left, W - M.right]));
  const val = (g) => (mode === "board" ? g.boardPrice : g.realToday);
  const fmtKr = (n) => n.toLocaleString("sv-SE");
  const ticks = $derived(mode === "board" ? [0, 2000, 4000, 6000, 8000] : [0, 50000, 100000, 150000]);
  const dimmed = (g) => highlight && g.id !== highlight;
</script>

<figure class="chart">
  <figcaption>
    {mode === "board"
      ? "Spelplanens prisstege — köpesumma i spel-kronor (svenska Monopol, 1937)"
      : "Samma gator idag — ungefärligt kvadratmeterpris, kr/kvm (2026)"}
  </figcaption>
  <svg
    viewBox="0 0 {W} {H}"
    role="img"
    aria-label={mode === "board"
      ? "Liggande stapeldiagram: Monopolbrädets åtta färggrupper från Hornsgatan 1 000 kronor till Norrmalmstorg 8 000 kronor."
      : "Liggande stapeldiagram: samma gator med dagens kvadratmeterpriser, från cirka 95 000 kr/kvm på Hornsgatan till 168 360 kr/kvm på Strandvägen."}
  >
    {#each ticks as tick}
      <line class="grid" x1={x(tick)} x2={x(tick)} y1={M.top - 6} y2={H - M.bottom} />
      <text class="tick" x={x(tick)} y={H - M.bottom + 18} text-anchor="middle">
        {tick === 0 ? "0" : `${tick / 1000} tkr`}
      </text>
    {/each}

    {#each groups as g (g.id)}
      <g class:dimmed={dimmed(g)} style="transition: opacity 0.3s ease;">
        <rect
          class="swatch"
          x={M.left - 20}
          y={y(g.id)}
          width="12"
          height={y.bandwidth()}
          rx="2"
          style="fill: var({g.color});"
        />
        <text class="street" x={M.left - 28} y={y(g.id) + y.bandwidth() / 2 - 3} text-anchor="end">
          {g.street}
        </text>
        <text class="area" x={M.left - 28} y={y(g.id) + y.bandwidth() / 2 + 12} text-anchor="end">
          {mode === "board" ? g.second : g.area}
        </text>
        <rect
          class="bar"
          x={M.left}
          y={y(g.id)}
          width={Math.max(2, x(val(g)) - M.left)}
          height={y.bandwidth()}
          rx="4"
          style="fill: var({g.color});"
        >
          <title>{g.street}: {mode === "board" ? `${fmtKr(g.boardPrice)} kr på brädet` : `≈${fmtKr(g.realToday)} kr/kvm`}</title>
        </rect>
        <text class="value" x={x(val(g)) + 8} y={y(g.id) + y.bandwidth() / 2 + 4}>
          {mode === "board" ? `${fmtKr(g.boardPrice)} kr` : `≈${fmtKr(g.realToday)}`}
        </text>
      </g>
    {/each}
    <line class="axis" x1={M.left} x2={M.left} y1={M.top - 6} y2={H - M.bottom} />
  </svg>
  <p class="legend">
    {mode === "board"
      ? "Brädet kom ut 1937: Gamla stans och Söders gator billigast, paradgatorna dyrast."
      : "Områdesnivåer, avrundade (Svensk Mäklarstatistik apr 2025–mar 2026). Strandvägen är exakt: 168 360 kr/kvm."}
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
    font-size: 12px;
    fill: var(--text-muted);
  }
  .bar {
    transition: width 0.7s cubic-bezier(0.25, 0.8, 0.35, 1);
    stroke: var(--surface-1);
    stroke-width: 2;
  }
  .swatch {
    stroke: var(--surface-1);
    stroke-width: 1;
  }
  .street {
    font-size: 13px;
    font-weight: 700;
    fill: var(--text-primary);
  }
  .area {
    font-size: 10.5px;
    fill: var(--text-muted);
  }
  .value {
    font-size: 12.5px;
    font-weight: 700;
    fill: var(--text-secondary);
    font-variant-numeric: tabular-nums;
  }
  .dimmed {
    opacity: 0.25;
  }
  .legend {
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
    margin: 8px 0 0;
  }
</style>
