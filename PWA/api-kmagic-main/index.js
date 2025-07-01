import express from 'express'
import { config } from 'dotenv'
import pg from 'pg'
import cors from 'cors'

config();

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl : true 
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    return res.send(result.rows[0].now);    
})

// Nuevo endpoint para consultar los primeros 20 registros de la tabla "Camion"
app.get('/consulta-camion', async (req, res) => {
    try {
        const result = await pool.query('SELECT "CAM_CAP" FROM public."Camion" LIMIT 20');
        const camiones = result.rows;

        // Devolver los resultados en formato JSON
        res.json({ camiones });
    } catch (error) {
        console.error('Error al consultar la tabla "Camion":', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/comando/:arrNom', async (req, res) => {
  const { arrNom } = req.params;

  try {
    const result = await pool.query({
      text: 'SELECT C."CMD_CODE", C."CMD_DSC" FROM public."Comando" AS C JOIN public."Arreglo" AS A ON C."ARR_ID" = A."ARR_ID" WHERE A."ARR_NOM" = $1',
      values: [arrNom],
    });

    const comandos = result.rows;

    // Devolver los resultados en formato JSON
    res.json({ comandos });
  } catch (error) {
    console.error('Error al consultar la tabla "Comando":', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})