/* =========================================================
   TECHFIX SOFTWARE
   SERVICE PRICING DATABASE
   ========================================================= */

const TECHFIX_PRICES = {

    currency: "SAR",

    lastUpdated: "2026-08-07",

    generalServices: [

        {
            id: "diagnostics",
            name: "Mobile Diagnostics",
            category: "General",
            priceFrom: 100,
            priceTo: 250,
            unit: "SAR"
        },

        {
            id: "software-installation",
            name: "Software Installation",
            category: "Software",
            priceFrom: 100,
            priceTo: 300,
            unit: "SAR"
        },

        {
            id: "firmware-flash",
            name: "Firmware Flash / Installation",
            category: "Firmware",
            priceFrom: 150,
            priceTo: 400,
            unit: "SAR"
        },

        {
            id: "driver-setup",
            name: "Driver & Tool Setup",
            category: "Software",
            priceFrom: 100,
            priceTo: 250,
            unit: "SAR"
        },

        {
            id: "boot-repair",
            name: "Boot / Software Repair",
            category: "Repair",
            priceFrom: 200,
            priceTo: 600,
            unit: "SAR"
        },

        {
            id: "data-backup",
            name: "Data Backup / Restore",
            category: "Data",
            priceFrom: 150,
            priceTo: 500,
            unit: "SAR"
        },

        {
            id: "network-diagnostics",
            name: "Network Diagnostics",
            category: "Network",
            priceFrom: 150,
            priceTo: 400,
            unit: "SAR"
        }

    ],


    appleServices: [

        {
            id: "apple-restore",
            name: "iPhone / iPad Restore",
            category: "Apple",
            priceFrom: 150,
            priceTo: 350,
            unit: "SAR"
        },

        {
            id: "apple-recovery",
            name: "Recovery Mode Assistance",
            category: "Apple",
            priceFrom: 150,
            priceTo: 350,
            unit: "SAR"
        },

        {
            id: "apple-dfu",
            name: "DFU Restore Assistance",
            category: "Apple",
            priceFrom: 150,
            priceTo: 350,
            unit: "SAR"
        },

        {
            id: "apple-backup",
            name: "Apple Data Backup / Restore",
            category: "Apple",
            priceFrom: 200,
            priceTo: 500,
            unit: "SAR"
        },

        {
            id: "apple-software",
            name: "Apple Software Support",
            category: "Apple",
            priceFrom: 150,
            priceTo: 400,
            unit: "SAR"
        }

    ],


    androidServices: [

        {
            id: "android-flash",
            name: "Android Firmware Flash",
            category: "Android",
            priceFrom: 150,
            priceTo: 400,
            unit: "SAR"
        },

        {
            id: "android-recovery",
            name: "Android Recovery Repair",
            category: "Android",
            priceFrom: 200,
            priceTo: 500,
            unit: "SAR"
        },

        {
            id: "android-software",
            name: "Android Software Installation",
            category: "Android",
            priceFrom: 100,
            priceTo: 300,
            unit: "SAR"
        },

        {
            id: "android-driver",
            name: "Android Driver / Tool Setup",
            category: "Android",
            priceFrom: 100,
            priceTo: 250,
            unit: "SAR"
        }

    ],


    iphoneModelServices: [

        {
            model: "iPhone X",
            software: {
                priceFrom: 150,
                priceTo: 350
            },
            restore: {
                priceFrom: 150,
                priceTo: 300
            }
        },

        {
            model: "iPhone XR",
            software: {
                priceFrom: 150,
                priceTo: 350
            },
            restore: {
                priceFrom: 150,
                priceTo: 300
            }
        },

        {
            model: "iPhone XS",
            software: {
                priceFrom: 150,
                priceTo: 350
            },
            restore: {
                priceFrom: 150,
                priceTo: 300
            }
        },

        {
            model: "iPhone 11",
            software: {
                priceFrom: 175,
                priceTo: 400
            },
            restore: {
                priceFrom: 175,
                priceTo: 350
            }
        },

        {
            model: "iPhone 12",
            software: {
                priceFrom: 200,
                priceTo: 450
            },
            restore: {
                priceFrom: 200,
                priceTo: 400
            }
        },

        {
            model: "iPhone 13",
            software: {
                priceFrom: 225,
                priceTo: 500
            },
            restore: {
                priceFrom: 225,
                priceTo: 450
            }
        },

        {
            model: "iPhone 14",
            software: {
                priceFrom: 250,
                priceTo: 550
            },
            restore: {
                priceFrom: 250,
                priceTo: 500
            }
        },

        {
            model: "iPhone 15",
            software: {
                priceFrom: 300,
                priceTo: 650
            },
            restore: {
                priceFrom: 300,
                priceTo: 550
            }
        },

        {
            model: "iPhone 16",
            software: {
                priceFrom: 350,
                priceTo: 750
            },
            restore: {
                priceFrom: 350,
                priceTo: 650
            }
        },

        {
            model: "iPhone 17",
            software: {
                priceFrom: 400,
                priceTo: 800
            },
            restore: {
                priceFrom: 400,
                priceTo: 700
            }
        }

    ],


    getService(serviceId) {

        const allServices = [
            ...this.generalServices,
            ...this.appleServices,
            ...this.androidServices
        ];

        return allServices.find(
            service => service.id === serviceId
        ) || null;
    },


    getIPhonePricing(model) {

        return this.iphoneModelServices.find(
            item =>
                item.model.toLowerCase() ===
                model.toLowerCase()
        ) || null;
    }

};


/* =========================================================
   GLOBAL DATABASE EXPORT
   ========================================================= */

window.TECHFIX_PRICES = TECHFIX_PRICES;