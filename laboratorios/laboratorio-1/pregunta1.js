const express = require('express');
const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`
        <form method="POST" action="/calcular">
            <label for="num1">Número 1:</label>
            <input type="number" id="num1" name="num1" required>
            <br>
            <label for="num2">Número 2:</label>
            <input type="number" id="num2" name="num2" required>
            <br>
            <label for="operacion">Operación:</label>
            <select id="operacion" name="operacion">
                <option value="sumar">Sumar</option>
                <option value="restar">Restar</option>
                <option value="multiplicar">Multiplicar</option>
                <option value="dividir">Dividir</option>
            </select>
            <br>
            <button type="submit">Calcular</button>
        </form>
    `);
});

app.post('/calcular', (req, res) => {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const operacion = req.body.operacion;
    let resultado;

    switch (operacion) {
        case 'sumar':
            resultado = num1 + num2;
            break;
        case 'restar':
            resultado = num1 - num2;
            break;
        case 'multiplicar':
            resultado = num1 * num2;
            break;
        case 'dividir':
            if (num2 === 0) {
                return res.send('no se peude');
            }
            resultado = num1 / num2;
            break;
        default:
            return res.send('Operación no válida');
    }

    res.send(`El resultado de ${operacion} ${num1} y ${num2} es: ${resultado}`);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
