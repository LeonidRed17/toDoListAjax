
let tabButtons = document.querySelectorAll('.tab_button'); //Массив с кнопками табов
let objectiveNameInput = document.getElementById('objectives_name_input'); //Инпут с названием задачи 
let objectiveDescriptionInput = document.getElementById('objectives_description_input'); //Инпут с описанием задачи
let objectivesSubmitButton = document.getElementById('objectives_submit'); //Кнопка отправки
let selectButtons = document.querySelectorAll('.objectives_select'); //Кнопки выборки - изначально скрыты.
let selectButtonsWrapper = document.querySelectorAll('.select_wrapper'); //Кнопки выборки - изначально скрыты.

addMode(); //Начальный режим - добавление
//Функция изменяющая режим работы программы: внесение задач, изменение или удаление. 
(function modeChangeController() {
    //Функция которая каждой кнопке присваивает событие при возникновении которого изменяется класс кнопки и соответственно её оформление.
    //Параметр tab_button - каждая кнопка таба
    tabButtons.forEach(function (tab_Button) {
        tab_Button.addEventListener('click', function () {
            tabButtons.forEach(function (tab_Button) {
                tab_Button.classList.remove('active_block'); //Для всех кнопок убрать активный класс
            });
            tab_Button.classList.add('active_block'); //Для кнопки на которую нажали добавить активный класс

            //В зависимости от нажатой кнопки переключить режим работы программы; id кнопки соответствует режиму.
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
    console.log('add_button!');
    console.log(objectiveNameInput.value);
}

//Режим изменения задачи
function editMode() {
    console.log('edit_button!');
    selectButtonsWrapper.forEach(function (selectButton) {
        selectButton.classList.add('select_visible');
    })
}
//Режим удаления задачи
function deleteMode() {
    console.log('delete_button!');
}

//Функция ответственная за асинхронный обмен данными с сервером
function ajax(data) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "c_primary.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.statusText);
        } else {
            console.log('Server response'.xhr.statusText);
        }
    }
    xhr.send(data);
}

/*
//Класс ответственный за элементы таба, в нем описаны основные общие характеристики элементов таба.
class Tabs {
    constructor(tabType, htmlElem) {

        //Тип таба
        this.tabType = tabType;

        //HTML элемент кнопки
        this.htmlElem = htmlElem;
    };

    //функция ответственная за асинхронный обмен с сервером
    static ajax() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "c_primary.php");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status == 200) {
                //const user = JSON.parse(xhr.responseText)
                location.reload();
            } else {
                console.log("Server response: ", xhr.statusText);
            }
        };
        let data = Tabs.setJsonData(); //отправляемые данные
        data = JSON.stringify(data); //формируем json из отправляемых данных
        //console.log(data);
        xhr.send(data); //отправляем данные на сервер
    };
    //функция ответственная за организацию и передачу json данных на сервер
    static setJsonData() {
        return {
            addMode: addTabButton.htmlElem.value,
            editMode: editTabButton.htmlElem.value,
            selectedId: selectedId,
            objectiveNameInputValue: objectivesNameInput.htmlElem.value,
            objectiveDescriptionInputValue: objectivesDescriptionInput.htmlElem.value
        };
    };

    //Метод меняющий режим работы программы: добавление/изменение названия и описания задачи.
    toggleMode(e) {
        //Если кнопка нажатия "добавить", то убрать у кнопки "редактировать" класс активный, сделать его неактивным, или наоборот.
        console.log(e.currentTarget)
        e.currentTarget.classList.remove("unactive_block");
        e.currentTarget.classList.add("active_block");
        if (e.currentTarget == addTabButton.htmlElem) {
            
        } else if (e.currentTarget == editTabButton.htmlElem) {
            for (let i = 0; i < objectiveSelect.htmlElem.length; i++) {
                objectiveSelect.htmlElem[i].setAttribute("style", "display:none");
                if (i >= 1) {
                    objectiveSelect.htmlElem[i].firstChild.nextSibling.value = "false";
                }
            }1

        } else if (e.currentTarget == deleteTabButton.htmlElem) {

        }
        if (e.currentTarget == addTabButton.htmlElem) {
            addTabButton.htmlElem.value = "true";

            addTabButton.htmlElem.classList.remove("unactive_block");
            addTabButton.htmlElem.classList.add("active_block");

            for (let i = 0; i < objectiveSelect.htmlElem.length; i++) {
                objectiveSelect.htmlElem[i].setAttribute("style", "display:none");
                if (i >= 1) {
                    objectiveSelect.htmlElem[i].firstChild.nextSibling.value = "false";
                }
            }
            editTabButton.htmlElem.value = "false";
            editTabButton.htmlElem.classList.remove("active_block");
            editTabButton.htmlElem.classList.add("unactive_block");

        } else if (e.currentTarget == editTabButton.htmlElem) {
            editTabButton.htmlElem.value = "true";
            console.log(editTabButton.htmlElem.value);
            editTabButton.htmlElem.classList.remove("unactive_block");
            editTabButton.htmlElem.classList.add("active_block");

            for (let i = 0; i < objectiveSelect.htmlElem.length; i++) {
                objectiveSelect.htmlElem[i].setAttribute("style", "display:table-cell");
                if (i >= 1) {
                    objectiveSelect.htmlElem[i].firstChild.nextSibling.value = objectiveSelect.htmlElem[i].firstChild.nextSibling.id;
                }
            };
            addTabButton.htmlElem.value = "false";
            addTabButton.htmlElem.classList.remove("active_block");
            addTabButton.htmlElem.classList.add("unactive_block");
        } else if (e.currentTarget == deleteTabButton.htmlElem) {
            deleteTabButton.htmlElem.value = "true";
            console.log(deleteTabButton.htmlElem.value);
            editTabButton.htmlElem.classList.remove("unactive_block");
            deleteTabButton.htmlElem.classList.add("active_block");

            for (let i = 0; i < objectiveSelect.htmlElem.length; i++) {
                objectiveSelect.htmlElem[i].setAttribute("style", "display:table-cell");
                if (i >= 1) {
                    objectiveSelect.htmlElem[i].firstChild.nextSibling.value = objectiveSelect.htmlElem[i].firstChild.nextSibling.id;
                }
            };
            addTabButton.htmlElem.value = "false";
            addTabButton.htmlElem.classList.remove("active_block");
            addTabButton.htmlElem.classList.add("unactive_block");
            
        }
        else {
            console.log("ошибка");
        }
    }
    
    }
}
//Класс ответственный за кнопки табова
class TabsButtons extends Tabs {
    constructor(tabType, htmlElem) {
        super(tabType, htmlElem)
        //Вешаем слушатель события на кнопку: метод меняющий класс элемента
        this.htmlElem.addEventListener('click', this.toggleMode);
    }
}

//Класс ответственный за кнопку "добавить"
class AddTabButton extends TabsButtons {
    constructor() {
        //Инициализируем свойства и методы от класа Tabs
        super("addTab", document.querySelector('#add_block_button'));
    };
};

//Класс ответственный за кнопку "редактировать"
class EditTabButton extends TabsButtons {
    constructor() {
        //Инициализируем свойства и методы от класа Tabs
        super("editTab", document.querySelector('#edit_block_button'));
    };
};
class DeleteTabButton extends TabsButtons {
    constructor() {
        //Инициализируем свойства и методы от класа Tabs
        super("deleteTab", document.querySelector('#delete_block_button'));
    };
};

//Класс ответственный за инпуты таба
class TabInput extends Tabs {
    constructor(tabType, htmlElem) {
        super(tabType, htmlElem);
    };
};
class ObjectiveSelect extends Tabs {
    constructor(tabType, htmlElem) {
        super(tabType, htmlElem);
    };
};

class SubmitTabButton extends Tabs {
    constructor() {
        super("submitButton", document.querySelector("#objectives_submit"));

        //this.htmlElem.addEventListener('click', go);
        //  this.addEventListener('click', ajax);
        this.htmlElem.addEventListener('click', Tabs.ajax);
    };
};

const addTabButton = new AddTabButton();
addTabButton.htmlElem.value = "true";
const editTabButton = new EditTabButton();
editTabButton.htmlElem.value = "false";
const deleteTabButton = new DeleteTabButton();
deleteTabButton.htmlElem.value = "false";

const objectivesNameInput = new TabInput("objectivesNameInput", document.querySelector("#objectives_name_input"));
const objectivesDescriptionInput = new TabInput("objectivesDescriptionInput", document.querySelector("#objectives_description_input"));
const objectiveSelect = new ObjectiveSelect('objectiveSelect', document.querySelectorAll(".objective_select"));
const submitTabButton = new SubmitTabButton();


let selects = document.getElementsByClassName('objectives_select');
let selectedId;

for (let i = 0; i < selects.length; i++) {
    selects[i].addEventListener('click', getSelectedId);
}
function getSelectedId(e) {
    selectedId = this.id;
}

*/