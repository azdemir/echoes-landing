import Starfield from '../components/Starfield';
import SceneFace from '../components/SceneFace';
import Reveal from '../components/Reveal';
import Timeline from '../components/Timeline';
import WaitlistForm from '../components/WaitlistForm';

const FUTURES = [
  {
    src: '/faces/builder.webp',
    alt: 'Future self at 46 — the builder, glowing violet',
    tag: 'The Builder · 2041',
    decision: 'You quit the safe job.',
    quote: '“You were terrified. Do it anyway — the company you were scared to start becomes the one you’re known for.”',
    glow: '139,123,255',
    side: 'right',
  },
  {
    src: '/faces/dreamer.webp',
    alt: 'Future self at 33 — the dreamer, glowing teal',
    tag: 'The Dreamer · 2033',
    decision: 'You chose the art over the salary.',
    quote: '“The money came later. The regret never did.”',
    glow: '92,232,216',
    side: 'left',
  },
  {
    src: '/faces/elder.webp',
    alt: 'Future self at 71 — the elder, glowing amber',
    tag: 'The Elder · 2056',
    decision: 'You slowed down in time.',
    quote: '“Nobody remembers your title. Everyone remembers how you made them feel.”',
    glow: '255,179,92',
    side: 'right',
  },
];

export default function Page() {
  return (
    <div className="vignette relative">
      <Starfield />

      {/* ---------------- nav ---------------- */}
      <header className="nav-blur fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Echoes home">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: 'var(--violet)', boxShadow: '0 0 14px 3px rgba(139,123,255,0.8)' }}
            />
            <span className="text-sm font-semibold uppercase" style={{ letterSpacing: '0.42em' }}>
              Echoes
            </span>
          </a>
          <nav className="flex items-center gap-6 md:gap-9">
            <a href="#futures" className="btn-ghost link-sm hidden sm:inline-flex">
              The futures
            </a>
            <a href="#engine" className="btn-ghost link-sm hidden sm:inline-flex">
              The engine
            </a>
            <a href="#access" className="btn-primary btn-sm">
              Request access
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="relative z-10">
        {/* ---------------- hero ---------------- */}
        <section className="relative flex min-h-screen items-center overflow-hidden">
          <SceneFace
            src="/faces/sage.webp"
            alt="Your future self at 78, floating among the stars"
            position="right-[-14%] md:right-[-4%] top-1/2"
            size="min(120vw, 980px)"
            glow="255,217,138"
            dim={0.92}
            speed={0.7}
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <Reveal>
              <p className="eyebrow">The future-self simulation engine</p>
            </Reveal>
            <Reveal delay={140}>
              <h1 className="display mt-7 max-w-3xl">
                Talk to your
                <br />
                <span className="serif font-medium italic" style={{ color: 'var(--gold)' }}>
                  future self
                </span>
                <br />
                before you decide.
              </h1>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl" style={{ color: 'var(--ink-dim)' }}>
                The job offer. The move. The leap. Ask the one advisor who has already lived every
                version of your choice — <span style={{ color: 'var(--ink)' }}>you</span>.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-11 flex flex-wrap items-center gap-7">
                <a href="#futures" className="btn-primary">
                  Meet your futures
                  <span aria-hidden="true">↓</span>
                </a>
                <a href="#engine" className="btn-ghost">
                  How it works
                </a>
              </div>
            </Reveal>
          </div>
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
            <span className="text-[10px] uppercase" style={{ letterSpacing: '0.4em', color: 'var(--ink-faint)' }}>
              Scroll
            </span>
            <span className="scroll-cue-line block h-12 w-px" style={{ background: 'var(--ink-faint)' }} />
          </div>
        </section>

        {/* ---------------- manifesto ---------------- */}
        <section className="relative flex min-h-[130vh] items-center justify-center overflow-hidden">
          <SceneFace
            src="/faces/builder.webp"
            alt=""
            position="left-[-20%] top-[16%]"
            size="min(70vw, 520px)"
            glow="139,123,255"
            dim={0.28}
            speed={1.4}
          />
          <SceneFace
            src="/faces/dreamer.webp"
            alt=""
            position="right-[-18%] top-[46%]"
            size="min(70vw, 560px)"
            glow="92,232,216"
            dim={0.24}
            speed={1.1}
          />
          <SceneFace
            src="/faces/elder.webp"
            alt=""
            position="left-[-14%] top-[74%]"
            size="min(70vw, 500px)"
            glow="255,179,92"
            dim={0.26}
            speed={1.6}
          />
          <div className="relative px-6 text-center">
            <Reveal>
              <p className="text-2xl md:text-4xl" style={{ color: 'var(--ink-faint)' }}>
                Not a chatbot.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-2xl md:text-4xl" style={{ color: 'var(--ink-faint)' }}>
                Not journaling.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 text-2xl md:text-4xl" style={{ color: 'var(--ink-faint)' }}>
                Not therapy.
              </p>
            </Reveal>
            <Reveal delay={380}>
              <p className="display mt-14">
                A{' '}
                <span
                  className="serif font-medium italic"
                  style={{
                    background: 'linear-gradient(100deg, #c9bfff, #8b7bff 45%, #ffd98a)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  simulation engine
                </span>
                .
              </p>
            </Reveal>
            <Reveal delay={520}>
              <p className="mx-auto mt-8 max-w-xl leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
                Echoes renders the branching futures of your life as people — then lets you sit
                across from them and ask anything.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------------- timeline ---------------- */}
        <Timeline />

        {/* ---------------- futures ---------------- */}
        <div id="futures" className="relative">
          <div className="mx-auto max-w-7xl px-6 pt-28 md:px-10">
            <Reveal>
              <p className="eyebrow text-center">Three of your thousand lives</p>
            </Reveal>
          </div>
          {FUTURES.map((f) => (
            <section key={f.tag} className="relative flex min-h-screen items-center overflow-hidden">
              <SceneFace
                src={f.src}
                alt={f.alt}
                position={f.side === 'right' ? 'right-[-16%] md:right-[-2%] top-1/2' : 'left-[-16%] md:left-[-2%] top-1/2'}
                size="min(115vw, 900px)"
                glow={f.glow}
                dim={0.95}
                speed={0.85}
              />
              <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
                <div className={f.side === 'right' ? 'max-w-2xl' : 'ml-auto max-w-2xl text-right'}>
                  <Reveal>
                    <p className="eyebrow" style={{ color: `rgba(${f.glow},0.9)` }}>
                      {f.tag}
                    </p>
                  </Reveal>
                  <Reveal delay={120}>
                    <h2 className="display display-sm mt-6">{f.decision}</h2>
                  </Reveal>
                  <Reveal delay={260}>
                    <blockquote
                      className="serif mt-9 text-2xl italic leading-snug md:text-[2rem]"
                      style={{ color: 'var(--ink)' }}
                    >
                      {f.quote}
                    </blockquote>
                  </Reveal>
                  <Reveal delay={380}>
                    <p className="mt-8 text-sm uppercase" style={{ letterSpacing: '0.3em', color: 'var(--ink-faint)' }}>
                      Simulated across 12,408 branching paths
                    </p>
                  </Reveal>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* ---------------- how it works ---------------- */}
        <section id="engine" className="relative mx-auto max-w-6xl px-6 py-36 md:px-10 md:py-48">
          <Reveal>
            <p className="eyebrow">The engine</p>
            <h2 className="display mt-6">Three steps to the other side.</h2>
          </Reveal>
          <div className="mt-20">
            {[
              {
                n: '01',
                t: 'Name the decision',
                d: 'The offer, the move, the leap — say it out loud. The engine maps everything it touches: money, love, health, time.',
              },
              {
                n: '02',
                t: 'We simulate your lives',
                d: 'A thousand branching futures play forward, decade by decade — rendered as the people you become in each one.',
              },
              {
                n: '03',
                t: 'Ask them anything',
                d: 'Then choose — advised by the only counsel who has lived your choice to its end: you, at 33, 46, and 71.',
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="flex flex-col gap-4 border-t py-10 md:flex-row md:items-baseline md:gap-12" style={{ borderColor: 'var(--line)' }}>
                  <span
                    className="serif text-5xl italic md:text-6xl"
                    style={{ color: 'transparent', WebkitTextStroke: '1px rgba(139,123,255,0.55)' }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold md:text-3xl" style={{ letterSpacing: '-0.01em' }}>
                      {s.t}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
                      {s.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="hairline" />
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section id="access" className="relative flex min-h-screen items-center justify-center overflow-hidden">
          <SceneFace
            src="/faces/elder.webp"
            alt=""
            position="left-1/2 top-1/2 -translate-x-1/2"
            size="min(110vw, 860px)"
            glow="255,179,92"
            dim={0.32}
            speed={0.5}
          />
          <div className="relative px-6 text-center">
            <Reveal>
              <p className="eyebrow">Early access</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display mx-auto mt-7 max-w-4xl">
                Your future is already
                <br />
                waiting to{' '}
                <span className="serif font-medium italic" style={{ color: 'var(--gold)' }}>
                  talk
                </span>
                .
              </h2>
            </Reveal>
            <Reveal delay={260}>
              <p className="mx-auto mt-7 max-w-xl leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
                Join the waitlist and be among the first to sit across from the people
                you&rsquo;ll become.
              </p>
            </Reveal>
            <Reveal delay={380}>
              <div className="mt-10">
                <WaitlistForm />
                <p className="mt-6 text-xs" style={{ color: 'var(--ink-faint)' }}>
                  Concept preview — nothing you type leaves this page.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------------- footer ---------------- */}
      <footer className="relative z-10 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-10 md:flex-row md:px-10">
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: 'var(--violet)', boxShadow: '0 0 12px 2px rgba(139,123,255,0.8)' }}
            />
            <span className="text-xs font-semibold uppercase" style={{ letterSpacing: '0.42em' }}>
              Echoes
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--ink-faint)' }}>
            The future-self simulation engine · © 2026
          </p>
          <div className="flex gap-6">
            <a href="#futures" className="btn-ghost link-sm">
              Futures
            </a>
            <a href="#engine" className="btn-ghost link-sm">
              Engine
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
