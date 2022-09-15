<?php
require_once('../connection.php');
$json = file_get_contents('PHP://input');
$obj = json_decode($json);
var_dump($obj);
echo($obj->addMode);



//var_dump($_SERVER);
/*
function addtoDB($obj){
    
};

echo(print_r($obj));
*/
/*for($i=0; $i < $num; $i++)
{
    echo gettype("$obj[$i]");
}
*/

/*
if(isset($_POST['objectives_name_input']) && isset($_POST['objectives_description_input'])){
    $array = array (
        "objectives_name_input" => $_POST['objectives_name_input'],
        "objectives_description_input" => $_POST['objectives_description_input'],
        "add_block_button" => $_POST['add_block_button'],
        "edit_block_button" => $_POST['edit_block_button'],
    );
    var_dump($_POST);
    $json = JSON_encode($array);
    echo($json);
}
?>
*/
