export const TEMPLATES = [
    {
        id: 1,
        name: "Classic E-commerce Store",
        category: "E-commerce",
        description:
            "Clean and minimal lifestyle store. Perfect for small shops. For businesses that want to start selling online quickly.",
        image: "/images/templates/luma.jpg",
        features: [
            "10+ pages",
            "Responsive for all devices",
            "Contact Form",
            "Filtering and sorting",
            "Admin panel included",
            "SEO optimized",
        ],
        price: 29,
        demoUrl: "https://tan-otter-415041.hostingersite.com/",
    },
    {
        id: 2,
        name: "Sharp E-Commerce Store",
        category: "E-commerce",
        description:
            "Bold navy & blue. Built for growing product businesses, multi-product stores, teams that need inventory control.",
        image: "/images/templates/sharp.jpg",
        features: [
            "12+ pages",
            "Responsive for all devices",
            "Contact Form",
            "Advanced Filtering and sorting",
            "Announcement bar with custom text & link",
            "Admin panel included",
            "Inventory and stock control",
            "Reports & profits calculations",
            "SEO optimized",
        ],
        price: 44,
        demoUrl: "https://violet-pelican-194372.hostingersite.com",
    },
    {
        id: 3,
        name: "Professional E-commerce Store",
        category: "E-commerce",
        description:
            "Editorial & Warm. Best for Lifestyle brands, boutique stores, premium products, customer-focused businesses.",
        image: "/images/templates/classic.jpg",
        features: [
            "15+ pages",
            "Responsive for all devices",
            "Contact Form",
            "Advanced Filtering and sorting",
            "Announcement bar with custom text & link",
            "Admin panel included",
            "Inventory and stock control",
            "Reports & profits calculations",
            "Customer Panel included",
            "Coupon System included with full tracking",
            "Review System included",
            "SEO optimized",
        ],
        price: 59,
        demoUrl: "https://deeppink-hummingbird-503874.hostingersite.com",
    },
    {
        id: 4,
        name: "Core Business Portfolio",
        category: "Portfolio",
        description:
            "Clean corporate portfolio for companies, consultants, and service businesses.",
        image: "/images/templates/portfolio1.jpg",
        features: [
            "6+ pages",
            "Services showcase",
            "Projects portfolio",
            "Testimonials section",
            "SEO optimised",
            "Contact form",
        ],
        price: 9.99,
        demoUrl: "https://www.corebusinessportfolio.netlify.app",
    },

    {
        id: 5,
        name: "Nova Creative Studio",
        category: "Portfolio",
        description:
            "Bold creative portfolio designed for agencies, studios, and modern brands.",
        image: "/images/templates/portfolio2.jpg",
        features: [
            "6+ pages",
            "Dark / Light mode",
            "Creative animations",
            "Masonry projects layout",
            "Client logos section",
            "SEO optimised",
            "Contact form",
        ],
        price: 19,
        demoUrl: "https://www.novastudiocreative.netlify.app",
    },

    {
        id: 6,
        name: "Persona Portfolio",
        category: "Portfolio",
        description:
            "Personal portfolio template for freelancers, developers, and creators.",
        image: "/images/templates/portfolio3.jpg",
        features: [
            "6+ pages",
            "Personal hero section",
            "Skills showcase",
            "Experience timeline",
            "Projects with tech stack",
            "Download CV button",
            "SEO optimised",
            "Contact form",
        ],
        price: 19,
        demoUrl: "https://www.personaportfolioo.netlify.app",
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
