import { NextFunction, Request, Response } from "express";

export const handleErrors = [
    (req: Request, res: Response) => {
        res.status(404).send({ error: "Endpoint not found" });
    },
    (err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode || 500)
            .json({ error: err.message })
            .end();
    },
];
