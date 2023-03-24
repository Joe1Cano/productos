class db_gateway { 

    constructor() {

    }

    getDb() { 

        const mysql = require('mysql');  

        const db_con = mysql.createConnection({
            host: "34.222.130.2",
            user: "univar",
            password: "Univar98.",
            database: "db0122220261" 
        }); 

        db_con.connect(function(err) {
            if (err) {               
                console.log(err.message);             
            }                    
        });

        return db_con;
    } 

    execute(sql, params, callBack) {

       var db_con = this.getDb();        

       db_con.query(sql, params, function (err, result) {
           if (err) {
               callBack(err, null);                   
           } else {
               callBack(null, "Success");          
           }         
      }); 

    }      

    query(sql, params, callBack) {

       var db_con = this.getDb();        

       db_con.query(sql, params, function (err, result) {
           if (err) {
               callBack(err, null);                   
           } else {
               callBack(null, result);          
           }         
      }); 

    }      
}

module.exports = db_gateway;
