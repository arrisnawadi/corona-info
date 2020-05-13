import { dataIndo, dataProvinsi, dataGlobal, dataAllGlobal, chartProv, chartSembuhProv, chartMeninggalProv } from "./layout"

function main() {
    var proxy = "//cors-anywhere.herokuapp.com";
    var url = "https://api.kawalcorona.com/indonesia/";
    var urlProv = "https://api.kawalcorona.com/indonesia/provinsi/";
    var urlGlobal = "https://api.kawalcorona.com/";

    // data kasus di Indonesia
    const getIndo = async () => {
        try {
            const response = await fetch(proxy + '/' + url)
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
            const response = await fetch(proxy + '/' + urlProv)
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
            const response = await fetch(proxy + '/' + urlProv)
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

    // data kasus di Indonesia
    const getAllGlobal = async () => {
        try {
            const response = await fetch('https://api.covid19api.com/summary')
            const responseJSON = await response.json()
            if (responseJSON) {
                dataAllGlobal(responseJSON.Global)
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
            const response = await fetch(proxy + '/' + urlGlobal)
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
        getAllGlobal()
        getDataGlobal()
    })
}

export default main