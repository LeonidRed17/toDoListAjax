let tabButtons = document.querySelectorAll('.tab_button'); //Массив с кнопками табов
let objectiveNameInput = document.getElementById('objectives_name_input'); //Инпут с названием задачи 
let objectiveDescriptionInput = document.getElementById('objectives_description_input'); //Инпут с описанием задачи
let objectivesSubmitButton = document.getElementById('objectives_submit'); //Кнопка отправки

//Пересылаемые данные на сервер через Ajax
let data = {
    ajax: "",
    mode: "",
    selectedId: "",
    objectiveName: "",
    objectiveDescription: "",
};
console.log('lol');
addMode(); //Режим программы по умолчанию - добавление задач.
objectivesSubmitButton.addEventListener('click', ajax_send);

//Функция которая изменяет режим работы программы при нажатии на соотвутсвующую кнопку таба: внесение, изменение или удаление задач. 
(function modeChangeController() {
    //Функция после которой при нажатии на кнопку меняется оформление таба.
    tabButtons.forEach(function (tab_Button) {
        tab_Button.addEventListener('click', function () {
            tabButtons.forEach(function (tab_Button) {
                tab_Button.classList.remove('active_block'); //Для всех кнопок убрать активный класс
            });
            tab_Button.classList.add('active_block'); //Для кнопки на которую нажали добавить активный класс

            //Условие в котором проверяется нажатая кнопка таба, и в соответствии с кнопкой переключается режим программы, id кнопки соответствует режиму.
            if (tab_Button.id == "add_button") {
                addMode();
            } else if (tab_Button.id == "edit_button") {
                editMode();

            } else if (tab_Button.id == "delete_button") {
                deleteMode();
            }
        });
    });
})();

//Режим добавление задач
function addMode() {

    //Определение данных для отправки
    data.mode = 'add';
    let selectRow = document.querySelector('.select_row'); //Описание столбца "выбрать"

    objectivesSubmitButton.value = 'Добавить';

    let selectButtons = document.querySelectorAll('.objectives_select'); //Кнопки выборки - изначально скрыты.
    let selectButtonsWrapper = document.querySelectorAll('.select_wrapper'); //Оберкта кнопки выборки - изначально скрыта.


    //Сделать невидимым название стоблца "выбрать"

    selectRow.classList.remove('select_row_visible');
    selectRow.classList.add('elem_invisible');
    console.log("Невидимый селект роу")
    console.log(selectRow);

    //Все обертки селекта сделать невидимыми
    selectButtonsWrapper.forEach(function (selectButtonWrapper) {
        selectButtonWrapper.classList.remove('select_wrapper_visible');
        selectButtonWrapper.classList.add('elem_invisible');
    })

    //Все селекты сделать невидимыми
    selectButtons.forEach(function (selectButton) {
        selectButton.classList.remove('select_visible');
        selectButton.classList.add('elem_invisible');
    })
    console.log(data);

}

//Режим изменения задачи
function editMode() {
    let selectRow = document.querySelector('.select_row'); //Описание столбца "выбрать"

    data.mode = 'edit';
    //Определение данных для отправки
    objectivesSubmitButton.value = 'Изменить';
    let selectButtons = document.querySelectorAll('.objectives_select'); //Кнопки выборки - изначально скрыты.
    let selectButtonsWrapper = document.querySelectorAll('.select_wrapper'); //Оберкта кнопки выборки - изначально скрыта.

    //Сделать видимым название стоблца "выбрать"
    selectRow.classList.add('select_row_visible');
    selectRow.classList.remove('elem_invisible');

    //Все обертки селекта сделать видимыми
    selectButtonsWrapper.forEach(function (selectButtonWrapper) {
        selectButtonWrapper.classList.remove('elem_invisible');
        selectButtonWrapper.classList.add('select_wrapper_visible');
    })

    //Все селекты сделать видимыми
    selectButtons.forEach(function (selectButton) {
        selectButton.classList.remove('elem_invisible');
        selectButton.classList.add('select_visible');
    })

    //При нажатии на любую кнопку селект вызывать функцию которая определит id селекта и отправит его в data 
    selectButtons.forEach(function (select) {
        select.addEventListener('click', function () {
            data.selectedId = select.id;
        });
    })
    console.log(data);
}

//Режим удаления задачи
function deleteMode() {
    let selectRow = document.querySelector('.select_row'); //Описание столбца "выбрать"

    //Инфа которая передастся серверу
    data.mode = "delete"; //Режим удаления
    objectivesSubmitButton.value = 'Удалить';
    //Сделать видимым название стоблца "выбрать"
    selectRow.classList.add('select_row_visible');
    selectRow.classList.remove('elem_invisible');
    let selectButtons = document.querySelectorAll('.objectives_select'); //Кнопки выборки - изначально скрыты.
    let selectButtonsWrapper = document.querySelectorAll('.select_wrapper'); //Оберкта кнопки выборки - изначально скрыта.

    //Все обертки селекта сделать видимыми
    selectButtonsWrapper.forEach(function (selectButtonWrapper) {
        selectButtonWrapper.classList.remove('elem_invisible');
        selectButtonWrapper.classList.add('select_wrapper_visible');
    })

    //Все селекты сделать видимыми
    selectButtons.forEach(function (selectButton) {
        selectButton.classList.remove('elem_invisible');
        selectButton.classList.add('select_visible');
    })

    //При нажатии на любую кнопку селект вызывать функцию которая определит id селекта и отправит его в data 
    selectButtons.forEach(function (select) {
        select.addEventListener('click', function () {
            data.selectedId = select.id;
        });
    })
    console.log(data);
}

//Функция ответственная за асинхронный обмен данными с сервером
function ajax_send() {
    console.log(data.ajax);
    data.ajax = 'send';
    console.log(data);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "c_primary.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
        if (xhr.status == 200) {
            //console.log(JSON.parse(xhr.responseText));
            console.log((xhr.responseText));
            ajax_get();
        } else {
            console.log('Server response'.xhr.statusText);
        }
    }

    data.objectiveName = objectiveNameInput.value; //Текст введенный в поле именования задачи
    data.objectiveDescription = objectiveDescriptionInput.value;//Текст введенный в поле описания задачи

    //console.log(data);
    console.log(data);

    let sendData = JSON.stringify(data);
    xhr.send(sendData);
    console.log(sendData);
}

function ajax_get() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "c_primary.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.responseText);
            let jsonData = JSON.parse(xhr.responseText);
            showObjectives(jsonData);
        } else {
            console.log('Server response'.xhr.statusText);
        }
    }
    data.ajax = "get";
    console.log(data);
    let sendData = JSON.stringify(data);
    console.log(data);
    xhr.send(sendData);
};

ajax_get()

let upload = 0; //Число дозагрузок задач
//Функция обрабатывающая массив данных и выводящая их на страницу 
function showObjectives(jsonData) {
    let objectivesTbody = document.querySelector('.objectives_tbody');
    console.log('showobjectives');
    console.log(data);
    if (data.mode === 'add') {
        console.log('data.mode === add');
        addMode();
        //Если нужно добавить в таблицу только последнюю задачу
        if (upload === 1) {
            let htmlElemTr = document.createElement('tr');
            let j = jsonData.length //Номер записи на странице - последняя записи
            console.log(jsonData);
            htmlElemTrInnerHTML = `<tr><td class='select_wrapper elem_invisible'><input type='radio' name='select' form='objectives_form' id=${jsonData[jsonData.length - 1][0]} class='objectives_select elem_invisible'></td><td>${j}</td><td>${jsonData[jsonData.length - 1][1]}</td><td>${jsonData[jsonData.length - 1][2]}</td></tr>`;
            htmlElemTr.innerHTML = htmlElemTrInnerHTML;
            objectivesTbody.appendChild(htmlElemTr);
        }
        else {
            for (let i = 0; i < jsonData.length; i++) {
                let htmlElemTr = document.createElement('tr');
                let j = i + 1 //Номер записи на странице
                htmlElemTrInnerHTML = `<tr><td class='select_wrapper elem_invisible'><input type='radio' name='select' form='objectives_form' id=${jsonData[i][0]} class='objectives_select elem_invisible'></td><td>${j}</td><td>${jsonData[i][1]}</td><td>${jsonData[i][2]}</td></tr>`;
                htmlElemTr.innerHTML = htmlElemTrInnerHTML;
                objectivesTbody.appendChild(htmlElemTr);
                console.log(upload);
            }
            upload = 1;

        }
    } else if (data.mode === 'edit') {
        objectivesTbody.innerHTML = "<tr id='columns_description'><td class=select_row elem_invisible'>Выбрать</td><td class='number_row'>№</td><td class='name_row'>Название задачи</td><td class='description_row'>Описание задачи</td></tr>";
        for (let i = 0; i < jsonData.length; i++) {
            let htmlElemTr = document.createElement('tr');
            let j = i + 1 //Номер записи на странице
            htmlElemTrInnerHTML = `<tr><td class='select_wrapper elem_invisible'><input type='radio' name='select' form='objectives_form' id=${jsonData[i][0]} class='objectives_select elem_invisible'></td><td>${j}</td><td>${jsonData[i][1]}</td><td>${jsonData[i][2]}</td></tr>`;
            htmlElemTr.innerHTML = htmlElemTrInnerHTML;
            objectivesTbody.appendChild(htmlElemTr);
            console.log(upload);
        }
        upload = 1;
        editMode();


    } else if (data.mode === 'delete') {
        objectivesTbody.innerHTML = "<tr id='columns_description'><td class='select_row select_row_visible'>Выбрать</td><td class='number_row'>№</td><td class='name_row'>Название задачи</td><td class='description_row'>Описание задачи</td></tr>";
        for (let i = 0; i < jsonData.length; i++) {
            let htmlElemTr = document.createElement('tr');
            let j = i + 1 //Номер записи на странице
            htmlElemTrInnerHTML = `<tr><td class='select_wrapper elem_invisible'><input type='radio' name='select' form='objectives_form' id=${jsonData[i][0]} class='objectives_select elem_invisible'></td><td>${j}</td><td>${jsonData[i][1]}</td><td>${jsonData[i][2]}</td></tr>`;
            htmlElemTr.innerHTML = htmlElemTrInnerHTML;
            objectivesTbody.appendChild(htmlElemTr);
            console.log(upload);
        }
        upload = 1;
        deleteMode();

    }
}