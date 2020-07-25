import { Request, Response, NextFunction } from "express";
declare type Environment = "production" | "development" | "other";
declare const sslRedirect: (environments?: Environment[], status?: 301 | 302) => (req: Request, res: Response, next: NextFunction) => void;
export default sslRedirect;
