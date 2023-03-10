import s from "./assets/s.jpg";
import w from "./assets/w.jpg";
import w2 from "./assets/w2.jpg";
import g from "./assets/g.jpg";
import g2 from "./assets/g2.jpg";
import g3 from "./assets/g3.jpg";
import b from "./assets/b.jpg";
import b2 from "./assets/b2.jpg";
import b3 from "./assets/b3.jpg";
import tv1 from "./assets/tv1.gif";
import tv2 from "./assets/tv2.gif";

const texturesData: Partial<
  Record<Cell, { url: string; color: string, renderColorOnMinimap?: boolean; }>
> = {
  s: { url: s, color: "#A5A5A5", renderColorOnMinimap: true },
  w: { url: w, color: "#744B23" },
  g: { url: g, color: "#0000C2" },
  g2: { url: g2, color: "#00009C" },
  g3: { url: g3, color: "#0000C2" },
  w2: { url: w2, color: "#81622F" },
  b: { url: b, "color": "#BBBBBB"},
  b2: { url: b2, color: "#949494" },
  b3: { url: b3, color: "#9D0000" },
  tv1: { url: tv1, color: "#034451", renderColorOnMinimap: true },
  tv2: { url: tv2, color: "#034451", renderColorOnMinimap: true  },
};

export default texturesData;
