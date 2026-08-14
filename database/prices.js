/*
 * TechFix Software EXP v11
 * Service & Solution Pricing Database
 */

const pricesDatabase = [

    // =========================
    // ANDROID SERVICES
    // =========================

    {
        id: "android-frp",
        platform: "Android",
        service: "FRP",
        category: "Android",
        priceFrom: 1000,
        priceTo: 1500,
        price: "1000 - 1500",
        currency: "SAR",
        rating: "4.9"
    },

    {
        id: "android-flash",
        platform: "Android",
        service: "Flash",
        category: "Android",
        priceFrom: 1000,
        priceTo: 2000,
        price: "1000 - 2000",
        currency: "SAR",
        rating: "4.9"
    },

    {
        id: "android-imei",
        platform: "Android",
        service: "IMEI Repair",
        category: "Android",
        priceFrom: 2500,
        priceTo: 4000,
        price: "2500 - 4000",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "android-network",
        platform: "Android",
        service: "Network Repair",
        category: "Android",
        priceFrom: 2500,
        priceTo: 3500,
        price: "2500 - 3500",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "android-boot",
        platform: "Android",
        service: "Boot Repair",
        category: "Android",
        priceFrom: 2000,
        priceTo: 3000,
        price: "2000 - 3000",
        currency: "SAR",
        rating: "4.8"
    },


    // =========================
    // APPLE SERVICES
    // =========================

    {
        id: "apple-restore",
        platform: "Apple",
        service: "Restore",
        category: "Apple",
        priceFrom: 1500,
        priceTo: 1500,
        price: "1500",
        currency: "SAR",
        rating: "4.9"
    },

    {
        id: "apple-flash",
        platform: "Apple",
        service: "Flash",
        category: "Apple",
        priceFrom: 2000,
        priceTo: 2000,
        price: "2000",
        currency: "SAR",
        rating: "4.9"
    },

    {
        id: "apple-passcode",
        platform: "Apple",
        service: "Passcode",
        category: "Apple",
        priceFrom: 3000,
        priceTo: 3000,
        price: "3000",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "apple-activation",
        platform: "Apple",
        service: "Activation Support",
        category: "Apple",
        priceFrom: 3500,
        priceTo: 3500,
        price: "3500",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "apple-icloud",
        platform: "Apple",
        service: "iCloud Related Service",
        category: "Apple",
        priceFrom: 6000,
        priceTo: 7000,
        price: "6,000 - 7,000",
        currency: "PKR",
        notes: "Price varies by device and case; contact for current price.",
        rating: "4.7"
    },


    // =========================
    // IPHONE MODEL SERVICE GUIDE
    // =========================

    {
        id: "iphone-x",
        brand: "Apple",
        model: "iPhone X",
        service: "Software Service",
        category: "Apple",
        priceFrom: 1500,
        priceTo: 2500,
        price: "1500 - 2500",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "iphone-xs",
        brand: "Apple",
        model: "iPhone XS",
        service: "Software Service",
        category: "Apple",
        priceFrom: 1600,
        priceTo: 2700,
        price: "1600 - 2700",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "iphone-11",
        brand: "Apple",
        model: "iPhone 11",
        service: "Software Service",
        category: "Apple",
        priceFrom: 1800,
        priceTo: 3000,
        price: "1800 - 3000",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "iphone-12",
        brand: "Apple",
        model: "iPhone 12",
        service: "Software Service",
        category: "Apple",
        priceFrom: 2200,
        priceTo: 3500,
        price: "2200 - 3500",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "iphone-13",
        brand: "Apple",
        model: "iPhone 13",
        service: "Software Service",
        category: "Apple",
        priceFrom: 2500,
        priceTo: 4000,
        price: "2500 - 4000",
        currency: "SAR",
        rating: "4.9"
    },

    {
        id: "iphone-14",
        brand: "Apple",
        model: "iPhone 14",
        service: "Software Service",
        category: "Apple",
        priceFrom: 3000,
        priceTo: 5000,
        price: "3000 - 5000",
        currency: "SAR",
        rating: "4.9"
    },

    {
        id: "iphone-15",
        brand: "Apple",
        model: "iPhone 15",
        service: "Software Service",
        category: "Apple",
        priceFrom: 3500,
        priceTo: 5500,
        price: "3500 - 5500",
        currency: "SAR",
        rating: "4.9"
    },

    {
        id: "iphone-16",
        brand: "Apple",
        model: "iPhone 16",
        service: "Software Service",
        category: "Apple",
        priceFrom: 4500,
        priceTo: 6500,
        price: "4500 - 6500",
        currency: "SAR",
        rating: "4.9"
    },

    {
        id: "iphone-17",
        brand: "Apple",
        model: "iPhone 17",
        service: "Software Service",
        category: "Apple",
        priceFrom: 5500,
        priceTo: 8000,
        price: "5500 - 8000",
        currency: "SAR",
        rating: "4.9"
    },


    // =========================
    // PROFESSIONAL HARDWARE / REPAIR
    // =========================

    {
        id: "path-repair",
        platform: "Android",
        service: "Path Repair",
        category: "Hardware / Software",
        priceFrom: 2500,
        priceTo: 5000,
        price: "2500 - 5000",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "cpid-service",
        platform: "Android",
        service: "CPID Service",
        category: "Samsung",
        priceFrom: 2500,
        priceTo: 5000,
        price: "2500 - 5000",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "network-unlock",
        platform: "Android",
        service: "Network Unlock",
        category: "Network",
        priceFrom: 1500,
        priceTo: 3500,
        price: "1500 - 3500",
        currency: "SAR",
        rating: "4.8"
    },

    {
        id: "boot-repair",
        platform: "Android",
        service: "Boot Repair",
        category: "Repair",
        priceFrom: 2000,
        priceTo: 3000,
        price: "2000 - 3000",
        currency: "SAR",
        rating: "4.8"
    }

];


/*
 * Global database access
 */

window.pricesDatabase = pricesDatabase;


/*
 * Backward-compatible aliases
 */

window.priceDatabase = pricesDatabase;
window.prices = pricesDatabase;
window.servicePrices = pricesDatabase;


/*
 * Search prices
 */

window.searchPrices = function (query) {

    const search =
        String(query || "")
            .trim()
            .toLowerCase();

    if (!search) {
        return pricesDatabase;
    }

    return pricesDatabase.filter((item) => {

        const searchableText = [

            item.id,
            item.platform,
            item.brand,
            item.model,
            item.service,
            item.category,
            item.price

        ]
            .join(" ")
            .toLowerCase();

        return searchableText.includes(search);

    });

};


/*
 * Get prices for a specific model
 */

window.getModelPrices = function (modelName) {

    const search =
        String(modelName || "")
            .trim()
            .toLowerCase();

    if (!search) {
        return [];
    }

    return pricesDatabase.filter((item) => {

        const model =
            String(item.model || "")
                .toLowerCase();

        return (
            model === search ||
            model.includes(search) ||
            search.includes(model)
        );

    });

};