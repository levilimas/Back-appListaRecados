import express, { Request, Response } from 'express';
import { v4 as uuidGenerator } from 'uuid';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();
const scraps: Array <any> = [];
app.post('/scraps', (request: Request, response: Response) => {
    const { description, detailing } = request.body;
    const descriptionScraps = { 
        id: uuidGenerator(),
        description,
        detailing,
    }
    scraps.push(descriptionScraps);
    return response.json({
        data: descriptionScraps
    });
});
app.put('/scraps/:id', (request: Request, response: Response) => {
    const { description, detailing } = request.body;
    const { id } = request.params;
    const indexScrap = scraps.findIndex((scrapsAut) => {
        return scrapsAut.id === id
    });
    scraps[indexScrap].description = description;
    scraps[indexScrap].detailing = detailing;
    return response.json({
     data: scraps
    });
});
app.get('/scraps', (request: Request, response: Response) => {
 
    return response.json(scraps);
});
app.get('/scraps/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    if (!id) {
        return response.status(400).json({
           message: 'Scrap invalid'
        });
    }
    const searchScraps = scraps.find((Scrap: any) => Scrap.id == id);
    if (!searchScraps) {
        return response.status(404).json({
           message: 'Scrap não encontrado'
        });
    }
    return response.json({
        searchScraps
    });
});
app.delete('/scraps', (request: Request, response: Response) => {
    const { id } = request.body;
    const searchScraps = scraps.findIndex((Scrap: any) => Scrap.id == id);
    scraps.splice(searchScraps, 1);
    return response.sendStatus(204);
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API rodando...');
});
