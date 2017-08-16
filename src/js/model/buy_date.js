
import storage from '../storage.js';

let buyDate = storage.getStorage("mybuy");



export default {
    set:function (id,value) {
        buyDate[id]=value;
        storage.setStorage("mybuy",buyDate);
    },
    get:function (id) {
        return storage.getStorage("mybuy")[id]
    },
    getAll:function () {
        return Object.values(buyDate).reduce((v1,v2)=>(+v1)+(+v2),0);
    }
}