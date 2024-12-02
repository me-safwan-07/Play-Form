"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const personController_1 = require("./controllers/personController");
const app = (0, express_1.default)();
exports.app = app;
dotenv_1.default.config();
app.use(express_1.default.json()); // Alternatively, bodyParser.json() works too
app.get('/:id', personController_1.getPerson);
app.post('/user', personController_1.createPerson);
app.delete('/duser/:id', personController_1.deletePerson);
const port = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}
