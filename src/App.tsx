import {
  ArrowDown,
  ArrowRight,
  Mail,
} from 'lucide-react'
import {
  startTransition,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from 'react'

const FRAME_COUNT = 203
const GEAR_FRAME_COUNT = 232

const frames = Array.from({ length: FRAME_COUNT }, (_, index) => {
  const frame = String(index + 1).padStart(3, '0')
  return `/assets/hero-ski-descent/ezgif-frame-${frame}.jpg`
})

const gearFrames = Array.from({ length: GEAR_FRAME_COUNT }, (_, index) => {
  const frame = String(index + 1).padStart(3, '0')
  return `/assets/gear-jump-sequence/ezgif-frame-${frame}.jpg`
})

const stillFrames = [
  {
    image: '/assets/product-cards/kore-99-carbon-freeride-skis.png',
    eyebrow: 'All-Mountain Ski',
    title: 'Kore 99 Carbon',
    copy:
      'A light, directional ski for powder mornings that still holds an edge on scraped exits.',
  },
  {
    image: '/assets/product-cards/stormline-anorak-shell-jacket.png',
    eyebrow: 'Shell System',
    title: 'Stormline Anorak',
    copy:
      'Quiet waterproof fabric, deep vents, and glove-friendly pulls for long resort days.',
  },
  {
    image: '/assets/product-cards/polar-vlt-22-ski-goggles.png',
    eyebrow: 'Goggle Lens',
    title: 'Polar VLT 22',
    copy:
      'High-contrast lenses tuned for tree shade, flat light, and sudden open bowls.',
  },
]

const gearItems = [
  {
    name: 'Polar VLT 22',
    type: 'Goggles',
    detail: 'High-contrast lens for tree shade, flat light, and sudden open bowls.',
    stat: '22% VLT',
  },
  {
    name: 'GripLock Pro',
    type: 'Gloves',
    detail: 'Pre-curved insulation, leather palm, and low-profile wrist closure.',
    stat: 'PrimaLoft 100g',
  },
  {
    name: 'Kore 99 Carbon',
    type: 'Skis',
    detail: 'Directional freeride shape with a stable tail for fast landings.',
    stat: '99 mm waist',
  },
  {
    name: 'Ridge Plant 16',
    type: 'Poles',
    detail: 'Light alloy shaft, powder basket, and extended grip for traverses.',
    stat: '7075 aluminum',
  },
]

const socialLinks = [
  { label: 'Mail', href: 'mailto:gear@treeline.supply', icon: Mail },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Gear', href: '#gear' },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function App() {
  const sequenceRef = useRef<HTMLElement | null>(null)
  const gearSectionRef = useRef<HTMLElement | null>(null)
  const lastFrameRef = useRef(0)
  const lastProgressRef = useRef(0)
  const lastGearFrameRef = useRef(0)
  const lastGearProgressRef = useRef(0)
  const [frameIndex, setFrameIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [gearFrameIndex, setGearFrameIndex] = useState(0)
  const [gearProgress, setGearProgress] = useState(0)

  const currentFrame = frames[frameIndex]
  const deferredFrame = useMemo(() => currentFrame, [currentFrame])
  const currentGearFrame = gearFrames[gearFrameIndex]
  const activeGearIndex = Math.min(
    gearItems.length - 1,
    Math.floor(gearProgress * gearItems.length),
  )

  useEffect(() => {
    ;[...frames, ...gearFrames].forEach((src) => {
      const image = new Image()
      image.src = src
      image.decoding = 'async'
    })
  }, [])

  const updateSequence = useEffectEvent(() => {
    const section = sequenceRef.current
    if (!section) return

    const start = section.offsetTop
    const range = section.offsetHeight - window.innerHeight
    const rawProgress = range <= 0 ? 0 : (window.scrollY - start) / range
    const nextProgress = clamp(rawProgress, 0, 1)
    const nextFrame = Math.round(nextProgress * (FRAME_COUNT - 1))

    if (
      nextFrame === lastFrameRef.current &&
      Math.abs(nextProgress - lastProgressRef.current) < 0.001
    ) {
      return
    }

    lastFrameRef.current = nextFrame
    lastProgressRef.current = nextProgress

    startTransition(() => {
      setFrameIndex(nextFrame)
      setScrollProgress(nextProgress)
    })
  })

  const updateGearSequence = useEffectEvent(() => {
    const section = gearSectionRef.current
    if (!section) return

    const start = section.offsetTop
    const range = section.offsetHeight - window.innerHeight
    const rawProgress = range <= 0 ? 0 : (window.scrollY - start) / range
    const nextProgress = clamp(rawProgress, 0, 1)
    const nextFrame = Math.round(nextProgress * (GEAR_FRAME_COUNT - 1))

    if (
      nextFrame === lastGearFrameRef.current &&
      Math.abs(nextProgress - lastGearProgressRef.current) < 0.001
    ) {
      return
    }

    lastGearFrameRef.current = nextFrame
    lastGearProgressRef.current = nextProgress

    startTransition(() => {
      setGearFrameIndex(nextFrame)
      setGearProgress(nextProgress)
    })
  })

  useEffect(() => {
    updateSequence()
    updateGearSequence()

    const handleScroll = () => {
      updateSequence()
      updateGearSequence()
    }
    const handleResize = () => {
      updateSequence()
      updateGearSequence()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand-mark" href="#top">
          Treeline Supply
        </a>
        <nav className="top-nav">
          <a href="#gear">Gear</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#build">Fit Kit</a>
        </nav>
        <a className="status-pill" href="#build">
          Winter 26 Drop
        </a>
      </header>

      <main>
        <section className="sequence-section" id="top" ref={sequenceRef}>
          <div className="sequence-sticky">
            <img
              className="sequence-frame"
              src={deferredFrame}
              alt="First-person skiing through a snowy forest"
            />
            <div className="frame-vignette" />
            <div className="frame-frost" />

            <div className="sequence-copy">
              <div className="hero-grid">
                <div className="hero-main">
                  <p className="section-kicker">Performance ski equipment</p>
                  <h1>
                    Cold speed,
                    <br />
                    clean lines
                  </h1>
                  <p className="hero-description">
                    Freeride skis, shell layers, goggles, and boots for powder
                    laps and fast resort days.
                  </p>
                </div>
              </div>

              <div className="sequence-footer">
                <div className="scroll-prompt">
                  <ArrowDown size={18} />
                  <span>Scroll</span>
                </div>
              </div>
            </div>

            <div className="progress-rail" aria-hidden="true">
              <div
                className="progress-fill"
                style={{ transform: `scaleY(${scrollProgress || 0.02})` }}
              />
            </div>
          </div>
        </section>

        <section className="gear-scroll-section" id="gear" ref={gearSectionRef}>
          <div className="gear-sticky">
            <div className="gear-frame-wrap">
              <img
                className="gear-frame"
                src={currentGearFrame}
                alt="Skier preparing for a jump"
              />
              <div className="gear-frame-shade" />
            </div>

            <div className="gear-copy">
              <p className="section-kicker">Scroll the kit</p>
              <h2>
                Gear that
                <br />
                leaves the lip
              </h2>
              <p>
                The jump sequence becomes the product demo: each scroll step
                brings one piece of the kit into focus before takeoff.
              </p>
            </div>

            <div className="gear-card-stack">
              {gearItems.map((item, index) => {
                const offset = index - activeGearIndex
                return (
                  <article
                    className="gear-card"
                    data-active={index === activeGearIndex}
                    key={item.name}
                    style={{
                      transform: `translate3d(${offset * 42}px, ${Math.abs(offset) * 16}px, 0)`,
                    }}
                  >
                    <span className="gear-count">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p>{item.type}</p>
                    <h3>{item.name}</h3>
                    <small>{item.detail}</small>
                    <strong>{item.stat}</strong>
                  </article>
                )
              })}
            </div>

            <div className="gear-progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${gearProgress || 0.02})` }} />
            </div>
          </div>
        </section>

        <section className="gallery-section" id="lookbook">
          <div className="section-heading gallery-heading">
            <p className="section-kicker">Field lookbook</p>
            <h2>
              Product mood,
              <br />
              shot in real snow
            </h2>
          </div>

          <div className="still-grid">
            {stillFrames.map((item) => (
              <article className="still-card" key={item.title}>
                <div className="still-media">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                <div className="still-meta glass-panel">
                  <p className="still-eyebrow">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section" id="build">
          <div className="cta-backdrop" />
          <div className="cta-content">
            <div className="cta-copy">
              <p className="section-kicker">Ready for the next pass</p>
              <h2>
                Build a kit for
                <br />
                your next storm day.
                <br />
                Start with the line.
              </h2>
            </div>

            <div className="cta-actions">
              <a className="cta-button primary" href="#top">
                Replay terrain test <ArrowRight size={18} />
              </a>
              <a className="cta-button secondary" href="mailto:gear@treeline.supply">
                Ask for gear fit <Mail size={18} />
              </a>
            </div>

            <div className="footer-links">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a className="footer-link" key={item.label} href={item.href}>
                    {Icon ? <Icon size={16} /> : <span className="dot" />}
                    <span>{item.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
