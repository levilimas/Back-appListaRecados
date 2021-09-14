import express, { Request, Response } from 'express';
import { v4 as uuidGenerator } from 'uuid';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();
const recados: Array <any> = [];
app.post('/recados', (request: Request, response: Response) => {
    const { descricao, detalhamento } = request.body;
    const descricaoRecados = { 
        id: uuidGenerator(),
        descricao,
        detalhamento,
    }
    recados.push(descricaoRecados);
    return response.json({
        dados: descricaoRecados
    });
});
app.put('/recados/:id', (request: Request, response: Response) => {
    const { descricao, detalhamento } = request.body;
    const { id } = request.params;
    const indexRecado = recados.findIndex((recadosAut) => {
        return recadosAut.id === id
    });
    recados[indexRecado].descricao = descricao;
    recados[indexRecado].detalhamento = detalhamento;
    return response.json({
     dados: recados
    });
});
app.get('/recados', (request: Request, response: Response) => {
 
    return response.json(recados);
});
app.get('/recados/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    if (!id) {
        return response.status(400).json({
            mensagem: 'Recado inválido'
        });
    }
    const buscarRecados = recados.find((recado: any) => recado.id == id);
    if (!buscarRecados) {
        return response.status(404).json({
            mensagem: 'recado não encontrado'
        });
    }
    return response.json({
        buscarRecados
    });
});
app.delete('/recados', (request: Request, response: Response) => {
    const { id } = request.body;
    const buscarRecados = recados.findIndex((recado: any) => recado.id == id);
    recados.splice(buscarRecados, 1);
    return response.sendStatus(204);
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API rodando...');
});
