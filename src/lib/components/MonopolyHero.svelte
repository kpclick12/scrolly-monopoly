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

  let { groups = [], gaBonus = 4000 } = $props();

  let wrap;
  let canvas = $state();
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
        "På brädet kostar Hornsgatan 1 000 kronor och Norrmalmstorg 8 000. Monopol används " +
        "här som en bild för att följa förändringar i bostadspriser, regler och villkor.",
    },
  ];

  // Small stage labels, echoing what the board is doing at that moment.
  const chips = [
    { label: "På brädet: köp gator och bygg hus", band: [0.24, 0.42] },
    { label: "Hus blir hotell", band: [0.5, 0.6] },
    { label: "Visualiseringen byter skala: gatorna blir staplar för nutida kvadratmeterpriser", band: [0.66, 0.8] },
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

    // Contact shadow: one radial-gradient sprite under the board. A real
    // shadow map would cost a second render pass every frame; this is a
    // single texture drawn once and it does the same job of sitting the
    // board on the table instead of letting it float.
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshBasicMaterial({
        transparent: true,
        depthWrite: false,
        opacity: 0.55,
        map: (() => {
          const c = document.createElement("canvas");
          c.width = c.height = 256;
          const g = c.getContext("2d");
          const rg = g.createRadialGradient(128, 128, 40, 128, 128, 126);
          rg.addColorStop(0, "rgba(0,0,0,0.85)");
          rg.addColorStop(0.55, "rgba(0,0,0,0.35)");
          rg.addColorStop(1, "rgba(0,0,0,0)");
          g.fillStyle = rg;
          g.fillRect(0, 0, 256, 256);
          return new THREE.CanvasTexture(c);
        })(),
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.14;
    scene.add(shadow);

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

    // --- The 40 squares of the 1937 board, with the real street names and
    // prices printed on them — read off the Åhlén & Åkerlunds board in
    // Nordiska museets samling. Each side runs from the leading corner:
    // bottom (right→left), left (bottom→top), top (left→right), right
    // (top→bottom), i.e. the direction of play.
    //
    // Every tile face is a canvas texture built ONCE here at startup. The
    // lettering therefore costs nothing per frame — the render loop only
    // moves the camera and a handful of transforms. ---
    const CSS = getComputedStyle(document.documentElement);
    const groupHex = (id) => CSS.getPropertyValue(`--grp-${id}`).trim() || "#888888";
    const LAYOUT = [
      [
        { n: "VÄSTERLÅNG-\nGATAN", p: 1000, grp: "brown" },
        { n: "ALLMÄNNING", t: "chest" },
        { n: "HORNS-\nGATAN", p: 1000, grp: "brown" },
        { n: "INKOMST-\nSKATT", t: "tax", sub: "BETALA\nKR.4000" },
        { n: "SÖDRA\nSTATION", p: 4000, t: "station" },
        { n: "FOLKUNGA-\nGATAN", p: 2000, grp: "lightblue" },
        { n: "CHANS", t: "chance" },
        { n: "GÖTGATAN", p: 2000, grp: "lightblue" },
        { n: "RINGVÄGEN", p: 2200, grp: "lightblue" },
      ],
      [
        { n: "S:T ERIKS-\nGATAN", p: 2500, grp: "pink" },
        { n: "ELVERKET", p: 3000, t: "utility" },
        { n: "ODENGATAN", p: 2500, grp: "pink" },
        { n: "VALHALLA-\nVÄGEN", p: 3000, grp: "pink" },
        { n: "ÖSTRA\nSTATION", p: 4000, t: "station" },
        { n: "STUREGATAN", p: 3500, grp: "orange" },
        { n: "ALLMÄNNING", t: "chest" },
        { n: "KARLAVÄGEN", p: 3500, grp: "orange" },
        { n: "NARVAVÄGEN", p: 3800, grp: "orange" },
      ],
      [
        { n: "STRAND-\nVÄGEN", p: 4200, grp: "red" },
        { n: "CHANS", t: "chance" },
        { n: "KUNGSTRÄD-\nGÅRDSGATAN", p: 4200, grp: "red" },
        { n: "HAMNGATAN", p: 4500, grp: "red" },
        { n: "CENTRAL\nSTATION", p: 4000, t: "station" },
        { n: "VASAGATAN", p: 5000, grp: "yellow" },
        { n: "KUNGSGATAN", p: 5000, grp: "yellow" },
        { n: "VATTENLED-\nNINGSVERKET", p: 3000, t: "utility" },
        { n: "STUREPLAN", p: 5300, grp: "yellow" },
      ],
      [
        { n: "GUSTAV\nADOLFS TORG", p: 6000, grp: "green" },
        { n: "DROTTNING-\nGATAN", p: 6000, grp: "green" },
        { n: "ALLMÄNNING", t: "chest" },
        { n: "DIPLOMAT-\nSTADEN", p: 6000, grp: "green" },
        { n: "NORRA\nSTATION", p: 4000, t: "station" },
        { n: "CHANS", t: "chance" },
        { n: "CENTRUM", p: 6500, grp: "darkblue" },
        { n: "EXTRA\nSKATT", t: "tax", sub: "BETALA\nKR.2000" },
        { n: "NORRMALMS-\nTORG", p: 8000, grp: "darkblue" },
      ],
    ];
    const CORNER = 1.55;
    const SW = (B * 2 - CORNER * 2) / 9; // street width
    const PAPER = "#f4f1e2";
    const INK = "#26241d";

    // One tile face. TW/TH are modest on purpose: 40 of these is the whole
    // texture budget of the scene, and the lettering only needs to hold up
    // at the closest camera pass.
    const TW = 192;
    const TH = 336;
    function drawLines(g, text, cx, y, lh) {
      text.split("\n").forEach((line, i) => g.fillText(line, cx, y + i * lh));
    }
    function tileTexture(sq) {
      return textTexture(TW, TH, (g) => {
        g.fillStyle = PAPER;
        g.fillRect(0, 0, TW, TH);
        g.strokeStyle = INK;
        g.lineWidth = 4;
        g.strokeRect(2, 2, TW - 4, TH - 4);
        g.textAlign = "center";
        g.textBaseline = "top";
        let top = 18;
        if (sq.grp) {
          // The colour band sits at the tile's inner edge, as on the board.
          g.fillStyle = groupHex(sq.grp);
          g.fillRect(4, 4, TW - 8, 84);
          g.strokeStyle = INK;
          g.lineWidth = 4;
          g.strokeRect(4, 4, TW - 8, 84);
          top = 104;
        }
        g.fillStyle = INK;
        if (sq.t === "chance") {
          g.font = "700 26px Georgia, serif";
          g.fillText("CHANS", TW / 2, 30);
          g.fillStyle = "#d93a2b";
          g.font = "900 130px Georgia, serif";
          g.fillText("?", TW / 2, 96);
          return;
        }
        if (sq.t === "chest") {
          g.font = "700 22px Georgia, serif";
          drawLines(g, "ALL-\nMÄNNING", TW / 2, 30, 28);
          g.strokeStyle = "#2b6cb0";
          g.lineWidth = 5;
          g.strokeRect(46, 130, 100, 74);
          g.fillStyle = "#2b6cb0";
          g.fillRect(46, 130, 100, 18);
          return;
        }
        // Street, station, utility and tax squares share the name/price stack.
        g.font = `700 ${sq.n.length > 22 ? 19 : 21}px Georgia, serif`;
        drawLines(g, sq.n, TW / 2, top, 25);
        if (sq.t === "station") {
          g.fillStyle = INK;
          g.fillRect(52, 186, 88, 26);
          g.beginPath();
          g.arc(70, 218, 11, 0, Math.PI * 2);
          g.arc(122, 218, 11, 0, Math.PI * 2);
          g.fill();
        }
        if (sq.t === "utility") {
          g.fillStyle = "#e0a821";
          g.beginPath();
          g.arc(TW / 2, 208, 24, 0, Math.PI * 2);
          g.fill();
        }
        if (sq.t === "tax") {
          g.fillStyle = INK;
          g.font = "700 19px Georgia, serif";
          drawLines(g, sq.sub, TW / 2, 200, 24);
          return;
        }
        g.fillStyle = INK;
        g.font = "700 20px Georgia, serif";
        g.fillText(`KR.${sq.p}`, TW / 2, TH - 44);
      });
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
    // Euler order is XYZ, so rotation.z is applied to the quad FIRST and
    // rotation.x lays it flat afterwards — which means z simply spins the
    // artwork in its own plane. One quarter-turn per side points every
    // tile's colour band at the middle of the board, exactly like print.
    const sideSpin = [0, -Math.PI / 2, Math.PI, Math.PI / 2];
    const tileGeom = new THREE.PlaneGeometry(SW * 0.985, CORNER * 0.985);
    LAYOUT.forEach((slots, si) => {
      slots.forEach((sq, d) => {
        const { x, z, rotY } = sideTransforms[si](d);
        const tile = new THREE.Mesh(
          tileGeom,
          new THREE.MeshLambertMaterial({ map: tileTexture(sq) })
        );
        tile.rotation.set(-Math.PI / 2, 0, sideSpin[si]);
        tile.position.set(x, boardTop + 0.012, z);
        scene.add(tile);
        if (sq.grp) {
          streetTiles.push({ x, z, group: sq.grp, rotY });
          if (!towerAnchor[sq.grp]) towerAnchor[sq.grp] = { x, z };
        }
      });
    });

    // --- The four corners, each drawn on the diagonal like the print. ---
    const cornerGeom = new THREE.PlaneGeometry(CORNER * 0.985, CORNER * 0.985);
    function cornerTile(draw, x, z) {
      const m = new THREE.Mesh(
        cornerGeom,
        new THREE.MeshLambertMaterial({ map: textTexture(320, 320, draw) })
      );
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, boardTop + 0.012, z);
      scene.add(m);
    }
    const cornerBase = (g) => {
      g.fillStyle = PAPER;
      g.fillRect(0, 0, 320, 320);
      g.strokeStyle = INK;
      g.lineWidth = 6;
      g.strokeRect(3, 3, 314, 314);
      g.textAlign = "center";
      g.textBaseline = "middle";
    };
    // GÅ — the red arrow and the pay-day line.
    cornerTile((g) => {
      cornerBase(g);
      g.save();
      g.translate(160, 160);
      g.rotate(-Math.PI / 4);
      g.fillStyle = "#d93a2b";
      g.font = "900 104px Georgia, serif";
      g.fillText("GÅ", 0, 28);
      g.beginPath();
      g.moveTo(-84, 94);
      g.lineTo(44, 94);
      g.lineTo(44, 76);
      g.lineTo(86, 106);
      g.lineTo(44, 136);
      g.lineTo(44, 118);
      g.lineTo(-84, 118);
      g.closePath();
      g.fill();
      g.fillStyle = INK;
      g.font = "700 21px Georgia, serif";
      g.fillText(`AVLÖNING KR.${gaBonus}`, 0, -70);
      g.fillText("NÄR NI PASSERAR", 0, -44);
      g.restore();
    }, B - CORNER / 2, B - CORNER / 2);
    // Fängelse (bottom-left).
    cornerTile((g) => {
      cornerBase(g);
      g.fillStyle = "#e2882a";
      g.fillRect(16, 16, 288, 46);
      g.fillStyle = INK;
      g.font = "700 26px Georgia, serif";
      g.fillText("FÄNGELSE", 160, 40);
      g.strokeStyle = INK;
      g.lineWidth = 6;
      g.strokeRect(86, 96, 148, 148);
      for (let i = 1; i < 4; i++) {
        g.beginPath();
        g.moveTo(86 + i * 37, 96);
        g.lineTo(86 + i * 37, 244);
        g.stroke();
      }
      g.font = "700 22px Georgia, serif";
      g.fillText("PÅ BESÖK", 160, 276);
    }, -B + CORNER / 2, B - CORNER / 2);
    // Fri parkering (top-left).
    cornerTile((g) => {
      cornerBase(g);
      g.save();
      g.translate(160, 160);
      g.rotate(Math.PI / 4);
      g.fillStyle = "#d93a2b";
      g.font = "900 34px Georgia, serif";
      g.fillText("FRI", 0, -74);
      g.fillText("PARKERING", 0, 92);
      g.fillStyle = "#2b6cb0";
      g.fillRect(-66, -30, 132, 44);
      g.fillStyle = INK;
      g.beginPath();
      g.arc(-40, 20, 15, 0, Math.PI * 2);
      g.arc(40, 20, 15, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }, -B + CORNER / 2, -B + CORNER / 2);
    // Gå till fängelset (top-right).
    cornerTile((g) => {
      cornerBase(g);
      g.save();
      g.translate(160, 160);
      g.rotate(-Math.PI / 4);
      g.fillStyle = INK;
      g.font = "900 34px Georgia, serif";
      g.fillText("GÅ TILL", 0, -86);
      g.fillText("FÄNGELSET", 0, 96);
      g.strokeStyle = "#2b6cb0";
      g.lineWidth = 7;
      g.strokeRect(-56, -46, 112, 100);
      for (let i = 1; i < 4; i++) {
        g.beginPath();
        g.moveTo(-56 + i * 28, -46);
        g.lineTo(-56 + i * 28, 54);
        g.stroke();
      }
      g.restore();
    }, B - CORNER / 2, -B + CORNER / 2);

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
    // The roll. Both dice lie still ON the board at the very top of the
    // page, near the GÅ corner, and tumble across to the middle on the
    // reader's first scroll. Starting them at rest is the whole trick: an
    // earlier version launched them from a hand in mid-air, which left them
    // hanging in the sky behind the title.
    // Orientation is counted in whole quarter-turns on all three axes, from a
    // whole-quarter-turn starting pose. Both ends of the roll are therefore
    // axis-aligned and the die lies flat on a face. The previous version kept
    // an arbitrary yaw (restY) for the resting pose, which tilted the landed
    // die onto an edge: that yaw sits *between* two axis-aligned rotations in
    // the XYZ Euler composition rather than being applied about world Y last,
    // so it does not simply spin the die in place.
    const QT = Math.PI / 2;
    const dice = [];
    const diceRoll = [
      { from: [3.4, 3.0], to: [0.5, 1.9], base: [1, 0, 2], q: [5, 2, 3], hop: 0.26 },
      { from: [3.7, 2.5], to: [1.15, 2.3], base: [0, 3, 1], q: [4, 3, 5], hop: 0.19 },
    ];
    for (const d of diceRoll) {
      const die = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), dieMats);
      die.position.set(d.from[0], boardTop + 0.21, d.from[1]);
      die.rotation.set(d.base[0] * QT, d.base[1] * QT, d.base[2] * QT);
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

    // --- The towers: one per color group, height = the sourced comparison
    // value in board.json (street measures plus one labelled area proxy).
    // This is the "spelplanen har förändrats" reveal — the board's own
    // colors, extruded to a 2025–2026 price scale. ---
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
    // Opens low over the GÅ corner — close enough to read Västerlånggatan
    // and KR.1000 off the print — then pulls up and around into the crane
    // shot that reveals the towers.
    const KEY = [
      { t: 0.0, pos: [5.6, 2.5, 7.4], look: [0.6, 0.15, 1.2] },
      { t: 0.3, pos: [8.2, 4.0, 1.6], look: [0, 0.2, 0] },
      { t: 0.62, pos: [3.6, 6.0, -8.0], look: [0, 0.6, 0] },
      { t: 1.0, pos: [-7.4, 9.0, 8.4], look: [0, 1.8, 0] },
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

      // The hat idles with tiny life.
      hat.position.y = boardTop + 0.05 + Math.sin(t * 1.4) * 0.015;
      hat.rotation.y = Math.sin(t * 0.5) * 0.15;

      // The dice roll, scrubbed by the first sliver of scroll. Two low
      // decaying bounces stand in for the throw; at T = 1 the hop is zero and
      // every axis has turned a whole number of quarter-turns, so each die
      // comes to rest flat on a face rather than propped on an edge.
      // Reduced motion jumps straight to the resting arrangement.
      const T = reduceMotion ? 1 : smooth(0.008, 0.085, P);
      dice.forEach((die, di) => {
        const d = diceRoll[di];
        const hop = Math.abs(Math.sin(T * Math.PI * 2.3)) * d.hop * (1 - T);
        die.position.set(
          d.from[0] + (d.to[0] - d.from[0]) * T,
          boardTop + 0.21 + hop,
          d.from[1] + (d.to[1] - d.from[1]) * T
        );
        die.rotation.set(
          (d.base[0] + T * d.q[0]) * QT,
          (d.base[1] + T * d.q[1]) * QT,
          (d.base[2] + T * d.q[2]) * QT
        );
      });

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

<section
  class="hero"
  bind:this={wrap}
  aria-labelledby="hero-title"
  aria-describedby="hero-description"
>
  <div class="sr-only">
    <h1 id="hero-title">Spelplanen har förändrats</h1>
    <p id="hero-description">
      En scrollstyrd 3D-visualisering av ett svenskt Monopolbräde. Den visar
      först historiska gatupriser från brädet och därefter staplar som jämför
      nutida kvadratmeterpriser för samma platser. Norrmalmstorg representeras
      av områdessnittet för Vasastan–Norrmalm.
    </p>
  </div>
  <div class="hero-sticky">
    {#if webglFailed}
      <div class="hero-fallback" aria-hidden="true">
        <p class="fb-eyebrow">En visuell berättelse om den svenska fastighetsmarknaden</p>
        <p class="fb-title">Spelplanen har förändrats</p>
        <p class="fb-body">
          På brädet kostar Hornsgatan 1 000 kronor och Norrmalmstorg 8 000.
          Monopol används här som en bild för att följa förändringar i
          bostadspriser, regler och villkor.
        </p>
      </div>
    {:else}
      <canvas bind:this={canvas} aria-hidden="true"></canvas>
      {#each cards as card, i}
        <div class="hero-card" bind:this={cardEls[i]} aria-hidden="true">
          {#if card.eyebrow}<p class="card-eyebrow">{card.eyebrow}</p>{/if}
          {#if card.title}<p class="card-title">{card.title}</p>{/if}
          {#if card.body}<p class="card-body">{card.body}</p>{/if}
          {#if card.hint}
            <p class="scroll-hint" aria-hidden="true">Scrolla för att kasta tärningarna <span>↓</span></p>
          {/if}
        </div>
      {/each}
      {#each chips as chip, i}
        <p class="hero-chip" bind:this={chipEls[i]} aria-hidden="true">{chip.label}</p>
      {/each}
    {/if}
  </div>
</section>

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
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  /* Vignette: pure CSS over the canvas, so it costs one composited layer
     rather than a post-processing pass on every frame. Sinks the corners
     into the table and keeps the eye on the board. */
  .hero-sticky::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    /* Above the canvas, below the copy — a generated ::after paints last,
       so without this it would dim the title instead of the board. */
    z-index: 1;
    background: radial-gradient(
      120% 88% at 50% 46%,
      rgba(10, 26, 20, 0) 38%,
      rgba(10, 26, 20, 0.42) 78%,
      rgba(8, 20, 15, 0.78) 100%
    );
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
    z-index: 2;
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
  .card-title {
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
    z-index: 2;
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
  .fb-title {
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
