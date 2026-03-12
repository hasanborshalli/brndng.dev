import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getTemplate,
    loadOrder,
    saveOrder,
    DOMAIN_PRICE,
    YEARLY_PRICE,
    WHATSAPP_NUMBER,
} from "../data/templates";
import "../styles/buy.css";

const METHODS = [
    {
        id: "cash",
        name: "Cash",
        icon: <span style={{ fontSize: "1.5rem" }}>💵</span>,
        iconBg: "#F0F4FF",
        detail: null,
    },
    {
        id: "whish",
        name: "WHISH transfer",
        icon: null, // custom
        detail: (
            <>
                Transfer the money to the phone number{" "}
                <strong>+00961 76 679 623</strong>
                <br />
                Or via this link:{" "}
                <a
                    href="https://wishapp.me/brndng" // replace with real link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="payment-option-link"
                >
                    wishapp.me/brndng
                </a>
            </>
        ),
    },
    {
        id: "usdt",
        name: "USDT",
        icon: null, // custom
        detail: (
            <>
                Wallet <strong>010029191819191010101</strong>
            </>
        ),
    },
];

function buildWhatsAppMessage({ templateName, method, domain, period, total }) {
    const methodLabels = {
        cash: "Cash",
        whish: "WHISH Transfer",
        usdt: "USDT",
    };
    const domainLine =
        domain === "get_one"
            ? `- Domain: Getting a new domain (+$${DOMAIN_PRICE} one-time)`
            : `- Domain: Using my own domain`;
    const periodLine =
        period === "monthly"
            ? `- Plan: Monthly ($10/month) — first month FREE`
            : `- Plan: Yearly ($${YEARLY_PRICE}/year - save $20)`;

    const msg = [
        `Hello brndng! I'd like to purchase the following:`,
        ``,
        `- Template: ${templateName}`,
        periodLine,
        domainLine,
        `- Payment method: ${methodLabels[method]}`,
        ``,
        `- Total due now: $${total}${period === "monthly" ? " (first month free)" : ""}`,
        ``,
        `Please confirm my order. Thank you!`,
    ].join("\n");

    return encodeURIComponent(msg);
}

export default function PaymentPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const template = getTemplate(id);
    const order = loadOrder();
    const domain = order.domain || "get_one";

    const [method, setMethod] = useState("cash");
    const [period, setPeriod] = useState("monthly");

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

    // Price calculation — first month is free on monthly plan
    const templateCost = period === "monthly" ? 0 : YEARLY_PRICE;
    const domainCost = domain === "get_one" ? DOMAIN_PRICE : 0;
    const total = templateCost + domainCost;
    const periodLabel = period === "monthly" ? `/month` : `/year`;

    const handlePay = () => {
        // Persist final choices
        saveOrder({ ...order, method, period });

        const msg = buildWhatsAppMessage({
            templateName: template.name,
            method,
            domain,
            period,
            total,
        });
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    };

    return (
        <div className="flow-page">
            {/* NAV */}
            <header className="flow-nav">
                <button
                    className="flow-nav-back"
                    onClick={() => navigate(`/templates/${id}/confirm`)}
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

            <div className="payment-wrap">
                {/* STEP HEADER */}
                <div className="step-header">
                    <h1 className="step-title">Payment</h1>
                    <div className="step-pills">
                        <div className="step-pill done" />
                        <div className="step-pill current" />
                    </div>
                    <p
                        style={{
                            fontSize: "0.8rem",
                            color: "#999",
                            marginTop: "0.5rem",
                        }}
                    >
                        Step 2/2
                    </p>
                </div>

                {/* PAYMENT METHODS */}
                <p className="payment-section-label">Select payment method</p>
                <div className="payment-methods">
                    {/* Cash */}
                    <div
                        className={`payment-option ${method === "cash" ? "selected" : ""}`}
                        onClick={() => setMethod("cash")}
                    >
                        <div className="payment-option-row">
                            <div
                                className="payment-option-icon"
                                style={{
                                    background: "#F0F4FF",
                                    fontSize: "1.5rem",
                                }}
                            >
                                💵
                            </div>
                            <div>
                                <div className="payment-option-name">Cash</div>
                            </div>
                        </div>
                    </div>

                    {/* WHISH */}
                    <div
                        className={`payment-option ${method === "whish" ? "selected" : ""}`}
                        onClick={() => setMethod("whish")}
                    >
                        <div className="payment-option-row">
                            <div className="whish-icon">WHISH</div>
                            <div>
                                <div className="payment-option-name">
                                    WHISH transfer
                                </div>
                                {method === "whish" && (
                                    <div className="payment-option-detail">
                                        Transfer the money to the phone number{" "}
                                        <strong>+00961 76 679 623</strong>
                                        <br />
                                        Or via this link:{" "}
                                        <a
                                            href="https://wishapp.me/brndng"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="payment-option-link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            wishapp.me/brndng
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* USDT */}
                    <div
                        className={`payment-option ${method === "usdt" ? "selected" : ""}`}
                        onClick={() => setMethod("usdt")}
                    >
                        <div className="payment-option-row">
                            <div className="usdt-icon">USDT</div>
                            <div>
                                <div className="payment-option-name">USDT</div>
                                {method === "usdt" && (
                                    <div className="payment-option-detail">
                                        Wallet{" "}
                                        <strong>010029191819191010101</strong>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MONTHLY / YEARLY TOGGLE */}
                <p className="payment-section-label">Billing period</p>
                <div className="period-toggle-wrap">
                    <div className="period-toggle">
                        <button
                            className={`period-btn ${period === "monthly" ? "active" : ""}`}
                            onClick={() => setPeriod("monthly")}
                        >
                            Monthly
                        </button>
                        <button
                            className={`period-btn ${period === "yearly" ? "active" : ""}`}
                            onClick={() => setPeriod("yearly")}
                        >
                            Yearly
                            <span className="period-save-badge">Save $20</span>
                        </button>
                    </div>
                </div>

                {/* TOTAL SUMMARY */}
                <div className="payment-total-card">
                    <div className="payment-total-row">
                        <span>
                            {template.name} (
                            {period === "monthly"
                                ? "$10/month"
                                : `$${YEARLY_PRICE}/year`}
                            )
                        </span>
                        <span>
                            {period === "monthly" ? (
                                <span
                                    style={{
                                        color: "#22C55E",
                                        fontWeight: 700,
                                    }}
                                >
                                    FREE
                                </span>
                            ) : (
                                `$${templateCost}`
                            )}
                        </span>
                    </div>
                    {domain === "get_one" && (
                        <div className="payment-total-row">
                            <span>Domain name (one-time)</span>
                            <span>${DOMAIN_PRICE}</span>
                        </div>
                    )}
                    <div className="payment-total-row main">
                        <span>Total due now</span>
                        <span>
                            ${total}
                            {periodLabel}
                            {period === "monthly" && (
                                <span
                                    style={{
                                        fontSize: "0.72rem",
                                        color: "#22C55E",
                                        marginLeft: "0.4rem",
                                        fontWeight: 700,
                                    }}
                                >
                                    FREE
                                </span>
                            )}
                        </span>
                    </div>
                </div>

                {/* MAKE PAYMENT */}
                <button className="payment-btn" onClick={handlePay}>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.109 1.526 5.836L.057 23.428a.5.5 0 00.609.61l5.703-1.497A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.563 9.563 0 01-4.861-1.326l-.349-.207-3.587.942.958-3.498-.228-.359A9.556 9.556 0 012.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z" />
                    </svg>
                    Make payment ${total}
                </button>

                <p
                    style={{
                        textAlign: "center",
                        fontSize: "0.74rem",
                        color: "#aaa",
                        marginTop: "1rem",
                        lineHeight: 1.6,
                    }}
                >
                    You can always change your payment method each month/year.
                    <br />
                    Clicking above will open WhatsApp to confirm your order.
                </p>
            </div>
        </div>
    );
}
