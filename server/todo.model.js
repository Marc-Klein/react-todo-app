//hier wird das Schema festgelegt aehnlich Java zu den Konstruktoren

import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
	name: String,
	isChecked: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
