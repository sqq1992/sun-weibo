const seq = require('./seq');

// 引入要建立的数据模型
require('./model');


// 测试连接
seq.authenticate().then(()=>{
    console.log('ok');
}).catch(()=>{
    console.log('err');
})


// 执行
seq.sync({force: true}).then(()=>{
    console.log('sync ok');
    process.exit();
})