export const TEMPLATES = [
    {
        id: 1,
        name: "Luma Store",
        category: "E-commerce",
        description:
            "Warm minimal lifestyle store. Perfect for boutique brands.",
        image: "/images/templates/luma.jpg",
        features: [
            "15+ pages",
            "SEO optimised",
            "Admin panel included",
            "Coupon & review system",
        ],
        price: 10,
        demoUrl: "https://brndnglb.com",
    },
    {
        id: 2,
        name: "Sharp Commerce",
        category: "E-commerce",
        description: "Bold navy & blue. Built for growing product businesses.",
        image: "/images/templates/sharp.jpg",
        features: [
            "12+ pages",
            "SEO optimised",
            "Admin panel included",
            "Inventory & reports",
        ],
        price: 10,
        demoUrl: "https://brndnglb.com",
    },
    {
        id: 3,
        name: "Classic Shop",
        category: "E-commerce",
        description: "Clean and simple. The perfect starter store template.",
        image: "/images/templates/classic.jpg",
        features: ["8+ pages", "SEO optimised", "Admin panel included"],
        price: 10,
        demoUrl: "https://brndnglb.com",
    },
    {
        id: 4,
        name: "Folio One",
        category: "Portfolio",
        description: "Minimal portfolio for creatives, designers & agencies.",
        image: "/images/templates/folio1.jpg",
        features: ["6+ pages", "SEO optimised", "Contact form"],
        price: 10,
        demoUrl: "https://brndnglb.com",
    },
    {
        id: 5,
        name: "Folio Pro",
        category: "Portfolio",
        description: "Advanced portfolio with case studies and blog section.",
        image: "/images/templates/folio2.jpg",
        features: ["10+ pages", "SEO optimised", "Blog included"],
        price: 10,
        demoUrl: "https://brndnglb.com",
    },
    {
        id: 6,
        name: "The Blog",
        category: "Blog",
        description:
            "Beautiful blog template for writers and content creators.",
        image: "/images/templates/blog.jpg",
        features: ["Unlimited posts", "SEO optimised", "Categories & tags"],
        price: 10,
        demoUrl: "https://brndnglb.com",
    },
];

export const getTemplate = (id) =>
    TEMPLATES.find((t) => t.id === Number(id)) || null;

/* ── Order helpers (localStorage) ── */
export const WHATSAPP_NUMBER = "96176679623";
export const DOMAIN_PRICE = 15; // one-time USD
export const YEARLY_PRICE = 100; // per year (vs 10/mo)

export const saveOrder = (data) =>
    localStorage.setItem("brndng_order", JSON.stringify(data));

export const loadOrder = () => {
    try {
        return JSON.parse(localStorage.getItem("brndng_order") || "{}");
    } catch {
        return {};
    }
};
