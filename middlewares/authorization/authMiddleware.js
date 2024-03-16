import jwt from "jsonwebtoken";
import {CustomError} from "../../helpers/error/CustomError.js";
import {
    getAccessTokenFromHeader, isTokenIncluded,
} from "../../helpers/authorization/tokenHelpers.js";

/**
 * TOKEN KONTROL
 * 1. işlem: Eğer token, headers içinde mevcut değilse hata döndürür
 * 2. işlem: eğer token verify olmazsa,
 * yani geçerli değilse, hata döndürülecek
 */
const getAccessToRoute = (req, res, next) => {


    const {JWT_SECRET_KEY} = process.env;


    if (!isTokenIncluded(req)) {


        /**
         * 401: Unauthorized: giriş yapmadan bir sayfaya erişiyorsunuz bu hata döner
         * 403: Forbidden : giriş yapmışsınızdır, ancak yetkisiz olduğunuz bir sayfaya erişmeye çalıştığınızda döner
         * Biz burada login olmama veya token süresinin geçmiş olma durumu için 401 kullandık
         */
        return next(new CustomError("You are not authorized to access this route", 401));
    }

    const access_token = getAccessTokenFromHeader(req);
    jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("You are not authorized to access this route"));
        }
        req.user = {
            id: decoded.id, name: decoded.name
        }
        console.log(decoded);
        next();
    });
};

export {getAccessToRoute};
