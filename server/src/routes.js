import express from "express";
import { signupUser } from "./controllers/signupUser.js";
import { logoutUser } from "./controllers/logoutUser.js";
import { getUser } from "./controllers/getUser.js";
import { addTransaction } from "./controllers/addTransaction.js";
import { indexCategories } from "./controllers/indexCategories.js";
import { indexCurrency } from "./controllers/indexCurrency.js";
import { authMiddleware } from "./middleware/authToken.js";
import { logInUser } from "./controllers/logInUser.js";
import { deleteTransaction } from "./controllers/deleteTransaction.js";
import { updateTransaction } from "./controllers/updateTransaction.js";
import { getTransaction } from "./controllers/getTransaction.js";
import { getStatistics } from "./controllers/getStatistics.js";

export const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *      example:
 *        _id: 656f4beab51e221a8c1a79d1
 *        name: leisure
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Currency:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        code:
 *          type: string
 *        bid:
 *          type: number
 *        ask:
 *          type: number
 *      example:
 *        _id: 657602041003b0884329ce8e
 *        code: USD
 *        bid: 3.9838
 *        ask: 4.0642
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *            type: string
 *        email:
 *            type: string
 *        balance:
 *           type: number
 *      example:
 *       id: 65760d141474249b876da911
 *       name: Pawel
 *       email: a@a.pl
 *       balance: 0
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        type:
 *            type: string
 *        category:
 *            type: string
 *        value:
 *           type: number
 *        description:
 *          type: string
 *        date:
 *          type: string
 *        owner:
 *          type: string
 *      example:
 *       _id: 657333735777614660d66801
 *       type: Expense
 *       category: 656f4beab51e221a8c1a79d1
 *       value: 150
 *       description: Kurs jazdy
 *       date: 2023-02-15T00:00:00.000Z
 *       owner: 65760d141474249b876da911
 */

/**
 * @swagger
 * tags:
 *  name: Controllers
 */

/**
 * @swagger
 * /api/categories:
 *  get:
 *    summary: Returns the list of all categories
 *    tags: [Controllers]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /api/currency:
 *  get:
 *    summary: Returns the list of all currencies
 *    tags: [Controllers]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Currency'
 */

/**
 * @swagger
 * /api/current:
 *  get:
 *    summary: Get current user info
 *    tags: [Controllers]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/transactions:
 *  get:
 *    summary: Get current user transactions
 *    tags: [Controllers]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /api/transactions:
 *  post:
 *    summary: Add transaction for current user
 *    tags: [Controllers]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /api/transactions/{id}:
 *  patch:
 *    summary: Update transaction for current user
 *    tags: [Controllers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of the transaction
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /api/transactions/{id}:
 *  delete:
 *    summary: Delete transaction for current user
 *    tags: [Controllers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of the transaction
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /api/users/signup:
 *  post:
 *    summary: Register user
 *    tags: [Controllers]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: Login user
 *    tags: [Controllers]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/logout:
 *  post:
 *    summary: Login user
 *    tags: [Controllers]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/User'
 */

router.get("/categories", indexCategories);
router.get("/currency", indexCurrency);
router.get("/current", authMiddleware, getUser);
router.get("/transactions", authMiddleware, getTransaction);
router.get("/statistics", authMiddleware, getStatistics);
router.post("/transactions", authMiddleware, addTransaction);
router.post("/users/login", logInUser);
router.post("/user/logout", authMiddleware, logoutUser);
router.post("/users/signup", signupUser);
router.patch("/transactions/:transactionId", authMiddleware, updateTransaction);
router.delete(
  "/transactions/:transactionId",
  authMiddleware,
  deleteTransaction
);
