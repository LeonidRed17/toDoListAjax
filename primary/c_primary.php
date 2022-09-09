<?php
require_once('m_primary.php');
require_once('../connection.php');

$connection = new mysqli($host, $user, $password, $database);
$json = file_get_contents('PHP://input');
$obj = json_decode($json);
//var_dump($obj);
echo(print_r($obj));

$dataBaseWork = new DataBaseWork(); //Инициализация класса ответственного за работу с базой данных

if (isset($obj)) {
    if ($obj->mode === 'add') {
        $dataBaseWork->add_objective($connection, $dataBaseWork->clean($obj->objectiveName),  $dataBaseWork->clean($obj->objectiveDescription));
    } else if ($obj->mode === 'edit') {
        $dataBaseWork->edit_objective($connection,  $dataBaseWork->clean($obj->selectedId),  $dataBaseWork->clean($obj->objectiveName),  $dataBaseWork->clean($obj->objectiveDescription));
    } else if ($obj->mode === 'delete') {
        $dataBaseWork->delete_objective($connection,  $dataBaseWork->clean($obj->selectedId));
    }
}
require_once('v_primary.php');

?>
<!--
//Запрашиваем файл с классами и функциями.
require_once('m_primary.php');
//Запрашиваем файл с настройками подключения к БД.
require_once('../connection.php');


//Подключаемся к БД.

$connection = new mysqli($host, $user, $password, $database);
//Если ошибка подключения - вывести ошибку.
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

//Инициализируем объекты классов.

$dataWork = new DataWork();
$dataBaseWork = new DataBaseWork();


//Если пользовательские поля не пустые то работать с ними.

//Очищаем введенные пользователем данные.

if (isset($_POST['objectives_name_input']) && isset($_POST['objectives_description_input'])) {
    if (strlen($_POST['objectives_name_input']) !== 0 && strlen($_POST['objectives_description_input']) !== 0) {
        $objective_name = $dataWork->clean($_POST['objectives_name_input']);
        $objective_description = $dataWork->clean($_POST['objectives_description_input']);

        //Добавляем данные в БД.
        $dataBaseWork->add_objective($connection, $objective_name, $objective_description);
        header("Location:c_primary.php");
    }
}

require_once('v_primary.php');

-->