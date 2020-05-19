// menampilkan data kasus di Indonesia
export const dataIndo = (data) => {
    const indoCard = document.querySelector(".data-indo")
    indoCard.innerHTML = ''

    indoCard.innerHTML = `
    <div class="col my-2">
		<div class="card card-positif d-flex flex-row">
			<div class="card-body" style="width: 65%;">
				<h5 class="card-title text-center">Positif</h5>
				<h3 class="card-text text-center">${data.positif}</h3>
			</div>
			<img src="https://img.icons8.com/cute-clipart/64/000000/sad.png" alt="total_positif" class="mx-3 my-2" style="width: 100px;" />
		</div>
    </div>
    
    <div class="col my-2">
		<div class="card card-dirawat d-flex flex-row">
			<div class="card-body" style="width: 65%;">
				<h5 class="card-title text-center">Dirawat</h5>
				<h3 class="card-text text-center">${data.dirawat}</h3>
			</div>
			<img src="https://img.icons8.com/cute-clipart/64/000000/neutral-emoticon.png" alt="total_dirawat" class="mx-3 my-2" style="width: 100px;" />
		</div>
	</div>

    <div class="col my-2">
		<div class="card card-sembuh d-flex flex-row">
			<div class="card-body" style="width: 65%;">
				<h5 class="card-title text-center">Sembuh</h5>
				<h3 class="card-text text-center">${data.sembuh}</h3>
			</div>
			<img src="https://img.icons8.com/cute-clipart/64/000000/happy.png" alt="total_sembuh" class="mx-3 my-2" style="width: 100px;" />
		</div>
	</div>

    <div class="col my-2">
		<div class="card card-meninggal d-flex flex-row">
			<div class="card-body" style="width: 65%;">
				<h5 class="card-title text-center">Meninggal</h5>
				<h3 class="card-text text-center">${data.meninggal}</h3>
            </div>
			<img src="https://img.icons8.com/cute-clipart/64/000000/crying.png" alt="total_meninggal" class="mx-3 my-2" style="width: 100px;" />
		</div>
	</div>
    `
}

// menampilkan data semua provinsi Indonesia
export const dataProvinsi = (dataProv) => {
    const provTable = document.getElementById("data-wilayah")
    provTable.innerHTML = ''

    dataProv.forEach(data => {
        let positif = data.attributes.Kasus_Posi.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        let sembuh = data.attributes.Kasus_Semb.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        let meninggal = data.attributes.Kasus_Meni.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        provTable.innerHTML += `
        <tr>
            <td scope="col">${data.attributes.Provinsi}</td>
            <td scope="col">${positif}</td>
            <td scope="col">${sembuh}</td>
            <td scope="col">${meninggal}</td>
        </tr>
        `
    });
}

// mengubah data provinsi menjadi grafik per kriteria
export const grafikWilayah = (dataWil) => {
    const xAxis = [];
    const yAxis = [];
    const yAxisSembuh = [];
    const yAxisMeninggal = [];

    dataWil.forEach(data => {
        xAxis.push(data.attributes.Provinsi)
        yAxis.push(data.attributes.Kasus_Posi)
        yAxisSembuh.push(data.attributes.Kasus_Semb)
        yAxisMeninggal.push(data.attributes.Kasus_Meni)
    });
    return { xAxis, yAxis, yAxisSembuh, yAxisMeninggal }
}

// menampilkan kasus positif > 300 orang
export const chartProv = async (dataChart) => {
    const data = await grafikWilayah(dataChart)
    const ctx = document.getElementById('chartAllProv').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.xAxis,
            datasets: [
                {
                    label: 'Kasus Positif > 300 Orang',
                    data: data.yAxis,
                    fill: false,
                    backgroundColor: 'rgba(51,51,255,0.2)',
                    borderColor: 'rgba(51,0,255,0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        lineHeight: 2.5
                    }
                }]
            },
            legend: {
                display: true,
                labels: {
                    fontSize: 18
                }
            }
        }
    });
}

// menampilkan pasien sembuh > 100 orang
export const chartSembuhProv = async (dataChart) => {
    const data = await grafikWilayah(dataChart)
    const ctx = document.getElementById('chartPositif').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.xAxis,
            datasets: [
                {
                    label: 'Kasus Sembuh > 100 Orang',
                    data: data.yAxisSembuh,
                    fill: false,
                    backgroundColor: 'rgba(0,204,0,0.2)',
                    borderColor: 'rgba(0,153,0,0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        lineHeight: 2.5
                    }
                }]
            },
            legend: {
                display: true,
                labels: {
                    fontSize: 18
                }
            }
        }
    });
}

// menampilkan pasien meninggal > 50 orang
export const chartMeninggalProv = async (dataChart) => {
    const data = await grafikWilayah(dataChart)
    const ctx = document.getElementById('chartMeninggal').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.xAxis,
            datasets: [
                {
                    label: 'Kasus Meninggal > 50 Orang',
                    data: data.yAxisMeninggal,
                    fill: false,
                    backgroundColor: 'rgba(255,0,51,0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        lineHeight: 2.5,
                    }
                }]
            },
            legend: {
                display: true,
                labels: {
                    fontSize: 18
                }
            }
        }
    });
}

// menampilkan total data global
export const dataAllGlobal = (data) => {
    const globalCard = document.querySelector(".data-all-global")
    globalCard.innerHTML = ''

    globalCard.innerHTML = `    
    <div class="col my-2">
		<div class="card card-dirawat d-flex flex-row h-100">
			<div class="card-body">
				<h5 class="card-title text-center">Positif</h5>
				<h3 class="card-text text-center">${data.total_cases}</h3>
			</div>
			<img src="https://img.icons8.com/cute-clipart/64/000000/sad.png" alt="total_positif" class="mx-3 my-2" style="width: 100px;" />
		</div>
	</div>

    <div class="col my-2">
		<div class="card card-sembuh d-flex flex-row h-100">
			<div class="card-body">
				<h5 class="card-title text-center">Sembuh</h5>
				<h3 class="card-text text-center">${data.recovery_cases}</h3>
			</div>
			<img src="https://img.icons8.com/cute-clipart/64/000000/happy.png" alt="total_sembuh" class="mx-3 my-2" style="width: 100px;" />
		</div>
	</div>

    <div class="col my-2 mx-auto">
		<div class="card card-meninggal d-flex flex-row h-100">
			<div class="card-body">
				<h5 class="card-title text-center">Meninggal</h5>
				<h3 class="card-text text-center">${data.death_cases}</h3>
            </div>
			<img src="https://img.icons8.com/cute-clipart/64/000000/crying.png" alt="total_meninggal" class="mx-3 my-2" style="width: 100px;" />
		</div>
	</div>
    `
}

// menampilkan data global
export const dataGlobal = (datas) => {
    const globalTable = document.getElementById("data-global")
    globalTable.innerHTML = ''

    datas.forEach(data => {
        let positif = data.attributes.Confirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        let sembuh = data.attributes.Recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        let meninggal = data.attributes.Deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        globalTable.innerHTML += `
        <tr>
            <td scope="col">${data.attributes.Country_Region}</td>
            <td scope="col">${positif}</td>
            <td scope="col">${sembuh}</td>
            <td scope="col">${meninggal}</td>
        </tr>
        `
    });
}

