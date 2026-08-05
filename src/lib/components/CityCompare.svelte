<script>
  import { scaleBand, scaleLinear } from "d3-scale";

  // Two comparisons with matching definitions and vintages: selected county
  // leaders (Apr 2025–Mar 2026), or central-city averages (March 2026).
  let { data, view = "dearest" } = $props();

  const W = 600;
  const H = 430;
  const M = { top: 56, right: 18, bottom: 66, left: 56 };

  const cityColor = {
    sthlm: "var(--series-blue)",
    gbg: "var(--series-red)",
    bastad: "var(--series-amber)",
    vaxjo: "var(--series-green)",
    malmo: "var(--series-amber)",
    riket: "var(--series-green)",
  };
  const inkColor = {
    sthlm: "var(--ink-blue)",
    gbg: "var(--ink-red)",
    bastad: "var(--ink-amber)",
    vaxjo: "var(--ink-green)",
    malmo: "var(--ink-amber)",
    riket: "var(--ink-green)",
  };

  const rows = $derived(view === "dearest" ? data.dearestByCounty : data.central);
  const x = $derived(scaleBand(rows.map((c) => c.id), [M.left, W - M.right]).padding(0.32));
  const y = $derived(scaleLinear([0, 175000], [H - M.bottom, M.top]));
  const val = (c) => c.kvm;
  const fmtKr = (n) => n.toLocaleString("sv-SE");
</script>

<figure class="chart">
  <figcaption>
    {view === "dearest"
      ? "Exempel på länens dyraste gator — kr/kvm, apr 2025–mar 2026"
      : "Snittpris — kr/kvm, bostadsrätter, mars 2026"}
  </figcaption>
  <svg
    viewBox="0 0 {W} {H}"
    role="img"
    aria-label={view === "dearest"
      ? "Stapeldiagram med exempel på länstoppar: Strandvägen i Stockholm 168 360 kronor per kvadratmeter, Kjellmansgatan i Göteborg 89 689, Kattviksvägen i Båstad 87 854 och Kungsgatan i Växjö 34 691."
      : "Stapeldiagram över snittpriser i mars 2026: centrala Stockholm 119 380 kronor per kvadratmeter, centrala Göteborg 69 159, centrala Malmö 40 157 och riket 49 089."}
  >
    {#each [0, 50000, 100000, 150000] as tick}
      <line class="grid" x1={M.left} x2={W - M.right} y1={y(tick)} y2={y(tick)} />
      <text class="tick" x={M.left - 8} y={y(tick) + 4} text-anchor="end">{tick / 1000}{tick ? " tkr" : ""}</text>
    {/each}

    {#each rows as c (c.id)}
      <rect
        class="bar"
        x={x(c.id)}
        y={y(val(c))}
        width={x.bandwidth()}
        height={H - M.bottom - y(val(c))}
        rx="4"
        style="fill: {cityColor[c.id]};"
      >
        <title>{c.name} — {view === "dearest" ? `${c.street}: ${fmtKr(c.kvm)} kr/kvm` : `snitt ${fmtKr(c.kvm)} kr/kvm`}</title>
      </rect>
      <text class="value" x={x(c.id) + x.bandwidth() / 2} y={y(val(c)) - 22} text-anchor="middle" style="fill: {inkColor[c.id]};">
        {fmtKr(val(c))}
      </text>
      <text class="value-sub" x={x(c.id) + x.bandwidth() / 2} y={y(val(c)) - 8} text-anchor="middle">
        {view === "dearest" ? c.street : "kr/kvm"}
      </text>
      <text class="tick city" x={x(c.id) + x.bandwidth() / 2} y={H - M.bottom + 22} text-anchor="middle">
        {c.name}
      </text>
    {/each}
    <line class="axis" x1={M.left} x2={W - M.right} y1={H - M.bottom} y2={H - M.bottom} />
  </svg>
  <p class="legend">
    {view === "dearest"
      ? "Varje stapel är en länstopp, inte en nationell topplista. Minst fem försäljningar krävs. Fastighetsbyrån/Svensk Mäklarstatistik."
      : "Samma mätmånad och bostadstyp. Centrala Stockholm ligger 1,7× centrala Göteborg och 3,0× centrala Malmö."}
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
    transition: height 0.7s cubic-bezier(0.25, 0.8, 0.35, 1), y 0.7s cubic-bezier(0.25, 0.8, 0.35, 1);
    stroke: var(--surface-1);
    stroke-width: 2;
  }
  .value {
    font-size: 13.5px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .value-sub {
    font-size: 10.5px;
    fill: var(--text-muted);
  }
  .legend {
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
    margin: 8px 0 0;
  }
</style>
