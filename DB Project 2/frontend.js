
// Eventos del DOM; cuando el usuario da click al botón
document.getElementById('data-form').addEventListener("submit",
function(e) {
    // Cancel the default behavior of page refreshing
    e.preventDefault();
    connect();
});     

function connect() {

    let engine;
    let host     = document.getElementById("host").value;
    let port     = document.getElementById("port").value;
    let user     = document.getElementById("user").value;
    let pass     = document.getElementById("pass").value;
    let dbname  = document.getElementById("db_name").value;

    // VALIDATES ALL FIELDS ARE COMPLETED
    if(host == "" || port == "" || user == "" || pass == "" || dbname == "") {
        alert("Please, complete all the fields");
        return;
    }
    
    if(document.getElementById("postgreSQL").checked == true) {
        engine = "postgreSQL";
        //alert("Initializing Database Engine: postgreSQL");
    } else {
        engine = "SQL Server";
        //alert("Initializing Database Engine: sqlServer");
    }

    let values = {engine, host, port, dbname, user, pass};
 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            let response_text = this.responseText;
            //document.getElementById("textArea1").value = this.responseText;

            // Array with database table names: [table1, table2, ..., tableN]
            var array = response_text.split(",");
            console.log(array);
            if(array[0] == "Connected") {
                showMessage("Connected to PostgreSQL", "success");
                // DISPLAY TABLES ON COMBOBOX
                addTableNameComboBox(array);
            } 
            else {
                alert(this.responseText);
                //showMessage("Error: Connection failed!", "danger");
            }
        }
    };

    xhttp.open("POST", "backend.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    console.log(values);
    xhttp.send(JSON.stringify(values));
}

/* Add the tables names to the combo box */
function addTableNameComboBox(array) {
    
    var x = document.getElementById("selectedTable");
    let i = 1;
    while(array[i] != "") {        
        var option = document.createElement("option");
        option.text = array[i];
        x.add(option, x[-1]); // add it at the end
        i++;
    }
}

function showMessage(message, cssClass) {
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));
    // mostrando en el DOM
    var container = document.getElementById("main_container");
    const app = document.querySelector('#App');
    container.insertBefore(div, app);
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// FUNCTIONS TO GENERATE CRUDS.
// Eventos del DOM; cuando el usuario da click al botón
document.getElementById('generate-form').addEventListener("submit",
function(e) {
    // Cancel the default behavior of page refreshing
    e.preventDefault();
    generateCRUD_PostgreSQL();
}); 

function generateCRUD_PostgreSQL() {
    if(document.getElementById("check_create").checked == true) {
        showMessage("check_create", "info");
    }
    if(document.getElementById("check_read").checked == true) {
        showMessage("check_read", "info");
    }
    if(document.getElementById("check_update").checked == true) {
        showMessage("check_update", "info");
    }
    if(document.getElementById("check_delete").checked == true) {
        showMessage("check_delete", "info");
    }
    
}


