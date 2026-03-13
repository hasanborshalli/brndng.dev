import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

// Add your logo files to public/images/partners/
// Name them: partner-1.png, partner-2.png ... partner-N.png
// Duplicated for seamless infinite loop
const PARTNERS = [
    "/images/abcc.png",
    "/images/abosaleh.png",
    "/images/indulgia.png",
    "/images/labmaster.png",
    "/images/oro.png",
    "/images/sleiman.png",
    "/images/span.png",
    "/images/toyland-logo.png",
    "/images/trendy4less-logo.png",
    "/images/zeinab-abdallah.png",
    "/images/abcc.png",
    "/images/indulgia.png",
    "/images/labmaster.png",
    "/images/oro.png",
    "/images/sleiman.png",
    "/images/span.png",
    "/images/toyland-logo.png",
    "/images/trendy4less-logo.png",
    "/images/zeinab-abdallah.png",
];

const FOUNDERS = [
    { name: "Mohammad Ali Keshli", role: "CEO", img: "/images/founder-1.png" },
    {
        name: "Hasan Borshalli",
        role: "Head of development",
        img: "/images/founder-2.png",
    },
    {
        name: "Ahmad Orfali",
        role: "Head of finance",
        img: "/images/founder-3.png",
    },
];

export default function HomePage() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => (e) => {
        e.preventDefault();
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const goTemplates = (e) => {
        e.preventDefault();
        navigate("/templates");
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className={`nav${scrolled ? " scrolled" : ""}`}>
                <a href="/" className="nav-logo">
                    b<span className="nav-logo-dot">.</span>
                </a>
                <ul className="nav-links">
                    <li>
                        <a href="#services" onClick={scrollTo("services")}>
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#founders" onClick={scrollTo("founders")}>
                            Meet the team
                        </a>
                    </li>
                    <li>
                        <a href="#whyus" onClick={scrollTo("whyus")}>
                            Why us
                        </a>
                    </li>
                    <li>
                        <a href="#contact" onClick={scrollTo("contact")}>
                            Get in touch
                        </a>
                    </li>
                </ul>
                <button
                    className={`nav-hamburger${menuOpen ? " open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </nav>

            <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
                <a href="#services" onClick={scrollTo("services")}>
                    Services
                </a>
                <a href="#founders" onClick={scrollTo("founders")}>
                    Meet the team
                </a>
                <a href="#whyus" onClick={scrollTo("whyus")}>
                    Why us
                </a>
                <a href="#contact" onClick={scrollTo("contact")}>
                    Get in touch
                </a>
            </div>

            {/* HERO */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Building brands</h1>
                    <h2 className="hero-subtitle">Crafting identities</h2>
                    <div className="hero-cta">
                        <a
                            href="/templates"
                            className="pill-btn"
                            onClick={goTemplates}
                        >
                            Get your website for 10$
                        </a>
                    </div>
                </div>
            </section>

            {/* START FREE */}
            <section className="start-free">
                <div>
                    <h2 className="start-title">
                        Start an online store
                        <br />
                        for free!
                    </h2>
                    <p className="start-desc">
                        brndng is your all-in-one platform to build, launch, and
                        grow your online store.
                        <br />
                        Choose from ready-to-use, high-converting templates,
                        customize with ease, and go live fast.
                        <br />
                        Plans start at just <strong>$10/month</strong>.
                    </p>
                    <div className="start-cta">
                        <a
                            href="/templates"
                            className="dark-btn"
                            onClick={goTemplates}
                        >
                            Start for free!
                        </a>
                    </div>
                </div>
                <div className="start-visual">
                    <div className="mockup-browser">
                        <div className="mockup-topbar">
                            <div
                                className="mockup-dot"
                                style={{ background: "#FF5F57" }}
                            />
                            <div
                                className="mockup-dot"
                                style={{ background: "#FFBD2E" }}
                            />
                            <div
                                className="mockup-dot"
                                style={{ background: "#28C840" }}
                            />
                        </div>
                        <div className="mockup-body">
                            <div className="mockup-nav-placeholder" />
                            <div className="mockup-grid">
                                {[
                                    {
                                        img: "linear-gradient(135deg,#E8932A,#C0392B)",
                                        p: "#1E1E4A",
                                    },
                                    {
                                        img: "linear-gradient(135deg,#2B2B6A,#4A6CF7)",
                                        p: "#1E1E4A",
                                    },
                                    {
                                        img: "linear-gradient(135deg,#43e97b,#38f9d7)",
                                        p: "#1E1E4A",
                                    },
                                    {
                                        img: "linear-gradient(135deg,#f093fb,#f5576c)",
                                        p: "#E8932A",
                                    },
                                ].map((c, i) => (
                                    <div key={i} className="mockup-card">
                                        <div className="mockup-card-inner">
                                            <div
                                                className="mockup-card-img"
                                                style={{ background: c.img }}
                                            />
                                            <div className="mockup-card-text">
                                                <div
                                                    className="mockup-line"
                                                    style={{
                                                        background: "#ddd",
                                                        width: "80%",
                                                    }}
                                                />
                                                <div
                                                    className="mockup-line"
                                                    style={{
                                                        background: c.p,
                                                        width: "45%",
                                                        height: "5px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SMART SELLING */}
            <section className="smart">
                <h2 className="smart-title">
                    Smart selling
                    <br />
                    starts here
                </h2>
                <div className="smart-cards">
                    <div className="smart-card">
                        <div className="smart-card-visual">
                            <div
                                style={{
                                    position: "relative",
                                    width: 140,
                                    height: 140,
                                }}
                            >
                                <div
                                    className="shop-phone"
                                    style={{
                                        position: "absolute",
                                        right: 0,
                                        top: 0,
                                    }}
                                />
                                <div
                                    className="shop-basket"
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                    }}
                                >
                                    🛒
                                </div>
                                <div className="shop-dot" />
                            </div>
                        </div>
                        <span className="smart-card-label">
                            Ready to use templates
                        </span>
                    </div>
                    <div className="smart-card">
                        <div className="smart-card-visual">
                            <img
                                src="/images/earth.webp"
                                alt="Earth"
                                style={{
                                    width: 140,
                                    height: 140,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    display: "block",
                                    boxShadow: "0 0 40px rgba(30,110,168,0.45)",
                                }}
                            />
                        </div>
                        <span className="smart-card-label">
                            Fast and reliable hosting
                        </span>
                    </div>
                </div>
                <div className="smart-cta">
                    <a
                        href="/templates"
                        className="pill-btn-dark"
                        onClick={goTemplates}
                    >
                        View templates
                    </a>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="services">
                <span className="section-eyebrow">Services</span>
                <div className="services-grid">
                    {[
                        {
                            icon: "🌐",
                            bg: "#EEF2FF",
                            name: "Websites",
                            desc: "Beautiful, responsive websites tailored to your brand — fast, SEO-optimised, and built to convert.",
                        },
                        {
                            icon: "⚙️",
                            bg: "#FFF7ED",
                            name: "Systems",
                            desc: "Custom backend systems, dashboards, and business tools that automate and streamline your operations.",
                        },
                        {
                            icon: "📱",
                            bg: "#F0FDF4",
                            name: "Apps",
                            desc: "Mobile and web applications designed for performance, usability, and seamless user experiences.",
                        },
                    ].map((s) => (
                        <div key={s.name} className="service-card">
                            <div
                                className="service-icon-wrap"
                                style={{
                                    background: s.bg,
                                    fontSize: "1.45rem",
                                }}
                            >
                                {s.icon}
                            </div>
                            <h3 className="service-name">{s.name}</h3>
                            <p className="service-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* WHY US */}
            <section id="whyus" className="whyus">
                <span
                    className="section-eyebrow"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                >
                    Why us?
                </span>
                <div className="whyus-grid">
                    {[
                        {
                            num: "01",
                            title: "Ready in 24 hours",
                            body: "From first conversation to live website — our streamlined process gets your store online fast, without cutting corners on quality.",
                        },
                        {
                            num: "02",
                            title: "Built to convert",
                            body: "Every template is engineered for conversion — clean layouts, persuasive CTAs, and mobile-first experiences that turn visitors into buyers.",
                        },
                    ].map((c) => (
                        <div key={c.num} className="whyus-card">
                            <div className="whyus-card-num">{c.num}</div>
                            <h3>{c.title}</h3>
                            <p>{c.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PARTNERS */}
            <section className="partners">
                <div className="marquee-outer">
                    <div className="marquee-track">
                        {PARTNERS.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`Partner ${(i % 6) + 1}`}
                                className="marquee-logo"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* FOUNDERS */}
            <section id="founders" className="founders">
                <h2 className="founders-title">Founders</h2>
                <div className="founders-grid">
                    {FOUNDERS.map((f) => (
                        <div key={f.name} className="founder-card">
                            <img
                                className="founder-avatar"
                                src={f.img}
                                alt={f.name}
                            />
                            <div className="founder-name">
                                {f.name.toUpperCase()}
                            </div>
                            <div className="founder-role">{f.role}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SKILLS */}
            <section className="skills-section">
                <div className="skills-row">
                    <span className="skill-word">Design</span>
                    <img
                        src="/images/skill-1.webp"
                        alt=""
                        className="skill-img"
                    />
                    <span className="skill-word">UI/UX</span>
                </div>
                <div className="skills-row">
                    <img
                        src="/images/skill-2.webp"
                        alt=""
                        className="skill-img-sm"
                    />
                    <img
                        src="/images/skill-3.webp"
                        alt=""
                        className="skill-img-sm"
                    />
                    <span className="skill-word">Websites</span>
                </div>
                <div className="skills-row">
                    <span className="skill-word">Systems</span>
                    <img
                        src="/images/skill-4.webp"
                        alt=""
                        className="skill-img"
                    />
                    <img
                        src="/images/skill-5.webp"
                        alt=""
                        className="skill-img"
                    />
                    <span className="skill-word">Apps</span>
                </div>
                <div className="skills-row">
                    <img
                        src="/images/skill-6.webp"
                        alt=""
                        className="skill-img-wide"
                    />
                    <span className="skill-word">e-commerce</span>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="contact">
                <div className="contact-grid">
                    {/* Left — decorative panel, no play button */}
                    <div className="contact-video">
                        <div className="contact-video-shapes">
                            <div
                                className="cv-sphere"
                                style={{
                                    width: 180,
                                    height: 180,
                                    background:
                                        "radial-gradient(circle,#7C40E8,#4030B0)",
                                    top: "10%",
                                    left: "15%",
                                }}
                            />
                            <div
                                className="cv-sphere"
                                style={{
                                    width: 100,
                                    height: 100,
                                    background:
                                        "radial-gradient(circle,#5040D0,#2A2080)",
                                    bottom: "15%",
                                    right: "20%",
                                }}
                            />
                            <div
                                className="cv-sphere"
                                style={{
                                    width: 60,
                                    height: 60,
                                    background:
                                        "radial-gradient(circle,#A060F8,#6040C8)",
                                    top: "55%",
                                    left: "60%",
                                }}
                            />
                            <div
                                className="cv-sphere"
                                style={{
                                    width: 40,
                                    height: 40,
                                    background:
                                        "radial-gradient(circle,#C080FF,#8060E0)",
                                    top: "25%",
                                    right: "15%",
                                }}
                            />
                        </div>
                    </div>
                    {/* Right — info */}
                    <div>
                        <h2 className="contact-title">
                            CONTACT
                            <br />
                            US
                        </h2>
                        <div className="contact-info-card">
                            {[
                                { label: "Email", value: "info@brndnglb.com" },
                                { label: "Website", value: "brndnglb.com" },
                                { label: "Phone", value: "+961 76 679 623" },
                            ].map((r) => (
                                <div key={r.label} className="contact-info-row">
                                    <span className="contact-info-label">
                                        {r.label}
                                    </span>
                                    <span className="contact-info-value">
                                        {r.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <a href="mailto:info@brndnglb.com" className="book-btn">
                            BOOK NOW
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
