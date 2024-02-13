import express from "express";
import helmet from "helmet";
import { verifyToken } from "./middlewares/authorization";
import { handleErrors } from "./middlewares/error";

const PORT = 3000;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(verifyToken);

app.use(require("./router/router"));

app.use(handleErrors);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
