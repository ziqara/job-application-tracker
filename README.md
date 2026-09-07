# Job Application Tracker

Пет-проект, на котором я учусь фулстек-разработке. Иду от простого к сложному:
сначала фронт на React, потом бэкенд на Express, дальше — PostgreSQL, а в планах
переезд на NestJS + Prisma.

Приложение простое: список откликов на вакансии, можно добавлять, удалять,
переключать статус (Отправлено → Собеседование → Оффер → Отказ) и фильтровать по
статусу.

## Стек

**Фронтенд**
- React 19 + TypeScript
- Vite
- Material UI

**Бэкенд, версия 1 (`server/`)**
- Node.js + Express 5
- PostgreSQL (драйвер `pg`, параметризованные запросы)
- `dotenv` для конфигурации

**Бэкенд, версия 2 (`nest-server/`) — в процессе**
- NestJS: контроллеры, сервисы, DI
- DTO + валидация (`class-validator`, `ValidationPipe`)
- полный CRUD готов, пока на данных в памяти
- следующий шаг — Prisma + PostgreSQL

## Структура репозитория

| Папка          | Что внутри                                                        |
| -------------- | ---------------------------------------------------------------- |
| `job-tracker/`  | фронтенд на React + Vite                                        |
| `server/`       | REST API на Express, ходит в PostgreSQL                         |
| `nest-server/`  | тот же API, переписанный на NestJS (в работе)                   |
| `ts-basics/`    | черновик — упражнения по TypeScript, с которых начинался проект |

## API

| Метод  | Путь                | Что делает                        |
| ------ | ------------------- | -------------------------------- |
| GET    | `/applications`     | список всех откликов             |
| POST   | `/applications`     | создать отклик                   |
| PATCH  | `/applications/:id` | обновить статус                  |
| DELETE | `/applications/:id` | удалить отклик                   |

## Запуск локально

Нужны Node.js 20+ и PostgreSQL.

### 1. База данных

Создать базу и таблицу:

```sql
CREATE DATABASE job_tracker;

CREATE TABLE applications (
  id       SERIAL PRIMARY KEY,
  company  TEXT NOT NULL,
  position TEXT NOT NULL,
  status   TEXT NOT NULL,
  date     TEXT NOT NULL,
  notes    TEXT
);
```

### 2. Бэкенд

```bash
cd server
npm install
cp .env.example .env   # и вписать свои данные подключения к БД
npm run dev            # http://localhost:3000
```

### 3. Фронтенд

```bash
cd job-tracker
npm install
npm run dev            # http://localhost:5173
```

### NestJS-версия (`nest-server/`)

Пока работает на данных в памяти, база не нужна:

```bash
cd nest-server
npm install
npm run start:dev      # http://localhost:3000
```

## Что дальше

- [x] React-фронт: компоненты, состояние, controlled inputs
- [x] Express API: роуты, middleware, CORS
- [x] Хранение в PostgreSQL вместо JSON-файла
- [x] Обработка ошибок на сервере (400, 404)
- [x] Убрать генерацию `id` на клиенте — этим занимается база
- [x] Переезд бэкенда на NestJS: контроллеры, сервисы, DI, CRUD, DTO-валидация
- [ ] Prisma + PostgreSQL в `nest-server/` (сейчас данные в памяти)
- [ ] Подключить фронт к `nest-server/`, убрать `server/`
