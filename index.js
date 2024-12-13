import express from 'express';
import cors from 'cors';

// Crear la aplicación de Express
const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(cors());
app.use(express.json());

// configuración de cantidad de grupos y checkboxes
const config = {
    groups: [
        {
            id: "grupo1",
            checkboxes: ["riego1", "riego2"]
        },
        {
            id: "grupo2", 
            checkboxes: ["riego1", "riego2"]
        },
        {
            id: "grupo3",
            checkboxes: ["riego1", "riego2"]  
        },
        {
            id: "grupo4",
            checkboxes: ["riego1", "riego2", "riego3"]  
        }
    ]
};

const datos = {
    /* lista: [] */
    // se almacena el estado de los checkboxes en formato JSON
    checkboxStates: {}
}

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la REST API con Node.js y import!');
});

// se envía la configuración
app.get('/api/config', (req, res) => {
    res.json(config);
});

// se envía el estado de los checkboxes
app.get('/api/items', (req, res) => {    
    /* res.json(datos.lista); */
    console.log('Current states:', datos.checkboxStates); // debug
    res.json(datos.checkboxStates);
});

// se recibe el estado de los checkboxes
app.post('/api/items', (req, res) => {
    const {name, state} = req.body;
    // se almacena el estado del checkbox
    datos.checkboxStates[name] = state;

    // debug
    console.log('Updating checkbox state:');
    console.log(`Name: ${name}`);
    console.log(`State: ${state}`);
    console.log('Current states:', datos.checkboxStates);

    res.status(201).json({
        name: name,
        state: state,
        timestamp: Date.now(),
        // se envía el estado de los checkboxes
        allStates: datos.checkboxStates
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
