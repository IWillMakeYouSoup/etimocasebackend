import { NextFunction, Request, Response } from "express";
require("dotenv").config();

const token = process.env.TOKEN;

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(token);
    const authHeader = req.headers["authorization"];
    const thing = "test";

    if (typeof authHeader !== "undefined") {
        const bearer = authHeader.split(" ");
        const bearerToken = bearer[1];

        if (bearerToken === token) next(); // Token checks out
        else next({ statusCode: 403, message: "Unauthorized!" });
    } else next({ statusCode: 403, message: "Unauthorized!" });
};
