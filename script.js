if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

});


let api = `https://v6.exchangerate-api.com/v6/69af037dafedf9b0befcebf9/latest/USD`;
const fromDropDown = document.querySelector("#from-currency-select");
const toDropDown = document.querySelector("#to-currency-select");
let currency = []
let currencyRate = []


document.addEventListener('DOMContentLoaded', function () {
    setCurrency()
});
// Get data from API
const setCurrency = () => {
    fetch(api).then((resp) => resp.json())
        .then((data) => {
            // console.log("hit");
            currencyRate = data.conversion_rates
            currency = Object.keys(data.conversion_rates)
            currency.map((data) => {
                setCurrencyValue(data)
            })

        })
}
//Create dropdown from the currency array
const setCurrencyValue = (data) => {
    const option = document.createElement("option");
    option.value = data;
    option.text = data;
    fromDropDown.add(option);
    const option2 = document.createElement("option");
    option2.value = data;
    option2.text = data;
    toDropDown.add(option2);
}

//function to convert currency
const convertCurrency = (e) => {
    e.preventDefault()
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;
    //If amount input field is not empty
    if (amount.length != 0) {
        let fromExchangeRate = currencyRate[fromCurrency];
        let toExchangeRate = currencyRate[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed()} ${toCurrency}`;
    } else {
    alert("Please fill in the amount");
    }
};

document.getElementById("form").addEventListener("submit", convertCurrency)