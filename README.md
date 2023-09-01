#### Задание 1
Установите пакет **Mongoose** в свой проект и настройте подключение к базе данных.
При подключении к локальной базе данных через [docker](https://hub.docker.com/_/mongo) создайте в своём проекте файл `docker-compose.yml`.



#### Задание 2
Создайте **Mongoose-схему** для коллекции **«books»**.
Структура документа должна соответствовать следующей структуре объекта:
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string"
}
``` 

#### Задание 3
Перепишите все методы, работающие со статичным объектом `Books`, на соответствующие методы для работы с `Mongoose Model Books`.

Метод | URL | Действие | Комментарий
--- | --- | ---| ---
`GET` | `/api/books` | Получить все книги | Получаем массив всех книг
`GET` | `/api/books/:id` | Получить книгу по **ID** | Получаем объект книги, если запись не найдена, вернём **Code: 404** 
`POST` | `/api/books` | Создать книгу | Создаём книгу и возвращаем её же вместе с присвоенным **ID**
`PUT` | `/api/books/:id` | Редактировать книгу по **ID** | Редактируем объект книги, если запись не найдена, вернём **Code: 404**
`DELETE` | `/api/books/:id` | Удалить книгу по **ID** | Удаляем книгу и возвращаем ответ: **'ok'**
