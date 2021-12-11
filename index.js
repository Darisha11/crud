const http = require("http"), //подключение файла или библиотеки
    crud = require("./crud");

const echo = (res, content) => {
    res.end(JSON.stringify(content)); //закрывает поток и дописывает дополнительные данные
}

const student = (req, res) => {
    res.writeHead(200, {"Content-type": "application/json"}); //отправляет кол состояния 200 и записывает данные из json
    const url = req.url.substring(1).split("/");//в url создаётся массив, начиная с 1 элемента(убирается лишний "/" вначале)
    switch (req.method) { //определяет метод запроса
        case "GET": //получение данных обо всех студентах
            if (url.length > 1) { //если есть "/id" после student, получаем этот id
                echo(res, crud.get(url[1]));
            } else {              //если нет "/id" после student, получаем все
                echo(res, crud.getAll());
            }
            break;
        case "POST": //добавление
            getAsyncData(req, data => {
                echo(res, crud.create(JSON.parse(data)));//передаем объект
            });
            break;
        case "PUT": //изменение
            getAsyncData(req, data => {
                echo(res, crud.update(JSON.parse(data)));
            });
            break;
        case "DELETE": //удаление
            if (url.length > 1) { //если есть "/id" после student, удаляем с этим id
                echo(res, crud.delete(url[1]));
            } else { //если удаляем без "/id" после student
                echo(res, {"error": "Не передан id"});
            }
            break;
    }
}
const getAsyncData = (req, callback) => {
    let data = ""; //.on связывает функцию chunk с датой, т.е. пока данные поступают на сервер
    req.on("data", chunk => { //в дату добавляются введенные строчки из json
        //событие data генерируется, когда на сервер поступают данные
        data += chunk;
    });
    req.on("end", () => {
        callback(data); //когда все данные прибыли, мы вызываем дату
    });                 //end генерируется, когда все данные прибыли
}
const handler = (req, res) => {
    const url = req.url.substring(1).split("/");
    switch (url[0]) {
        case "student": //если первый url после локалхост "/student"
            student(req, res); //вызываем функцию
            return;
        case "": //если первого url после локалхост нет
            req.end("index"); //выдаём ответ index
            return;
    }
    console.log("AFTER SWITCH");
    console.log(req.url);
    console.log(url.method);
    res.end("echo"); //завершает поток с ответом echo
}

http.createServer(handler).listen(8090, () => { //создание сервера с портом и функцией handler
    console.log("run");
})
