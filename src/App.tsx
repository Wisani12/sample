import { FormEvent, useEffect, useRef, useState } from 'react'

type Stat = { value: number; suffix: string; label: string; detail: string }

const stats: Stat[] = [
  { value: 14, suffix: '+', label: 'Years of experience', detail: 'Established in 2010' },
  { value: 120, suffix: '+', label: 'Corporate clients', detail: 'Public and commercial sectors' },
  { value: 18, suffix: 'k+', label: 'Medical assessments', detail: 'Delivered with care' },
  { value: 9, suffix: '', label: 'Provinces covered', detail: 'Nationwide service reach' },
  { value: 100, suffix: '%', label: 'Compliance focus', detail: 'Quality-led programmes' },
]

const services = [
  ['Occupational Health', 'Workplace health programmes, examinations and fitness-for-duty assessments.', 'photo-1584515933487-779824d29309'],
  ['Primary Healthcare', 'Accessible preventative and primary care designed around your workforce.', 'photo-1576091160550-2173dba999ef'],
  ['Wellness Programmes', 'Health promotion, HIV wellness and lifestyle programmes for healthier teams.', 'photo-1516822003754-cca485356ecb'],
  ['Medical Surveillance', 'Ongoing monitoring to identify occupational health risks early.', 'photo-1579684385127-1ef15d508118'],
  ['Mobile Clinic Services', 'Professional healthcare delivered where your people work.', 'photo-1584982751601-97dcc096659c'],
  ['Executive Medical Assessments', 'Discreet, efficient health assessments for leadership teams.', 'photo-1559757175-0eb30cd8c063'],
  ['Drug & Alcohol Testing', 'Reliable workplace testing that supports safety and compliance.', 'photo-1580281658628-8c5d2f5b5b7f'],
  ['Vaccinations', 'Workplace vaccination and infectious disease prevention services.', 'photo-1612277795421-9bc7706a4a34'],
  ['Health Risk Assessments', 'Practical insight into risks, controls and workforce wellbeing.', 'photo-1505751172876-fa1923c5c528'],
]

const industries = ['Construction', 'Mining', 'Manufacturing', 'Logistics', 'Transport', 'Government', 'Energy', 'Corporate', 'Healthcare']
const industryIcons = ['⌂', '◆', '▦', '→', '▱', '◇', 'ϟ', '▣', '+']

function AnimatedStat({ stat, active }: { stat: Stat; active: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let frame = 0
    const totalFrames = 45
    const timer = window.setInterval(() => {
      frame += 1
      setCount(Math.round(stat.value * Math.min(frame / totalFrames, 1)))
      if (frame >= totalFrames) window.clearInterval(timer)
    }, 24)
    return () => window.clearInterval(timer)
  }, [active, stat.value])
  return <article><strong>{count}{stat.suffix}</strong><span>{stat.label}</span><small>{stat.detail}</small></article>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [statsActive, setStatsActive] = useState(false)
  const statsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = statsRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStatsActive(true)
        observer.disconnect()
      }
    }, { threshold: 0.25 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <main className="site-shell">
      <div className="announcement"><span>Nationwide service coverage across South Africa</span><span>•</span><a href="tel:0871507893">Emergency support: 087 150 7893</a></div>
      <header className="site-header" id="top">
        <a className="brand brand-large" href="#top" aria-label="Timbavati Medical Services home"><span className="brand-symbol">T</span><span>Timbavati <b>Medical Services</b></span></a>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <nav className={menuOpen ? 'site-nav open' : 'site-nav'}>
          <a href="#top" onClick={() => setMenuOpen(false)}>Home</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a><a href="#clients" onClick={() => setMenuOpen(false)}>Clients</a><a href="tel:0871507893" className="call-cta" onClick={() => setMenuOpen(false)}>Call us <span>087 150 7893</span></a><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Book an assessment <span>↗</span></a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy"><p className="eyebrow light">Timbavati Medical Services · Est. 2010</p><h1>Occupational Health Solutions That Keep Your Workforce <i>Healthy, Safe & Compliant.</i></h1><p className="hero-text">Delivering occupational health, primary healthcare, wellness programmes and medical surveillance to organisations across South Africa.</p><div className="hero-actions"><a className="hero-button" href="#contact">Book an assessment <span>↗</span></a><a className="hero-outline" href="#services">Explore our services <span>↓</span></a></div></div>
        <div className="hero-image"><div className="image-note"><span className="pulse" /> Nationwide workplace healthcare</div></div>
      </section>

      <section className="stats-strip" ref={statsRef} aria-label="Company statistics">{stats.map((stat) => <AnimatedStat key={stat.label} stat={stat} active={statsActive} />)}</section>

      <section className="section about-intro" id="about"><div><p className="eyebrow">About Timbavati Medical Services</p><h2>Prevention is<br /><i>powerful medicine.</i></h2></div><div className="about-overview"><p>Timbavati Medical Services is a proudly 100% black-owned South African company providing comprehensive occupational medicine, occupational hygiene, occupational health and safety, wellness and primary healthcare services.</p><a className="text-link" href="#contact">Meet the TMS team <span>↗</span></a></div></section>
      <section className="about-detail"><div className="team-image" /><div className="about-points"><article><span>Mission</span><p>To implement comprehensive preventative care, workplace safety programmes and accurate work-readiness assessments through specialised multidisciplinary approaches.</p></article><article><span>Vision</span><p>To be a global leader in quality primary healthcare, occupational medicine, hygiene, safety and employee wellness.</p></article><article><span>Values</span><p>Integrity, quality, collaboration, accountability and practical care that creates lasting value for people and organisations.</p></article></div></section>

      <section className="section services-section" id="services"><div className="section-heading"><div><p className="eyebrow">Our services</p><h2>Complete care for<br /><i>working lives.</i></h2></div><p>From a single assessment to a complete workplace health programme, our specialists meet organisations where they are.</p></div><div className="service-cards">{services.map(([title, description, image], index) => <article className="service-card" key={title}><div className="service-card-image" style={{ backgroundImage: `url(https://images.unsplash.com/${image}?auto=format&fit=crop&w=700&q=80)` }} /><div className="service-card-content"><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p><a href="#contact" aria-label={`Learn more about ${title}`}>↗</a></div></article>)}</div></section>

      <section className="industry-section" id="industries"><div className="section"><p className="eyebrow">Industries we serve</p><h2>Health solutions for<br /><i>every working environment.</i></h2><div className="industry-grid">{industries.map((industry, index) => <a href="#contact" key={industry}><span>{industryIcons[index]}</span><strong>{industry}</strong><b>↗</b></a>)}</div></div></section>

      <section className="clients-section" id="clients"><div className="section clients-inner"><div><p className="eyebrow">Our clients</p><h2>One partner for<br /><i>healthier organisations.</i></h2></div><div><p>We work with public and commercial sector clients who value practical, trusted and compliant healthcare partnerships.</p><a className="text-link" href="#contact">Partner with TMS <span>↗</span></a></div></div></section>
      <section className="gallery-section" id="gallery"><div className="section"><p className="eyebrow">Gallery</p><div className="gallery-heading"><h2>Care in<br /><i>action.</i></h2><p>A glimpse into the people, programmes and workplaces at the heart of our work.</p></div><div className="gallery-grid"><div className="gallery-image gallery-one" /><div className="gallery-image gallery-two" /><div className="gallery-image gallery-three" /></div></div></section>
      <section className="booking-section" id="bookings"><div className="booking-inner"><div><p className="eyebrow light">Bookings</p><h2>Ready to make<br /><i>an impact?</i></h2></div><div><p>Book an assessment with our team to discuss your occupational health, safety or wellness requirements.</p><a className="hero-button" href="#contact">Book an assessment <span>↗</span></a></div></div></section>
      <section className="resources-section" id="resources"><div className="section"><p className="eyebrow">Resources</p><h2>Useful knowledge for<br /><i>healthier workplaces.</i></h2><div className="resource-list"><a href="#contact"><span>Guide</span><strong>Workplace health and safety essentials</strong><b>↗</b></a><a href="#contact"><span>Insight</span><strong>Building a culture of preventative care</strong><b>↗</b></a><a href="#contact"><span>Support</span><strong>Talk to a TMS occupational health specialist</strong><b>↗</b></a></div></div></section>

      <section className="contact-section" id="contact"><div className="contact-copy"><p className="eyebrow light">Start a conversation</p><h2>Let’s make<br /><i>work healthier.</i></h2><p>Tell us what your organisation needs. Our team will be in touch to explore the right solution.</p><div className="contact-details"><a href="tel:0871507893">087 150 7893</a><a href="mailto:info@tmedicals.co.za">info@tmedicals.co.za</a><span>Johannesburg · Mafikeng · Polokwane</span></div></div><form className="contact-form" onSubmit={sendMessage}>{submitted ? <div className="success-message"><span>✓</span><h3>Thank you.</h3><p>Your enquiry has been received. We’ll be in touch soon.</p><button type="button" onClick={() => setSubmitted(false)}>Send another message</button></div> : <><label>Full name<input name="name" required placeholder="Your name" /></label><label>Work email<input name="email" type="email" required placeholder="you@company.co.za" /></label><label>How can we help?<textarea name="message" required rows={4} placeholder="Tell us a little about your organisation"></textarea></label><button className="submit-button" type="submit">Send enquiry <span>↗</span></button></>}</form></section>
      <footer className="site-footer"><a className="brand" href="#top"><span className="brand-symbol">T</span><span>Timbavati <b>Medical Services</b></span></a><p>Occupational Health · Safety · Wellness · Primary Healthcare</p><span>© 2026 Timbavati Medical Services</span></footer>
    </main>
  )
}

export default App
