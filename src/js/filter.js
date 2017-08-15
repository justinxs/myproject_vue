export default {
    install(Vue) {
        Vue.filter("formatDate", function (source, arg = "YYYY-MM-DD") {
            let time = new Date(source);
            return arg.replace(new RegExp("YYYY", "ig"), time.getFullYear()).replace(new RegExp("MM", "ig"), time.getMonth() + 1)
                .replace(new RegExp("DD", "ig"), time.getDay());
        })
    }
}