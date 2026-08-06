<script>
  // SCB's 2024 household categories are retained. The 12 percent outside
  // the displayed ownership and rental-apartment groups remain visible.
  let { data, view = "all" } = $props();

  const N = 100;
  const COLS = 10;
  const CELL = 34;
  const GAP = 5;
  const owners = $derived(data.tenure.ownedShownPct);
  const renters = $derived(data.tenure.rentalApartmentPct);
  const W = COLS * (CELL + GAP) - GAP;
  const grid = $derived(
    Array.from({ length: N }, (_, i) => ({
      i,
      x: (i % COLS) * (CELL + GAP),
      y: Math.floor(i / COLS) * (CELL + GAP),
      kind: i < owners ? "own" : i < owners + renters ? "rent" : "other",
    }))
  );
</script>

<figure class="chart">
  <figcaption>Sveriges hushåll som 100 rutor — boendeform (SCB, 2024)</figcaption>
  <svg
    viewBox="0 0 {W} {W + 84}"
    role="img"
    aria-label="Vaffeldiagram med 100 rutor som representerar Sveriges hushåll 2024: 59 bor i ägt småhus eller bostadsrätt i flerbostadshus, 29 i hyresrätt i flerbostadshus och 12 i andra boendeformer."
  >
    {#each grid as c (c.i)}
      <rect
        class="cell"
        class:own={c.kind === "own"}
        class:rent={c.kind === "rent"}
        class:other={c.kind === "other"}
        class:neutral={view === "all"}
        class:dim={view === "rent" && c.kind !== "rent"}
        x={c.x}
        y={c.y}
        width={CELL}
        height={CELL}
        rx="6"
      />
    {/each}
    {#if view !== "all"}
      <g class="lbl">
        <rect class="chip own-chip" x="0" y={W + 14} width="16" height="16" rx="4" />
        <text x="24" y={W + 27}>Ägt småhus/bostadsrätt — {owners}</text>
      </g>
      <g class="lbl">
        <rect class="chip rent-chip" x="0" y={W + 40} width="16" height="16" rx="4" />
        <text x="24" y={W + 53}>Hyresrätt i flerbostadshus — {renters}</text>
      </g>
      <g class="lbl other-lbl">
        <rect class="chip other-chip" x={W - 108} y={W + 40} width="16" height="16" rx="4" />
        <text x={W - 84} y={W + 53}>Övriga — {100 - owners - renters}</text>
      </g>
    {:else}
      <text class="lbl-neutral" x="0" y={W + 27}>100 rutor. Alla ska bo någonstans.</text>
    {/if}
  </svg>
  <p class="legend">
    {#if view === "rent"}
      Hyresgäster lägger en median på <strong>27 %</strong> av sin disponibla inkomst på
      boendet, mot 21 % i bostadsrätt och 18 % i ägt småhus (SCB, 2024).
    {:else if view === "split"}
      38 % bor i ägt småhus och 21 % i bostadsrätt i flerbostadshus; 29 % i
      hyresrätt i flerbostadshus och 12 % i övriga boendeformer.
    {:else}
      I Monopol får alla spelare lika mycket av banken innan partiet börjar.
      Här används det som en liknelse. Statistiken visar hur hushållen bor.
    {/if}
  </p>
</figure>

<style>
  .chart { margin: 0; width: min(440px, 100%); }
  figcaption { font-size: 13.5px; font-weight: 600; color: var(--text-secondary); margin-bottom: 10px; }
  svg { width: 100%; height: auto; display: block; }
  .cell { fill: var(--gridline); stroke: var(--surface-1); stroke-width: 2; transition: fill 0.5s ease, opacity 0.4s ease; }
  .cell.own { fill: var(--series-blue); }
  .cell.rent { fill: var(--series-amber); }
  .cell.other { fill: var(--baseline); }
  .cell.neutral { fill: var(--gridline); }
  .cell.dim { opacity: 0.22; }
  .lbl text { font-size: 12.5px; font-weight: 700; fill: var(--text-secondary); }
  .chip.own-chip { fill: var(--series-blue); }
  .chip.rent-chip { fill: var(--series-amber); }
  .chip.other-chip { fill: var(--baseline); }
  .lbl-neutral { font-size: 13.5px; fill: var(--text-muted); }
  .legend { font-size: 12px; line-height: 1.5; color: var(--text-muted); margin: 8px 0 0; }
</style>
