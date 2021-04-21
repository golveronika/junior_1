const isSliderPage = document.querySelector(".sliders-page");

if (isSliderPage)
    document.querySelector(".sliders-page").onload = function () {
        const griffindor = [
            "https://i.pinimg.com/564x/47/db/d8/47dbd8203843609c497a922672f8ccb0.jpg",
            "https://i.pinimg.com/564x/87/34/ca/8734ca8b77d18e36ca02944f4cace976.jpg",
            "https://i.pinimg.com/564x/ad/d9/ab/add9ab6212dbf4bee2d7009a502c07b5.jpg",
            "https://i.pinimg.com/564x/bf/c6/fc/bfc6fc15d97d2c6779392202c016e420.jpg",
            "https://i.pinimg.com/564x/29/7b/07/297b07b8dfe9b658f9bc8b610491e2e4.jpg",
        ];

        const griffindorContainer = document.querySelector(".griffindor-container");

        const griffindorSlider = griffindorContainer.querySelector(".slider");

        let griffindorIndex = 0;

        griffindorSlider.style.backgroundImage = `url(${griffindor[griffindorIndex]})`;

        griffindorContainer.querySelector(".arrow.prev").addEventListener("click", () => {
            griffindorIndex = (griffindorIndex === 0) ? (griffindor.length - 1) : griffindorIndex - 1;
            griffindorSlider.style.backgroundImage = `url(${griffindor[griffindorIndex]})`;
        });

        griffindorContainer.querySelector(".arrow.next").addEventListener("click", () => {
            griffindorIndex = (griffindorIndex === (griffindor.length - 1)) ? 0 : griffindorIndex + 1;
            griffindorSlider.style.backgroundImage = `url(${griffindor[griffindorIndex]})`;
        });


        const slytherin = [
            "https://i.pinimg.com/564x/3f/07/d2/3f07d282991ba291f2b6452561f8692f.jpg",
            "https://i.pinimg.com/564x/8c/7d/e2/8c7de24dff90e6c20ecb5fa0c26bc747.jpg",
            "https://i.pinimg.com/564x/f8/27/6b/f8276bbbb56dd12d4d7db69fc1dfe520.jpg",
            "https://i.pinimg.com/564x/a6/f2/d1/a6f2d1e74d8024058a80bf24108560bb.jpg",
            "https://i.pinimg.com/564x/a9/d5/3d/a9d53d8f5eb0a0d93fc0f04f1931d7d6.jpg",
        ];

        const slytherinContainer = document.querySelector(".slytherin-container");

        const slytherinSlider = slytherinContainer.querySelector(".slider");

        let slytherinIndex = 0;

        slytherinSlider.style.backgroundImage = `url(${slytherin[slytherinIndex]})`;

        slytherin.forEach((picture, index) => {
            const button = document.createElement("button");
            if (index === 0) {
                button.classList = "active";
            }
            button.addEventListener("click", (e) => {
                const current = e.target;
                const parent = current.parentElement;
                parent.querySelector("button.active").classList = "";
                current.classList = "active";
                slytherinSlider.style.backgroundImage = `url(${picture})`;
            });

            slytherinContainer.querySelector(".circle-btns").appendChild(button);
        });

        const ravenclaw = [
            "https://i.pinimg.com/564x/9d/b2/47/9db247ace6b09f8250d909ab54b89f05.jpg",
            "https://i.pinimg.com/564x/95/d3/34/95d334c8db1e73b7f9715e630d85c087.jpg",
            "https://i.pinimg.com/564x/1b/90/3f/1b903f4eaf31a94850d8684133722d79.jpg",
            "https://i.pinimg.com/564x/05/73/a1/0573a17e225594851302334a65731404.jpg",
            "https://i.pinimg.com/564x/82/b4/db/82b4dbdc77632688f3e5ec1d3f28e4a1.jpg",
        ];

        const ravenclawrContainer = document.querySelector(".ravenclaw-container");

        const ravenclawSlider = ravenclawrContainer.querySelector(".slider");

        let ravenclawIndex = 0;

        ravenclaw.forEach((picture, index) => {
            const div = document.createElement("div");
            div.style.backgroundImage = `url(${picture})`;
            div.style.width = ravenclawSlider.offsetWidth + "px";
            div.style.height = ravenclawSlider.offsetHeight + "px";
            div.style.left = index * ravenclawSlider.offsetWidth + "px";
            div.className = "slider-picture";
            ravenclawSlider.appendChild(div);
        });

        window.addEventListener("resize", () => { 
            const pictures = ravenclawrContainer.querySelectorAll(".slider-picture");
            pictures.forEach((picture) => {
                const slidercWidth = ravenclawSlider.offsetWidth;
                const pictureWidth = +(picture.style.width.replace("px", ""));
                if (slidercWidth !== pictureWidth) {
                    picture.style.width = ravenclawSlider.offsetWidth + "px";
                    picture.style.height = ravenclawSlider.offsetHeight + "px";
                    const left = (+(picture.style.left.replace("px", "")));    
                    if (left !== 0) {
                        picture.style.left = Math.round(left / pictureWidth) * slidercWidth + "px";
                    }                            
                }

            });
         });

        ravenclawrContainer.querySelector(".arrow.next").addEventListener("click", () => {
            if (ravenclawIndex === (ravenclaw.length - 1)) return;
            ravenclawIndex = ravenclawIndex + 1;
            const slidercWidth = ravenclawSlider.offsetWidth;
            const pictures = ravenclawrContainer.querySelectorAll(".slider-picture");

            pictures.forEach((picture) => {
                picture.style.left = +(picture.style.left.replace("px", "")) - slidercWidth + "px";
            });
            
        });

        ravenclawrContainer.querySelector(".arrow.prev").addEventListener("click", () => {
            if (ravenclawIndex === 0) return;
            ravenclawIndex = ravenclawIndex - 1;
            const slidercWidth = ravenclawSlider.offsetWidth;
            const pictures = ravenclawrContainer.querySelectorAll(".slider-picture");

            pictures.forEach((picture) => {
                picture.style.left = +(picture.style.left.replace("px", "")) + slidercWidth + "px";
            });
            
        });


        const hufflepuff = [
            "https://i.pinimg.com/564x/7b/57/57/7b57570539eba3b00fa44205163194bc.jpg",
            "https://i.pinimg.com/564x/93/b2/99/93b299415673ae879870784cb8bb6d1b.jpg",
            "https://i.pinimg.com/564x/c6/bd/9d/c6bd9d9d11ca687ef4db6b37505c19bf.jpg",
            "https://i.pinimg.com/564x/6e/a6/8a/6ea68a5a6d2f1e9c3d4541485b2b4ab0.jpg",
            "https://i.pinimg.com/564x/be/7f/57/be7f57ee0d6f1094b406ce6255a9601b.jpg",
        ];

        const hufflepuffContainer = document.querySelector(".hufflepuff-container");

        const hufflepuffSlider = hufflepuffContainer.querySelector(".slider");

        let hufflepuffIndex = 0;

        hufflepuffSlider.style.backgroundImage = `url(${hufflepuff[hufflepuffIndex]})`;

        setInterval(() => {
            hufflepuffIndex = (hufflepuffIndex === (hufflepuff.length - 1)) ? 0 : hufflepuffIndex + 1;
            hufflepuffSlider.style.backgroundImage = `url(${hufflepuff[hufflepuffIndex]})`;
        }, 2000);


};