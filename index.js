const express = require('express');
const morgan = require('morgan');
const { swaggerUi, specs } = require('./swagger'); // Importe a configuração do Swagger
const app = express();
const port = 3000;

// Middleware para parsing de parâmetros de consulta
app.use(express.json());

// Configuração personalizada do morgan para incluir o IP do cliente
morgan.format('custom', ':remote-addr :method :url :status :response-time ms');
app.use(morgan('custom')); // Usa o formato personalizado para o log

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Endpoint de cálculo
/**
 * @openapi
 * /calculate:
 *   get:
 *     summary: Realiza um cálculo simples
 *     parameters:
 *       - name: num1
 *         in: query
 *         description: Primeiro número
 *         required: true
 *         schema:
 *           type: number
 *       - name: num2
 *         in: query
 *         description: Segundo número
 *         required: true
 *         schema:
 *           type: number
 *       - name: operation
 *         in: query
 *         description: Operação matemática a ser realizada
 *         required: true
 *         schema:
 *           type: string
 *           enum: [+, -, x, /]  # Define os valores possíveis para operação
 *     responses:
 *       200:
 *         description: Resultado do cálculo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *       400:
 *         description: Erro na solicitação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

app.get('/aqr', (req, res, next) => {
    try {
        //Definindo as variaveis para fazer a conta
        const {area1, area2,area3,area4} = req.query;


      
        if (area1 === undefined || area2 === undefined ||area3 === undefined ||area4 === undefined ) {
            throw new Error('Parâmetros insuficientes!');
        }

        const areaNumber1 = parseFloat(area1);
        const areaNumber2 = parseFloat(area2);
        const areaNumber3 = parseFloat(area3);
        const areaNumber4 = parseFloat(area4);

        let result;
        let quadrado;
        let retangulo;

        quadrado = (areaNumber1 + areaNumber2 + areaNumber3 + areaNumber4)/2 ;

        retangulo = (areaNumber1 * areaNumber2) && (areaNumber3 * areaNumber4);
        


        if (isNaN(areaNumber1) || isNaN(areaNumber2) || isNaN(areaNumber3) || isNaN(areaNumber4)) {
            throw new Error('Parâmetros inválidos!');
        }

         if (areaNumber1 === areaNumber2 && areaNumber2 === areaNumber3 && areaNumber3 === areaNumber4){
                result = `${quadrado}m²  -  quadrado`
         } else if (areaNumber1 === areaNumber3 && areaNumber2 === areaNumber4 ){
                result = `${retangulo}m²  -  retangulo`
         } else {
            result = `não é um quadrado e nem um retangulo`
         }


        res.json({result});
    } catch (error) {
        next(error); 
    }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log do erro
    res.status(400).json({ error: err.message }); // Responde com a mensagem de erro
});
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});

