const {User, Blog} = require('./model');

// 插入操作
!(async function () {

    // 插入user
    const sun1 = await User.create({
        userName: 'sun1',
        password: '123',
        nickName: '孙1',
    });

    console.log('sun1', sun1.dataValues);

    const sun2 = await User.create({
        userName: 'sun2',
        password: '123456',
        nickName: '孙2',
    });
    console.log('sun2', sun2.dataValues);


    // 插入blog
    const blog1 = await Blog.create({
        title: '标题1',
        content: '内容1',
        userId: sun1.dataValues.id,
    });

    await Blog.create({
        title: '标题1-1',
        content: '内容1-1',
        userId: sun1.dataValues.id,
    });

    const blog2 = await Blog.create({
        title: '标题2',
        content: '内容2',
        userId: sun2.dataValues.id,
    });

    await Blog.create({
        title: '标题2-1',
        content: '内容2-1',
        userId: sun2.dataValues.id,
    });


})();