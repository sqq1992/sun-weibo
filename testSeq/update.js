const {User, Blog} = require('./model');

// 修改操作
!(async function () {


    // 修改1
    const user1 = await User.update({
        nickName: '孙1孙1'
    }, {
        where: {
            id: 1
        }
    });
    console.log('user1', user1);



})();