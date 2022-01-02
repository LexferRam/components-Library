// import React from 'react';
// import { useState, useEffect,FC } from 'react'
// import {Chart} from 'react-google-charts'

// import {PieChartProps} from "./PieChart.types"

// const PieChart: FC<PieChartProps> =  ({ enviardataGraph, titulo }) => {
//     const [json, setJson] = useState<typeof enviardataGraph>([]);

//     useEffect(() => {

//         // EN CASO DE NECESITAR CONSTRUIR EL ARRAY QUE RECIBE EL GRAFICO EJECUTAR LO COMENTADO
//         // const chartData = [['TIPO SUSCRIPCION', '%']]
//         // for (let i = 0; i < enviardataGraph?.length; i += 1) {
//         //     if (enviardataGraph[i].DESTIPOSUSC !== "TOTAL") {
//         //         chartData.push([enviardataGraph[i].DESTIPOSUSC + " " + enviardataGraph[i].DESTIPOCOTPOL + " " + enviardataGraph[i].CODMONEDA, enviardataGraph[i].PORCENTAJE])
//         //     }
//         // }

//         let chartData : Array<string | number> = !enviardataGraph ? [] : enviardataGraph;

//         setJson(chartData);
//     }, [enviardataGraph])

//     return (
//         <>
//             <p style={{ color: "black", marginLeft: 30, marginRight: 20, fontWeight: 600, textAlign: "center" }}>{titulo}</p>
//             <div style={{ marginTop: 50 }}>
//                 <Chart
//                     width={'100%'}
//                     height={'100%'}
//                     chartType="PieChart"
//                     loader={<div style={{ color: "gray" }}>Cargando Gráfica...</div>}
//                     data={json}
//                     options={{
//                         chartArea: { width: '100%', height: '90%' },
//                         legend: { position: 'left', textStyle: { color: 'black', fontSize: 8 } },
//                         slices: [{ offset: 0 }],
//                         titleTextStyle: { color: 'gray', textAlign: "center" },
//                         is3D: true,
//                     }}
//                     rootProps={{ 'data-testid': '2' }}
//                 />
//             </div>
//         </>
//     )
// }

// export default PieChart;

import React from 'react';
import { useState, useEffect} from 'react'
import Chart from 'react-google-charts'


const PieChart=  ({ enviardataGraph, titulo }) => {
    const [json, setJson] = useState([]);

    useEffect(() => {

        // EN CASO DE NECESITAR CONSTRUIR EL ARRAY QUE RECIBE EL GRAFICO EJECUTAR LO COMENTADO
        // const chartData = [['TIPO SUSCRIPCION', '%']]
        // for (let i = 0; i < enviardataGraph?.length; i += 1) {
        //     if (enviardataGraph[i].DESTIPOSUSC !== "TOTAL") {
        //         chartData.push([enviardataGraph[i].DESTIPOSUSC + " " + enviardataGraph[i].DESTIPOCOTPOL + " " + enviardataGraph[i].CODMONEDA, enviardataGraph[i].PORCENTAJE])
        //     }
        // }

        let chartData = !enviardataGraph ? [] : enviardataGraph;

        setJson(chartData);
    }, [enviardataGraph])

    return (
        <>
            <p style={{ color: "black", marginLeft: 30, marginRight: 20, fontWeight: 600, textAlign: "center" }}>{titulo}</p>
            <div style={{ marginTop: 50 }}>
                <Chart
                    width={'100%'}
                    height={'100%'}
                    chartType="PieChart"
                    loader={<div style={{ color: "gray" }}>Cargando Gráfica...</div>}
                    data={json}
                    options={{
                        chartArea: { width: '100%', height: '90%' },
                        legend: { position: 'left', textStyle: { color: 'black', fontSize: 8 } },
                        slices: [{ offset: 0 }],
                        titleTextStyle: { color: 'gray', textAlign: "center" },
                        is3D: true,
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
        </>
    )
}

export default PieChart;
