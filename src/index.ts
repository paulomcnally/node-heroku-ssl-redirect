import {Request, Response, NextFunction} from "express";

type Environments = "development" | "production" | "other";

const sslRedirect = (inputEnvironments?: Environments[], inputStatus?: 301 | 302) => {
	const environments = inputEnvironments || ["production"];
	const status = inputStatus || 302;
	return function(req: Request, res: Response, next: NextFunction) {
		if (environments.indexOf(process.env.NODE_ENV as Environments) >= 0) {
			if (req.headers["x-forwarded-proto"] !== "https") {
				res.redirect(status, "https://" + req.hostname + req.originalUrl);
			} else {
				next();
			}
		} else {
			next();
		}
	};
};

export default sslRedirect;
