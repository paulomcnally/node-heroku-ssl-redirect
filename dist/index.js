"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sslRedirect = (environments = ["production"], status = 302) => {
    const currentEnv = process.env.NODE_ENV;
    const isCurrentEnv = environments.includes(currentEnv);
    return (req, res, next) => {
        if (isCurrentEnv) {
            req.headers["x-forwarded-proto"] !== "https"
                ? res.redirect(status, "https://" + req.hostname + req.originalUrl)
                : next();
        }
        else
            next();
    };
};
exports.default = sslRedirect;
//# sourceMappingURL=index.js.map