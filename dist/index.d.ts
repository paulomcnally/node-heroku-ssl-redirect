import { Request, Response, NextFunction } from "express";
declare type Environments = "development" | "production" | "other";
declare const sslRedirect: (inputEnvironments?: Environments[], inputStatus?: 301 | 302) => (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export default sslRedirect;
