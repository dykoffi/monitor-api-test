import express = require("express");
import logger from "../../utils/logger";
import HomeService from "./home.service";

const router: express.Router = require("express").Router();
const home = new HomeService()

interface Log {
    level: string
    message: string,
    timestamp: string
}

interface QueryOptions {
    rows?: number;
    limit?: number;
    start?: number;
    from?: Date;
    until?: Date;
    order?: 'asc' | 'desc';
    fields: any;
}

router

    /**
    * @descr Test API endpoint
    * @route GET /
    * @access public
    */

    .get("/", async (req: express.Request, res: express.Response) => {

        home.Hello().then(data => {
            res.json(data)
        })

    })

    /**
    * @descr Test API endpoint
    * @route GET /logs
    * @access private
    */
export = router;
