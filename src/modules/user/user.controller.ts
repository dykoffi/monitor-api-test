import express from "express";
import { Prisma as PTypes } from "@prisma/client"
import logger1 from "../../utils/logger";
import checkDTO from "../../middlewares/checkDTO";
import userService from "./user.service"

import { createUser, updateUser } from "./user.dto";

const router: express.Router = require("express").Router();
const user = new userService();

type PError = PTypes.PrismaClientKnownRequestError | Error

router

    /**
     * @descr Create new user
     * @route POST /user
     * @access public
     */
    .post("/", checkDTO(createUser), async (req: express.Request, res: express.Response) => {

        user.addOne(req.body)
            .then((data) => {
                res.status(201).json({ data, message: "object user created successfully" });
            })
            .catch((error: Error) => {
                logger1.emit("test", { label: "error", message: ` ${error.name}: ${error.message}` });
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr get all user
    * @route GET /user
    * @access public
    */

    .get("/", async (req: express.Request, res: express.Response) => {

        user.getAll({ where: req.query, orderBy: { id_: "asc" } })
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                logger1.emit("test", { label: "error", message: ` ${error.name}: ${error.message}` });
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Show specify user identified by id
    * @route GET /user/id
    * @access public
    */

    .get("/:id", async (req: express.Request, res: express.Response) => {

        user.getById(Number(req.params.id))
            .then((data) => {
                res.status(data === null ? 404 : 200).json(data);
            })
            .catch((error: Error) => {
                logger1.emit("test", { label: "error", message: ` ${error.name}: ${error.message}` });
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Modify specify user identified by id
    * @route PUT /user/id
    * @access public
    */

    .put("/:id", checkDTO(updateUser), async (req: express.Request, res: express.Response) => {

        user.updateById(Number(req.params.id), req.body)
            .then((data) => {
                res.status(201).json({ data, message: "object user updated successfully" });
            })
            .catch((error: PError) => {

                logger1.emit("test", { label: "error", message: ` ${error.name}: ${error.message}` });
                if ("code" in error && error.code === "P2025") {
                    res.status(404).json({ error: "NotFound", message: error.meta });
                } else {
                    res.status(500).json({ error: "InternalError", message: "Something wrong" });
                }

            });

    })

    /**
    * @descr Delete specify user identified by id
    * @route DELETE /user/id
    * @access public
    */

    .delete("/:id", async (req: express.Request, res: express.Response) => {

        user.deleteById(Number(req.params.id))
            .then((data) => {
                res.status(201).json({ data, message: "object user deleted successfully" });
            })
            .catch((error: PError) => {
                logger1.emit("test", { label: "error", message: ` ${error.name}: ${error.message}` });
                if ("code" in error && error.code === "P2025") {
                    res.status(404).json({ error: error.name, message: error.meta });
                } else {
                    res.status(500).json({ error: "InternalError", message: "Something wrong" });
                }
            });
    });

export = router;
