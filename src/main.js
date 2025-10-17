// Data retrieved from https://www.vikjavev.no/ver/#2020-04-15,2020-04-16
const API_KEY ='8cf649b7f2f54da291281827251610'
let date = new Date();
let dateDuJour = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

const historyWeatherData = async (location) => {
    const result = await fetch(`https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${location}&dt=${dateDuJour}`)
    const data = await result.json()
    return data;

}
const mtpdata = await historyWeatherData("Montpellier", dateDuJour); //on va chercher les donnees de montpellier dans l'API
const mtpTemperature = []; //on creer un tableau mtptemperature
mtpdata.forecast.forecastday[0].hour.forEach((hour) => { //on boucle sur toutes les heures du tableau et on ajoute les temperature pour
    mtpTemperature.push(hour.temp_c);                    //chaques heures dans le tableau mtpTemperature.
});

const parisdata = await historyWeatherData("Paris", dateDuJour);
const parisTemperature = [];
parisdata.forecast.forecastday[0].hour.forEach((hour) => {
    parisTemperature.push(hour.temp_c);
});

const lilledata = await historyWeatherData("Lille", dateDuJour);
const lilleTemperature = [];
lilledata.forecast.forecastday[0].hour.forEach((hour) => {
    lilleTemperature.push(hour.temp_c);
});



Highcharts.chart('container', {
    chart: {
        type: 'spline',
        scrollablePlotArea: {
            minWidth: 600,
            scrollPositionX: 1
        }
    },
    title: {
        text: `Temperature de la journee Montpellier`,
        align: 'left'
    },
    subtitle: {
        text: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0)),
        align: 'left'
    },
    xAxis: {
        type: 'datetime',
        tickInterval: 3 * 3600 * 1000, 
        labels: {
            overflow: 'justify'
        },
        plotBands:[{ //nuit
            from: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0),
            to: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 6),
            color: 'white',
            label: {
                text: 'nuit',
                style:{
                    opacity:0.7
                }
            }
        },{ //matin
           from: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 6),
            to: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12),
            color: 'rgba(7, 120, 233, 0.1)',
            label: {
                text: 'matin',
                style:{
                    opacity:0.7
                }
            }
        },{ //midi
           from: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12),
            to: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 13),
            color: 'white',
            label: {
                text: 'Midi',
                style:{
                    opacity:0.7
                }
            }
        },{ //apres-midi
           from: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 13),
            to: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 19),
            color: 'rgba(7, 120, 233, 0.1)',
            label: {
                text: 'Apres-midi',
                style:{
                    opacity:0.7
                }
            }
        },{ //soir
           from: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 19),
            to: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 24),
            color: 'white',
            label: {
                text: 'soir',
                style:{
                    opacity:0.7
                }
            }
        }
    ]
    },
    yAxis: {
        title: {
            text: 'Température (°C)'
        },
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        alternateGridColor: null,
        plotBands: []
    },
    
    tooltip: {
        formatter: function(){
          const icon = this.y > 10 ? '☀️' : '❄️';
          return `<b>${this.series.name}</b><br/>
                  temperature : ${this.y} °c ${icon}`;
        },
        valueSuffix: ' °c'
    },

    plotOptions: {
        spline: {
            lineWidth: 4,
            states: {
                hover: {
                    lineWidth: 5
                }
            },
            marker: {
                enabled: false
            },
            pointInterval: 3600000, // one hour
            pointStart: Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0),
        }
    },
    series: [{
        name: "Montpellier",
        data: mtpTemperature
    },
    { 
        name: "Paris",
        data: parisTemperature
     },
     { 
        name: "Lille",
        data: lilleTemperature
     }
    
],

    navigation: {
        menuItemStyle: {
            fontSize: '10px'
        }
    }
});

