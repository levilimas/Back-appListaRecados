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
const scraps = [];
app.post('/scraps', (request, response) => {
    const { description, detailing } = request.body;
    const descriptionScraps = {
        id: uuid_1.v4(),
        description,
        detailing,
    };
    scraps.push(descriptionScraps);
    return response.json({
        data: descriptionScraps
    });
});
app.put('/scraps/:id', (request, response) => {
    const { description, detailing } = request.body;
    const { id } = request.params;
    const indexScrap = scraps.findIndex((scrapsAut) => {
        return scrapsAut.id === id;
    });
    scraps[indexScrap].description = description;
    scraps[indexScrap].detailing = detailing;
    return response.json({
        data: scraps
    });
});
app.get('/scraps', (request, response) => {
    return response.json(scraps);
});
app.get('/scraps/:id', (request, response) => {
    const { id } = request.params;
    if (!id) {
        return response.status(400).json({
            message: 'invalid Scrap'
        });
    }
    const searchScraps = scraps.find((scrap) => scrap.id == id);
    if (!searchScraps) {
        return response.status(404).json({
            message: 'scrap not found'
        });
    }
    return response.json({
        searchScraps
    });
});
app.delete('/scraps', (request, response) => {
    const { id } = request.body;
    const searchScraps = scraps.findIndex((scrap) => scrap.id == id);
    scraps.splice(searchScraps, 1);
    return response.sendStatus(204);
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API running...');
});
