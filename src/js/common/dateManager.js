import Vue from 'vue';

import storage from './storage.js';

const myKey = "mybuy";
export default {
    state: storage.getStorage(myKey),
    mutations: {
        set(state,obj){
            Vue.set(state,obj.id,obj.num);
            if(obj.num==0){
                delete state[obj.id];
            }
            storage.setStorage(myKey, state);
        },
        remove(state,id){
            Vue.set(state,id,null);
            delete state[id];
            storage.setStorage(myKey, state);
        }
    },
    getters:{
        getValueList(state,getters){
            return Object.values(state)
        },
        getSum(state,getters){
            return getters.getValueList.reduce((v1,v2)=>v1+v2,0)
        },
        getIDlist(state,getters){
            return Object.keys(state)
        },
    }
}