import AsyncStorage from '@react-native-community/async-storage'

const DEFAULTHOST = "http://iplc.gg.uovz.com:64247";
const HOSTCACHEKEY = "apiHost";
// const DEFAULTENTRY = "https://objectstorage.ap-tokyo-1.oraclecloud.com/n/nrjuh9nsat04/b/20210310/o/server.json";
// const DEFAULTENTRY = "http://iplc.gg.uovz.com:64251"
const ENTRYCACHEKEY = "ENTRYURL";
export default class ApiHost {

    #host = "";

    static #current = null;

    static changeHost(host) {
        AsyncStorage.setItem(HOSTCACHEKEY, host);
        ApiHost.#current = new ApiHost(host);
    }

    static getHost() {
        if (ApiHost.#current == null) {
            const cacheHost = AsyncStorage.getItem(HOSTCACHEKEY);
            console.log('[cacheHost]',cacheHost)
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
        return `${this.#host}login/index`;
    }

    getlines(successFun, errFun) {
        console.log('[进来成功切换路线]')
        let entryUrl = AsyncStorage.getItem(ENTRYCACHEKEY);
        if (entryUrl == null) {
            entryUrl = DEFAULTENTRY;
        }
        const request = new Request(entryUrl);
        console.log('[getlines]',request)
        fetch(request)
            .then(response => response.json())
            .then(result => {

                if (result.nextQuery != undefined && result.nextQuery != null && result.nextQuery != '') {
                    AsyncStorage.setItem(ENTRYCACHEKEY, result.nextQuery);
                }

                successFun(result.servers);
            }).catch((e) => {

                errFun('balabalabababla', e);
            });
    }
}


console.log('[第一次设置api]',ApiHost.getHost().login)
// ApiHost.changeHost("https://xxx3333.com/");
// console.log('[改变]',ApiHost.getHost().login)
// ApiHost.getHost().getlines((servers) => {
//     console.log('切换路线',servers);
// }, (msg, e) => { })

