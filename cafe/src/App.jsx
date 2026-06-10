import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`

const drinks = [
  {
    name: 'Americano',
    note: 'Natural Arabica, 30 ml cup',
    price: '$2.50',
    image: assetPath('assets/web-latte-art.jpg'),
  },
  {
    name: 'Cappuccino',
    note: 'Coffee 50%, milk 50%, 280 ml',
    price: '$2.50',
    image: assetPath('assets/cappuccino-cup.jpg'),
  },
]

const services = ['Pricing', 'Tracking', 'Report a Bug', 'Terms of Services']

export default function App() {
  const shellRef = useRef(null)
  const videoRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      document.body.classList.remove('loaded')
      const loaderTimer = window.setTimeout(() => {
        document.body.classList.add('loaded')
      }, 5600)
      const video = videoRef.current
      const handleVideoEnd = () => document.body.classList.add('loaded')

      video?.addEventListener('ended', handleVideoEnd)
      video?.play().catch(() => {})

      gsap.from('.hero-copy > *, .hero-cup, .feature-card, .category-pill', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      })

      gsap.utils.toArray('.reveal').forEach((item) => {
        gsap.from(item, {
          y: 52,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
          },
        })
      })

      gsap.to('.bean', {
        y: -18,
        rotate: 18,
        stagger: 0.08,
        repeat: -1,
        yoyo: true,
        duration: 2.8,
        ease: 'sine.inOut',
      })

      return () => {
        window.clearTimeout(loaderTimer)
        video?.removeEventListener('ended', handleVideoEnd)
      }
    }, shellRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={shellRef}>
      <div className="site-loader" aria-hidden="true">
        <div className="video-loader">
          <video
            ref={videoRef}
            src={assetPath('assets/cafe-intro-minimal.mp4')}
            autoPlay
            muted
            defaultMuted
            playsInline
            preload="auto"
            onLoadedData={(event) => event.currentTarget.play?.().catch(() => {})}
          />
          <div className="video-loader-grade" />
          <div className="video-loader-vignette" />
        </div>
      </div>

      <div className="page-shell">
        <header className="site-header" id="home">
          <a className="brand" href="#home" aria-label="Flavored coffee home">
            <span>Flavored</span>
            <small>Wake up to something special.</small>
          </a>
          <nav className="site-nav" aria-label="Primary navigation">
            <a href="#home">Home</a>
            <a href="#menu">Coffee Menu</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact Us</a>
          </nav>
          <a className="shop-button" href="#menu">Coffee Shop</a>
        </header>

        <section className="hero-grid">
          <div className="hero-copy">
            <h1>Coffee<br />The Best For You</h1>
            <a className="dark-button" href="#menu">View Menu</a>
            <div className="category-row" aria-label="Coffee categories">
              <span className="category-pill">☕</span>
              <span className="category-pill">♨</span>
              <span className="category-pill">▣</span>
              <span className="category-pill">◇</span>
            </div>
          </div>
          <div className="hero-cup">
            <img src={assetPath('assets/web-caffe-latte.jpg')} alt="Latte art coffee cup on a cafe table" />
          </div>
        </section>

        <section className="menu-story" id="menu">
          <div className="drink-row reveal">
            {drinks.map((drink) => (
              <article className="feature-card" key={drink.name}>
                <img src={drink.image} alt={`${drink.name} cup`} />
                <h2>{drink.name}</h2>
                <p>{drink.note}</p>
                <div className="card-actions">
                  <span>⌑</span>
                  <span>♡</span>
                </div>
                <strong>{drink.price}</strong>
              </article>
            ))}
          </div>
          <div className="story-copy reveal">
            <h2>Lorem Ipsum is<br />simply dummy text of</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Our cafe keeps the soft foam, roasted aroma, and premium table experience.
            </p>
            <a className="small-button" href="#about">Learn More</a>
          </div>
        </section>

        <section className="about-block reveal" id="about">
          <div className="about-copy">
            <h2>Lorem Ipsum is simply dummy text<br />of the printing and typesetting industry.</h2>
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and shaped it into a warm cafe story.
            </p>
            <a className="small-button" href="#contact">Learn More</a>
          </div>
          <div className="latte-orbit">
            <img src={assetPath('assets/web-caffe-latte.jpg')} alt="Latte art with scattered coffee beans" />
            <span className="price-badge">$2.50</span>
            {Array.from({ length: 22 }).map((_, index) => (
              <span key={index} className="bean" style={{ '--i': index }} />
            ))}
          </div>
        </section>

        <section className="app-block reveal">
          <div className="phone-card phone-menu">
            <span className="back-mark">‹</span>
            <h3>Coffee</h3>
            <a className="tiny-button" href="#menu">View Menu</a>
            <div className="mini-icons">
              <span>☕</span><span>♨</span><span>▣</span><span>◇</span>
            </div>
            <div className="mini-grid">
              {drinks.map((drink) => (
                <article key={drink.name}>
                  <img src={drink.image} alt="" />
                  <h4>{drink.name}</h4>
                  <p>{drink.note}</p>
                  <strong>$2.50</strong>
                </article>
              ))}
            </div>
            <div className="bottom-nav"><span>⌂</span><span>⌑</span><span>♡</span><span>≡</span></div>
          </div>

          <div className="phone-card detail-card">
            <span className="back-mark">‹</span>
            <img src={assetPath('assets/cappuccino-cup.jpg')} alt="Latte Grand coffee cup" />
            <h3>Latte Grand</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="detail-actions"><span>$3.50</span><button type="button">Add to Cart</button></div>
          </div>

          <div className="download-copy">
            <h2>App is Available</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Enjoy a soft, minimal coffee ordering experience.
            </p>
            <div className="store-row">
              <button type="button">●</button>
              <button type="button">▶</button>
            </div>
          </div>
        </section>

        <section className="reserve-block reveal" id="contact">
          <div>
            <p className="eyebrow">Lets Talk</p>
            <h2>Want to Reserve a Table?</h2>
          </div>
          <a className="dark-button" href="mailto:hello@flavored.cafe">Contact Now</a>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Send us a note and we will prepare the warmest corner for your next cup.
          </p>
        </section>

        <footer className="site-footer">
          <div className="footer-brand">
            <span>Flavored</span>
            <small>Wake up to something special.</small>
          </div>
          <div>
            <h3>Our Services</h3>
            {services.map((item) => <a key={item} href="#home">{item}</a>)}
          </div>
          <div>
            <h3>Our Company</h3>
            {services.map((item) => <a key={item} href="#home">{item}</a>)}
          </div>
          <div>
            <h3>Address</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
