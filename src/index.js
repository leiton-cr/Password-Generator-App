import { showSuccess, showError } from "./alerts.js"

const strengthBoxes = document.querySelectorAll("[data-active]");
const strengthText = document.querySelector(".strength-text");
const resultPassword = document.querySelector(".result-password");
const strengths = ["Zero", "Easy", "Meduim", "Hard", "Hacker"];
const options = {
    uppercase: "ABCDEFGJIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "1234567890",
    symbols: ".,-/*@#$%^&"
}

let strength = 0;
let currentSymbols = [];
let settedSymbols = [];

const setStrength = () => {
    for (let [i, box] of strengthBoxes.entries()) {
        box.dataset.active = i < strength
    }

    strengthText.innerText = strengths[strength]
}

const handleChange = (e) => {
   
    if (e.target.checked) {
        strength++
        currentSymbols.push(e.target.id)
    } else {
        strength--
        currentSymbols = currentSymbols.filter(s => s !== e.target.id)
    }

    setStrength();
}

const randomInt = (i) => {
    return Math.floor(Math.random() * i)
}

const randomize = (settedSymbols) => {

    if (settedSymbols.length < strength) {

        const remainingSymbols = currentSymbols.filter(s => !settedSymbols.includes(s))
        const randomSymbol = randomInt(remainingSymbols.length)
        const randomOption = options[remainingSymbols[randomSymbol]]
        const randomized = randomOption[randomInt(randomOption.length)]

        settedSymbols.push(remainingSymbols[randomSymbol])

        return randomized;
    }

    const randomSymbol = randomInt(currentSymbols.length)
    const randomOption = options[currentSymbols[randomSymbol]]
    const randomized = randomOption[randomInt(randomOption.length)]

    return randomized;
}

const generate = (e) => {
    e.preventDefault()

    if (strength === 0) {
        resultPassword.innerText = "Must select an option"
        return
    }

    const length = parseInt(document.querySelector('[type="range"]').value)
    const generated = {}
    settedSymbols = []

    let toSet = Array.from(Array(length).keys());

    while (Object.keys(generated).length < length) {

        let j = randomize(settedSymbols)

        let index = toSet[randomInt(toSet.length)]

        toSet = toSet.filter(s => s !== index);
        generated[index] = j

    }

    resultPassword.innerText = Object.values(generated).join("")
}

const makeCopy = () => {
    if (resultPassword.innerText === "Must select an option") {
        return
    }

    if (navigator.clipboard) {
        navigator.clipboard.writeText(resultPassword.innerText);
        showSuccess()
    } else {
        showError()
    }
}

document.forms[0].addEventListener("submit", generate)

document.querySelector(".copy-button").addEventListener("click", makeCopy)

document.querySelectorAll('[type="checkbox"]').forEach(element => {
    element.addEventListener("input", handleChange)
})