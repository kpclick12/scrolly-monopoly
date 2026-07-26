<script>
  import { scaleLinear } from "d3-scale";

  // "Avlöning 1 000 kr när du passerar GÅ" — but only if you own a square.
  // Two people, same year one of them buys: the owner's equity in a small
  // Södermalm one-roomer (value follows the real brf index, minus the
  // original loan) against a renter putting 1 500 kr/month in the bank.
  // Neither does anything clever. That gap is bostadskarriärens motor.
  let { data, step = 0 } = $props();

  const W = 620;
  const H = 420;
  const M = { top: 34, right: 116, bottom: 40, left: 56 };

  const BUY_YEAR = 1999;
  const FLAT_PRICE = 500000; // etta på Söder, 1999
  const LOAN = 450000; // 90 % belåning, aldrig amorterad — spelets regler
  const SAVE_PER_YEAR = 18000; // 1 500 kr/mån på sparkonto

  const years = $derived(data.years.filter((d) => d.year >= BUY_YEAR - 1));
  const idxAt = (list, yr) => {
    // Linear interpolation on the sparse index series.
    for (let i = 0; i < list.length - 1; i++) {
      const a = list[i];
      const b = list[i + 1];
      if (yr >= a.year && yr <= b.year) {
        const k = (yr - a.year) / (b.year - a.year || 1);
        return a.brf + (b.brf - a.brf) * k;
      }
    }
    return list[list.length - 1].brf;
  };
  const baseIdx = $derived(idxAt(data.years, BUY_YEAR));

  const series = $derived(
    Array.from({ length: 2025 - BUY_YEAR + 1 }, (_, i) => {
      const year = BUY_YEAR + i;
      return {
        year,
        equity: (FLAT_PRICE * idxAt(data.years, year)) / baseIdx - LOAN,
        saved: 50000 + SAVE_PER_YEAR * i,
      };
    })
  );

  const x = $derived(scaleLinear([BUY_YEAR, 2025], [M.left, W - M.right]));
  const y = $derived(scaleLinear([0, 2400000], [H - M.bottom, M.top]));
  const path = (key) =>
    series.map((d, i) => `${i ? "L" : "M"}${x(d.year).toFixed(1)},${y(Math.max(0, d[key])).toFixed(1)}`).join("");
  const eqPath = $derived(path("equity"));
  const savePath = $derived(path("saved"));
  const lastPt = $derived(series[series.length - 1]);
  const fmtM = (n) => `${(n / 1000000).toLocaleString("sv-SE", { maximumFractionDigits: 1 })} Mkr`;
</script>

<figure class="chart">
  <figcaption>
    Räkneexempel 1999–2025: en köper en etta, en sparar på konto
  </figcaption>
  <p class="key" aria-hidden="true">
    <span><i class="sw sw-blue"></i>Ägarens eget kapital i ettan</span>
    <span><i class="sw sw-amber"></i>Spararens konto, 1 500 kr/mån</span>
  </p>
  <svg
    viewBox="0 0 {W} {H}"
    role="img"
    aria-label="Linjediagram 1999 till 2025: ägarens eget kapital i en etta köpt för 500 000 kronor växer till cirka 2,2 miljoner, medan spararens konto med 1 500 kronor i månaden når knappt en halv miljon."
  >
    {#each [0, 500000, 1000000, 1500000, 2000000] as tick}
      <line class="grid" x1={M.left} x2={W - M.right} y1={y(tick)} y2={y(tick)} />
      <text class="tick" x={M.left - 8} y={y(tick) + 4} text-anchor="end">{tick / 1000000} M</text>
    {/each}
    {#each [2000, 2010, 2020] as tick}
      <text class="tick" x={x(tick)} y={H - M.bottom + 20} text-anchor="middle">{tick}</text>
    {/each}

    <path class="traj save" d={savePath} />
    <path class="traj eq" d={eqPath} />
    <circle class="dot eq-dot" cx={x(lastPt.year)} cy={y(lastPt.equity)} r="4.5" />
    <circle class="dot save-dot" cx={x(lastPt.year)} cy={y(lastPt.saved)} r="4.5" />
    <text class="serie eq-ink" x={x(lastPt.year) + 10} y={y(lastPt.equity) + 4}>≈{fmtM(lastPt.equity)}</text>
    <text class="serie save-ink" x={x(lastPt.year) + 10} y={y(lastPt.saved) + 4}>≈{fmtM(lastPt.saved)}</text>

    {#if step >= 1}
      <g class="ga-note">
        <text class="ga-text" x={x(2011)} y={y(1450000)} text-anchor="middle">Varje varv runt GÅ:</text>
        <text class="ga-text strong" x={x(2011)} y={y(1310000)} text-anchor="middle">värdestegring utan en enda insats</text>
      </g>
    {/if}
    <line class="axis" x1={M.left} x2={W - M.right} y1={H - M.bottom} y2={H - M.bottom} />
  </svg>
  <p class="legend">
    Räkneexempel: etta köpt 1999 för 500 000 kr med 450 000 kr i lån (aldrig amorterat),
    värdet följer det verkliga bostadsrättsindexet. Ingen hänsyn till räntor, hyra eller avgifter —
    poängen är mekanismen, inte kronorna.
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
  .traj {
    fill: none;
    stroke-width: 2.4;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
  .eq {
    stroke: var(--series-blue);
  }
  .save {
    stroke: var(--series-amber);
  }
  .dot {
    stroke: var(--surface-1);
    stroke-width: 2;
  }
  .eq-dot { fill: var(--series-blue); }
  .save-dot { fill: var(--series-amber); }
  .serie {
    font-size: 12.5px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .eq-ink { fill: var(--ink-blue); }
  .save-ink { fill: var(--ink-amber); }
  .ga-text {
    font-size: 13px;
    fill: var(--text-secondary);
  }
  .ga-text.strong {
    font-weight: 700;
    fill: var(--ink-blue);
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
  .sw-amber { background: var(--series-amber); }
  .legend {
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
    margin: 8px 0 0;
  }
</style>
