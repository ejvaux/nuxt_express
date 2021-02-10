module.exports = {
    jsonConvert: function (array) {
        let obj = []
        let meta = array.metaData
        let rows = array.rows
        if(array.metaData && array.rows){
            for (let index = 0; index < rows.length; index++) {
                var arr = new Object
                for (let index1 = 0; index1 < meta.length; index1++) {
                    arr[meta[index1].name] = rows[index][index1]
                }
                obj.push(arr)
            }
            return obj
        }
        else{
            console.log('err: ',array)
        }
    },
    test: function () {
        let x = new Object
        x = [{
            test1 : 1,
            test2 : 2,
            test3 : 3
        }]
        x.push({
            test4 : 4,
            test5 : 5,
            test6 : 6
        })
        let a = JSON.stringify(x)
        console.log(x)
    }
};