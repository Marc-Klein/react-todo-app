import React, { useState } from "react";
import { v4 as uuid } from "uuid";
const App = () => {
	const [value, setValue] = useState("");
	const [todos, setTodos] = useState([
		{
			name: "Buy milk",
			isChecked: true,
			id: uuid(),
		},
	]);
	return (
		<div>
			<h1>{value}</h1>
			<a href="/login">Please Login Here!</a>
			<form
				onSubmit={event_ => {
					event_.preventDefault();
					setTodos([...todos, { name: value, isChecked: false, id: uuid() }]);
					setValue("");
				}}
			>
				<input
					type="text"
					value={value}
					onChange={event_ => {
						setValue(event_.target.value);
					}}
				/>
				<button disabled={!value} type="submit">
					Add
				</button>
			</form>
			<ul>
				{todos.map((todo, index) => {
					return (
						<li key={todo.id}>
							<label>
								<input
									type="checkbox"
									checked={todo.isChecked}
									onChange={() => {
										const update = [...todos];
										update[index].isChecked = !update[index].isChecked;
										setTodos(update);
									}}
								/>
								<span
									style={{
										textDecoration: todo.isChecked ? "line-through" : "none",
									}}
								>
									{todo.name}
								</span>
							</label>
							<button
								onClick={() => {
									const update = [...todos];
									update.splice(index, 1);
									setTodos(update);
								}}
							>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default App;
