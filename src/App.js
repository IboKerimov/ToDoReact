import { React, useState, useEffect } from 'react';

const App = () => {
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleSubmit = () => {
        if (content === "") {
            alert("Input Cannot be Empty");
        } else if (isEditing && currentTaskIndex !== null) {
            const updatedTasks = tasks.map((task, index) =>
                index === currentTaskIndex ? { content: content } : task
            );
            setTasks(updatedTasks);
            setIsEditing(false);
            setCurrentTaskIndex(null);
        } else {
            setTasks([...tasks, { content: content }]);
        }
        setContent("");
    };

    const handleDelete = (index) => {
        setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
    };

    const handleEdit = (index) => {
        setIsEditing(true);
        setCurrentTaskIndex(index);
        setContent(tasks[index].content);
    };

    return (
        <div>
            <h1>To Do List</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                {isEditing && <p style={{display: "flex", margin: "-6px 0 5px 0"}}>↓ Edit the to-do here ↓</p>}

                <input
                    type='text'
                    value={content}
                    placeholder='Add Task'
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type='submit'>{isEditing ? 'Save' : 'Add'}</button>

            </form>

            <div className='tasks'>
                <h1>Tasks</h1>

                {tasks.map((task, index) => (
                    <div className='task' key={index}>
                        <hr />
                        <p>{`${index + 1}. ${task.content}`}</p>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                        <button onClick={() => handleEdit(index)}>{isEditing && currentTaskIndex === index ? "Editing..." : "Edit"}</button>
                    </div>
                ))}

                <hr />
            </div>
        </div>
    );
};

export default App;
