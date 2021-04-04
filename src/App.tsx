import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuestype = "all" | "active" | "completed"
export type TodolistType = {
    title: string,
    filter: FilterValuestype,
    id: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    //BLL:

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
    })
function removeTodolist(todolistID: string) {
    const updatedTodolists = todolists.filter(tl => tl.id !== todolistID )
    setTodolists(updatedTodolists)
    delete tasks[todolistID]
}

    function addTask(title: string, todolistID: string) {
        const task: TaskType = {
            id: v1(),
            title: title,  //(можно написать title,)
            isDone: false
        }
        const updatedTasks = [task, ...tasks[todolistID]];
        setTasks({
            ...tasks,
            [todolistID]: updatedTasks
        })
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todolistID: string) {
        const updatedTask = tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        setTasks({
            ...tasks,
            [todolistID]: updatedTask
        })
    }

    // const [todoListfilter, setTodolistfilter] = useState<FilterValuestype>("all")
    function removeTask(taskID: string, todolistID: string) {
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskID)
        setTasks({...tasks})
        // setTasks(tasks.filter(t => t.id !== taskID))
    }

    // const todoListfilter: FilterValuestype = "all"


    function changeTodoListFilter(newFilterValue: FilterValuestype, todolistID: string) {
        const updatedTodolists = todolists.map(tl => tl.id === todolistID ? {...tl, filter: newFilterValue} : tl)
        setTodolists(updatedTodolists)
    }

    function getTaskForTodolist(todoList: TodolistType): Array<TaskType> {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }

//UI:
    return (
        <div className="App">
            {
                todolists.map(tl => {
                    return (
                        <Todolist
                            removeTodolist={removeTodolist}
                            key={tl.id}
                            id={tl.id}
                            titleN={tl.title}
                            todolistFilter={tl.filter}
                            tasks={getTaskForTodolist(tl)}
                            changeTodoListFilter={changeTodoListFilter}
                            changeTaskStatus={changeTaskStatus}
                            removeTask={removeTask}
                            addTask={addTask}
                        />)
                })
            }
            {/*<Todolist titleN="What to learn"*/}
            {/*          todolistFilter={todoListfilter}*/}
            {/*          tasks={getTaskForTodolist()}*/}
            {/*          changeTodoListFilter={changeTodoListFilter}*/}
            {/*          changeTaskStatus={changeTaskStatus}*/}
            {/*          removeTask={removeTask}*/}
            {/*          addTask={addTask}*/}
            {/*/>*/}

        </div>
    );
}

export default App;
