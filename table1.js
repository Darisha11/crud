let array = [
    {
        name: "Матюшанова Дарина",
        group: "ЦПИ-11",
        birth: "10.01.2004",
        phone: "89535117969",
    },
    {
        name: "Сальникова Екатерина",
        group: "ЦПИ-11",
        birth: "27.05.2003",
        phone: "89536284529",
    },
    {
        name: "Сорокина Анна",
        group: "ЦИС-17",
        birth: "14.03.2004",
        phone: "89004397625",
    }];

function template(student) {
    return '<tr>\n' +
        '<td class = "name">' + student.name + '</td>\n' +
        '<td>' + student.group + '</td>\n' +
        '<td>' + student.birth + '</td>\n' +
        '<td>' + student.phone + '</td>\n' +
        '<td><button type="button" class="buttonDel">Удалить</button></td>\n' +
        '<td><button type="button" class="buttonEdit">Изменить</button></td>\n' +
        '</tr>\n';
}

printAllStudents();

//кнопки удаления
//открытие

document.querySelectorAll(".buttonDel").forEach(btn => { //на все кнопки "удалить" назначаем действие по клику
    deleteHandler(btn);
})
let nameDel = null;
function deleteHandler(btn){
    btn.addEventListener("click", (evt)=>{
        nameDel = evt.target.parentElement.parentElement.querySelector(".name").innerHTML; // определяем имя студента из данной строки
        document.getElementById("windowDel").style.display = "block";
    })
}

//для кнопки "удалить" в окне удаления делаем событие по клику
document.getElementById("subDel").addEventListener("click", delStudent);

function delStudent() {
    array = array.filter(student => student.name !== nameDel); //удаляем из массива студента с данным именем
    printAllStudents();
    document.getElementById("windowDel").style.display = "none";
}

//закрытие
function noDel() {
    document.getElementById("windowDel").style.display = "none";
}
for (let bnoDel of document.getElementsByClassName("close")) {
    bnoDel.addEventListener("click", noDel);
}



//кнопка добавления
//открытие
function showAdd() {
    document.getElementById("windowAdd").style.display = "block";
}
for (let buttonAdd of document.getElementsByClassName("buttonAdd1")) {
    buttonAdd.addEventListener("click", showAdd);
}

//закрытие
function noAdd() {
    document.getElementById("windowAdd").style.display = "none";
}
for (let bnoAdd of document.getElementsByClassName("close1")) {
    bnoAdd.addEventListener("click", noAdd);
}

//для кнопки "добавить" в форме делаем событие по клику
document.getElementById("subAdd").addEventListener("click", addStudent);

function addStudent() {
    const student = getData(document.getElementById("addForm")); //получаем данные из формы
    array.push(student);
    document.getElementById("windowAdd").style.display = "none";
    document.getElementById("addForm").reset();
    printStudent(student); //добавляем студента в таблицу
}

function printStudent(student) {
    document.getElementById("tableName").innerHTML += template(student); //добавляем студента в конец таблицы
    document.querySelectorAll(".buttonEdit").forEach(btn => { //снова на все кнопки "изменить" назначаем действие по клику
        changeHandler(btn);
    });
    document.querySelectorAll(".buttonDel").forEach(btn => { //снова на все кнопки "удалить" назначаем действие по клику
        deleteHandler(btn);
    });
}

function printAllStudents() {
    document.getElementById("tableName").innerHTML = '<tr class="tr1">\n' +
        '        <th class="th11">Студент</th>\n' +
        '        <th class="th11">Группа</th>\n' +
        '        <th class="th11">Дата рождения</th>\n' +
        '        <th class="th11">Номер телефона</th>\n' +
        '        <th class="th11">Удалить</th>\n' +
        '        <th class="th11">Изменить</th>\n' +
        '    </tr>';
    for (let student of array) {
        document.getElementById("tableName").innerHTML += template(student); //выводим список студентов
    }
    document.querySelectorAll(".buttonEdit").forEach(btn => { //на все кнопки "изменить" назначаем действие по клику
        changeHandler(btn);
    });
    document.querySelectorAll(".buttonDel").forEach(btn => { //на все кнопки "удалить" назначаем действие по клику
        deleteHandler(btn);
    });
}

function getData(form) {
    const name = form.querySelector(".name").value;
    const group = form.querySelector(".group").value;
    const birth = form.querySelector(".birth").value;
    const phone = form.querySelector(".phone").value;

    return {name, group, birth, phone}; //возвращаем объект
}


//кнопка изменения
//открыть
document.querySelectorAll(".buttonEdit").forEach(btn => { //на все кнопки "изменить" назначаем действие по клику
    changeHandler(btn);
})

let currentRow = null;
let nameChange = null;
function changeHandler(btn){
    btn.addEventListener("click", (evt)=>{
        document.getElementById("windowChange").style.display = "block";
        currentRow = evt.target.parentElement.parentElement; //получаем текущую строку
        nameChange = currentRow.querySelector(".name").innerHTML; // определяем имя студента из данной строки
        let formInput = document.querySelector(".windowChange").querySelectorAll("input");
        for(let i = 0; i < currentRow.children.length - 2; i++) { //проходимся по всем ячейкам строки и данные из них помещаем в форму
            formInput[i].value = currentRow.children[i].textContent; // в каждое поле формы вносим соответствующее значение ячейки из строки
        }
    })
}

//для кнопки "изменить" в форме делаем событие по клику
document.getElementById("subChange").addEventListener("click", changeStudent);

function changeStudent() {
    const student = getData(document.getElementById("changeForm")); //получаем данные из формы
    for (let i = 0; i < array.length; i++) {
        if(array[i].name === nameChange) { //меняем данные студента на измененные
            array[i] = student;
        }
    }
    document.getElementById("windowChange").style.display = "none";
    document.getElementById("changeForm").reset(); //сбрасываем форму
    printAllStudents(); //выводим список всех студентов
}


//закрытие
function noEdit() {
    document.getElementById("windowChange").style.display = "none";
}

for (let bnoEdit of document.getElementsByClassName("close1")) {
    bnoEdit.addEventListener("click", noEdit);
}