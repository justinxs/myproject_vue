export default {
    setStorage: function (key, value) {
        if(typeof value !="object"){return}
        try {
            value = JSON.stringify(value)
        } finally {
            localStorage.setItem(key, value)
        }

    },
    getStorage: function (key) {
        let buyDate;
        buyDate = localStorage.getItem(key);
        if (!buyDate) {
            return {}
        }
        try {
            buyDate = JSON.parse(buyDate);
        } finally {
            if (typeof buyDate != "object") {
                return {}
            }
            return buyDate
        }
    },
    getAll: function () {
        // localStorage.getItem("mybuy")
    }
}