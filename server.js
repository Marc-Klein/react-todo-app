import cors from "cors";
import express from "express";
import { readFile, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

const app = express();
const port = 1337;

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
	response.send("Hello World!");
});

const DATABASE_URI = "./database/database.json";

app.get("/api/todos", async (request, response, next) => {
	try {
		const data = await readFile(DATABASE_URI, "utf8");
		const json = JSON.parse(data);
		response.json(json.todos);
	} catch (error_) {
		next(error_);
	}
});

app.post("/api/todos", async (request, response, next) => {
	try {
		const data = await readFile(DATABASE_URI, "utf8");
		const json = JSON.parse(data);

		const todo = {
			...request.body,
			isChecked: false,
			id: uuid(),
		};

		json.todos.push(todo);
		await writeFile(DATABASE_URI, JSON.stringify(json, null, 4));
		response.status(201);
		response.json(todo);
	} catch (error_) {
		next(error_);
	}
});

app.delete("/api/todos", async (request, response, next) => {
	const { id } = request.body;
	try {
		const data = await readFile(DATABASE_URI, "utf-8");
		const json = JSON.parse(data);
		const index = json.todos.findIndex(user => user.id === id);
		if (index < 0) {
			response.status(400);
			response.json({ error: { message: "This entry does not exist" } });
			return;
		}
		json.todos.splice(index, 1);
		await writeFile(DATABASE_URI, JSON.stringify(json, null, 4));
		// Send a 204 (No Content)
		response.status(204);
		response.send();
		// Or 200
		// response.status(200);
		// response.send("entry deleted");
	} catch (error_) {
		next(error_);
	}
});

app.put("/api/todos", async (request, response, next) => {
	try {
		const { id, update } = request.body;
		const data = await readFile(DATABASE_URI, "utf-8");
		const json = JSON.parse(data);
		const index = json.todos.findIndex(user => user.id === id);
		if (index < 0) {
			response.status(400);
			response.json({ error: { message: "This entry does not exist" } });
			return;
		}
		json.todos[index] = { ...json.todos[index], ...update, id };
		await writeFile(DATABASE_URI, JSON.stringify(json, null, 4));
		// Send a 200
		response.status(200);
		response.send(json.todos[index]);
		// Or 204 (No Content)
		// response.status(204);
		// response.send();
	} catch (error_) {
		next(error_);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// import express from "express";
// import { readFile } from "fs/promises";
//
// const app = express();
// const port = 8000;
// const file = "todos.json";
// app.use(express.json());
//
// app.listen(port, () => {
// 	console.log(`This server is listening on: ${port}`);
// });
//
// app.get("/", (request, response) => {
// 	response.send("Server says, hi!");
// });
//
// //use async syntax to use await
// app.get("/api/todos", async (request, response) => {
// 	//first read the file
// 	const data = await readFile(file, "utf8");
// 	//then u need to parse it
// 	const parsedData = JSON.parse(data);
// 	response.send(parsedData);
// });
//
// /*------------------------------form handling------------------------------*/
//
// app.post("/api/todos", (request, response) => {
// 	request.body;
// 	response.json(request.body);
// });
