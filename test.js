// const DEFAULTHOST = "https://iplc.gg.uovz.com:64247";  //默认IP
// const HOSTCACHEKEY = "apiHost"; //api地址,常量
// const DEFAULTENTRY = "https://objectstorage.ap-tokyo-1.oraclecloud.com/n/nrjuh9nsat04/b/20210310/o/server.json"; //完整域名
// const ENTRYCACHEKEY = "ENTRYURL"; //入口
// class ApiHost {

//   #host = "";

//   static #current = null;

//   //
//   static changeHost(host) {
//     localStorage.setItem(HOSTCACHEKEY, host); //设置缓存 第一次为默认host
//     ApiHost.#current = new ApiHost(host);  //第一次存的current 为http://192.168.68.221:30006
//   }

//   //得到host
//   static getHost() {
//     if (ApiHost.#current == null) {
//       const cacheHost = localStorage.getItem(HOSTCACHEKEY) ;  //第一次host null
//       if (cacheHost) {
//         ApiHost.#current = new ApiHost(cacheHost);
//       } else {
//         ApiHost.#current = new ApiHost(DEFAULTHOST);
//       }
//     }
//     return ApiHost.#current;
//   }

//   //初始化host   
//   constructor(host) {
//     this.#host = host; //http://192.168.68.221:30006
//   }

//   //跳回login页面
//   get login() {
//     return `${this.#host}user/login`;  //http://192.168.68.221:30006/user/login
//   }

//   //切换路线调用
//   getlines(successFun, errFun) {
//     let entryUrl = localStorage.getItem(ENTRYCACHEKEY);
//     if (entryUrl == null) {
//       entryUrl = DEFAULTENTRY;
//     }
//     const request = new Request(entryUrl);
//     fetch(request)
//       .then(response => response.json())
//       .then(result => {

//         if (result.nextQuery != undefined && result.nextQuery != null && result.nextQuery != '') {
//           localStorage.setItem(ENTRYCACHEKEY, result.nextQuery);
//         }

//         successFun(result.servers);
//       }).catch((e) => {

//         errFun('balabalabababla', e);
//       });
//   }
// }


// console.log(ApiHost.getHost().login)
// ApiHost.changeHost("https://xxx3333.com/");
// console.log(ApiHost.getHost().login)
// ApiHost.getHost().getlines((servers) => {
//   console.log(servers);
// }, (msg, e) => {})

const DEFAULTHOST = "https://xxx.com/";
const HOSTCACHEKEY = "apiHost";
const DEFAULTENTRY = "https://objectstorage.ap-tokyo-1.oraclecloud.com/n/nrjuh9nsat04/b/20210310/o/server.json";
const ENTRYCACHEKEY = "ENTRYURL";
class ApiHost {

  #host = "";

  static #current = null;

  static changeHost(host) {
    // localStorage.setItem(HOSTCACHEKEY, host);
    ApiHost.#current = new ApiHost(host);
  }

  static getHost() {
    if (ApiHost.#current == null) {
      // const cacheHost = localStorage.getItem(HOSTCACHEKEY);
      if (cacheHost) {
        ApiHost.#current = new ApiHost(cacheHost);
      } else {
        ApiHost.#current = new ApiHost(DEFAULTHOST);
      }
    }
    return ApiHost.#current;
  }

  constructor(host) {
    this.#host = host;
  }
  get login() {
    return `${this.#host}user/login`;
  }

  getlines(successFun, errFun) {
    // let entryUrl = localStorage.getItem(ENTRYCACHEKEY);
    if (entryUrl == null) {
      entryUrl = DEFAULTENTRY;
    }
    const request = new Request(entryUrl);
    fetch(request)
      .then(response => response.json())
      .then(result => {

        if (result.nextQuery != undefined && result.nextQuery != null && result.nextQuery != '') {
          // localStorage.setItem(ENTRYCACHEKEY, result.nextQuery);
        }

        successFun(result.servers);
      }).catch((e) => {

        errFun('balabalabababla', e);
      });
  }
}


console.log(ApiHost.getHost().login)
ApiHost.changeHost("https://xxx3333.com/");
console.log(ApiHost.getHost().login)
ApiHost.getHost().getlines((servers) => {
  console.log(servers);
}, (msg, e) => { })

