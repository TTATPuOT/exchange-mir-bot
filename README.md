# Бот Telegram для получения текущих курсов валют в платёжной системе МИР

Команды
- `yarn dev` запускает бота в режиме разработки
- `yarn build` собирает проект для продакшена в папку */dist*

---

Для запуска необходимы переменные среды:
- BOT_TOKEN - токен бота
- BOT_USERNAME - юзернейм бота в формате @username
- PORT - порт сервера
- DOMAIN - домен, на который будут приходить HTTPS-запросы от Telegram

Для удобства можно создать файл `.env` в корне проекта

Для разработки рекомендую использовать домены-туннели ngrok
