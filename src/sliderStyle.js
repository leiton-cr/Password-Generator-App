class Slider {
    constructor(rangeElement, valueElement, options) {
        this.rangeElement = rangeElement
        this.valueElement = valueElement
        this.options = {
            min: 1,
            max: 15,
            cur: 8
        }

        this.rangeElement.addEventListener('input', this.updateSlider.bind(this))

        this.updateSlider()
    }

    generateBackground(rangeElement) {
        if (this.rangeElement.value === this.options.min) {
            return
        }

        let percentage = (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100
        return 'background: linear-gradient(to right, var(--clr-accent), var(--clr-accent) ' + percentage + '%, rgb(24, 23, 31) ' + percentage + '%, rgb(24, 23, 31) 100%)'
    }

    updateSlider() {
        this.valueElement.innerHTML = this.rangeElement.value
        this.rangeElement.style = this.generateBackground(this.rangeElement.value)
    }
}

const rangeElement = document.querySelector('[type="range"]')
const valueElement = document.querySelector('.range__value')

if (rangeElement) {
    new Slider(rangeElement, valueElement)
}