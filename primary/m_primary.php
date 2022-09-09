<?php
//Класс ответственный за сбор и очистку данных от опасных значений.


//Класс ответственный за добавление, редактирование и удаление задач.
class DataBaseWork
{
    public function add_objective($connection, $value1, $value2)
    {
        $query = "INSERT INTO objectives (objective_name, objective_description) VALUES('$value1','$value2')";
        if ($connection->query($query)) {
            echo "Данные успешно добавлены";
        } else {
            echo "Ошибка: " . $connection->error;
        }
    }
    public function edit_objective($connection, $objective_id,$value1, $value2)
    {
        $query = "UPDATE objectives SET objective_name = '$value1', objective_description = '$value2' WHERE objective_id = '$objective_id'";
        if ($connection->query($query)) {
            echo($objective_id);
            echo "Данные успешно обновлены";
        } else {
            echo "Ошибка: " . $connection->error;
        }
    }
    public function delete_objective($connection, $objective_id)
    {
        $query = "DELETE FROM objectives WHERE objective_id = '$objective_id'";
        if ($connection->query($query)) {
            echo "Данные успешно удалены";
        } else {
            echo "Ошибка: " . $connection->error;
        }
    }
    
    public function show_objectives($connection)
    {
        $query = "SELECT * FROM objectives";
        $indexNumber = 0;
        echo ("
        <table>
        <tr id='columns_description'>
            <td class='select_row elem_invisible'>Выбрать</td>
            <td class='number_row'>№</td>
            <td class='name_row'>Название задачи</td>
            <td class='description_row'>Описание задачи</td>
        </tr>");
        if ($result = $connection->query($query)) {
            foreach ($result as $row) {
                $indexNumber++;
                $objective_id = $row['objective_id'];
                $objective_name = $row['objective_name'];
                $objective_description = $row['objective_description'];
                echo ("
                <tr>
                    <td class='select_wrapper elem_invisible'>
                        <input type='radio' name='select' form='objectives_form' id='$objective_id' class='objectives_select elem_invisible'>
                    </td>
                    <td>$indexNumber</td>
                    <td>$objective_name</td>
                    <td>$objective_description...</td>
                </tr>
                ");
            }
        } else {
            echo "Ошибка: " . $connection->error;
        }
        echo('</table>');
    }
    public function clean($value)
    {
        $value = strip_tags($value);
        $value = HtmlSpecialChars($value);
        return $value;
    }
    /*
    public function checkRecordLimit($connection){
        $query = "SELECT COUNT(*) FROM objectives";
        $result = $connection->query($query);
        echo($result);
    }
    */
}
