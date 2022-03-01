import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  //入力項目
  const [todoText, setTodoText] = useState("");
  //未完了TODOに表示
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  //完了TODOに表示
  const [completeTodos, setCompleteTodos] = useState([]);

  //onChangeに関する記述(input入力)
  const onChangeTodoText = (e) => setTodoText(e.target.value);

  //onClick(入力ボタン)
  const onClickAdd = () => {
    //空文字入力禁止
    if (todoText === "") return;
    //未完了のTODOに入力したTODOを追加
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  //onClick(削除ボタン)
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); //配列のindex番目から一つ削除
    setIncompleteTodos(newTodos);
  };

  //onClick(完了ボタン)
  const onClickComplete = (index) => {
    //未完了のTODO削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1); //配列のindex番目から一つ削除
    //完了のTODOに追加
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //onClick(戻るボタン)
  const onClickBack = (index) => {
    //完了のTODO削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1); //配列のindex番目から一つ削除
    //未完了のTODOに追加
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />

      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodo5個までだよー</p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
