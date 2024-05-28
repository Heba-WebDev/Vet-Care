import { Request, Response, NextFunction } from "express";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL, SUCCESS } = statusCode;


const staffLogout = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    res.cookie('user', 'loggedout',  {expires: new Date(Date.now() + 10 * 1000),
    httpOnly: false, secure: true, sameSite: "none"});
    return res.status(200).send({
        Status: SUCCESS,
        message: "User succssfully logged out.",
        data: null
    });
});

export { staffLogout }