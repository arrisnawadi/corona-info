import { dataIndo, dataProvinsi, dataGlobal, dataAllGlobal, chartProv, chartSembuhProv, chartMeninggalProv } from "./layout"

function main() {
    const proxy = "//cors-anywhere.herokuapp.com"
    const allIndo = "https://api.kawalcorona.com/indonesia/"
    const indoProv = "https://api.kawalcorona.com/indonesia/provinsi/"
    const globalAll = "https://api.kawalcorona.com/"

    // data kasus di Indonesia
    const getIndo = async () => {
        try {
            const response = await fetch(proxy + '/' + allIndo)
            const responseJSON = await response.json()
            if (responseJSON) {
                dataIndo(responseJSON[0])
            } else {
                console.log("Couldn't get data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // data kasus seluruh provinsi di Indonesia
    const getDataProv = async () => {
        try {
            const response = await fetch(proxy + '/' + indoProv)
            const responseJSON = await response.json()
            if (responseJSON) {
                dataProvinsi(responseJSON)
            } else {
                console.log("Couldn't get data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // data kasus seluruh provinsi di Indonesia
    const getChartIndo = async () => {
        try {
            const response = await fetch(proxy + '/' + indoProv)
            const responseJSON = await response.json()
            if (responseJSON) {
                const filterPos = responseJSON.filter(data => data.attributes.Kasus_Posi > 300)
                chartProv(filterPos)

                const filterSem = responseJSON.filter(data => data.attributes.Kasus_Semb > 100)
                chartSembuhProv(filterSem)

                const filterMen = responseJSON.filter(data => data.attributes.Kasus_Meni > 50)
                chartMeninggalProv(filterMen)
            } else {
                console.log("Couldn't get data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // data kasus global
    const getGlobalPos = async () => {
        try {
            const response = await fetch(`https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats`)
            const responseJSON = await response.json()
            if (responseJSON) {
                dataAllGlobal(responseJSON.data)
            } else {
                console.log("Couldn't get data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // data kasus seluruh negara di dunia
    const getDataGlobal = async () => {
        try {
            const response = await fetch(proxy + '/' + globalAll)
            const responseJSON = await response.json()
            if (responseJSON) {
                dataGlobal(responseJSON)
            } else {
                console.log("Couldn't get data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        getIndo()
        getDataProv()
        getChartIndo()
        getGlobalPos()
        getDataGlobal()
    })
}

export default main