import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void //родительский callback
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const errorMessage = error ? <div className={"error-text"}>{error}</div> : null
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Title is requiered")
        }
        setTitle("")
    }
    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                error={!!error}
                helperText={error}
            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={changeTitle}*/}
            {/*    onKeyPress={onKeyPressAddItem}*/}
            {/*    className={error ? "error" : ""}*/}
            {/*/>*/}
            <IconButton onClick={addItem} color={"primary"}>
                <AddBox/>
            </IconButton>
            {/*<button onClick={addItem}>+</button>*/}
            {/*{errorMessage}*/}
            {/*{error && <div className={"error-text"}>{error}</div>}*/}
        </div>
    )
}

export default AddItemForm;