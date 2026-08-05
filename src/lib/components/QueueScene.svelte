<script>
  import { scaleLinear } from "d3-scale";

  // Average queue times for homes actually allocated in 2025. They do not
  // measure how long today's average registered person has left to wait.
  let { data } = $props();

  const W = 620;
  const H = 306;
  const q = $derived(data.queue);
  const fmt = (n) => n.toLocaleString("sv-SE");

  // Years → x. The markers are observed averages for allocated homes.
  const X0 = 118;
  const X1 = 578;
  const x = scaleLinear([0, 14], [X0, X1]);
  const QY = 168; // the queue's baseline

  // One pawn every ~7 months of waiting keeps the line dense enough to
  // read as a crowd but never as noise. The two highlighted years get
  // their pawn drawn separately, bigger.
  const AVG = $derived(q.avgYears);
  const CITY = $derived(q.stockholmCityYears);
  const pawns = $derived(Array.from({ length: 31 }, (_, i) => {
    const yr = 0.25 + (i * 14) / 31;
    return { id: i, yr, x: x(yr) };
  }).filter((p) => Math.abs(p.yr - AVG) > 0.32 && Math.abs(p.yr - CITY) > 0.32));
</script>

<figure class="chart">
  <figcaption>Kötid för vanliga hyresrätter som förmedlades under 2025</figcaption>
  <svg
    viewBox="0 0 {W} {H}"
    role="img"
    aria-label="Tidsaxel för vanliga hyresrätter som förmedlades under 2025: den genomsnittliga kötiden var 9 år och i Stockholms kommun 12,4 år. 894 592 personer var registrerade den 31 december 2025."
  >
    <!-- the door: one rental contract, at year zero -->
    <g transform="translate(64 {QY - 22})">
      <text class="door-lbl" x="0" y="-76" text-anchor="middle">Hyreskontrakt</text>
      <rect x="-30" y="-64" width="60" height="92" rx="6" class="door" />
      <rect x="-19" y="-46" width="38" height="74" rx="4" class="door-leaf" />
      <circle cx="10" cy="-5" r="3" class="door-knob" />
    </g>

    <!-- the queue itself, standing on the year axis -->
    {#each pawns as p (p.id)}
      <g class="pawn" transform="translate({p.x} {QY})">
        <circle cx="0" cy="-17.5" r="5.2" />
        <path d="M -6.2 0 C -6.2 -11 6.2 -11 6.2 0 Z" />
      </g>
    {/each}

    <!-- the average queuer -->
    <g class="mark avg" transform="translate({x(AVG)} {QY})">
      <line y1="-58" y2="-30" />
      <circle cx="0" cy="-19.5" r="6" class="head" />
      <path d="M -7.4 0 C -7.4 -12.5 7.4 -12.5 7.4 0 Z" class="body" />
      <text y="-96" text-anchor="middle">Alla förmedlade</text>
      <text class="strong" y="-80" text-anchor="middle">9,0 års kötid</text>
    </g>

    <!-- Stockholm municipality -->
    <g class="mark inner" transform="translate({x(CITY)} {QY})">
      <line y1="-36" y2="-30" />
      <circle cx="0" cy="-19.5" r="6" class="head" />
      <path d="M -7.4 0 C -7.4 -12.5 7.4 -12.5 7.4 0 Z" class="body" />
      <text y="-58" text-anchor="end" x="8">Stockholms kommun</text>
      <text class="strong" y="-42" text-anchor="end" x="8">12,4 års kötid</text>
    </g>

    <!-- year axis = the floor the queue stands on -->
    <line class="axis" x1={X0 - 26} x2={X1 + 14} y1={QY + 2} y2={QY + 2} />
    {#each [0, 3, 6, 9, 12] as yr}
      <line class="rt" x1={x(yr)} x2={x(yr)} y1={QY + 2} y2={QY + 9} />
      <text class="rt-lbl" x={x(yr)} y={QY + 26} text-anchor="middle">{yr} år</text>
    {/each}

    <text class="big" x={X0 - 26} y={QY + 76}>{fmt(q.registered)}</text>
    <text class="big-lbl" x={X0 + 166} y={QY + 76}>personer stod i kön {q.asOf}</text>
    <text class="big-sub" x={X0 - 26} y={QY + 100}>— fler än det bor i hela Göteborg</text>
  </svg>
  <p class="legend">
    Bostadsförmedlingen i Stockholm: vanliga hyresrätter som förmedlades under 2025
    krävde i genomsnitt 9,0 års kötid; i Stockholms kommun var snittet 12,4 år.
    Det är utfall för förmedlade bostäder, inte återstående väntetid för den som står i kön.
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
    font-size: 11.5px;
    font-weight: 700;
    fill: var(--ink-green);
  }
  .pawn circle,
  .pawn path {
    fill: var(--baseline);
  }
  .mark line {
    stroke: var(--baseline);
    stroke-width: 1.4;
    stroke-dasharray: 3 3;
  }
  .mark text {
    font-size: 12px;
    fill: var(--text-secondary);
  }
  .mark text.strong {
    font-size: 13px;
    font-weight: 700;
  }
  .mark.avg .head,
  .mark.avg .body {
    fill: var(--series-blue);
    stroke: var(--surface-1);
    stroke-width: 1.6;
  }
  .mark.avg text.strong {
    fill: var(--ink-blue);
  }
  .mark.inner .head,
  .mark.inner .body {
    fill: var(--series-red);
    stroke: var(--surface-1);
    stroke-width: 1.6;
  }
  .mark.inner text.strong {
    fill: var(--ink-red);
  }
  .axis {
    stroke: var(--baseline);
    stroke-width: 1.5;
  }
  .rt {
    stroke: var(--baseline);
    stroke-width: 1;
  }
  .rt-lbl {
    font-size: 11px;
    fill: var(--text-muted);
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
  .big-sub {
    font-size: 12.5px;
    fill: var(--text-muted);
    font-style: italic;
  }
  .legend {
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
    margin: 8px 0 0;
  }
</style>
