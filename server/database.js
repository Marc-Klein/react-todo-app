import { MongoClient } from "mongodb";

let client;

export async function connectDatabase(url) {
	client = new MongoClient(url);
	await client.connect();
}

export function getTodoCollections() {
	return client.db().collection("todos");
}

/*
//here we determine the argument
export function getCollection(name) {
	return client.db().collection(name);
}

export function getTodoCollections(){
	return getCollection("todos")
}

export function getUserCollections() {
	return getCollection("users")
}

*/
