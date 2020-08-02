const {User, Blog} = require('./model');

// 删除操作
!(async function () {

   // 删除1
    const blog1 = await Blog.destroy({
        where: {
            id: 2
        }
    });
    console.log('blog1', blog1);



})();