import './todo.css'
import Task from '../task/Task'
import { useState, useRef, useEffect, memo } from 'react'
import uuid4 from 'uuid4';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

export default memo ( function Todo() {
    const [inputTask, setInputTask] = useState('');
    const [todo, setTodo] = useState([]);
    const inputRef = useRef(null)
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [updateTodo, setUpdateTodo] = useState('');
    const [id, setId] = useState(0);
    useEffect(() => {
        if (localStorage.Todos) {
            let getTodos = JSON.parse(localStorage.Todos)
            setTodo(getTodos)
        }
    }, [])

    function addTask() {
        let uniqueId = uuid4().slice(0, 8);
        if (inputTask !== '') {
            let addTodo = [...todo, { id: uniqueId, taskName: inputTask }];
            setTodo(addTodo)
            localStorage.setItem("Todos", JSON.stringify(addTodo))
        }
        setInputTask('')
        inputRef.current.focus();
    }

    const handleClickOpen = (id) => {
        setOpenDelete(true);
        setId(id);
    };
    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    function deleteTask() {
        let delTask = todo.filter(currentTask => currentTask.id !== id);
        setTodo(delTask)
        localStorage.setItem("Todos", JSON.stringify(delTask))
        setOpenDelete(false)
    }

    const handleUpdateClose = () => {
        setOpenUpdate(false);
    };
    const handleUpdateTask = (taskId) => {
        setOpenUpdate(true);
        setId(taskId)
        let todoUp = todo.find(to => to.id === taskId)
        setUpdateTodo(todoUp.taskName)
    };

    function upTask() {
        let updTask = todo.map((task) => {
            if (id === task.id) {
                return { ...task, taskName: updateTodo }
            }
            else return task
        })
        setTodo(updTask)
        localStorage.setItem("Todos", JSON.stringify(updTask))
        setOpenUpdate(false);
    }

    let todoList = todo.map((todo) => {
        return (
            <div key={todo.id}>
                <Task todo={todo} handleClickOpen={handleClickOpen} handleUpdateTask={handleUpdateTask} />
            </div>
        )
    })

    return (
        <>
            <Dialog
                open={openDelete}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure ? "}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={deleteTask} autoFocus className='text-danger'>Yes, Delete</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openUpdate}
                onClose={handleUpdateClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Update Your Task "}
                </DialogTitle>
                <DialogContent style={{ width: '300px', padding: "10px" }}>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Update Task"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updateTodo}
                        onChange={(e) => setUpdateTodo(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose}>Cancel</Button>
                    <Button onClick={upTask} autoFocus>Update Task</Button>
                </DialogActions>
            </Dialog>
            <div className="add-task">
                <input ref={inputRef} type="text" placeholder='Enter Your Task' value={inputTask} onChange={(e)=> setInputTask(e.target.value)} />
                <input type="submit" value="Add Task" onClick={addTask} className="btn-add" />
            </div>
            <div>
                {todoList}
            </div>
        </>
    )
})