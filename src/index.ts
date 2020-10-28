import { Request, Response, NextFunction } from "express";

type Environment = "production" | "development" | "other";

const sslRedirect = (
  environments: Environment[] = ["production"],
  status: 301 | 302 = 302
) => {
  const currentEnv = process.env.NODE_ENV as Environment;

  const isCurrentEnv = environments.includes(currentEnv);

  return (req: Request, res: Response, next: NextFunction) => {
    if (isCurrentEnv) {
      // Only redirect if the x-forwarded-proto is present and not equal to https.
      // This prevents unwanted redirects in the case where a server makes intra-server
      // requests that don't reach the heroku router and thus don't get x-forwarded-proto
      // added.
      req.headers["x-forwarded-proto"] && req.headers["x-forwarded-proto"] !== "https"
        ? res.redirect(status, "https://" + req.hostname + req.originalUrl)
        : next();
    } else next();
  };
};

export default sslRedirect;
