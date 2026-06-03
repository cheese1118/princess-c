"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path) => `${ASSET_BASE}${path}`;

const homeScenes = [
  ["01", "First Volume", "Private memory", asset("/memories/home/0B36C850-D5FB-4335-AA8E-31E28A730616.jpeg")],
  ["02", "Soft Frame", "Collected light", asset("/memories/home/3EE016DE-D4C7-46BA-9525-1DEB0258C3FF.jpeg")],
  ["03", "Chapter Still", "Memory object", asset("/memories/home/44B8EFBD-5F4C-4BA6-A06F-2177AF6EFDEE.jpeg")],
  ["04", "Private Plate", "Folder image", asset("/memories/home/466CE336-8380-4379-B886-A932C8689F8B.jpeg")],
  ["05", "Memoir Detail", "Visual note", asset("/memories/home/4CD0FFF4-4719-4165-9DC1-1291C7A1EF68.jpeg")],
  ["06", "Archive Light", "Private still", asset("/memories/home/7C44F74F-8876-401C-825D-5D32B0CE1EDB.jpeg")],
  ["07", "Hidden Frame", "Soft archive", asset("/memories/home/87E8134D-EB2D-405E-B270-253293305235.jpeg")],
  ["08", "Her Chapter", "Memoir plate", asset("/memories/home/8A90F3BE-3E07-4403-88AF-FDAB1CA14D15.jpeg")],
  ["09", "Final Still", "Closing plate", asset("/memories/home/8F2F8415-5245-4085-A69E-A7833B55E75F.jpeg")],
  ["10", "Private Note", "Soft memoir", asset("/memories/home/C234F607-C441-4E99-8E14-18B2E8B5534B.jpeg")],
];

const wallScenes = [
  ["01", "Signature Wall", "Her profile", asset("/memories/wall/3904B3D9-73E8-402F-979F-C738C3027F28.jpeg")],
  ["02", "Portrait Object", "Theme object", asset("/memories/wall/518FA93C-CFB1-4D4B-AB04-3EE56ABA7854.jpeg")],
  ["03", "Crown Detail", "Private object", asset("/memories/wall/670F25BD-C4FF-4238-BE62-AD9BDF92F955.jpeg")],
  ["04", "Wall Plate", "Visual profile", asset("/memories/wall/8108173E-21F1-4DC6-AD67-8663E2B5CE6E.jpeg")],
  ["05", "Private Mood", "Mood board", asset("/memories/wall/859835A5-FE6D-4814-955E-F60D0FBBEB06.jpeg")],
  ["06", "Soft Object", "Object wall", asset("/memories/wall/980952C2-0D96-43A4-A603-3712A1449C18.jpeg")],
  ["07", "Memoir Object", "Collected object", asset("/memories/wall/A633A6E8-0DD6-4D88-9033-8EF2EFC29E02.jpeg")],
  ["08", "Her Texture", "Signature texture", asset("/memories/wall/D926831E-2061-43D4-A544-2F5A21DC816C.jpeg")],
  ["09", "Profile Still", "Profile archive", asset("/memories/wall/EFDB88B3-2A6B-45B0-9D54-7425CD7DFF88.jpeg")],
  ["10", "Final Object", "Closing object", asset("/memories/wall/F13EA0DC-4D0D-4D82-BB4E-0C9559676441.jpeg")],
];

function wrap(index, length, delta) {
  return (index + delta + length) % length;
}

export default function MobilePreview() {
  const [mode, setMode] = useState("places");
  const [active, setActive] = useState(0);
  const scenes = mode === "places" ? homeScenes : wallScenes;
  const scene = scenes[active] ?? scenes[0];

  useEffect(() => {
    setActive(0);
  }, [mode]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => wrap(value, scenes.length, 1));
    }, 3000);

    return () => window.clearInterval(timer);
  }, [scenes.length]);

  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="grain" />
      <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_68%_12%,rgba(255,255,255,.12),transparent_22%),linear-gradient(180deg,rgba(72,43,31,.46),#0f0d0b_42%)] px-4 py-5">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-45" viewBox="0 0 390 840" fill="none">
          <path d="M-40 748C116 618 104 352 184 112C243-66 437 25 344 265C262 476 344 608 455 736" stroke="rgba(255,255,255,.2)" />
          <path d="M18 104C156 72 322 88 426 188" stroke="rgba(199,169,118,.32)" />
        </svg>

        <header className="relative z-20 flex items-center justify-between">
          <a href="/" className="font-serif text-[22px] leading-none text-white/90">
            Princess
            <br />
            Memoir
          </a>
          <div className="grid grid-cols-2 gap-1 rounded-full border border-white/[.14] bg-white/[.08] p-1 text-[10px] font-bold uppercase tracking-[.2em] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setMode("places")}
              className={`rounded-full px-4 py-2 ${mode === "places" ? "bg-white text-ink" : "text-white/62"}`}
            >
              Places
            </button>
            <button
              type="button"
              onClick={() => setMode("objects")}
              className={`rounded-full px-4 py-2 ${mode === "objects" ? "bg-white text-ink" : "text-white/62"}`}
            >
              Objects
            </button>
          </div>
        </header>

        <div className="relative z-10 mt-8">
          <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[.32em] text-white/46">
            {mode === "places" ? "Private opening volume" : "Princess theme wall"}
          </p>
          <h1 className="pointer-events-none absolute -top-4 left-1/2 z-0 -translate-x-1/2 select-none text-center font-display text-[82px] font-normal leading-[.72] tracking-[-.06em] text-white/[.13] mix-blend-screen">
            {mode === "places" ? "Cover" : "Wall"}
          </h1>

          <AnimatePresence mode="wait">
            <motion.article
              key={`${mode}-${scene[0]}-${scene[3]}`}
              className="relative z-10 overflow-hidden rounded-[28px] border border-white/[.16] bg-white/[.08] shadow-glass"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 1.02 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <img className="h-[58vh] min-h-[430px] w-full object-cover" src={scene[3]} alt={scene[1]} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/76 via-transparent to-white/[.06]" />
              <div className="absolute left-5 top-5 text-[10px] font-bold uppercase tracking-[.26em] text-white/60">
                {scene[2]}
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-display text-[86px] font-normal leading-[.74] tracking-[-.06em] text-white/[.2] mix-blend-screen">
                  {scene[0]}
                </p>
                <h2 className="font-serif text-[40px] leading-none text-white">{scene[1]}</h2>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {scenes.map((item, index) => (
              <button
                key={`${mode}-${item[0]}-${item[3]}`}
                type="button"
                onClick={() => setActive(index)}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition ${
                  index === active ? "border-white opacity-100" : "border-white/[.16] opacity-45"
                }`}
              >
                <img className="h-full w-full object-cover" src={item[3]} alt={item[1]} />
              </button>
            ))}
          </div>
        </div>

        <footer className="relative z-10 mt-6">
          <div className="mb-3 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.3em] text-white/[.38]">
            <span>Editorial note</span>
            <span className="h-px flex-1 bg-white/[.16]" />
          </div>
          <p className="font-['PMingLiU','新細明體','MingLiU',serif] text-[17px] font-light leading-[1.85] tracking-[.11em] text-white/[.82]">
            {mode === "places"
              ? "把相遇以後的每個微光片段，收進一本只屬於妳的私人光影誌。"
              : "她的顏色、心情與喜歡的事物，被整理成一面只屬於她的私人主題牆。"}
          </p>
        </footer>
      </section>
    </main>
  );
}
