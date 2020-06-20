import { viewDataIndo, viewDataProv, viewDataGlobal, viewGlobal, chartProv, chartSembuhProv, chartMeninggalProv } from "./layout"

function main() {
    const proxy = "//cors-anywhere.herokuapp.com"
    const dataIndo = "https://api.kawalcorona.com/indonesia/"
    const dataProv = "https://api.kawalcorona.com/indonesia/provinsi/"
    const globalAll = "https://api.kawalcorona.com/"

    // data kasus di Indonesia
    const getDataIndo = async () => {
        try {
            const response = await fetch(proxy + '/' + dataIndo)
            const responseJSON = await response.json()
            if (responseJSON) {
                viewDataIndo(responseJSON[0])
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
            const response = await fetch(proxy + '/' + dataProv)
            const responseJSON = await response.json()
            if (responseJSON) {
                viewDataProv(responseJSON)
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
            const response = await fetch(proxy + '/' + dataProv)
            const responseJSON = await response.json()
            if (responseJSON) {
                const filterPos = responseJSON.filter(data => data.attributes.Kasus_Posi > 1000)
                chartProv(filterPos)

                const filterSem = responseJSON.filter(data => data.attributes.Kasus_Semb > 500)
                chartSembuhProv(filterSem)

                const filterMen = responseJSON.filter(data => data.attributes.Kasus_Meni > 100)
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
                viewGlobal(responseJSON.data)
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
                viewDataGlobal(responseJSON)
            } else {
                console.log("Couldn't get data")
            }
        } catch (error) {
            console.log(error)
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        getDataIndo()
        getDataProv()
        getChartIndo()
        getGlobalPos()
        getDataGlobal()
    })
}

export default main