<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);


    $name = $request->name;
    $email = $request->email;
    $password = $request->password; 

    $date = date('Y-m-d H:i:s');


    $dbhost="127.0.0.1";
    $dbuser="root";
    $dbpassword = "Brian112^!";
    $dbname="TemplePress";


    $con = new mysqli($dbhost, $dbuser, $dbpassword, $dbname)
        or die ('Could not connect to the database server' . mysqli_connect_error());




    $qry = "SELECT * FROM accounts WHERE email='$email';";

    $result = mysqli_query($con, $qry);

    if($result){        
        if (mysqli_num_rows($result) >= 1) {            
            echo "false";

        } else {    
            $register = "INSERT INTO accounts (name, email, password, rdate) VALUES ('$name', '$email', '$password', '$date');";
            $temp = mysqli_query($con, $register);

            echo "true";
        }   
    } else {  
        echo  json_encode($con) ;
    } 
    
    mysqli_close($con);
 ?>