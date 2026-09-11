# Job Application Tracker

Пет-проект, на котором я учусь фулстек-разработке. Прошёл путь: React-фронт →
Express + PostgreSQL API → переезд бэкенда на NestJS + Prisma.

Приложение простое: список откликов на вакансии, можно добавлять, удалять,
переключать статус (Отправлено → Собеседование → Оффер → Отказ) и фильтровать по
статусу.

## Стек

**Фронтенд**
- React 19 + TypeScript
- Vite
- Material UI

**Бэкенд**
- NestJS: модули, контроллеры, сервисы, DI
- DTO + валидация (`class-validator`, `ValidationPipe`)
- Prisma + PostgreSQL

## Структура репозитория

| Папка          | Что внутри                                                        |
| -------------- | ---------------------------------------------------------------- |
| `job-tracker/` | фронтенд на React + Vite                                         |
| `nest-server/` | REST API на NestJS, ходит в PostgreSQL через Prisma               |
| `ts-basics/`   | черновик — упражнения по TypeScript, с которых начинался проект  |

## API

| Метод  | Путь                | Что делает                        |
| ------ | ------------------- | -------------------------------- |
| GET    | `/applications`     | список всех откликов             |
| GET    | `/applications/:id` | одна заявка                      |
| POST   | `/applications`     | создать отклик                   |
| PATCH  | `/applications/:id` | обновить статус                  |
| DELETE | `/applications/:id` | удалить отклик                   |

## Запуск локально

Нужны Node.js 20+ и PostgreSQL.

### 1. Бэкенд

```bash
cd nest-server
npm install
cp .env.example .env   # и вписать свои данные подключения к БД
npx prisma migrate dev # создаст базу и таблицу по схеме
npm run start:dev      # http://localhost:3000
```

### 2. Фронтенд

```bash
cd job-tracker
npm install
npm run dev             # http://localhost:5173
```

## Что дальше

- [x] React-фронт: компоненты, состояние, controlled inputs
- [x] REST API: роуты, middleware/пайпы, CORS
- [x] Хранение в PostgreSQL вместо JSON-файла
- [x] Обработка ошибок на сервере (400, 404)
- [x] Убрать генерацию `id` на клиенте — этим занимается база
- [x] Переезд бэкенда на NestJS: контроллеры, сервисы, DI, CRUD, DTO-валидация
- [x] Prisma + PostgreSQL вместо голого `pg` и массива в памяти
- [x] Подключить фронт к NestJS-бэкенду, убрать старую Express-версию
- [ ] Задеплоить (фронт + бэк + база)
