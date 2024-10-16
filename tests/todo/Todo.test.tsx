import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todo from "../../src/components/Todo/Todo";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../../src/components/store/todoSlice";

describe("Todo component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todo: todoReducer,
      },
    });

    render(
      <Provider store={store}>
        <Todo />
      </Provider>
    );
  });

  function addTodo(text: string) {
    const input = screen.getByPlaceholderText("todo");
    const addBtn = screen.getByLabelText(/add-todo/i);

    fireEvent.change(input, { target: { value: text } });
    fireEvent.click(addBtn);
  }

  it("should render if not todos", () => {
    expect(screen.getByText("No todo")).toBeInTheDocument();
  });

  it("should render todo", () => {
    addTodo("Buy milk");
    expect(screen.getByText(/Buy milk/i)).toBeInTheDocument();
  });

  it("should check delete todo", () => {
    addTodo("Buy milk");
    expect(screen.getByText(/Buy milk/i)).toBeInTheDocument();

    const deleteBnt = screen.getByLabelText(/delete-todo/i);
    fireEvent.click(deleteBnt);
    expect(screen.getByText("No todo")).toBeInTheDocument();
  });

  it("should check checkbox todo", () => {
    addTodo("Buy milk");

    const todoCheckbox = screen.getByRole("checkbox");
    expect(todoCheckbox).not.toBeChecked();

    fireEvent.click(todoCheckbox);
    expect(todoCheckbox).toBeChecked();
  });

  it("should rendered todo if have active in the task manager", async () => {
    addTodo("Buy milk");

    const activeBtn = screen.findByText("Active");
    const todo = screen.getByText("Buy milk");

    fireEvent.click(await activeBtn);
    expect(todo).toBeInTheDocument();
  });

  it("should rendered todo if have completed in the task manager and clear todo completed ", async () => {
    addTodo("Buy milk");

    const completed = screen.findByText("Completed");
    const clearCompleted = screen.findByText("Cleaar completed");
    const todo = screen.getByText("Buy milk");
    const todoCheckbox = screen.getByRole("checkbox");

    fireEvent.click(todoCheckbox);
    fireEvent.click(await completed);

    expect(todo).toBeInTheDocument();
    expect(todoCheckbox).toBeChecked();

    fireEvent.click(await clearCompleted);
    expect(todo).not.toBeInTheDocument();
  });
});
