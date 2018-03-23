// 判断电话号是否正确
// 正确示例：
let p1 = '+8613000000000'
let p2 = '130-0000-0000'
let p3 = '+86-130-0000-0000'
let p4 = '13000000000'
let p5 = '(+86)13000000000'
// 错误示例
let p6 = '1301234567'
let p7 = '33012345678'       // 号码开头不是1
let p8 = '130-123-45678'     // 号码分隔符不是344格式

let phone = /^((\(\+[0-9]{0,3}\))|(\+[0-9]{1,3}))?\-?1[0-9]{2}-?[0-9]{4}-?[0-9]{4}$/

console.log(phone.test(p1));  //true
console.log(phone.test(p2));  //true
console.log(phone.test(p3));  //true
console.log(phone.test(p4));  //true
console.log(phone.test(p5));  //true
console.log(phone.test(p6));  //false
console.log(phone.test(p7));  //false
console.log(phone.test(p8));  //false


// 判断邮箱是否正确
// 正确示例：
let e1 = 'web@redrock.team'
let e2 = 'a.b.c@d.e'
let e3 = 'a-b@c.d.e.f'
// 错误示例
let e4 = 'web@redrock'       // 域名至少两段
let e5 = 'aha@aha@fun.com'   //只有一个@
let e6 = 'emm..emm@fun.com'  //不能两个..
let e7 = 'a.b@c.e-d'         // 根域名没有-

let email = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-])*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z0-9]+$/

console.log(email.test(e1));  //true
console.log(email.test(e2));  //true
console.log(email.test(e3));  //true
console.log(email.test(e4));  //false
console.log(email.test(e5));  //false
console.log(email.test(e6));  //false
console.log(email.test(e7));  //false