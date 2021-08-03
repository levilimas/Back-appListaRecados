"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
dotenv_1.default.config();
const recados = [];
app.post('/recados', (request, response) => {
    const { descricao, detalhamento } = request.body;
    const descricaoRecados = {
        id: uuid_1.v4(),
        descricao,
        detalhamento,
    };
    recados.push(descricaoRecados);
    return response.json({
        dados: descricaoRecados
    });
});
app.put('/recados/:id', (request, response) => {
    const { descricao, detalhamento } = request.body;
    const { id } = request.params;
    const indexRecado = recados.findIndex((recadosAut) => {
        return recadosAut.id === id;
    });
    recados[indexRecado].descricao = descricao;
    recados[indexRecado].detalhamento = detalhamento;
    return response.json({
        dados: recados
    });
});
app.get('/recados', (request, response) => {
    return response.json(recados);
});
app.get('/recados/:id', (request, response) => {
    const { id } = request.params;
    if (!id) {
        return response.status(400).json({
            mensagem: 'Recado inválido'
        });
    }
    const buscarRecados = recados.find((recado) => recado.id == id);
    if (!buscarRecados) {
        return response.status(404).json({
            mensagem: 'recado não encontrado'
        });
    }
    return response.json({
        buscarRecados
    });
});
app.delete('/recados', (request, response) => {
    const { id } = request.body;
    const buscarRecados = recados.findIndex((recado) => recado.id == id);
    recados.splice(buscarRecados, 1);
    return response.sendStatus(204);
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API rodando...');
});
