import express, { Request, Response, NextFunction } from "express";


const app = express();
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
