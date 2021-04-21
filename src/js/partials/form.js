const isFormPage = document.querySelector(".form-page");

if (isFormPage)
    document.querySelector(".form-page").onload = function () {

        const modal = document.getElementById("modal_window");

        modal.querySelectorAll(".close-modal").forEach(element => {
            element.addEventListener("click", () => {
                modal.style.display = "none";
            });            
        });

        const countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
        const countryElement = document.getElementById("country");

        const option = document.createElement("option");
        option.innerText = "Please select a country";
        option.className = "placeholder";
        countryElement.appendChild(option);

        countryList.forEach(country => {
            const option = document.createElement("option");
            option.innerText = country;
            countryElement.appendChild(option);
        });

        const zipElement = document.getElementById("zip");
        zipElement.addEventListener("input", (event) => {
            event.target.value = event.target.value.replace(/\D/g, "");
        });

        document.getElementById("form_registration").addEventListener("submit", (event) => {

            event.preventDefault();

            let isValid = true;

            const fields = event.target.elements;
            const username = fields["username"];
            const password = fields["password"];
            const name = fields["name"];
            const address = fields["address"];
            const country = fields["country"];
            const zip = fields["zip"];
            const sex = fields["sex"];
            const about = fields["about"];

            const langList = fields["language"];

            event.target.querySelectorAll(".alert").forEach(alert => {
                alert.remove();
            });

            if (username.value.match(/[!#^&*()<>?=\-+@{}_$%]/g)) {
                isValid = false;
                addAlert(username, `Must contain letters <br>
                    Must not contain special characters  (!#^&*()<>?=-+@{}_$%).`);
            }

            if ((password.value.match(/[!#^&*()<>?=\-+@{}_$%]/g)) 
                || !password.value.match(/[\d]/g) 
                || !password.value.match(/[a-z]/g) 
                || !password.value.match(/[A-Z]/g)) {
                isValid = false;
                addAlert(password, `Must contain min 1 uppercase letter and 1 lowercase letter <br>
                    Must contain min 1 number <br>
                    Must not contain special characters  (!#^&*()<>?=-+@{}_$%).`);
            }

            if (name.value.replace(" ", "").match(/(\W+)|(\d)/g)) {
                isValid = false;
                addAlert(name, "Alphabates only");
            }

            if (country.selectedIndex === 0) {
                isValid = false;
                addAlert(country, "Required");
            }

            const language = [];
            langList.forEach(lng => {
                if (lng.checked) {
                    language.push(lng.value);
                }
            });

            if (language.length === 0) {
                isValid = false;
                addAlert(langList[0].parentElement.lastElementChild, "Required");
            }

            if (isValid) {
                const result = {
                    username: username.value,
                    password: password.value,
                    name: name.value,
                    address: address.value,
                    country: country.value,
                    zip: zip.value,
                    sex: sex.value,
                    language,
                    about: about.value,
                };

                modal.querySelector("#result").value = JSON.stringify(result);
                modal.style.display = "flex";

                console.log(result)
            }

        });

        function addAlert(element, innerHTML) {
            const alert = document.createElement("div");
            alert.className = "alert";
            const alertText = document.createElement("span");
            alertText.innerHTML = innerHTML;
            alert.appendChild(alertText);
            element.after(alert);
        }

    };