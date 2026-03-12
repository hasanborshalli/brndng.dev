import { useNavigate, useParams } from "react-router-dom";
import { getTemplate, loadOrder, DOMAIN_PRICE } from "../data/templates";
import "../styles/buy.css";

export default function ConfirmationPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const template = getTemplate(id);
    const order = loadOrder();
    const domain = order.domain || "get_one";

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
        );
    }

    return (
        <div className="flow-page">
            {/* NAV */}
            <header className="flow-nav">
                <button
                    className="flow-nav-back"
                    onClick={() => navigate(`/templates/${id}/buy`)}
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

            <div className="confirm-wrap">
                {/* STEP HEADER */}
                <div className="step-header">
                    <h1 className="step-title">Confirmation</h1>
                    <div className="step-pills">
                        <div className="step-pill current" />
                        <div className="step-pill pending" />
                    </div>
                    <p
                        style={{
                            fontSize: "0.8rem",
                            color: "#999",
                            marginTop: "0.5rem",
                        }}
                    >
                        Step 1/2
                    </p>
                </div>

                <p className="step-label">Confirm your selection</p>
                <h2 className="step-section-title">What you will get</h2>

                {/* SUMMARY CARD */}
                <div className="confirm-card">
                    {/* Template */}
                    <div className="confirm-row">
                        <div className="confirm-row-icon">🎨</div>
                        <div className="confirm-row-content">
                            <div className="confirm-row-label">Template</div>
                            <div className="confirm-row-value">
                                {template.name}
                            </div>
                            <ul className="confirm-features">
                                {template.features.map((f) => (
                                    <li key={f}>{f}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Subscription */}
                    <div className="confirm-row">
                        <div className="confirm-row-icon">📅</div>
                        <div className="confirm-row-content">
                            <div className="confirm-row-label">
                                Subscription
                            </div>
                            <div className="confirm-row-value">
                                ${template.price}/month
                            </div>
                            <div className="confirm-row-extra">
                                🎁 First month free
                            </div>
                        </div>
                    </div>

                    {/* Hosting */}
                    <div className="confirm-row">
                        <div className="confirm-row-icon">🌐</div>
                        <div className="confirm-row-content">
                            <div className="confirm-row-label">Hosting</div>
                            <div className="confirm-row-value">
                                Fast & reliable hosting included
                            </div>
                        </div>
                    </div>

                    {/* Domain */}
                    <div className="confirm-row">
                        <div className="confirm-row-icon">🔗</div>
                        <div className="confirm-row-content">
                            <div className="confirm-row-label">Domain name</div>
                            {domain === "get_one" ? (
                                <>
                                    <div className="confirm-row-value">
                                        Getting a new domain
                                    </div>
                                    <div className="confirm-row-extra">
                                        +${DOMAIN_PRICE} one-time payment
                                    </div>
                                </>
                            ) : (
                                <div className="confirm-row-value">
                                    Using your own domain
                                </div>
                            )}
                        </div>
                    </div>

                    {/* brndng. setup */}
                    <div className="confirm-row">
                        <div className="confirm-row-icon">⚡</div>
                        <div className="confirm-row-content">
                            <div className="confirm-row-label">Setup</div>
                            <div className="confirm-row-value">
                                Ready within 24 hours
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONFIRM BUTTON */}
                <button
                    className="confirm-btn"
                    onClick={() => navigate(`/templates/${id}/payment`)}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}
