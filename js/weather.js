const API_URL = "https://api.nasa.gov/insight_weather/?api_key=zJDIhzpxVP309Fq8OS4Kns9NFwfAFwqD6HZmRCIn&feedtype=json&ver=1.0";

const weatherContainer = document.querySelector(".container_weather");
const previousWeatherToggle = document.querySelector(".show-previous-weather");
const previousWeather = document.querySelector(".previous-weather");

const currentSolElement = document.querySelector('[data-current-sol]')
const currentDateElement = document.querySelector('[data-current-date]')
const currentTempHighElement = document.querySelector('[data-current-temp-high]')
const currentTempLowElement = document.querySelector('[data-current-temp-low]')

const previousSolTemplate = document.querySelector('[data-previous-sol-template]')
const previousSolContainer = document.querySelector('[data-previous-sols]')

const unitToggle = document.querySelector('[data-unit-toggle]')
const metricRadio = document.getElementById('cel')
const imperialRadio = document.getElementById('fah')

function displaySelectedSol(sols) {
 const selectedSol = sols[selectedSolIndex]
 currentSolElement.innerText = selectedSol.sol
 currentDateElement.innerText = displayDate(selectedSol.date)
 currentTempHighElement.innerText = displayTemperature(selectedSol.maxTemp)
 currentTempLowElement.innerText = displayTemperature(selectedSol.minTemp)
}

function displayPreviousSols(sols) {
	previousSolContainer.innerHTML = ''
	sols.forEach((solData, index) => {
		const solContainer = previousSolTemplate.content.cloneNode(true)
		solContainer.querySelector('[data-sol]').innerText = solData.sol
		solContainer.querySelector('[data-date]').innerText = displayDate(solData.date)
		solContainer.querySelector('[data-temp-high]').innerText = displayTemperature(solData.maxTemp)
		solContainer.querySelector('[data-temp-low]').innerText = displayTemperature(solData.minTemp)
		solContainer.querySelector('[data-select-button]').addEventListener('click', () => {
			selectedSolIndex = index
			displaySelectedSol(sols)
		})
		previousSolContainer.appendChild(solContainer)
	})
}

function displayDate(date) {
    return date.toLocaleDateString(
        undefined, 
        { day: 'numeric', month: 'long'}
    )
}

function displayTemperature(temperature) {
    let returnTemp = temperature
    if (!isMetric()) {
        returnTemp = (temperature - 32) * (5 / 9)
    }
    return Math.round(returnTemp)
}

function getWeather() {
return fetch(API_URL)
.then(res => res.json())
.then(data => {
    const {
        sol_keys,
        validity_checks,
        ...solData
    } = data
        return Object.entries(solData).map(([sol, data]) => {
             return {
                        sol: sol,
                        maxTemp: data.PRE.mx,
                        minTemp: data.PRE.mn,
                        date: new Date(data.First_UTC)
                    }
                })
            })
}


getWeather().then(sols => {
    selectedSolIndex = sols.length - 1
    displaySelectedSol(sols)
    displayPreviousSols(sols)


    unitToggle.addEventListener('click', () => {
        let metricUnits = !isMetric.checked
        metricRadio.checked = metricUnits
        imperialRadio.checked = !metricUnits
        updateUnits()

    })

    metricRadio.addEventListener('change', () => {
		displaySelectedSol(sols)
		displayPreviousSols(sols)
		updateUnits()
	})

	imperialRadio.addEventListener('change', () => {
		displaySelectedSol(sols)
		displayPreviousSols(sols)
		updateUnits()
	})
})



function updateUnits() {
    const tempUnits = document.querySelectorAll('[data-temp-unit]')
    tempUnits.forEach(unit => {
        unit.innerText = isMetric() ? 'C' : 'F'
    })
}

function isMetric() {
    return metricRadio.checked
}