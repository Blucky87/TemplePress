<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $email = $request->email;
    $password = $request->password; 

    $date = date('Y-m-d H:i:s');


    $dbhost="127.0.0.1";
    $dbuser="root";
    $dbpassword = "Brian112^!";
    $dbname="TemplePress";


    $con = new mysqli($dbhost, $dbuser, $dbpassword, $dbname)
        or die ('Could not connect to the database server' . mysqli_connect_error());




    $qry = "SELECT * FROM accounts WHERE email='$email' AND password='$password';";

    $result = mysqli_query($con, $qry);

    if($result){        
        if (mysqli_num_rows($result) >= 1) {     
            $update = "UPDATE accounts SET lastseen='$date' WHERE email='$email';";
            $temp = mysqli_query($con, $update);

            echo json_encode($result->fetch_assoc());

        } else {    
            echo "Invalid email or password.";
        }   
    } else {  
        echo "No valid sql response." ;
    } 
    
    mysqli_close($con);
 ?>