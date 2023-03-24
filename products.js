class inventario {

    constructor(dg) {
        this.dg = dg;        
    }

    insertRecord(jsonData, callBack) {

        var sql = "insert into inventario (name, price, quantity, url) values (?, ?, ?, ?)"; 

        var params = [];

        params.push(jsonData["name"]);  
        params.push(jsonData["price"]); 
        params.push(jsonData["quantity"]);
        params.push(jsonData["url"]);

        this.dg.execute(sql, params, callBack);          
    }

    getRecords(resourceId, callBack) {

         var sql = "select product_id, name, price, quantity, url from inventario";

         var params = []; 

         if (resourceId != "") {
             sql = sql + " where product_id = ?";               
             params.push(resourceId);    
         }

         this.dg.query(sql, params, callBack);
    }

    updateRecord(resourceId, jsonData, callBack) {

        

        var sql = "update inventario set name = ?, price = ?, quantity = ?, url=? where product_id = ?";

        console.log(sql);

        var params = [];

        params.push(jsonData["name"]);  
        params.push(jsonData["price"]);
        params.push(jsonData["quantity"]);
        params.push(jsonData["url"]);
        params.push(resourceId); 

        console.log(params);
        console.log(resourceId);

        this.dg.execute(sql, params, callBack);
    }

    deleteRecord(resourceId, callBack) {

        var sql = "delete from inventario where product_id = ?";

        var params = [];

        params.push(resourceId);   

        this.dg.execute(sql, params, callBack);       
    }
}

module.exports = inventario;
