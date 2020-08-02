const {User, Blog} = require('./model');

// 查表操作
!(async function () {

    // // 查询单个
    // const sun1 = await User.findOne({
    //     where:{
    //         id: 1
    //     }
    // });
    // console.log('sun1', sun1.dataValues);
    //
    //
    // // 查询指定列
    // const sun2 = await User.findOne({
    //     attributes: ['userName', 'nickName'],
    //     where:{
    //         id: 1
    //     }
    // })
    // console.log('sun2', sun2.dataValues);
    //
    //
    // // 查询列表
    // const blog1 = await Blog.findAll({
    //     where:{
    //         userId: 1
    //     },
    //     order: [
    //         ['id', 'desc']
    //     ],
    //
    //     // 分页数据
    //     limit:2,
    //     offset:0
    // })
    // console.log('blog1', blog1.map((elem) => {
    //     return elem.dataValues
    // }));

    // 查询总数
    // const blogCount1 = await Blog.findAndCountAll({
    //     limit: 2,
    //     offset:0,
    //     order: [
    //         ['id', 'desc']
    //     ],
    // });
    // console.log('blogCount1', blogCount1);

    // 连表查询1
    // const blogWithUser = await Blog.findAndCountAll({
    //     order: [
    //         ['id', 'desc']
    //     ],
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['userName', 'nickName']
    //         }
    //     ]
    // });
    // console.log('blogWithUser', blogWithUser);


    // 连笔查询2
    const userWithBlog = await User.findAndCountAll({
        attributes: ['userName', 'nickName'],
        include: [
            {
                model: Blog,
            }
        ]
    });
    console.log('userWithBlog', userWithBlog);



})();