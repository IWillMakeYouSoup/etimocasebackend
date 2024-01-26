import { NextFunction, Request, Response } from "express";

const verySecureTokenInAVerySecurePlace =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIn0sImlhdCI6MTcwMTc4NzE0OX0.TSaZdgKMH12wFTZvXW95btbR3dvTapSvcBf0E4Wm-_I";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    const thing = "test";

    if (typeof authHeader !== "undefined") {
        const bearer = authHeader.split(" ");
        const bearerToken = bearer[1];

        if (bearerToken === verySecureTokenInAVerySecurePlace)
            next(); // Token checks out
        else next({ statusCode: 403, message: "Unauthorized!" });
    } else next({ statusCode: 403, message: "Unauthorized!" });
};
