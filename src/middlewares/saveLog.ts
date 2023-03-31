import express from "express";
import onFinished from "on-finished";
import logger1 from "../utils/logger";

interface Options {
  excludePaths: RegExp[];
}

function isExcludePath(path: string, excludePaths: RegExp[]): boolean {
  let exclude: boolean = false;
  excludePaths.forEach((Epath) => {
    if (Epath.test(path)) exclude = true;
  });
  return exclude;
}

export default function (options: Options) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    if (!isExcludePath(req.path, options.excludePaths)) {

      onFinished(res, async () => {
        logger1.emit("test", { level: "debug", type: "HTTP", code: res.statusCode, path: req.baseUrl, method: req.method })
      });

    }
    next();
  };
}
