import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { sendCardBill } from "../controllers/card.transactions";
import { issueBillCash } from "../controllers/cash.transactions";
import { payBill } from "../controllers/pay.transactions";
import { webhook } from "../controllers/webhook.transactions";

// Input validation schemas
import { sendBillValidation } from "../input-validation/card.schema.transactions";
import { cashBillValidation } from "../input-validation/cash.schema.transactions";
import { payTransactionValidation } from "../input-validation/pay.schema.transactions";

const transactionsRouter = Router();

transactionsRouter.route("/card").post(verifyToken, sendBillValidation, sendCardBill);

transactionsRouter.route("/cash").post(verifyToken, cashBillValidation, issueBillCash);

transactionsRouter.route("/cash").patch(verifyToken, payTransactionValidation, payBill);

transactionsRouter.route("/webhook").post(webhook);

export { transactionsRouter }
