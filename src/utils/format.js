const {isEmpty} = require('lodash');

function formatUserInfo(obj){

    if(!isEmpty(obj)){
        obj.isLogin = true;
    }

    return obj;
}


module.exports = {
    formatUserInfo
}