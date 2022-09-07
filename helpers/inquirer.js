import inquirer from 'inquirer';
import 'colors';

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Selecciona una opcion: ',
    choices: [{
            value: 1,
            name: `${'1.'.rainbow} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.rainbow} Historial`
        },
        {
            value: 0,
            name: `${'0.'.rainbow} Salir`
        },
    ]
}];

const inquirerMenu = async () => {
    console.clear();
    console.log('====================='.rainbow);
    console.log('Selecciona una opcion'.white);
    console.log('=====================\n'.rainbow);
    const {
        opcion
    } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    const preguntas = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.rainbow} para continuar`
    }];
    console.log('\n');
    await inquirer.prompt(preguntas);
}

const leerInput = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const {
        desc
    } = await inquirer.prompt(question);
    return desc;

}


const listarLugares = async (lugares = []) => {

    const choices = lugares.map((lugar, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.rainbow + ' Cancelar'
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Selecccione lugar: ',
        choices
    }];

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}   


const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

export {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}