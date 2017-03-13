var Enum  = require('../dist/enum.js').default;

var CODE = new Enum([
    { key: 'SUCCESS', value: 200, msg: '请求成功!' },
    { key: 'FAILURE', value: 500, msg: '网络错误~' },
    { key: 'NOT_FOUND', value: 404, msg: '目标不存在' }
]);

var code = 404;
if( !CODE.SUCCESS.equals(code) ) {
    console.log(CODE.getEnum(code).getMsg());
}
