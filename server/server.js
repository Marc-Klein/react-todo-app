import express from 'express';
import {readFile} from "fs/promises"


const app = express()
const port =8000
const file="todos.json"

app.listen(port, ()=>{
	console.log(`This server is listening on: ${port}`)
})

app.get("/", (request, response) => {
	response.send("Server says, hello!")
})

//use async syntax to use await
app.get("/api/todos", async (request, response) => {
	//first read the file
	const data = await readFile(fileName,"utf8");
	//then u need to parse it
	const parsedData = JSON.parse(data);
	response.send(parsedData)
})
