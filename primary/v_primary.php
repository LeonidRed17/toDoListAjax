<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Список задач</title>

</head>

<body>
    <div class="content">
        <div class="wrapper">
            <h1 class="data_description">Список задач</h1>
            <div class="clearfix"></div>
            <div class="objectives_table_wrapper">
                <table>
                    <tbody class ="objectives_tbody">
                        <tr id='columns_description'>
                            <td class='select_row elem_invisible'>Выбрать</td>
                            <td class='number_row'>№</td>
                            <td class='name_row'>Название задачи</td>
                            <td class='description_row'>Описание задачи</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="block_option">
                <form id="objectives_form" method="POST" name="objectives_form">
                    <div id="buttons_block">
                        <input type="button" value="Добавить" id="add_button" class="tab_button active_block">
                        <input type="button" value="Изменить" id="edit_button" class="tab_button">
                        <input type="button" value="Удалить" id="delete_button" class="tab_button">
                    </div>
                    <input type="text" name="objectives_name_input" id="objectives_name_input" placeholder="Название задачи">
                    <input type="text" name="objectives_description_input" id="objectives_description_input" placeholder="Описание задачи">
                    <div class="clearfix"></div>
                    <input type="button" name="objectives_submit" id="objectives_submit" value="Добавить">
                </form>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
    <script src="script.js"></script>

</body>

</html>