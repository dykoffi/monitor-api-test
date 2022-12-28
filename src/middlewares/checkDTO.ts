import express from "express";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import logger from "../utils/logger";

export default function (type: any, skipMissingProperties = false) {
	return (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const dtoObj = plainToInstance(type, req.body, { excludeExtraneousValues: true });
		validate(dtoObj, { skipMissingProperties }).then((errors: ValidationError[]) => {
			if (errors.length > 0) {
				const dtoErrors = errors
					.map((error: ValidationError) => (Object as any).values(error.constraints))
					.join(", ");
				logger.emit("test", { level: "error", type: 'System', message: dtoErrors })
				res.status(400).json({ error: "error", message: dtoErrors });
			} else {
				req.body = instanceToPlain(dtoObj, { exposeUnsetFields: false });
				next();
			}
		});
	};
}
