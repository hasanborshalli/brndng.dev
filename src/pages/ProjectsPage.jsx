import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/projects.css";
import "../styles/buy.css"; /* reuse flow-nav styles */

/* ─────────────────────────────────────────────
   PROJECTS DATA
   Add your real projects here.
   image → public/images/projects/
   url   → live website link
───────────────────────────────────────────── */
export const PROJECTS = [
    {
        id: 1,
        title: "Hayek Gaming Ground",
        category: "E-commerce",
        description:
            "A dynamic platform for Hayek Gaming built for gaming enthusiasts and esports fans. Features comprehensive product listings including headsets, keyboards, mice, monitors, and gaming accessories with sleek design and intuitive navigation.",
        image: "/images/hayekweb.png",
        logo: "/hayek.svg",
        url: "https://hayekgaming.com",
        tags: ["Online Store", "Gaming", "Esports"],
    },
    {
        id: 2,
        title: "Trendy4Less",
        category: "E-commerce",
        description:
            "A modern online store offering trendy, budget-friendly products with delivery all over Lebanon. Features category browsing, powerful search and filtering, and a smooth checkout experience with a clean responsive UI.",
        image: "/images/trendy4lessweb.png",
        logo: "/trendy4less-logo.jpg",
        url: "https://trendy4less.shop",
        tags: ["Online Store", "Fast Delivery", "Lebanon"],
    },
    {
        id: 3,
        title: "Abo Saleh Real Estate",
        category: "Portfolio",
        description:
            "A professional real estate website showcasing properties for sale and rent. Features advanced property filtering, detailed listings, and an integrated contact system to streamline inquiries for buyers, tenants, and agents.",
        image: "/images/abousalehweb.png",
        logo: "/abosaleh.png",
        url: "https://abousaleh.me",
        tags: ["Real Estate", "Property Listings", "Lebanon"],
    },
    {
        id: 4,
        title: "Indulgia",
        category: "Portfolio",
        description:
            "A premium chocolate brand website for Indulgia, showcasing handcrafted artisanal chocolates. Features immersive visuals, smooth animations, and a luxury-focused design that reflects the brand's refined identity.",
        image: "/images/indulgiaweb.png",
        logo: "/indulgia.png",
        url: "https://indulgia-lb.com",
        tags: ["Luxury", "Chocolate", "Artisanal"],
    },
    {
        id: 5,
        title: "Lab Master",
        category: "Portfolio",
        description:
            "A modern website for Lab Master, a premier supplier of laboratory equipment and medical consumables in Lebanon. Presents their full product catalog with clean UI, smooth navigation, and quotation request functionality.",
        image: "/images/lab.png",
        logo: "/labmaster.png",
        url: "https://labmasterlb.com",
        tags: ["Medical", "Scientific", "Catalog"],
    },
    {
        id: 6,
        title: "SACLB",
        category: "E-commerce",
        description:
            "A bilingual (Arabic & English) corporate website for Sleiman for Agriculture and Commerce, a leading supplier of agricultural and veterinary products in Lebanon. Clean modern design with full responsiveness.",
        image: "/images/saclb.png",
        logo: "/sleiman.png",
        url: "https://saclb.com",
        tags: ["Agriculture", "Corporate", "Bilingual"],
    },
];

const FILTERS = ["All", "E-commerce", "Portfolio"];

export default function ProjectsPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All");

    const visible = PROJECTS.filter(
        (p) => filter === "All" || p.category === filter,
    );

    return (
        <div className="proj-page">
            {/* NAV */}
            <header className="flow-nav">
                <button className="flow-nav-back" onClick={() => navigate("/")}>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back
                </button>
                <a
                    href="/"
                    className="flow-nav-logo"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}
                >
                    b<span className="flow-nav-logo-dot">.</span>
                </a>
                <div className="flow-nav-right" />
            </header>

            {/* PAGE HEADER */}
            <div className="proj-header">
                <p className="proj-eyebrow">Our work</p>
                <h1 className="proj-title">Projects we've built</h1>
                <p className="proj-subtitle">
                    Real websites, delivered for real clients. Every project is
                    crafted with care, built to perform, and designed to
                    convert.
                </p>
                <div className="proj-filters">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            className={`proj-filter-btn${filter === f ? " active" : ""}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* GRID */}
            <div className="proj-content">
                <div className="proj-grid">
                    {visible.map((p) => (
                        <div key={p.id} className="proj-card">
                            <div className="proj-card-img-wrap">
                                <img
                                    className="proj-card-img"
                                    src={p.image}
                                    alt={p.title}
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.parentNode.style.background =
                                            "linear-gradient(135deg,#1C2B5E,#3D3D96)";
                                    }}
                                />
                                <span className="proj-card-category">
                                    {p.category}
                                </span>
                            </div>
                            <div className="proj-card-body">
                                <h3 className="proj-card-title">{p.title}</h3>
                                <p className="proj-card-desc">
                                    {p.description}
                                </p>
                                <div className="proj-card-tags">
                                    {p.tags.map((t) => (
                                        <span key={t} className="proj-tag">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={p.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="proj-btn"
                                >
                                    View project
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <line x1="7" y1="17" x2="17" y2="7" />
                                        <polyline points="7 7 17 7 17 17" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
