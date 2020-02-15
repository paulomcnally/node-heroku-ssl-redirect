"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sslRedirect = (inputEnvironments, inputStatus) => {
    const environments = inputEnvironments || ["production"];
    const status = inputStatus || 302;
    return function (req, res, next) {
        if (environments.indexOf(process.env.NODE_ENV) >= 0) {
            if (req.headers["x-forwarded-proto"] !== "https") {
                res.redirect(status, "https://" + req.hostname + req.originalUrl);
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    };
};
exports.default = sslRedirect;
//# sourceMappingURL=index.js.map