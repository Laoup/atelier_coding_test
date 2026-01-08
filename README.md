# L'Atelier Backend Test

## 🧩 Overview

This project is a **backend TypeScript api** developed as part of the l'Atelier technical test.  
It includes:

- A **Fastify + PostgreSQL backend** providing a REST API.

---

## ⚙️ Technical Stack

### **Backend**
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** [Fastify](https://fastify.dev/)
- **ORM:** [Sequelize](https://sequelize.org/)
- **Database:** PostgreSQL
- **Env management:** dotenv
- **Testing:** Jest
- **Linting & Formatting:** ESLint, Prettier
- **Dev tools:** nodemon, ts-node, tsx
- **Migrations/Seeds:** sequelize-cli

📂 **Main scripts (from `package.json`)**
```bash
yarn dev            # Run backend in dev mode
yarn test           # Run unit test
yarn build          # Compile project in ./dist
yarn db:create      # Create the DB
yarn db:migrate     # Apply migrations
yarn db:undo        # Rollback migrations
yarn db:seed        # Seed database
```

---

## The project is availaible online

I deployed the project on an EC2 instance with ElasticIP.
It's appear to me to be a more quick and less expensive solution rather than use AWS App Runner + RDS OR Lambda + RDS


### Here a description of avalaible endpoints

```bash
GET :

Get all players -> http://13.39.197.180:3000/players/
Get a player by is id -> http://13.39.197.180:3000/players/:id
Get statistics: topCountry / imc / medianHeight based on players -> http://13.39.197.180:3000/players/stats

POST :

Post create a new player -> http://13.39.197.180:3000/players/
💡 Necessary to create a player by specifyng EACH fields that a player is composed by
```


```
{
    "firstname": "Richard",
    "lastname": "Gasquet",
    "shortname": "R.GAS",
    "sex": "M",
    "picture": "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQwkQN7VEBCyaIGELttpWk1EpWn7ossEGyJ8F2o_1Aa8ZzEMprHkB1sXqqN2bE1AisiQNYp_19zFmv9xBsHRN6MOscCuM7ql6WNSEpcehnluCID1n3JF4MBW8c0v3QbbZtOW9nAEXYt08UK&s=19",
    "country": {
        "code": "FRA",
        "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAOVBMVEX///8AJlTOESYAGk5wfJLedHzNABoAI1LNCSFBSGrWSlX88/QAFkzMABQ5QWaEhpr/+vriho3VQ09w60AhAAABEElEQVR4nO3QRw3AAAwEsHTvyR9sUZzUhw3B1cR0feUMYxtTTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnTpw4ceLEiRMnfzuZYvboyTHH1BJzXveWcj/vGvMBE+jb6hdFhcsAAAAASUVORK5CYII="
    },
    "rank": 7,
    "points": 1532,
    "weight": 79500,
    "height": 185,
    "age": 39,
    "last": [1,0,1,1,0]
}
```

---

## ⚙️ Environment Configuration

The backend uses environment variables managed through a `.env` file.  
A `.env.sample` file is included in the repository to help configure local development.

### Example

Copy `.env.sample` and rename it to `.env` at the root of the **backend** folder:

```
cp .env.sample .env
```

Then update it with your local values.

Typical variables include:
```
PORT=3000
PGHOST=
PGUSER=
PGPASSWORD=
PGDATABASE=
```

💡 **Tip:**  
When running locally, make sure your PostgreSQL instance uses matching credentials and ports.

---

## ▶️ How to install and run it locally

1) Install dependencies:
```bash
yarn install
```

2) Create your `.env` file and set the Postgres credentials (see Environment Configuration above):
```bash
cp .env.sample .env
```

3) Ensure PostgreSQL is running, then create and migrate the database:
```bash
yarn db:create
yarn db:migrate
```

Optional: seed with sample data:
```bash
yarn db:seed
```

4) Start the API in dev mode:
```bash
yarn dev
```

---

## 🚧 What to Improve & Do Next

### 1. Automatic Type Generation and OpenAPI(Swagger)
- Implements Swagger
  - Provide an easy documentation of endpoints
- Implements Zod to protect the routes with Schema
- Swagger + Zod + JsonSchemaTransform = Automatic typing generation

### 2. Create a front-end
- Create a front-end to use more easily this api 😊

## 🙏 Thanks

Thank you for the opportunity to work on this project.

I would be delighted to continue this process with you and discuss what we could build together.
 
_Sincères salutations._

---

## 🧾 License

This project is provided for evaluation purposes only — no commercial license applies.
