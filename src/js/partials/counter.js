

const isConterPage = document.querySelector(".counter-page");

if (isConterPage)
    document.querySelector(".counter-page").onload = function () {

        const myStorage = window.localStorage;

        let value_1 = myStorage.getItem("value_1") || 0;
        const counter_1 = document.getElementById("counter_1");
        const counterValue_1 = counter_1.querySelector(".value");
        counterValue_1.innerText = value_1;

        counter_1.querySelector(".btn-decrement").addEventListener("click", () => {
            const newValue = +counterValue_1.innerText - 1;
            counterValue_1.innerText = newValue;
            localStorage.setItem("value_1", newValue);
        });

        counter_1.querySelector(".btn-increment").addEventListener("click", () => {
            const newValue = +counterValue_1.innerText + 1;
            counterValue_1.innerText = newValue;
            localStorage.setItem("value_1", newValue);
        });


        let value_2 = myStorage.getItem("value_2") || 0;
        const counter_2 = document.getElementById("counter_2");
        const counterValue_2 = counter_2.querySelector(".value");
        counterValue_2.innerText = value_2;

        counter_2.querySelector(".btn-decrement").addEventListener("click", () => {
            setTimeout(() => {
                const newValue = +counterValue_2.innerText - 1;
                counterValue_2.innerText = newValue;
                localStorage.setItem("value_2", newValue);        
            }, 1000);
        });

        counter_2.querySelector(".btn-increment").addEventListener("click", () => {
            setTimeout(() => {
                const newValue = +counterValue_2.innerText + 1;
                counterValue_2.innerText = newValue;
                localStorage.setItem("value_2", newValue);        
            }, 1000);
        });

        document.querySelector(".bth-reset").addEventListener("click", () => {
            counterValue_1.innerText = 0;
            counterValue_2.innerText = 0;
            localStorage.setItem("value_1", 0);
            localStorage.setItem("value_2", 0);
        });

    };


