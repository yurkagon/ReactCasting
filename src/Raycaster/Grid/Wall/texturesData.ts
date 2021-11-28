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
  Record<Cell, { url: string; minimapColor?: string }>
> = {
  s: { url: s, minimapColor: "#A5A5A5" },
  w: { url: w },
  g: { url: g },
  g2: { url: g2 },
  g3: { url: g3 },
  w2: { url: w2 },
  b: { url: b },
  b2: { url: b2 },
  b3: { url: b3 },
  tv1: { url: tv1, minimapColor: "#034451" },
  tv2: { url: tv2, minimapColor: "#034451" },
};

export default texturesData;
