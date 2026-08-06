"use strict";

/*
    TECHFIX SOFTWARE EXP
    MODEL PAGE ENGINE
*/

const TechFixModel = {

    data: null,

    init() {

        const saved = localStorage.getItem("TechFixSelected");

        if (!saved) {
            this.notFound();
            return;
        }

        this.data = JSON.parse(saved);

        this.render();

    },

    render() {

        document.getElementById("modelName").textContent =
            this.data.model || "Unknown Model";

        document.getElementById("modelBrand").textContent =
            this.data.brand || "Unknown Brand";

        document.getElementById("modelSeries").textContent =
            this.data.series || "Unknown Series";

        const prices = this.data.prices || {};

        document.getElementById("priceFRP").textContent =
            prices.frp ? "Rs " + prices.frp : "Contact";

        document.getElementById("priceIMEI").textContent =
            prices.imei ? "Rs " + prices.imei : "Not Available";

        document.getElementById("priceCPID").textContent =
            prices.cpid ? "Rs " + prices.cpid : "Not Available";

        document.getElementById("priceSignal").textContent =
            prices.bypassSignal ? "Rs " + prices.bypassSignal : "Not Available";

        document.getElementById("priceNoSignal").textContent =
            prices.bypassNoSignal ? "Rs " + prices.bypassNoSignal : "Not Available";

        const list = document.getElementById("solutionList");

        list.innerHTML = "";

        const solutions = this.data.solutions || {};

        let found = false;

        Object.keys(solutions).forEach(key => {

            if (solutions[key]) {

                found = true;

                const li = document.createElement("li");

                li.textContent = key;

                list.appendChild(li);

            }

        });

        if (!found) {

            list.innerHTML = "<li>No Solutions Available</li>";

        }

        const firmware = document.getElementById("firmwareBtn");

        firmware.addEventListener("click", function (e) {

            e.preventDefault();

            alert("Firmware download will be available soon.");

        });

    },

    notFound() {

        document.getElementById("modelName").textContent = "Model Not Found";

        document.getElementById("modelBrand").textContent = "";

        document.getElementById("modelSeries").textContent = "";

    }

};

document.addEventListener("DOMContentLoaded", function () {

    TechFixModel.init();

});

window.TechFixModel = TechFixModel;