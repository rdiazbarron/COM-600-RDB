const express = require('express');
const app = express();
const port = 3006;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index', { resultados: null });
});

app.post('/calcular', (req, res) => {
    const numero = parseInt(req.body.numero);
    const inicio = parseInt(req.body.inicio);
    const fin = parseInt(req.body.fin);
    const operacion = req.body.operacion;
    let resultados = [];

    for (let i = inicio; i <= fin; i++) {
        let resultado;
        let simbolo;

        switch (operacion) {
            case 'sumar':
                resultado = numero + i;
                simbolo = '+';
                break;
            case 'restar':
                resultado = numero - i;
                simbolo = '-';
                break;
            case 'multiplicar':
                resultado = numero * i;
                simbolo = '×';
                break;
            case 'dividir':
                if (i !== 0) {
                    resultado = (numero / i).toFixed(2);
                } else {
                    resultado = 'nose puede';
                }
                simbolo = '÷';
                break;
            default:
                return res.send('Operación no válida');
        }
        resultados.push({ numero, simbolo, i, resultado });
    }
    res.render('index', { resultados });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
