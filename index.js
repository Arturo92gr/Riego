import express from 'express';
import cors from 'cors';

// Crear la aplicación de Express
const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(cors());
app.use(express.json());

const datos = {
    /* lista: [] */
    // se almacena el estado de los checkboxes en formato JSON
    checkboxStates: {}
}

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la REST API con Node.js y import!');
});

// se envía el estado de los checkboxes
app.get('/api/items', (req, res) => {    
    /* res.json(datos.lista); */
    
    res.json(datos.checkboxStates);
});

// se recibe el estado de los checkboxes
app.post('/api/items', (req, res) => {
    const {name, state} = req.body;
    datos.checkboxStates[name] = state;
    console.log(`Checkbox ${name} changed to ${state}`);
    res.status(201).json({
        name: name,
        state: state,
        timestamp: Date.now()
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
