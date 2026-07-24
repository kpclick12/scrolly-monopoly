<script>
  // 100 squares = Sweden's households. In Monopol every player starts with
  // 1 500 kr from the bank; in the Swedish game a third of the households
  // never got a square at all. Two fixed hues (owner blue, renter amber),
  // always direct-labeled — the waffle is never color-alone.
  let { data, view = "all" } = $props();

  const N = 100;
  const COLS = 10;
  const CELL = 34;
  const GAP = 5;
  const owners = $derived(data.tenure.ownPct);
  const W = COLS * (CELL + GAP) - GAP;
  const grid = $derived(
    Array.from({ length: N }, (_, i) => ({
      // Fill owners from the top-left, renters from where they end — the
      // reading order mirrors the queue: the last third never gets in.
      i,
      x: (i % COLS) * (CELL + GAP),
      y: Math.floor(i / COLS) * (CELL + GAP),
      owner: i < owners,
    }))
  );
  const fmt = (n) => n.toLocaleString("sv-SE");
</script>

<figure class="chart">
  <figcaption>Sveriges hushåll som 100 rutor — vilka äger sitt boende?</figcaption>
  <svg
    viewBox="0 0 {W} {W + 58}"
    role="img"
    aria-label="Vaffeldiagram med 100 rutor som representerar Sveriges hushåll: ungefär 66 äger sin bostad (villa eller bostadsrätt), 34 hyr. I läget kostnader visas att hyresgäster lägger 27 procent av inkomsten på boendet mot 18 procent för villaägare."
  >
    {#each grid as c (c.i)}
      <rect
        class="cell"
        class:own={c.owner}
        class:neutral={view === "all"}
        class:dim={view === "rent" && c.owner}
        x={c.x}
        y={c.y}
        width={CELL}
        height={CELL}
        rx="6"
      />
    {/each}
    {#if view !== "all"}
      <g class="lbl own-lbl">
        <rect class="chip own-chip" x="0" y={W + 14} width="16" height="16" rx="4" />
        <text x="24" y={W + 27}>Äger — {owners} hushåll av 100</text>
      </g>
      <g class="lbl rent-lbl">
        <rect class="chip rent-chip" x={W / 2 + 30} y={W + 14} width="16" height="16" rx="4" />
        <text x={W / 2 + 54} y={W + 27}>Hyr — {100 - owners}</text>
      </g>
    {:else}
      <text class="lbl-neutral" x="0" y={W + 27}>100 rutor. Alla ska bo någonstans.</text>
    {/if}
  </svg>
  <p class="legend">
    {#if view === "rent"}
      Hyresgästerna lägger i snitt <strong>27 %</strong> av sin disponibla inkomst på boendet —
      mot 21 % i bostadsrätt och 18 % i ägt småhus. Och inte en krona av de trettio årens
      värdestegring landade hos dem.
    {:else if view === "split"}
      Ungefär två tredjedelar av hushållen äger sitt boende (villa eller bostadsrätt),
      en tredjedel hyr (SCB, 2024).
    {:else}
      I Monopol får varje spelare {fmt(data.startCapital)} kr av banken innan partiet börjar.
      Den regeln fanns aldrig i det svenska spelet.
    {/if}
  </p>
</figure>

<style>
  .chart {
    margin: 0;
    width: min(440px, 100%);
  }
  figcaption {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 10px;
  }
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .cell {
    fill: var(--series-amber);
    stroke: var(--surface-1);
    stroke-width: 2;
    transition: fill 0.5s ease, opacity 0.4s ease;
  }
  .cell.own {
    fill: var(--series-blue);
  }
  .cell.neutral {
    fill: var(--gridline);
  }
  .cell.dim {
    opacity: 0.22;
  }
  .lbl text {
    font-size: 13.5px;
    font-weight: 700;
    fill: var(--text-secondary);
  }
  .chip.own-chip {
    fill: var(--series-blue);
  }
  .chip.rent-chip {
    fill: var(--series-amber);
  }
  .lbl-neutral {
    font-size: 13.5px;
    fill: var(--text-muted);
  }
  .legend {
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-muted);
    margin: 8px 0 0;
  }
</style>
