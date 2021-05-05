import {ActionType, RemoveTodolistAC, todoListsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuestype, TodolistType} from '../App';


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach(() => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {


    const endState = todoListsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle, id: todolistId2})

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";


    const action: ActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistID: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuestype = "completed";


    const action: ActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistID: todolistId2,
        newFilterValue: newFilter
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
