const Base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const selects = document.querySelectorAll("select");
const btn = document.querySelector("button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const fromInput  = document.querySelector(".from input")
const toInput  = document.querySelector(".to input");
let data;
let rate;
(async function () {
    data =  await fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rUlhfG2ACnxvMUKjHvS6VKlLYdPK11BRAImKLg5p");
    rate = await data.json(); //with respece to usd
    toInput.value = rate.data["INR"];

})();

console.log(rate);


for (let select of selects){
    for (code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name == "from" && code == "USD"){
            newOption.selected = "selected";
        }
        if (select.name == "to" && code == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) =>{
        return updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let country_code = countryList[element.value];
    let country_flag = `https://flagsapi.com/${country_code}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src  = country_flag;
}

btn.addEventListener("click",async (evt) =>{
    evt.preventDefault();
    let fromValue = document.querySelector(".from input"); 
    if (fromValue.value <1){
        fromValue.value = 1
    }

    let usdFrom= fromInput.value/rate.data[from.value];
    let usdTo = rate.data[to.value];

    toInput.value = usdFrom * usdTo;
});



