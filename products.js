// Product database strictly from daily_list.docx (times converted to 24-hour, product names only)
// name need to be the same as the model's
const PRODUCTS_SCHEDULE = [
    { time: "09:00", product: "mattress" },
    { time: "09:01", product: "pillow" },
    { time: "09:02", product: "quilt" },
    { time: "09:03", product: "phone" },
    { time: "09:04", product: "charging cable" },
    { time: "09:05", product: "toothbrush" },
    { time: "09:06", product: "toothpaste tube" },
    { time: "09:09", product: "plastic comb" },
    { time: "09:10", product: "facial cleanser bottle" },
    { time: "09:11", product: "facial cream container" },
    { time: "09:12", product: "sunscreen" },
    { time: "09:13", product: "lip balm" },
    { time: "09:14", product: "contact lens case" },
    { time: "09:16", product: "socks" },
    { time: "09:17", product: "shirt" },
    { time: "09:18", product: "pants" },
    { time: "09:25", product: "plastic bowl" },
    { time: "09:26", product: "plastic spoon" },
    { time: "09:27", product: "plastic film" },
    { time: "09:28", product: "food label" },
    { time: "09:29", product: "adhesive tape" },
    { time: "09:30", product: "phone case" },
    { time: "09:35", product: "shoes" },
    { time: "09:40", product: "car key" },
    { time: "09:41", product: "car" },
    { time: "09:44", product: "gasoline" },
    { time: "09:45", product: "tire" },
    { time: "09:46", product: "asphalt road" },
    { time: "09:50", product: "traffic light" },
    { time: "10:15", product: "elevator button" },
    { time: "10:16", product: "elevator" },
    { time: "10:20", product: "student card" },
    { time: "10:25", product: "Laptop" },
    { time: "10:26", product: "keyboard" },
    { time: "10:29", product: "desk cable" },
    { time: "10:30", product: "extension cord" },
    { time: "10:31", product: "drink bottle" },
    { time: "10:32", product: "chair cushion" },
    { time: "10:50", product: "elevator button" },
    { time: "10:51", product: "elevator" },
    { time: "11:00", product: "chair" },
    { time: "11:01", product: "table coating" },
    { time: "11:10", product: "display" },
    { time: "11:11", product: "projector" },
    { time: "11:12", product: "HDMI cable" },
    { time: "11:15", product: "microphone" },
    { time: "11:20", product: "lip balm" },
    { time: "11:30", product: "Laptop" },
    { time: "11:31", product: "keyboard" },
    { time: "11:32", product: "charging cable" },
    { time: "11:35", product: "phone" },
    { time: "11:40", product: "ballpoint pen" },
    { time: "11:42", product: "rubber grip" },
    { time: "12:00", product: "plastic bottle" },
    { time: "12:30", product: "small bag" },
    { time: "12:34", product: "asphalt road" },
    { time: "12:45", product: "elevator button" },
    { time: "12:46", product: "rubber handrail" },
    { time: "12:48", product: "student card" },
    { time: "13:00", product: "food container" },
    { time: "13:02", product: "plastic bag" },
    { time: "13:03", product: "chopsticks wrapper" },
    { time: "13:30", product: "Laptop" },
    { time: "13:31", product: "keyboard" },
    { time: "13:33", product: "headphones" },
    { time: "13:34", product: "charging cable" },
    { time: "13:40", product: "lip balm" },
    { time: "13:45", product: "credit card" },
    { time: "13:46", product: "phone" },
    { time: "13:55", product: "Laptop" },
    { time: "13:56", product: "charging cable" },
    { time: "14:31", product: "plastic package" },
    { time: "14:32", product: "produce bag" },
    { time: "15:00", product: "phone" },
    { time: "15:45", product: "Laptop" },
    { time: "15:46", product: "keyboard" },
    { time: "15:50", product: "computer charger" },
    { time: "16:00", product: "tape" },
    { time: "16:01", product: "pensil" },
    { time: "16:06", product: "pencil eraser" },
    { time: "16:30", product: "slime" },
    { time: "16:31", product: "plastic container" },
    { time: "17:00", product: "Laptop" },
    { time: "17:01", product: "chair" },
    { time: "17:02", product: "foam cushion" },
    { time: "17:30", product: "student card" },
    { time: "18:10", product: "food container" },
    { time: "18:12", product: "plastic bottle" },
    { time: "18:13", product: "plastic bag" },
    { time: "18:20", product: "smartphone" },
    { time: "18:25", product: "credit card" },
    { time: "18:27", product: "laptop" },
    { time: "18:30", product: "student card" },
    { time: "19:03", product: "chopsticks wrapper" },
    { time: "19:30", product: "car key" },
    { time: "19:31", product: "car seat" },
    { time: "19:32", product: "seat belt" },
    { time: "19:33", product: "steering wheel" },
    { time: "19:34", product: "gasoline" },
    { time: "19:35", product: "tire" },
    { time: "19:36", product: "asphalt road" },
    { time: "20:00", product: "table coating" },
    { time: "20:01", product: "chair cushion" },
    { time: "20:02", product: "plastic chair part" },
    { time: "20:17", product: "laptop" },
    { time: "21:00", product: "switch console" },
    { time: "21:01", product: "controller" },
    { time: "21:02", product: "screen" },
    { time: "21:03", product: "charging dock" },
    { time: "21:04", product: "game cartridge" },
    { time: "22:55", product: "food container" },
    { time: "00:00", product: "mattress" },
    { time: "00:01", product: "pillow" },
    { time: "00:02", product: "quilt" },
    { time: "00:03", product: "phone charger" },
    { time: "00:04", product: "credit card" }
];

// Product data lookup with more details
const PRODUCT_DETAILS = {
    "Adhesive": {
        price: 2.99,
        petroleum: "Synthetic polymers and resins derived from petroleum",
        alternative: "Natural adhesives like starch or casein-based glues",
        usage: "General"
    },
    "Toothbrush": {
        price: 8.99,
        petroleum: "Nylon bristles, plastic handle derived from crude oil polymerization",
        alternative: "Bamboo handle with natural boar bristles",
        usage: "Personal Care"
    },
    "Credit Card": {
        price: 0.01,
        petroleum: "PVC plastic card body, synthetic inks",
        alternative: "Metal card or digital wallet",
        usage: "Financial"
    },
    "Toothpaste": {
        price: 5.49,
        petroleum: "Plastic tube, synthetic surfactants, chemical compounds from petroleum",
        alternative: "Natural toothpaste powder in glass jar",
        usage: "Personal Care"
    },
    "Shampoo": {
        price: 7.99,
        petroleum: "Plastic bottle (HDPE), surfactants, emulsifiers from petrochemicals",
        alternative: "Solid bar shampoo, minimal packaging",
        usage: "Personal Care"
    },
    "Deodorant": {
        price: 6.49,
        petroleum: "Aerosol container, plastic bottle, mineral oil based",
        alternative: "Rock crystal or beeswax-based deodorant",
        usage: "Personal Care"
    },
    "Shower Curtain": {
        price: 15.99,
        petroleum: "PVC plastic material with phthalates",
        alternative: "Organic cotton or hemp fabric",
        usage: "Home Textiles"
    },
    "Clothes": {
        price: 45.00,
        petroleum: "Polyester, nylon, and synthetic dyes from crude oil",
        alternative: "Organic cotton, linen, or wool",
        usage: "Apparel"
    },
    "Shoes": {
        price: 89.99,
        petroleum: "Rubber soles (synthetic), synthetic leather, plastic components",
        alternative: "Canvas with natural rubber soles",
        usage: "Apparel"
    },
    "Coffee Maker": {
        price: 79.99,
        petroleum: "Plastic body, silicone seals, synthetic gaskets",
        alternative: "Ceramic pour-over or stainless steel French press",
        usage: "Appliance"
    },
    "Plastic Bottle": {
        price: 2.59,
        petroleum: "100% petroleum-derived polyethylene terephthalate (PET)",
        alternative: "Glass or stainless steel bottle",
        usage: "Packaging"
    },
     "Plastic Bag": {
        price: 0.10,
        petroleum: "High-density polyethylene (HDPE) or low-density polyethylene (LDPE) from crude oil",
        alternative: "Reusable cloth bag or paper bag",
        usage: "Packaging"
    },
    "Food Container": {
        price: 0.99,
        petroleum: "BPA-free plastic (polypropylene, PP5)",
        alternative: "Glass Pyrex containers",
        usage: "Packaging"
    },
    "Computer Monitor": {
        price: 299.99,
        petroleum: "Plastic bezel, internal polymers, epoxy resin",
        alternative: "Metal frame (still contains some synthetic materials)",
        usage: "Electronics"
    },
    "Computer Keyboard": {
        price: 79.99,
        petroleum: "Plastic keys, ABS plastic housing",
        alternative: "Wooden frame with mechanical switches",
        usage: "Electronics"
    },
    "Medicine (Pharma)": {
        price: 15.99,
        petroleum: "Plastic bottle, capsules from petroleum derivatives",
        alternative: "Natural remedies or glass bottle",
        usage: "Pharma"
    },
    "Pillow": {
        price: 10.99,
        petroleum: "Polyester fiberfill, synthetic fabrics",
        alternative: "Natural latex or organic cotton filling and cover",
        usage: "Home Textiles"
    },
    "Hearing Aid": {
        price: 3000,
        petroleum: "Plastic housing, synthetic acoustic materials",
        alternative: "Very limited environmental alternatives",
        usage: "Medical"
    },
    "Tire": {
        price: 149.99,
        petroleum: "Synthetic rubber with petroleum-based fillers and additives",
        alternative: "Natural rubber blend (still partially petroleum-dependent)",
        usage: "Automotive"
    },
    "Vinyl Flooring": {
        price: 4.99,
        petroleum: "PVC plastic material with phthalate plasticizers",
        alternative: "Hardwood, cork, or linoleum flooring",
        usage: "Building"
    },
    "House Paint": {
        price: 39.99,
        petroleum: "Acrylic resin from petrochemicals, synthetic pigments",
        alternative: "Plant-based, non-toxic paint",
        usage: "Coatings"
    },
    "Television": {
        price: 499.99,
        petroleum: "Plastic bezel, various internal polymers",
        alternative: "Recycled aluminum or metal frame option",
        usage: "Electronics"
    },
    "Laptop": {
        price: 899.99,
        petroleum: "Plastic/composite body, synthetic materials internally",
        alternative: "Metal chassis (still contains synthetic components)",
        usage: "Electronics"
    },
    "Smartphone": {
        price: 899.99,
        petroleum: "Plastic/composite body, numerous polymer components",
        alternative: "Better recycling and refurbishment programs",
        usage: "Electronics"
    },
    "Sunscreen": {
        price: 9.99,
        petroleum: "Plastic bottle, petroleum-based sunscreen actives",
        alternative: "Mineral sunscreen in metal tin",
        usage: "Personal Care"
    },
    "Perfume": {
        price: 79.99,
        petroleum: "Plastic bottle, synthetic fragrance compounds",
        alternative: "Essential oils in glass bottle",
        usage: "Personal Care"
    },
     "Lip Balm": {
        price: 9.99,
        petroleum: "Plastic bottle, synthetic fragrance compounds",
        alternative: "Essential oils in glass bottle",
        usage: "Personal Care"
    },
    "Refrigerator": {
        price: 999.99,
        petroleum: "Plastic exterior, foam insulation (CFC alternatives)",
        alternative: "Recycled plastic or more sustainable options",
        usage: "Appliance"
    },
    "Mattress": {
        price: 799.99,
        petroleum: "Polyurethane foam, synthetic fabrics",
        alternative: "Natural latex, organic cotton, and wool",
        usage: "Furniture"
    },
    "Remote Control": {
        price: 29.99,
        petroleum: "Plastic body, rubber buttons",
        alternative: "Metal composite remote",
        usage: "Electronics"
    }
};

// Enrich PRODUCTS_SCHEDULE entries with details from PRODUCT_DETAILS
// Match is case-insensitive; if exact match not found, try a contains-based fallback.
(function enrichSchedule() {
    const detailsMap = {};
    Object.keys(PRODUCT_DETAILS).forEach(k => { detailsMap[k.toLowerCase()] = PRODUCT_DETAILS[k]; });

    function categorizePetroleum(text) {
        if (!text) return 'Unknown';
        const t = text.toLowerCase();
        if (t.includes('gasoline') || t.includes('petrol') || t.includes('fuel')) return 'Fuel';
        if (t.includes('nylon') || t.includes('bristle') || t.includes('toothbrush')) return 'Personal Care';
        if (t.includes('bottle') || t.includes('container') || t.includes('pack') || t.includes('wrap') || t.includes('cup')) return 'Packaging';
        if (t.includes('tire') || t.includes('rubber') || t.includes('asphalt')) return 'Automotive';
        if (t.includes('foam') || t.includes('memory foam') || t.includes('polyurethane')) return 'Furniture / Foam';
        if (t.includes('synthetic') || t.includes('polymer') || t.includes('plastic') || t.includes('petro')) return 'Plastics / Polymers';
        if (t.includes('paint') || t.includes('resin') || t.includes('epoxy')) return 'Coatings / Resin';
        return 'General Petrochemical';
    }

    for (let i = 0; i < PRODUCTS_SCHEDULE.length; i++) {
        const entry = PRODUCTS_SCHEDULE[i];
        const key = String(entry.product).trim().toLowerCase();

        let det = detailsMap[key] || null;
        if (!det) {
            // Fallback: try partial matches (detail key contains schedule key or vice versa)
            for (const dk in detailsMap) {
                if (dk.includes(key) || key.includes(dk)) {
                    det = detailsMap[dk];
                    break;
                }
            }
        }

        if (det) {
            entry.price = det.price || null;
            // keep raw petroleum text for reference
            entry.petroleum_raw = det.petroleum || null;
            entry.alternative = det.alternative || null;
            // use explicit usage from PRODUCT_DETAILS; fallback to categorized value when absent
            entry.usage = det.usage || categorizePetroleum(det.petroleum);
            entry.usage_category = entry.usage;
            entry.petroleum = entry.usage_category;
        } else {
            entry.price = null;
            entry.petroleum_raw = null;
            entry.alternative = null;
            entry.usage = 'Unknown';
            entry.usage_category = 'Unknown';
            entry.petroleum = entry.usage_category;
        }
    }
})();

// Helper function to get product by time
function getProductByTime(hours, minutes) {
    // Convert current time to minutes since midnight
    const currentMinutes = hours * 60 + minutes;

    // Map schedule times to minutes
    const schedule = PRODUCTS_SCHEDULE.map(p => {
        const [hh, mm] = p.time.split(':').map(Number);
        return { minutes: hh * 60 + mm, product: p };
    }).sort((a, b) => a.minutes - b.minutes);

    // Find the latest schedule entry where schedule.minutes <= currentMinutes
    let chosen = null;
    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].minutes <= currentMinutes) {
            chosen = schedule[i].product;
        } else {
            break;
        }
    }

    // If none found (current time is before first schedule entry), use the last entry (previous day)
    if (!chosen) {
        chosen = schedule.length ? schedule[schedule.length - 1].product : PRODUCTS_SCHEDULE[0];
    }

    return chosen;
}

// Helper function to get all products for display
function getAllProducts() {
    return PRODUCTS_SCHEDULE;
}
