import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getTemplate,
    saveOrder,
    loadOrder,
    DOMAIN_PRICE,
} from "../data/templates";
import "../styles/buy.css";

function BookmarkIcon({ saved }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={saved ? "#1c2b5e" : "none"}
            stroke={saved ? "#1c2b5e" : "#888"}
            strokeWidth="2.2"
        >
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

export default function TemplateBuyPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const template = getTemplate(id);

    // domain addon: "get_one" | "already_own"
    const [domain, setDomain] = useState(() => {
        const order = loadOrder();
        return order.domain || "get_one"; // default: get one
    });

    // saved (bookmark)
    const [saved, setSaved] = useState(() => {
        try {
            const s = JSON.parse(localStorage.getItem("brndng_saved") || "[]");
            return s.includes(Number(id));
        } catch {
            return false;
        }
    });

    const toggleSave = () => {
        setSaved((prev) => {
            const list = JSON.parse(
                localStorage.getItem("brndng_saved") || "[]",
            );
            const next = prev
                ? list.filter((s) => s !== Number(id))
                : [...list, Number(id)];
            localStorage.setItem("brndng_saved", JSON.stringify(next));
            return !prev;
        });
    };

    // Persist domain choice to order in localStorage
    useEffect(() => {
        if (!template) return;
        const order = loadOrder();
        saveOrder({
            ...order,
            templateId: template.id,
            templateName: template.name,
            templatePrice: template.price,
            domain,
        });
    }, [domain, template]);

    if (!template) {
        return (
            <div
                className="flow-page"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#999", marginBottom: "1rem" }}>
                        Template not found.
                    </p>
                    <button
                        onClick={() => navigate("/templates")}
                        style={{
                            background: "#1C2B5E",
                            color: "#fff",
                            border: "none",
                            borderRadius: "999px",
                            padding: "0.7rem 1.8rem",
                            cursor: "pointer",
                            fontFamily: "Bricolage Grotesque, sans-serif",
                            fontWeight: 700,
                        }}
                    >
                        Back to templates
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flow-page">
            {/* NAV */}
            <header className="flow-nav">
                <button
                    className="flow-nav-back"
                    onClick={() => navigate("/templates")}
                >
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

            <div className="buy-wrap">
                {/* TEMPLATE IMAGE */}
                <div className="buy-img-wrap">
                    <img
                        className="buy-img"
                        src={template.image}
                        alt={template.name}
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                    <button
                        className="buy-img-save"
                        onClick={toggleSave}
                        title={saved ? "Remove from saved" : "Save"}
                    >
                        <BookmarkIcon saved={saved} />
                    </button>
                </div>

                {/* MAIN 2-COL */}
                <div className="buy-main">
                    {/* LEFT: info */}
                    <div className="buy-info">
                        <h1 className="buy-name">{template.name}</h1>
                        <p className="buy-desc">{template.description}</p>
                        <ul className="buy-features">
                            {template.features.map((f) => (
                                <li key={f}>{f}</li>
                            ))}
                        </ul>
                        <div className="buy-price">{template.price}$/month</div>
                        <div className="buy-actions">
                            <a
                                href={template.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="buy-btn-demo"
                            >
                                View demo
                            </a>
                            <div className="buy-btn-buy-wrap">
                                <span className="buy-free-text">
                                    Get first month for free
                                </span>
                                <button
                                    className="buy-btn-buy"
                                    onClick={() =>
                                        navigate(`/templates/${id}/confirm`)
                                    }
                                >
                                    Buy template
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: add-ons */}
                    <div className="buy-addons">
                        <div className="buy-addons-title">Add ons</div>
                        <div className="buy-addon-item">
                            <div className="buy-addon-check">
                                <CheckIcon />
                            </div>
                            <div>
                                <div className="buy-addon-label">
                                    Domain name
                                </div>
                                <div className="buy-addon-sublabel">
                                    +${DOMAIN_PRICE} one-time
                                </div>
                            </div>
                        </div>
                        <div className="buy-addon-btns">
                            <button
                                className={`buy-addon-btn ${domain === "get_one" ? "selected" : "unselected"}`}
                                onClick={() => setDomain("get_one")}
                            >
                                Get one
                            </button>
                            <button
                                className={`buy-addon-btn ${domain === "already_own" ? "selected" : "unselected"}`}
                                onClick={() => setDomain("already_own")}
                            >
                                I already own it
                            </button>
                        </div>
                    </div>
                </div>

                {/* TERMS & CONDITIONS */}
                <div className="buy-terms">
                    <h2 className="buy-terms-title">Terms & Conditions</h2>

                    <div className="buy-terms-section">
                        <h3 className="buy-terms-heading">
                            1. Subscription & Billing
                        </h3>
                        <p>
                            Your subscription begins on the day your website
                            goes live. The first month is free on monthly plans.
                            After the free period, billing occurs monthly or
                            yearly depending on your chosen plan. Payments must
                            be received before each renewal date to keep your
                            website active.
                        </p>
                    </div>

                    <div className="buy-terms-section">
                        <h3 className="buy-terms-heading">2. Late Payments</h3>
                        <p>
                            A payment is considered late if not received within{" "}
                            <strong>24 hours</strong> of its due date. After
                            this grace period, your website will be
                            automatically taken offline until the outstanding
                            payment is settled. brndng. will send a reminder
                            before any suspension. Reactivation happens within a
                            few hours of confirmed payment.
                        </p>
                    </div>

                    <div className="buy-terms-section">
                        <h3 className="buy-terms-heading">
                            3. Cancellation Policy
                        </h3>
                        <p>
                            You may cancel your subscription at any time by
                            contacting brndng. via WhatsApp or email at least{" "}
                            <strong>5 days before</strong> your next renewal
                            date. Cancellations made after the renewal date will
                            take effect at the end of that billing period. No
                            partial refunds are issued for unused time within a
                            paid period.
                        </p>
                    </div>

                    <div className="buy-terms-section">
                        <h3 className="buy-terms-heading">4. Refund Policy</h3>
                        <p>
                            Because templates are delivered digitally and setup
                            work begins immediately, <strong>no refunds</strong>{" "}
                            are issued once the website has been set up and
                            delivered. If there is a technical issue caused by
                            brndng. that cannot be resolved within 72 hours, a
                            full refund for that period may be issued at
                            brndng.'s discretion.
                        </p>
                    </div>

                    <div className="buy-terms-section">
                        <h3 className="buy-terms-heading">
                            6. Hosting & Uptime
                        </h3>
                        <p>
                            brndng. provides hosting as part of your
                            subscription. We aim for 99.9% uptime. Scheduled
                            maintenance will be communicated in advance. brndng.
                            is not liable for downtime caused by third-party
                            infrastructure failures beyond our control.
                        </p>
                    </div>

                    <div className="buy-terms-section">
                        <h3 className="buy-terms-heading">
                            8. Client Responsibilities
                        </h3>
                        <p>
                            You are responsible for ensuring all content you
                            provide (text, images, logos) does not infringe on
                            any third-party copyrights or intellectual property
                            rights. brndng. is not liable for any legal claims
                            arising from content supplied by the client.
                        </p>
                    </div>

                    <div className="buy-terms-section">
                        <h3 className="buy-terms-heading">
                            9. Intellectual Property
                        </h3>
                        <p>
                            The template design and underlying code remain the
                            intellectual property of brndng. Your subscription
                            grants you a non-exclusive licence to use the
                            template for the duration of your active
                            subscription. Upon cancellation, access to the
                            hosted website will be suspended.
                        </p>
                    </div>

                    <div className="buy-terms-section">
                        <h3 className="buy-terms-heading">
                            10. Changes to Terms
                        </h3>
                        <p>
                            brndng. reserves the right to update these terms at
                            any time. Clients will be notified of significant
                            changes via WhatsApp or email at least 14 days in
                            advance. Continued use of the service after
                            notification constitutes acceptance of the updated
                            terms.
                        </p>
                    </div>

                    <p className="buy-terms-footer">
                        By clicking <strong>Buy template</strong> you confirm
                        that you have read, understood, and agreed to these
                        terms and conditions.
                    </p>
                </div>
            </div>
        </div>
    );
}
