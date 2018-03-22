// //将对象转换成字符串 demo
// let objToStringdemo = obj => {
//     let arr = new Array();
//     for (let key in obj) {
//         //根据属性的类型转换为字符串
//         typeof key === 'String' ? arr.push(`${key}:"${obj[key]}"`) : arr.push(`"${key}":"${obj[key]}"`);
//     }
//     let str = '';
//     for (let i = 0; i < arr.length; i++) {
//         str += arr[i];
//         if (i === arr.length - 1) {
//             return `{${str}}`;
//         }
//         str += ',';
//     }
// }

// //将对象转换成字符串
// let objToString = obj => {
//     let str = '';
//     for (let key in obj) {
//         //根据属性的类型转换为字符串
//         typeof key === 'String' ? str += `${key}:"${obj[key]}",` : str += (`"${key}":"${obj[key]}",`);
//     }
//     //去掉字符串最后的逗号
//     str = str.substr(0, str.length - 1);
//     return `{${str}}`;
// }

//把data正确地转换成查询字符串
let dataURL = obj => {
    let str = '';
    for (let key in obj) {
        //根据属性的类型转换为字符串
        str += `${key}=${obj[key]}&`
    }
    //去掉字符串最后的&
    str = str.substr(0, str.length - 1);
    return str;
}

//封装$.ajax demo
// let _ajax = $.ajax;
// $.ajax = obj => {
//     obj.method = obj.method || 'get'; //默认为GET请求
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             var res = JSON.parse(xhr.responseText);
//             obj.success(res); //注意传入res参数
//         }
//     }
//     xhr.open(obj.method, obj.url, true);

//     //根据data的类型来添加不同的请求头部
//     var type = typeof obj.data;
//     if (type === 'undefined') {
//         xhr.send();
//     } else if (type === 'string') {
//         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//         xhr.send(obj.data);
//     } else {
//         obj.data = objToString(obj.data);
//         xhr.setRequestHeader('Content-type', 'application/json');
//         xhr.send(obj.data);
//     }
// }


//Promise $.ajax
let $ = {
    ajax: obj => {
        return new Promise((reslove, reject) => {
            obj.method = obj.method || 'get'; //默认为GET请求
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var res = JSON.parse(xhr.responseText);
                    reslove(res);
                }
                // if (xhr.readyState === 4) {
                //     if (xhr.status === 200) {
                //         var res = JSON.parse(xhr.responseText);
                //         reslove(res);
                //     }
                //     else {
                //         var resJson = { code: this.status, response: this.response }
                //         reject(resJson, this)
                //     }
                // }
            }
            var type = typeof obj.data;
            if (obj.method === 'get') {
                //根据data类型添加不同的URL
                if (type === 'undefined') {
                    xhr.open(obj.method, obj.url, true);
                }
                else if (type === 'string') {
                    xhr.open(obj.method, obj.url+`?${obj.data}`, true);
                }
                else {
                    xhr.open(obj.method, obj.url+`?${dataURL(obj.data)}`, true);
                }
                xhr.send();
            }
            if (obj.method === 'post') {
                xhr.open(obj.method, obj.url, true);
                //根据data的类型来添加不同的请求头部
                var header;
                if (type === 'string') {
                    header = 'application/x-www-form-urlencoded';
                }
                else {
                    header = 'application/json';
                    obj.data = JSON.stringify(obj.data);
                }
                xhr.setRequestHeader('Content-type', header);
                xhr.send(obj.data);
            }
        })
    }
}