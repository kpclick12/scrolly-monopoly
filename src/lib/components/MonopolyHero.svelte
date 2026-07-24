<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  // Scroll-driven 3D prologue: one Monopol board, played through seventy
  // years in a single camera move. One eased value drives everything —
  // `game` in [0,1], following the reader's scroll — so scrubbing the
  // scrollbar scrubs the game:
  //   0.00–0.20  the board on the table, the top hat waits on GÅ
  //   0.20–0.50  the game is played — houses sprout street by street
  //   0.50–0.62  houses trade up to hotels
  //   0.62–0.90  the reveal: the color groups extrude into towers, each
  //              tower's height the street's REAL kr/kvm today — the flat
  //              spelplan becomes a price skyline
  //   0.90–1.00  hand-over card to Act One
  // All geometry is procedural — no model files, only canvas textures.

  let { groups = [] } = $props();

  let wrap;
  let canvas;
  let cardEls = [];
  let chipEls = [];
  let webglFailed = $state(false);

  // Two cards only: the title, and a single line that hands over to Act One.
  const cards = [
    {
      band: [0.0, 0.16],
      eyebrow: "En visuell berättelse om den svenska fastighetsmarknaden",
      title: "Spelplanen har förändrats",
      hint: true,
    },
    {
      band: [0.9, 1.01],
      body:
        "På brädet kostar Hornsgatan 60 kronor och Norrmalmstorg 400. I trettio år har " +
        "Sverige spelat spelet på riktigt — tills gatorna växte till torn av pengar, " +
        "skatterutorna plockades bort och banken alltid sa ja. Det här är historien om det partiet.",
    },
  ];

  // Small stage labels, echoing what the board is doing at that moment.
  const chips = [
    { label: "Ett parti börjar: köp billigt, bygg hus", band: [0.24, 0.42] },
    { label: "Hus blir hotell", band: [0.5, 0.6] },
    { label: "…och så förändras spelplanen: gatorna blir torn av riktiga priser", band: [0.66, 0.8] },
    { label: "Strandvägen 2026: 168 360 kr/kvm — Sveriges dyraste gata", band: [0.8, 0.9] },
  ];

  function bandOpacity(p, [a, b]) {
    const fade = 0.05;
    if (p <= a - fade || p >= b + fade) return 0;
    if (p < a) return (p - (a - fade)) / fade;
    if (p > b) return (b + fade - p) / fade;
    return 1;
  }

  const smooth = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };

  onMount(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      webglFailed = true;
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#0a1a14", 18, 44);
    scene.background = new THREE.Color("#0a1a14");
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 80);

    // --- Light: a warm lamp over a game table. ---
    scene.add(new THREE.AmbientLight("#f2e9cf", 0.5));
    const lamp = new THREE.DirectionalLight("#fff3d8", 1.15);
    lamp.position.set(6, 12, 4);
    scene.add(lamp);
    const fill = new THREE.DirectionalLight("#9fd8c0", 0.25);
    fill.position.set(-8, 6, -6);
    scene.add(fill);

    // --- The table: deep felt, stretching past the fog. ---
    const felt = new THREE.Mesh(
      new THREE.CircleGeometry(40, 48),
      new THREE.MeshLambertMaterial({ color: "#12271e" })
    );
    felt.rotation.x = -Math.PI / 2;
    felt.position.y = -0.16;
    scene.add(felt);

    // --- Canvas-texture helper: all lettering on the board is drawn, not
    // loaded. ---
    function textTexture(w, h, draw) {
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      draw(c.getContext("2d"));
      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = 4;
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    // --- The board slab. ---
    const B = 5.5; // half side
    const boardTop = 0.09;
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(B * 2 + 0.5, 0.18, B * 2 + 0.5),
      new THREE.MeshLambertMaterial({ color: "#cfe0c3" })
    );
    scene.add(board);

    // Center banner: the red MONOPOL bar with the Swedish tagline, laid
    // diagonally like on the printed board.
    const banner = new THREE.Mesh(
      new THREE.PlaneGeometry(5.6, 1.5),
      new THREE.MeshLambertMaterial({
        transparent: true,
        map: textTexture(1024, 275, (g) => {
          g.fillStyle = "#d93a2b";
          g.beginPath();
          g.roundRect(0, 60, 1024, 150, 14);
          g.fill();
          g.fillStyle = "#ffffff";
          g.font = "900 108px Georgia, serif";
          g.textAlign = "center";
          g.textBaseline = "middle";
          g.fillText("MONOPOL", 512, 140);
          g.fillStyle = "#24211a";
          g.font = "700 34px Georgia, serif";
          g.fillText("SPELET DÄR DU GÖR SNABBA FASTIGHETSAFFÄRER", 512, 250);
        }),
      })
    );
    banner.rotation.x = -Math.PI / 2;
    banner.rotation.z = Math.PI / 4;
    banner.position.y = boardTop + 0.012;
    scene.add(banner);

    // The two card piles in the middle — Chans and Allmänning.
    const cardPile = (color, label, x, z, rot) => {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.05, 1.0),
        new THREE.MeshLambertMaterial({ color })
      );
      m.position.set(x, boardTop + 0.025, z);
      m.rotation.y = rot;
      scene.add(m);
      const lbl = new THREE.Mesh(
        new THREE.PlaneGeometry(1.3, 0.5),
        new THREE.MeshLambertMaterial({
          transparent: true,
          map: textTexture(256, 100, (g) => {
            g.fillStyle = "#24211a";
            g.font = "900 56px Georgia, serif";
            g.textAlign = "center";
            g.textBaseline = "middle";
            g.fillText(label, 128, 54);
          }),
        })
      );
      lbl.rotation.x = -Math.PI / 2;
      lbl.rotation.z = rot;
      lbl.position.set(x, boardTop + 0.055, z);
      scene.add(lbl);
    };
    cardPile("#e2882a", "?", 2.1, -2.1, Math.PI / 4);
    cardPile("#9ecbe8", "?", -2.1, 2.1, Math.PI / 4);

    // --- The 40 squares. Each side: a big corner + 9 street-sized tiles.
    // Group layout follows the Swedish board going anti-clockwise from GÅ
    // (bottom-right corner): bruna och ljusblå first, mörkblå last. ---
    const CSS = getComputedStyle(document.documentElement);
    const groupHex = (id) => CSS.getPropertyValue(`--grp-${id}`).trim() || "#888888";
    const sides = [
      // slot index 0..8 walking away from the leading corner
      ["brown", null, "brown", null, null, "lightblue", null, "lightblue", "lightblue"],
      ["pink", null, "pink", "pink", null, "orange", null, "orange", "orange"],
      ["red", null, "red", "red", null, "yellow", "yellow", null, "yellow"],
      ["green", "green", null, "green", null, null, "darkblue", null, "darkblue"],
    ];
    const CORNER = 1.55;
    const SW = (B * 2 - CORNER * 2) / 9; // street width
    const tileMat = new THREE.MeshLambertMaterial({ color: "#e7efdc" });
    const tileGeom = new THREE.BoxGeometry(SW * 0.94, 0.03, CORNER * 0.96);
    const stripGeom = new THREE.BoxGeometry(SW * 0.94, 0.05, 0.36);
    const stripMats = {};
    for (const s of sides.flat()) {
      if (s && !stripMats[s]) stripMats[s] = new THREE.MeshLambertMaterial({ color: groupHex(s) });
    }

    // Walk the four sides; collect one anchor tile per group for the
    // tower reveal, and a list of street tiles for the houses.
    const towerAnchor = {}; // group id -> {x, z}
    const streetTiles = []; // {x, z, group, rotY}
    const sideTransforms = [
      // [rotY, tileCenter(slot) -> x,z] — bottom, left, top, right
      (d) => ({ x: B - CORNER - SW * (d + 0.5), z: B - CORNER / 2, rotY: 0 }),
      (d) => ({ x: -B + CORNER / 2, z: B - CORNER - SW * (d + 0.5), rotY: Math.PI / 2 }),
      (d) => ({ x: -B + CORNER + SW * (d + 0.5), z: -B + CORNER / 2, rotY: 0 }),
      (d) => ({ x: B - CORNER / 2, z: -B + CORNER + SW * (d + 0.5), rotY: Math.PI / 2 }),
    ];
    sides.forEach((slots, si) => {
      slots.forEach((grp, d) => {
        const { x, z, rotY } = sideTransforms[si](d);
        const tile = new THREE.Mesh(tileGeom, tileMat);
        tile.position.set(x, boardTop + 0.015, z);
        tile.rotation.y = rotY;
        scene.add(tile);
        if (grp) {
          const strip = new THREE.Mesh(stripGeom, stripMats[grp]);
          // The color band sits on the tile's inner edge, facing the middle.
          const inX = si === 1 ? 1 : si === 3 ? -1 : 0;
          const inZ = si === 0 ? -1 : si === 2 ? 1 : 0;
          strip.position.set(x + inX * (CORNER / 2 - 0.24), boardTop + 0.04, z + inZ * (CORNER / 2 - 0.24));
          strip.rotation.y = rotY;
          scene.add(strip);
          streetTiles.push({ x, z, group: grp, rotY });
          if (!towerAnchor[grp]) towerAnchor[grp] = { x, z };
        }
      });
    });

    // GÅ corner: the red arrow and lettering, rotated diagonally like the
    // printed square.
    const gaTile = new THREE.Mesh(
      new THREE.PlaneGeometry(CORNER * 0.94, CORNER * 0.94),
      new THREE.MeshLambertMaterial({
        transparent: true,
        map: textTexture(256, 256, (g) => {
          g.translate(128, 128);
          g.rotate(-Math.PI / 4);
          g.fillStyle = "#d93a2b";
          g.font = "900 92px Georgia, serif";
          g.textAlign = "center";
          g.textBaseline = "middle";
          g.fillText("GÅ", 0, -18);
          g.beginPath();
          g.moveTo(-56, 56);
          g.lineTo(40, 56);
          g.lineTo(40, 40);
          g.lineTo(72, 66);
          g.lineTo(40, 92);
          g.lineTo(40, 76);
          g.lineTo(-56, 76);
          g.closePath();
          g.fill();
        }),
      })
    );
    gaTile.rotation.x = -Math.PI / 2;
    gaTile.position.set(B - CORNER / 2, boardTop + 0.02, B - CORNER / 2);
    scene.add(gaTile);

    // --- The top hat token, waiting on GÅ. ---
    const hat = new THREE.Group();
    const hatMat = new THREE.MeshStandardMaterial({ color: "#2c2c34", metalness: 0.7, roughness: 0.35 });
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 24), hatMat);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.42, 24), hatMat);
    crown.position.y = 0.23;
    hat.add(brim, crown);
    hat.position.set(B - CORNER / 2, boardTop + 0.05, B - CORNER / 2);
    scene.add(hat);

    // --- Dice: two pip-textured cubes resting mid-board. ---
    function dieFace(n) {
      return textTexture(128, 128, (g) => {
        g.fillStyle = "#f8f6ee";
        g.beginPath();
        g.roundRect(0, 0, 128, 128, 26);
        g.fill();
        g.fillStyle = "#24211a";
        const P = { 1: [[64, 64]], 2: [[38, 38], [90, 90]], 3: [[34, 34], [64, 64], [94, 94]], 4: [[38, 38], [90, 38], [38, 90], [90, 90]], 5: [[36, 36], [92, 36], [64, 64], [36, 92], [92, 92]], 6: [[38, 32], [90, 32], [38, 64], [90, 64], [38, 96], [90, 96]] }[n];
        for (const [px, py] of P) {
          g.beginPath();
          g.arc(px, py, 11, 0, Math.PI * 2);
          g.fill();
        }
      });
    }
    const dieMats = [1, 6, 2, 5, 3, 4].map((n) => new THREE.MeshLambertMaterial({ map: dieFace(n), transparent: true }));
    const dice = [];
    for (const [dx, dz, ry] of [[0.5, 1.9, 0.4], [1.15, 2.3, -0.7]]) {
      const die = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), dieMats);
      die.position.set(dx, boardTop + 0.21, dz);
      die.rotation.y = ry;
      scene.add(die);
      dice.push(die);
    }

    // --- Houses and hotels. Small green pioneers first; through the mid
    // phase some streets trade four green houses for one red hotel — the
    // move every Monopol player knows as "bostadskarriären". ---
    const houseGeomBody = new THREE.BoxGeometry(0.2, 0.14, 0.2);
    const houseGeomRoof = new THREE.ConeGeometry(0.155, 0.13, 4);
    const hotelGeomBody = new THREE.BoxGeometry(0.34, 0.24, 0.26);
    const hotelGeomRoof = new THREE.ConeGeometry(0.24, 0.16, 4);
    const houseMat = new THREE.MeshLambertMaterial({ color: "#2f9e57" });
    const hotelMat = new THREE.MeshLambertMaterial({ color: "#d93a2b" });
    function building(body, roof, mat) {
      const grp = new THREE.Group();
      const b = new THREE.Mesh(body, mat);
      const r = new THREE.Mesh(roof, mat);
      r.position.y = body.parameters.height / 2 + roof.parameters.height / 2 - 0.01;
      r.rotation.y = Math.PI / 4;
      b.position.y = body.parameters.height / 2;
      grp.add(b, r);
      return grp;
    }
    // Each street tile hosts up to 3 houses in a row along its color strip;
    // `born` staggers their arrival across the play phase.
    const housesOnTiles = [];
    streetTiles.forEach((tile, ti) => {
      const along = tile.rotY === 0 ? [1, 0] : [0, 1]; // row direction (x or z)
      const n = 1 + ((ti * 7) % 3); // 1–3 houses, deterministic variety
      const tileHouses = { houses: [], hotel: null, born: 0.22 + (ti / streetTiles.length) * 0.24 };
      for (let h = 0; h < n; h++) {
        const m = building(houseGeomBody, houseGeomRoof, houseMat);
        const off = (h - (n - 1) / 2) * 0.28;
        m.position.set(tile.x + along[0] * off, boardTop + 0.05, tile.z + along[1] * off);
        m.scale.setScalar(0.001);
        scene.add(m);
        tileHouses.houses.push(m);
      }
      // Every third street upgrades to a hotel in the trade-up phase.
      if (ti % 3 === 1) {
        const hot = building(hotelGeomBody, hotelGeomRoof, hotelMat);
        hot.position.set(tile.x, boardTop + 0.05, tile.z);
        hot.scale.setScalar(0.001);
        scene.add(hot);
        tileHouses.hotel = hot;
      }
      housesOnTiles.push(tileHouses);
    });

    // --- The towers: one per color group, height = the street's REAL price
    // per m² today. This is the "spelplanen har förändrats" reveal — the
    // board's own colors, extruded to 2026 scale. ---
    const maxReal = Math.max(...groups.map((g) => g.realToday));
    const towers = groups
      .filter((g) => towerAnchor[g.id])
      .map((g) => {
        const h = 0.5 + (g.realToday / maxReal) * 4.6;
        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.62, 1, 0.62),
          new THREE.MeshLambertMaterial({ color: groupHex(g.id), emissive: groupHex(g.id), emissiveIntensity: 0.12 })
        );
        const { x, z } = towerAnchor[g.id];
        mesh.position.set(x, boardTop, z);
        mesh.scale.y = 0.001;
        scene.add(mesh);
        // A cream cap so each tower reads as a price column, not a block.
        const cap = new THREE.Mesh(
          new THREE.BoxGeometry(0.68, 0.06, 0.68),
          new THREE.MeshLambertMaterial({ color: "#f2e9cf" })
        );
        cap.position.set(x, boardTop, z);
        scene.add(cap);
        return { mesh, cap, h, delay: g.realToday === maxReal ? 0.1 : (1 - g.realToday / maxReal) * 0.06 };
      });

    // --- Scroll → game progress ---
    let targetGame = 0;
    let game = 0;
    function onScroll() {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      targetGame = Math.min(1, Math.max(0, -rect.top / total));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function resize() {
      const w = wrap.clientWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(wrap);

    const clock = new THREE.Clock();
    let elapsed = 0;
    let raf;
    const camPos = new THREE.Vector3();
    const lookAt = new THREE.Vector3();

    // Camera keyframes: low over GÅ → a slow half-orbit at table height →
    // rising crane shot as the towers grow.
    const KEY = [
      { t: 0.0, pos: [7.4, 2.4, 8.4], look: [0, 0.4, 0] },
      { t: 0.3, pos: [9.2, 4.4, 2.2], look: [0, 0.2, 0] },
      { t: 0.62, pos: [4.0, 6.4, -8.6], look: [0, 0.6, 0] },
      { t: 1.0, pos: [-7.8, 9.4, 8.8], look: [0, 1.8, 0] },
    ];
    function cameraAt(p) {
      let i = 0;
      while (i < KEY.length - 2 && p > KEY[i + 1].t) i++;
      const a = KEY[i];
      const b = KEY[i + 1];
      const k = smooth(a.t, b.t, p);
      camPos.fromArray(a.pos).lerp(new THREE.Vector3().fromArray(b.pos), k);
      lookAt.fromArray(a.look).lerp(new THREE.Vector3().fromArray(b.look), k);
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible || document.hidden) return;
      elapsed += dt * (reduceMotion ? 0.15 : 1);
      game += (targetGame - game) * Math.min(1, dt * 5);
      const P = game;
      const t = elapsed;

      // Houses pop street by street through the play phase.
      for (const th of housesOnTiles) {
        const grow = smooth(th.born, th.born + 0.06, P);
        // In the trade-up phase, hotel streets swap: houses shrink away as
        // the hotel rises.
        const toHotel = th.hotel ? smooth(0.5, 0.6, P) : 0;
        const houseScale = Math.max(0.001, grow * (1 - toHotel));
        for (const m of th.houses) m.scale.setScalar(houseScale);
        if (th.hotel) th.hotel.scale.setScalar(Math.max(0.001, toHotel));
      }

      // Tower reveal — the strips rise into the 2026 skyline.
      for (const tw of towers) {
        const rise = smooth(0.64 + tw.delay, 0.82 + tw.delay, P);
        const h = Math.max(0.001, tw.h * rise);
        tw.mesh.scale.y = h;
        tw.mesh.position.y = boardTop + h / 2;
        tw.cap.position.y = boardTop + h + 0.03;
        tw.cap.visible = rise > 0.02;
      }

      // The hat idles with tiny life; the dice breathe in place.
      hat.position.y = boardTop + 0.05 + Math.sin(t * 1.4) * 0.015;
      hat.rotation.y = Math.sin(t * 0.5) * 0.15;
      dice[0].rotation.y = 0.4 + Math.sin(t * 0.7) * 0.06;
      dice[1].rotation.y = -0.7 + Math.cos(t * 0.6) * 0.06;

      // Camera along the keyframed crane path, with a breath of drift so a
      // stationary reader still sees a living scene.
      cameraAt(P);
      camPos.x += Math.sin(t * 0.24) * 0.12;
      camPos.y += Math.sin(t * 0.31) * 0.06;
      camera.position.copy(camPos);
      camera.lookAt(lookAt);

      // HTML overlay opacities follow the same scroll value.
      cards.forEach((c, i) => {
        const el = cardEls[i];
        if (!el) return;
        const o = bandOpacity(P, c.band);
        el.style.opacity = o;
        el.style.visibility = o > 0.01 ? "visible" : "hidden";
      });
      chips.forEach((c, i) => {
        const el = chipEls[i];
        if (!el) return;
        const o = bandOpacity(P, c.band);
        el.style.opacity = o;
        el.style.visibility = o > 0.01 ? "visible" : "hidden";
      });

      renderer.render(scene, camera);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      io.disconnect();
      renderer.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
            if (m.map) m.map.dispose();
            m.dispose();
          }
        }
      });
    };
  });
</script>

<div class="hero" bind:this={wrap} aria-label="3D-scen: ett Monopolbräde där husen växer och gatorna till slut reser sig som torn i höjd med dagens verkliga kvadratmeterpriser.">
  <div class="hero-sticky">
    {#if webglFailed}
      <div class="hero-fallback">
        <p class="fb-eyebrow">En visuell berättelse om den svenska fastighetsmarknaden</p>
        <h1>Spelplanen har förändrats</h1>
        <p class="fb-body">
          På brädet kostar Hornsgatan 60 kronor och Norrmalmstorg 400. I trettio år har
          Sverige spelat spelet på riktigt. Det här är historien om det partiet.
        </p>
      </div>
    {:else}
      <canvas bind:this={canvas}></canvas>
      {#each cards as card, i}
        <div class="hero-card" bind:this={cardEls[i]}>
          {#if card.eyebrow}<p class="card-eyebrow">{card.eyebrow}</p>{/if}
          {#if card.title}<h1>{card.title}</h1>{/if}
          {#if card.body}<p class="card-body">{card.body}</p>{/if}
          {#if card.hint}
            <p class="scroll-hint" aria-hidden="true">Scrolla för att kasta tärningarna <span>↓</span></p>
          {/if}
        </div>
      {/each}
      {#each chips as chip, i}
        <p class="hero-chip" bind:this={chipEls[i]}>{chip.label}</p>
      {/each}
    {/if}
  </div>
</div>

<style>
  .hero {
    height: 380svh;
    position: relative;
    background: var(--felt-deep);
  }
  .hero-sticky {
    position: sticky;
    top: 0;
    height: 100svh;
    overflow: hidden;
  }
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  .hero-card {
    position: absolute;
    left: 50%;
    top: 14%;
    transform: translateX(-50%);
    width: min(660px, calc(100% - 48px));
    text-align: center;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  .card-eyebrow {
    color: var(--mono-cream);
    font-size: 13px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 14px;
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.6);
  }
  .hero-card h1 {
    font-family: var(--serif);
    font-size: clamp(40px, 7vw, 74px);
    line-height: 1.03;
    color: #ffffff;
    margin: 0 0 18px;
    text-shadow: 0 2px 24px rgba(0, 0, 0, 0.65);
  }
  .card-body {
    color: rgba(255, 255, 255, 0.94);
    font-size: clamp(16px, 2.2vw, 19px);
    line-height: 1.6;
    text-shadow: 0 1px 12px rgba(0, 0, 0, 0.75);
    background: rgba(10, 26, 20, 0.45);
    border-radius: 10px;
    padding: 18px 22px;
  }
  .scroll-hint {
    margin-top: 26px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 14px;
    letter-spacing: 0.08em;
  }
  .scroll-hint span {
    display: inline-block;
    animation: bob 1.6s ease-in-out infinite;
  }
  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
  .hero-chip {
    position: absolute;
    left: 50%;
    bottom: 9%;
    transform: translateX(-50%);
    max-width: min(560px, calc(100% - 48px));
    text-align: center;
    color: var(--mono-cream);
    background: rgba(10, 26, 20, 0.62);
    border: 1px solid rgba(242, 233, 207, 0.25);
    border-radius: 999px;
    padding: 9px 20px;
    font-size: 14.5px;
    line-height: 1.45;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  .hero-fallback {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    background: radial-gradient(120% 90% at 50% 10%, var(--felt) 0%, var(--felt-deep) 100%);
  }
  .fb-eyebrow {
    color: var(--mono-cream);
    font-size: 13px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 14px;
  }
  .hero-fallback h1 {
    font-family: var(--serif);
    font-size: clamp(38px, 7vw, 70px);
    color: #ffffff;
    margin: 0 0 16px;
  }
  .fb-body {
    color: rgba(255, 255, 255, 0.9);
    max-width: 560px;
    line-height: 1.6;
  }
</style>
