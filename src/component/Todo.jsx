import React, { useState, useEffect } from 'react';
import {
  firestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from './firebase';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);

  const fetchTodos = async () => {
    const todosCollection = await getDocs(collection(firestore, 'todos'));
    const todosData = todosCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTodos(todosData);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      await addDoc(collection(firestore, 'todos'), { text: newTodo });
      setNewTodo('');
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(firestore, 'todos', id));
    fetchTodos();
  };

  const editTodo = async (id, newText) => {
    await updateDoc(doc(firestore, 'todos', id), { text: newText });
    setEditingTodoId(null);
    fetchTodos();
  };

  const toggleEdit = (id) => {
    setEditingTodoId(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setNewTodo(todoToEdit.text);
  };

  const markAsDone = async (id) => {
    await updateDoc(doc(firestore, 'todos', id), { done: true });
    fetchTodos();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">Todo List</h1>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={addTodo}
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none mb-4"
        >
          Add Todo
        </button>
      </div>
      <div className="space-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-gray-100 rounded-md p-3">
            <span
              className={`text-lg font-medium ${todo.done ? 'line-through text-gray-500' : ''}`}
            >
              {todo.text}
            </span>
            <div className="flex  mt-2">
              {editingTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => editTodo(todo.id, newTodo)}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => toggleEdit(todo.id)}
                    className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => markAsDone(todo.id)}
                    className={`w-full px-4 py-2 ${todo.done ? 'bg-gray-500' : 'bg-green-500'} text-white rounded hover:bg-gray-600 focus:outline-none`}
                  >
                    {todo.done ? 'Done' : 'Mark as Done'}
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
