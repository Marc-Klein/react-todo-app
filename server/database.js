import { MongoClient } from "mongodb";

let client;

//url is a param
export async function connectDatabase(url) {
	client = new MongoClient(url);
	await client.connect();
}

export function getTodoCollection() {
	return client.db().collection("todos");
}

/*
//here we determine the argument
export function getCollection(name) {
	return client.db().collection(name);
}
//currie function from getTodo
export function getTodoCollections(){
	return getCollection("todos")
}

export function getUserCollections() {
	return getCollection("users")
}

*/
