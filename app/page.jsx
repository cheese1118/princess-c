"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path) => `${ASSET_BASE}${path}`;

const homeScenes = [
  {
    id: "01",
    title: "First Volume",
    label: "Private memory",
    copy: "A private photograph placed into the opening chapter of her memoir.",
    image: asset("/memories/home/IMG_5141.JPG"),
    accent: "Local archive",
  },
  {
    id: "02",
    title: "Soft Frame",
    label: "Collected light",
    copy: "A quiet frame from the folder, treated like a boutique editorial plate.",
    image: asset("/memories/home/IMG_5142.JPG"),
    accent: "Her light",
  },
  {
    id: "03",
    title: "Chapter Still",
    label: "Memory object",
    copy: "An image from the local archive becomes one object in the visual cabinet.",
    image: asset("/memories/home/IMG_5143.JPG"),
    accent: "Cabinet note",
  },
  {
    id: "04",
    title: "Private Plate",
    label: "Folder image",
    copy: "A local photograph arranged as the central plate of the homepage.",
    image: asset("/memories/home/IMG_5144.JPG"),
    accent: "Volume one",
  },
  {
    id: "05",
    title: "Memoir Detail",
    label: "Visual note",
    copy: "A small detail is held in the same rhythm as the rest of the private memoir.",
    image: asset("/memories/home/IMG_5150.JPG"),
    accent: "Soft crown",
  },
];

const wallScenes = [
  {
    id: "01",
    title: "Signature Wall",
    label: "Her profile",
    copy: "A personal wall of colors, moods, favorites, and the details that feel like her.",
    image: asset("/memories/wall/IMG_5145.JPG"),
    accent: "Soft crown",
  },
  {
    id: "02",
    title: "Portrait Object",
    label: "Theme object",
    copy: "A local image from the theme wall archive.",
    image: asset("/memories/wall/IMG_5146.JPG"),
    accent: "Mood note",
  },
  {
    id: "03",
    title: "Crown Detail",
    label: "Private object",
    copy: "A detail arranged as part of her personal visual wall.",
    image: asset("/memories/wall/IMG_5147.JPG"),
    accent: "Object memory",
  },
  {
    id: "04",
    title: "Wall Plate",
    label: "Visual profile",
    copy: "A theme wall plate with the same dark editorial rhythm.",
    image: asset("/memories/wall/IMG_5148.JPG"),
    accent: "Her archive",
  },
  {
    id: "05",
    title: "Private Mood",
    label: "Mood board",
    copy: "A photograph for her color, mood, and private details.",
    image: asset("/memories/wall/IMG_5149.JPG"),
    accent: "Color note",
  },
  {
    id: "06",
    title: "Soft Object",
    label: "Object wall",
    copy: "Another local wall image for the rotating theme page.",
    image: asset("/memories/wall/IMG_5151.JPG"),
    accent: "Hidden object",
  },
  {
    id: "07",
    title: "Memoir Object",
    label: "Collected object",
    copy: "A private photograph placed into the theme wall sequence.",
    image: asset("/memories/wall/IMG_5152.JPG"),
    accent: "Wall memory",
  },
];

function wrappedIndex(index, length, delta) {
  return (index + delta + length) % length;
}

const profileTiles = [
  ["Signature Color", "Rose Champagne", "#D6A190"],
  ["Current Mood", "Quiet Luxury", "Soft, private, luminous"],
  ["Favorite Things", "Flowers / Notes / Blue Hour", "Collected as small rituals"],
  ["Promise", "One page every year", "A living archive"],
];

export default function Home() {
  const [scenes, setScenes] = useState(homeScenes);
  const [active, setActive] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [view, setView] = useState("home");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -70]);
  const scene = scenes[active] ?? scenes[0];
  const satelliteIndexes = [
    wrappedIndex(active, scenes.length, -2),
    wrappedIndex(active, scenes.length, -1),
    wrappedIndex(active, scenes.length, 1),
    wrappedIndex(active, scenes.length, 2),
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-line",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => wrappedIndex(value, scenes.length, 1));
    }, 3000);

    return () => window.clearInterval(timer);
  }, [scenes.length]);

  function addPhoto(event) {
    event.preventDefault();
    const image = newImage.trim();
    if (!image) return;
    const id = String(scenes.length + 1).padStart(2, "0");
    setScenes((current) => [
      ...current,
      {
        id,
        title: `Memory ${id}`,
        label: "New place",
        copy: "A newly added photograph waiting for its private caption.",
        image,
        accent: "Added memory",
      },
    ]);
    setActive(scenes.length);
    setNewImage("");
  }

  function deletePhoto(index) {
    if (scenes.length <= 1) return;
    setScenes((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setActive((value) => {
      if (value === index) return 0;
      if (value > index) return value - 1;
      return Math.min(value, scenes.length - 2);
    });
  }

  if (view === "objects") {
    return <ThemeWall scenes={wallScenes} onBack={() => setView("home")} />;
  }

  return (
    <main ref={heroRef} className="min-h-screen bg-ink text-porcelain">
      <div className="grain" />

      <section className="relative min-h-screen overflow-hidden bg-ink p-3 text-porcelain sm:p-5">
        <motion.div
          style={{ y: heroY }}
          className="relative z-10 mx-auto min-h-[calc(100vh-24px)] max-w-[1480px] overflow-hidden rounded-[34px] border border-white/20 bg-ink"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(255,255,255,.16),transparent_22%),linear-gradient(180deg,rgba(90,56,39,.44),rgba(15,13,11,.97)_42%)]" />
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-45" viewBox="0 0 1400 820" fill="none">
            <path d="M-40 760C250 650 330 410 415 80C465-115 845 12 754 274C648 579 982 636 1515 172" stroke="rgba(255,255,255,.28)" strokeWidth="1" />
            <path d="M62 62C315 8 626 54 848 180C1082 313 1238 546 1430 705" stroke="rgba(199,169,118,.36)" strokeWidth="1" />
            <path d="M1260-20C1170 160 1200 326 1368 510" stroke="rgba(255,255,255,.16)" strokeWidth="1" />
          </svg>

          <header className="relative z-40 flex items-center justify-between gap-4 px-5 py-5 text-[11px] font-bold uppercase tracking-[.28em] text-white/[.72] md:px-8">
            <div className="font-serif text-xl normal-case leading-none tracking-normal text-white/[.88] md:text-2xl">
              Princess
              <br />
              Assembly
            </div>
            <nav className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="min-w-[230px] rounded-lg border border-white/[.12] bg-white/[.12] px-8 py-3 text-center backdrop-blur-xl transition hover:bg-white/[.2]"
              >
                Places
              </button>
              <button
                type="button"
                className="min-w-[230px] rounded-lg border border-white/[.12] bg-white/[.12] px-8 py-3 text-center backdrop-blur-xl transition hover:bg-white/[.2]"
                onClick={() => setView("objects")}
              >
                Objects
              </button>
            </nav>
            <button className="rounded-lg border border-white/25 bg-white/85 px-8 py-3 text-[10px] text-ink">
              Menu
            </button>
          </header>

          <div className="relative z-10 min-h-[calc(100vh-116px)] px-5 pb-12 pt-4 md:px-8">
            <div className="pointer-events-none absolute left-1/2 top-[13%] z-0 hidden -translate-x-1/2 select-none text-center font-display text-[16vw] font-normal leading-[.68] tracking-[-.065em] text-white/[.16] mix-blend-screen md:block">
              Princess
              <br />
              Memoir
            </div>
            <div className="pointer-events-none absolute left-[5%] top-[16%] z-30 hidden select-none font-display text-[8vw] font-normal leading-[.78] tracking-[-.05em] text-white/[.28] mix-blend-screen lg:block">
              Vol.
              <br />
              01
            </div>
            <div className="pointer-events-none absolute right-[6%] top-[43%] z-30 hidden max-w-[280px] select-none text-right font-serif text-[42px] leading-[.92] text-white/[.42] mix-blend-screen lg:block">
              Her light,
              <br />
              collected
            </div>

            <div className="pointer-events-none absolute left-1/2 top-2 z-20 hidden -translate-x-1/2 text-center font-serif text-4xl leading-[.9] text-white md:block">
              Not
              <br />
              Everything
              <br />
              is Visible
            </div>

            <motion.div
              className="absolute left-5 top-[22%] hidden h-[250px] w-[300px] overflow-hidden rounded-lg border border-white/[.14] bg-white/[.08] md:block"
              animate={{ y: active % 2 ? 20 : 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img className="h-full w-full object-cover" src={scenes[satelliteIndexes[0]].image} alt="" />
            </motion.div>

            <motion.div
              className="absolute bottom-[8%] left-5 hidden h-[180px] w-[300px] overflow-hidden rounded-lg border border-white/[.14] md:block"
              animate={{ y: active % 2 ? -8 : 16 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img className="h-full w-full object-cover" src={scenes[satelliteIndexes[1]].image} alt="" />
            </motion.div>

            <motion.div
              className="absolute right-8 top-[22%] hidden h-[250px] w-[300px] overflow-hidden rounded-lg border border-white/[.14] lg:block"
              animate={{ y: active % 2 ? 0 : 18 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img className="h-full w-full object-cover" src={scenes[satelliteIndexes[2]].image} alt="" />
            </motion.div>

            <motion.div
              className="absolute bottom-[8%] right-8 hidden h-[245px] w-[300px] overflow-hidden rounded-lg border border-white/[.14] lg:block"
              animate={{ y: active % 2 ? 18 : 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img className="h-full w-full object-cover" src={scenes[satelliteIndexes[3]].image} alt="" />
            </motion.div>

            <div className="relative mx-auto flex min-h-[700px] max-w-[720px] flex-col justify-center pt-20 md:pt-28">
              <AnimatePresence mode="wait">
                <motion.article
                  key={`${scene.id}-${scene.image}`}
                  initial={{ opacity: 0, scale: 0.96, y: 28 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -26 }}
                  transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-lg border border-white/[.16] bg-white/[.08] shadow-glass"
                >
                  <img className="h-[500px] w-full object-cover md:h-[570px]" src={scene.image} alt={scene.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/52 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 top-[16%] z-10 select-none text-center font-display text-[120px] font-normal leading-[.72] tracking-[-.06em] text-white/[.19] mix-blend-screen md:text-[178px]">
                    {scene.id}
                  </div>
                  <div className="pointer-events-none absolute -right-5 bottom-14 z-10 hidden select-none font-display text-[92px] font-normal leading-[.78] tracking-[-.045em] text-white/[.24] mix-blend-screen md:block">
                    {scene.title}
                  </div>
                  <div className="absolute bottom-7 left-7 z-20 font-serif text-4xl leading-none text-white">
                    {scene.title}
                  </div>
                </motion.article>
              </AnimatePresence>

              <div className="pointer-events-none absolute left-7 top-[42%] z-20 text-[11px] font-bold uppercase tracking-[.22em] text-white/65">
                {scene.label}
              </div>
              <div className="pointer-events-none absolute right-[-190px] top-[18%] hidden text-[10px] font-bold uppercase tracking-[.14em] text-white/50 lg:block">
                {scene.accent}
              </div>
            </div>

            <div className="relative z-20 mx-auto mt-14 max-w-2xl text-left">
              <div className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.34em] text-white/[.38]">
                <span>Editorial note</span>
                <span className="h-px flex-1 bg-white/[.18]" />
              </div>
              <p className="font-['PMingLiU','新細明體','MingLiU',serif] text-[18px] font-light leading-[1.9] tracking-[.12em] text-white/[.82]">
                把相遇以後的每個微光片段，
                <br />
                收進一本只屬於妳的私人光影誌。
              </p>
            </div>
          </div>

          <AnimatePresence>
            {isEditorOpen && (
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center bg-ink/72 p-5 backdrop-blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.section
                  className="max-h-[86vh] w-full max-w-5xl overflow-auto rounded-[30px] border border-white/[.18] bg-[#130f0c]/95 p-5 text-white shadow-glass md:p-7"
                  initial={{ y: 28, scale: 0.97 }}
                  animate={{ y: 0, scale: 1 }}
                  exit={{ y: 20, scale: 0.98 }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[.32em] text-white/42">Places editor</p>
                      <h2 className="font-serif text-5xl leading-none">Photo Cabinet</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditorOpen(false)}
                      className="rounded-full border border-white/[.18] bg-white/[.08] px-5 py-3 text-[10px] font-bold uppercase tracking-[.22em] text-white transition hover:bg-white hover:text-ink"
                    >
                      Close
                    </button>
                  </div>

                  <form onSubmit={addPhoto} className="mb-6 grid gap-3 rounded-2xl border border-white/[.12] bg-white/[.07] p-3 md:grid-cols-[1fr_auto]">
                    <input
                      value={newImage}
                      onChange={(event) => setNewImage(event.target.value)}
                      placeholder="Paste image URL..."
                      className="min-h-12 rounded-xl border border-white/[.12] bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/36"
                    />
                    <button
                      type="submit"
                      className="rounded-xl border border-white/[.18] bg-white px-6 text-[10px] font-bold uppercase tracking-[.22em] text-ink transition hover:bg-champagne"
                    >
                      Add Photo
                    </button>
                  </form>

                  <div className="grid gap-3 md:grid-cols-5">
                    {scenes.map((item, index) => (
                      <article
                        key={`${item.id}-${item.image}`}
                        className={`group overflow-hidden rounded-2xl border bg-white/[.06] ${
                          active === index ? "border-champagne" : "border-white/[.12]"
                        }`}
                      >
                        <button type="button" onClick={() => setActive(index)} className="block w-full text-left">
                          <img className="h-36 w-full object-cover" src={item.image} alt={item.title} />
                          <div className="p-3">
                            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-white/42">{item.id}</p>
                            <h3 className="mt-1 font-serif text-2xl leading-none">{item.title}</h3>
                          </div>
                        </button>
                        <button
                          type="button"
                          disabled={scenes.length <= 1}
                          onClick={() => deletePhoto(index)}
                          className="mx-3 mb-3 w-[calc(100%-24px)] rounded-full border border-white/[.14] px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/70 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          Delete
                        </button>
                      </article>
                    ))}
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}

function ThemeWall({ scenes, onBack }) {
  const [selected, setSelected] = useState(0);
  const scene = scenes[selected] ?? scenes[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSelected((value) => wrappedIndex(value, scenes.length, 1));
    }, 4200);

    return () => window.clearInterval(timer);
  }, [scenes.length]);

  return (
    <main className="min-h-screen bg-ink text-porcelain">
      <div className="grain" />
      <section className="relative min-h-screen overflow-hidden bg-ink p-3 sm:p-5">
        <motion.div
          className="relative mx-auto min-h-[calc(100vh-24px)] max-w-[1480px] overflow-hidden rounded-[34px] border border-white/20 bg-[#0d0b09]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(183,136,92,.28),transparent_26%),radial-gradient(circle_at_50%_60%,rgba(255,255,255,.09),transparent_32%),linear-gradient(180deg,rgba(84,49,33,.36),rgba(13,11,9,.96)_42%)]" />
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-55" viewBox="0 0 1400 820" fill="none">
            <path d="M-80 660C182 472 278 236 416 58C556-122 838-28 776 210C700 505 1038 590 1470 214" stroke="rgba(199,169,118,.42)" strokeWidth="1" />
            <path d="M110 108C396 38 764 78 1114 215C1304 290 1400 424 1510 620" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
            <path d="M-24 760C330 772 570 528 736 380C940 198 1086 246 1482 412" stroke="rgba(255,255,255,.22)" strokeWidth="1" />
          </svg>

          <header className="relative z-30 flex items-center justify-between gap-4 px-5 py-5 text-[11px] font-bold uppercase tracking-[.28em] text-white/[.72] md:px-8">
            <button
              type="button"
              onClick={onBack}
              className="font-serif text-xl normal-case leading-none tracking-normal text-white/[.88] md:text-2xl"
            >
              Princess
              <br />
              Wall
            </button>
            <nav className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={onBack}
                className="min-w-[210px] rounded-lg border border-white/[.12] bg-white/[.12] px-8 py-3 text-center backdrop-blur-xl transition hover:bg-white/[.2]"
              >
                Places
              </button>
              <span className="min-w-[210px] rounded-lg border border-white/[.26] bg-white/[.2] px-8 py-3 text-center backdrop-blur-xl">
                Objects
              </span>
            </nav>
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-white/25 bg-white/85 px-8 py-3 text-[10px] text-ink"
            >
              Back
            </button>
          </header>

          <div className="relative z-10 min-h-[calc(100vh-112px)] px-5 pb-7 pt-2 md:px-8">
            <div className="pointer-events-none absolute left-1/2 top-[3%] z-0 hidden -translate-x-1/2 select-none font-display text-[18vw] font-normal leading-[.68] tracking-[-.07em] text-white/[.1] mix-blend-screen md:block">
              Objects
            </div>

            <svg className="pointer-events-none absolute left-1/2 top-8 z-20 hidden h-[230px] w-[760px] -translate-x-1/2 overflow-visible md:block" viewBox="0 0 760 230">
              <defs>
                <path id="theme-arc" d="M70 190C190 25 560 25 690 190" />
              </defs>
              <text className="fill-white font-display text-[58px] tracking-[-.04em]">
                <textPath href="#theme-arc" startOffset="50%" textAnchor="middle">
                  Princess Theme Wall
                </textPath>
              </text>
            </svg>

            <div className="pointer-events-none absolute left-[9%] top-[24%] z-20 hidden text-[10px] font-bold uppercase tracking-[.22em] text-white/48 lg:block">
              Signature archive
            </div>
            <div className="pointer-events-none absolute right-[8%] top-[25%] z-20 hidden text-right text-[10px] font-bold uppercase tracking-[.18em] text-white/50 lg:block">
              Mood
              <br />
              Withheld
            </div>

            <div className="mx-auto grid min-h-[670px] max-w-[1140px] items-center gap-6 pt-24 lg:grid-cols-[260px_1fr_260px] lg:pt-28">
              <aside className="hidden grid-cols-1 gap-4 lg:grid">
                {profileTiles.slice(0, 2).map(([label, value, note]) => (
                  <ProfileTile key={label} label={label} value={value} note={note} />
                ))}
              </aside>

              <div className="relative mx-auto w-full max-w-[520px]">
                <div className="absolute -inset-20 rounded-full bg-white/[.06] blur-3xl" />
                <AnimatePresence mode="wait">
                  <motion.article
                    key={`${scene.id}-${scene.image}`}
                    className="relative z-10 overflow-hidden rounded-[28px] border border-white/[.14] bg-white/[.08] shadow-glass"
                    initial={{ opacity: 0, y: 28, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: -18, rotate: 2 }}
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img className="h-[520px] w-full object-cover" src={scene.image} alt={scene.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-white/[.08]" />
                    <div className="absolute left-7 top-7 text-[10px] font-bold uppercase tracking-[.26em] text-white/62">
                      Her object {scene.id}
                    </div>
                    <div className="absolute bottom-7 left-7 right-7">
                      <p className="font-display text-[88px] font-normal leading-[.76] tracking-[-.06em] text-white/[.26] mix-blend-screen">
                        {scene.id}
                      </p>
                      <h1 className="font-serif text-5xl leading-none text-white">{scene.title}</h1>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              <aside className="hidden grid-cols-1 gap-4 lg:grid">
                {profileTiles.slice(2).map(([label, value, note]) => (
                  <ProfileTile key={label} label={label} value={value} note={note} />
                ))}
              </aside>
            </div>

            <div className="relative z-20 mx-auto mt-3 grid max-w-[760px] grid-cols-5 gap-3">
              {scenes.slice(0, 5).map((item, index) => (
                <button
                  key={`${item.id}-${item.image}`}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`h-20 overflow-hidden rounded-lg border transition ${
                    selected === index ? "border-white/70 opacity-100" : "border-white/[.14] opacity-45 hover:opacity-80"
                  }`}
                >
                  <img className="h-full w-full object-cover" src={item.image} alt={item.title} />
                </button>
              ))}
            </div>

            <p className="relative z-20 mx-auto mt-5 max-w-xl text-center font-['PMingLiU','新細明體','MingLiU',serif] text-[18px] font-light leading-[1.85] tracking-[.12em] text-white/[.82]">
              她的顏色、心情與喜歡的事物，被整理成一面只屬於她的私人主題牆。
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function ProfileTile({ label, value, note }) {
  return (
    <article className="rounded-[22px] border border-white/[.12] bg-white/[.07] p-5 text-white backdrop-blur-xl">
      <p className="mb-8 text-[10px] font-bold uppercase tracking-[.24em] text-white/42">{label}</p>
      <h2 className="font-serif text-3xl leading-none">{value}</h2>
      <p className="mt-4 text-xs leading-6 text-white/50">{note}</p>
    </article>
  );
}
