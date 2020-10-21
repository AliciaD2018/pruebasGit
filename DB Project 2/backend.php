<?php

$data = json_decode(file_get_contents("php://input"));
$engine = $data->engine;
$host = $data->host;
$port = $data->port;
$dbname = $data->dbname;
$user = $data->user;
$password = $data->pass;

function conectarSQLServer(){
  $serverName = "$host, $port"; //DESKTOP-CSH40O1\MSSQLSERVER01--->serverName\instanceName, portNumber (por defecto es 1433)
  $connectionInfo = array( "Database"=>$dbname, "UID"=>$user, "PWD"=>$password);
  $conn = sqlsrv_connect( $serverName, $connectionInfo);

  if( $conn ) {
      echo "Conexión establecida.<br />";
      return echo;
  }
  else{
      echo "Conexión no se pudo establecer.<br />";
      die( print_r( sqlsrv_errors(), true));
  }

}

if ($engine=="postgreSQL") {
  
   // Connection
   $db = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password") or die("Error conectando a base de datos");

   if( ! $db ) {
     echo "Error: Connection failed!";
  } else {
     echo "Connected,";
     $query = "select table_name from information_schema.tables where table_schema='public' and table_type='BASE TABLE';";
     $result = pg_query($db, $query) or die("Error: finding database tables");

     while ($row = pg_fetch_row($result)) {
       echo "$row[0],";
     }
     return $db;
 }
}
else{
    conectarSQLServer();
  }

?>
