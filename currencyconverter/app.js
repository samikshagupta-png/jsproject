const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select  of dropdowns){
    for ( let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
       
        if (select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if (select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

}

const updateFlag =(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newsrc;


};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);

    if (isNaN(amtVal) || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const response = await fetch(BASE_URL);
    const data = await response.json();
    // console.log(data); // check structure

    // Convert via EUR base
    const fromRate = data.eur[fromCurr.value.toLowerCase()];
    const toRate = data.eur[toCurr.value.toLowerCase()];

    if (!fromRate || !toRate) {
        msg.innerText = "Currency not found .";
        return;
    }

    // Convert amount: first to EUR, then to target
    const finalAmount = (amtVal / fromRate) * toRate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});

