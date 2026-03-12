import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/templates.css";
import { TEMPLATES } from "../data/templates";

const FILTERS = ["All", "E-commerce", "Portfolio", "Blog", "Cheapest", "Saved"];

function BookmarkIcon({ saved }) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={saved ? "#1c2b5e" : "none"}
            stroke={saved ? "#1c2b5e" : "#888"}
            strokeWidth="2.2"
        >
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
    );
}

export default function TemplatesPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [activeFilter, setFilter] = useState("All");
    const [saved, setSaved] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("brndng_saved") || "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("brndng_saved", JSON.stringify(saved));
    }, [saved]);

    const toggleSave = (id) =>
        setSaved((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
        );

    const visible = TEMPLATES.filter((t) => {
        if (activeFilter === "Saved") return saved.includes(t.id);
        if (activeFilter === "Cheapest") return true;
        if (activeFilter === "All") return true;
        return t.category === activeFilter;
    })
        .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (activeFilter === "Cheapest")
                return parseFloat(a.price) - parseFloat(b.price);
            return 0;
        });

    return (
        <div className="tpl-page">
            {/* NAVBAR */}
            <header className="tpl-nav">
                <button className="tpl-nav-back" onClick={() => navigate("/")}>
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
                    className="tpl-nav-logo"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}
                >
                    b<span className="tpl-nav-logo-dot">.</span>
                </a>
                <div className="tpl-nav-right" />
            </header>

            {/* SEARCH + FILTERS */}
            <div className="tpl-header">
                <h1 className="tpl-header-title">Our Templates</h1>

                <div className="tpl-search-wrap">
                    <span className="tpl-search-icon">
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </span>
                    <input
                        className="tpl-search"
                        type="text"
                        placeholder="Search templates..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="tpl-filters">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            className={`tpl-filter-btn${f === "Saved" ? " saved-btn" : ""}${activeFilter === f ? " active" : ""}`}
                            onClick={() => setFilter(f)}
                        >
                            {f === "Saved"
                                ? `🔖 Saved${saved.length > 0 ? ` (${saved.length})` : ""}`
                                : f}
                        </button>
                    ))}
                </div>
            </div>

            {/* GRID */}
            <div className="tpl-content">
                <div className="tpl-grid">
                    {visible.length === 0 ? (
                        <div className="tpl-empty">
                            <span>No templates found</span>
                            {activeFilter === "Saved"
                                ? "You haven't saved any templates yet."
                                : "Try a different search or filter."}
                        </div>
                    ) : (
                        visible.map((t) => (
                            <div key={t.id} className="tpl-card">
                                {/* Image */}
                                <div className="tpl-card-img-wrap">
                                    <img
                                        className="tpl-card-img"
                                        src={t.image}
                                        alt={t.name}
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                            e.target.parentNode.style.background =
                                                "linear-gradient(135deg,#C8D9F5,#E8ECFF)";
                                        }}
                                    />
                                    <button
                                        className={`tpl-save-btn${saved.includes(t.id) ? " saved" : ""}`}
                                        onClick={() => toggleSave(t.id)}
                                        title={
                                            saved.includes(t.id)
                                                ? "Remove from saved"
                                                : "Save"
                                        }
                                    >
                                        <BookmarkIcon
                                            saved={saved.includes(t.id)}
                                        />
                                    </button>
                                    <div className="tpl-card-badge">
                                        b
                                        <span className="tpl-card-badge-dot">
                                            .
                                        </span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="tpl-card-body">
                                    <div className="tpl-card-top-row">
                                        <span className="tpl-card-name">
                                            {t.name}
                                        </span>
                                        <span className="tpl-card-price">
                                            {t.price}$/month
                                        </span>
                                    </div>
                                    <div className="tpl-card-desc">
                                        {t.description}
                                    </div>
                                    <span className="tpl-card-category">
                                        {t.category}
                                    </span>
                                    <ul className="tpl-card-features">
                                        {t.features.map((f) => (
                                            <li key={f}>{f}</li>
                                        ))}
                                    </ul>
                                    <div className="tpl-card-actions">
                                        <a
                                            href={t.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="tpl-btn-demo"
                                        >
                                            View demo
                                        </a>
                                        <button
                                            className="tpl-btn-buy"
                                            onClick={() =>
                                                navigate(
                                                    `/templates/${t.id}/buy`,
                                                )
                                            }
                                        >
                                            Buy template
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
