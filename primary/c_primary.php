<?php
require_once('m_primary.php');
require_once('../connection.php');

$connection = new mysqli($host, $user, $password, $database);
$json = file_get_contents('PHP://input');
$obj = json_decode($json);
//var_dump($obj);
//echo(print_r($obj));

$dataBaseWork = new DataBaseWork(); //Инициализация класса ответственного за работу с базой данных
//Если клиент запрашивает данные, если клиент посылает данные
if ($obj->ajax == 'send') {
    echo("mode");
    if ($obj->mode === 'add') {
        $dataBaseWork->add_objective($connection, $dataBaseWork->clean($obj->objectiveName),  $dataBaseWork->clean($obj->objectiveDescription));
    } else if ($obj->mode === 'edit') {
        $dataBaseWork->edit_objective($connection,  $dataBaseWork->clean($obj->selectedId),  $dataBaseWork->clean($obj->objectiveName),  $dataBaseWork->clean($obj->objectiveDescription));
    } else if ($obj->mode === 'delete') {
        $dataBaseWork->delete_objective($connection,  $dataBaseWork->clean($obj->selectedId));
    } 
} else if($obj->ajax == 'get'){
    $dataBaseWork->send_objectives_json($connection);
    }
//require_once('v_primary.php');
