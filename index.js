import dotenv from 'dotenv'
dotenv.config()
import capitalize from 'capitalize';

import {
    leerInput,
    inquirerMenu,
    pausa,
    listarLugares
} from "./helpers/inquirer.js";

import Busquedas from "./models/busquedas.js";

console.log(process.env.MAPBOX_KEY);

const main = async () => {

    const busquedas = new Busquedas();
    let opt;

    do {
        // Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);

                //Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === 0) continue; //Si el usuario selecciona 0, se vuelve a mostrar el menu
                const lugarSel = lugares.find(l => l.id === id);

                //Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);

                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                console.log(clima);

                //Mostrar resultados
                console.log('\nBuscando informacion del lugar...\n'.rainbow);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('Como esta el clima:', clima.desc);
                break;

            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${i + 1}`.green;
                    console.log(`${idx} ${capitalize.words(lugar)}`);
                })
                break;
        }

        if (opt !== 0) await pausa();
    } while (opt !== 0);
}

main();