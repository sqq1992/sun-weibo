
const Ajv = require('ajv');
const {ErrorDataModel} = require("../model/resModel");
const {UserSchema} = require("../conf/valiator/userValiatorConfig");

/**
 * 进行用户的格式校验
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function validateUserInfo(ctx,next) {
    const ajv = new Ajv();
    const dataObj = ctx.request.body;
    const valid = ajv.validate(UserSchema, dataObj);

    if (!valid){
        ctx.body = new ErrorDataModel(ajv.errorsText());
        return;
    }

    await next();
}

module.exports = {
    validateUserInfo
};