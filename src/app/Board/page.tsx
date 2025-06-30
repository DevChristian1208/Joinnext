"use client";

import React, { useState } from "react";
import Header from "@/Komponenten /Header/Header";
import NavBar from "@/Komponenten /navBar/NavBar";
import Image from "next/image";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type ColumnType = "To Do" | "In Progress" | "Await Feedback" | "Done";

type Task = {
  id: number;
  title: string;
  description?: string;
  assignedTo?: string;
  dueDate: string;
  priority: "Urgent" | "Medium" | "Low";
  category: ColumnType;
};

const columns: ColumnType[] = [
  "To Do",
  "In Progress",
  "Await Feedback",
  "Done",
];

// Item Type für react-dnd
const ItemType = {
  TASK: "task",
};

// Draggable Task Component
function DraggableTask({
  task,
  moveTask,
}: {
  task: Task;
  moveTask: (taskId: number, toColumn: ColumnType) => void;
}) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.TASK,
    item: { id: task.id, fromColumn: task.category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg p-4 shadow cursor-pointer hover:shadow-md transition flex flex-col gap-1 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <span
          className={`text-sm font-semibold px-2 py-0.5 rounded
            ${
              task.priority === "Urgent"
                ? "bg-red-500 text-white"
                : task.priority === "Medium"
                ? "bg-yellow-400 text-black"
                : "bg-green-400 text-white"
            }`}
        >
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="text-gray-600 text-sm line-clamp-3">{task.description}</p>
      )}
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Assigned to: {task.assignedTo || "-"}</span>
        <span>Due: {task.dueDate}</span>
      </div>
    </div>
  );
}

// Droppable Column Component
function DroppableColumn({
  column,
  tasks,
  moveTask,
  openAddTaskForColumn,
}: {
  column: ColumnType;
  tasks: Task[];
  moveTask: (taskId: number, toColumn: ColumnType) => void;
  openAddTaskForColumn: (col: ColumnType) => void;
}) {
  const [, drop] = useDrop({
    accept: ItemType.TASK,
    drop: (item: { id: number; fromColumn: ColumnType }) => {
      if (item.fromColumn !== column) {
        moveTask(item.id, column);
      }
    },
  });

  return (
    <div
      ref={drop}
      className="inner-management-content w-[320px] flex flex-col"
    >
      <div className="title-m-content flex justify-between items-center mb-2">
        <p className="title-m text-lg font-bold">{column}</p>
        <button
          className="plus-btn border-2 border-[#2A3647] rounded hover:border-[#29ABE2] hover:text-[#29ABE2] p-1"
          onClick={() => openAddTaskForColumn(column)}
          title={`Add task to ${column}`}
        >
          <i className="fa fa-plus text-xs" />
        </button>
      </div>

      <div
        id={`tasks-${column}`}
        className="min-h-[300px] border-dashed border-2 border-gray-300 bg-gray-100 rounded-lg p-3 flex flex-col gap-3 overflow-auto"
      >
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No tasks to do</p>
        ) : (
          tasks.map((task) => (
            <DraggableTask key={task.id} task={task} moveTask={moveTask} />
          ))
        )}
      </div>
    </div>
  );
}

export default function Board() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasksByColumn, setTasksByColumn] = useState<
    Record<ColumnType, Task[]>
  >({
    "To Do": [],
    "In Progress": [],
    "Await Feedback": [],
    Done: [],
  });

  // Form State für neues Task
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    assignedTo: string;
    dueDate: string;
    priority: "Urgent" | "Medium" | "Low";
    category: ColumnType | "";
  }>({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: "Low",
    category: "",
  });

  const closeAddTask = () => setShowAddTask(false);

  // Handler für Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Priority Button Click Handler
  const handlePriorityClick = (prio: "Urgent" | "Medium" | "Low") => {
    setNewTask((prev) => ({ ...prev, priority: prio }));
  };

  // Plus-Button in Column klick: Öffnet Modal & setzt Kategorie
  const openAddTaskForColumn = (col: ColumnType) => {
    setNewTask((prev) => ({ ...prev, category: col }));
    setShowAddTask(true);
  };

  // Task hinzufügen
  const createTask = () => {
    if (!newTask.title.trim()) {
      alert("Bitte gib einen Titel ein!");
      return;
    }
    if (!newTask.category) {
      alert("Bitte wähle eine Kategorie aus!");
      return;
    }
    if (!newTask.dueDate) {
      alert("Bitte wähle ein Fälligkeitsdatum!");
      return;
    }

    // Sicherstellen, dass category ein ColumnType ist
    const category = newTask.category as ColumnType;

    const taskToAdd: Task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      category,
    };

    // Task in den State einfügen
    setTasksByColumn((prev) => ({
      ...prev,
      [category]: [...prev[category], taskToAdd],
    }));

    // Modal schließen und Formular resetten
    setShowAddTask(false);
    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      dueDate: "",
      priority: "Low",
      category: "",
    });
  };

  // Formular resetten
  const clearForm = () => {
    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      dueDate: "",
      priority: "Low",
      category: "",
    });
  };

  // Funktion zum Verschieben der Tasks
  const moveTask = (taskId: number, toColumn: ColumnType) => {
    setTasksByColumn((prev) => {
      let movedTask: Task | undefined;

      // Alle Tasks aus allen Columns filtern, und movedTask extrahieren
      const newTasksByColumn = {} as Record<ColumnType, Task[]>;
      for (const col of columns) {
        const filteredTasks = prev[col].filter((task) => {
          if (task.id === taskId) {
            movedTask = task;
            return false;
          }
          return true;
        });
        newTasksByColumn[col] = filteredTasks;
      }

      if (!movedTask) return prev; // task nicht gefunden

      movedTask.category = toColumn;

      newTasksByColumn[toColumn] = [...newTasksByColumn[toColumn], movedTask];

      return newTasksByColumn;
    });
  };

  return (
    <>
      {/* Overlay, wenn Dialog offen */}
      {showAddTask && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
          onClick={closeAddTask}
        />
      )}

      <DndProvider backend={HTML5Backend}>
        <section className="board-section flex h-screen items-start">
          <NavBar />

          <div className="flex flex-col flex-grow">
            <Header />

            <main className="board-content ml-[280px] mr-[60px] w-[80%] pt-30 px-4 relative">
              {/* Board Header */}
              <div className="board-header flex justify-between items-center mb-6">
                <h1 className="text-[61px] font-bold leading-[73px]">Board</h1>

                <div className="addTask-content flex items-center gap-8">
                  <div className="search-content flex items-center border border-gray-400 rounded-lg px-4 h-9">
                    <input
                      id="search-input"
                      className="outline-none border-none text-lg placeholder-gray-400"
                      type="text"
                      placeholder="Find Task"
                    />
                    <div className="line-content w-px bg-gray-300 h-full mx-2" />
                    <button className="search-btn text-gray-600 hover:text-gray-800">
                      <i className="fa fa-search text-lg" />
                      <Image
                        src="/icons8-suche-64.png"
                        alt="such icon"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>

                  <button
                    className="addTask-button flex items-center justify-center gap-2 bg-[#2A3647] text-white rounded-lg px-4 h-9 text-lg hover:bg-[#29ABE2] transition"
                    onClick={() => {
                      setNewTask((prev) => ({ ...prev, category: "" }));
                      setShowAddTask(true);
                    }}
                  >
                    <i className="fa fa-plus text-xl" />
                    Add Task
                  </button>
                </div>
              </div>

              {/* Columns */}
              <div className="board-management-content flex flex-wrap justify-between gap-6">
                {columns.map((col) => (
                  <DroppableColumn
                    key={col}
                    column={col}
                    tasks={tasksByColumn[col]}
                    moveTask={moveTask}
                    openAddTaskForColumn={openAddTaskForColumn}
                  />
                ))}
              </div>

              {/* AddTask Dialog */}
              {showAddTask && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
                  onClick={closeAddTask}
                >
                  <div
                    className="bg-white rounded-3xl p-8 max-w-[976px] w-full max-h-[90vh] overflow-auto shadow-lg relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-4xl font-bold mb-8">Add Task</h2>

                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left Side */}
                      <div className="flex-1 space-y-6">
                        <div>
                          <label
                            htmlFor="title"
                            className="block font-semibold mb-1"
                          >
                            Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Enter a title"
                            className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={newTask.title}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="description"
                            className="block font-semibold mb-1"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows={5}
                            placeholder="Enter a description"
                            className="w-full border border-gray-300 rounded p-4 resize-y text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newTask.description}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="assignedTo"
                            className="block font-semibold mb-1"
                          >
                            Assigned to
                          </label>
                          <input
                            id="assignedTo"
                            name="assignedTo"
                            type="text"
                            placeholder="Select contacts to assign"
                            className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newTask.assignedTo}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="flex-1 space-y-6">
                        <div>
                          <label
                            htmlFor="dueDate"
                            className="block font-semibold mb-1"
                          >
                            Due Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={newTask.dueDate}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <span className="block font-semibold mb-2">
                            Priority
                          </span>
                          <div className="flex gap-4">
                            {(["Urgent", "Medium", "Low"] as const).map(
                              (prio) => (
                                <button
                                  key={prio}
                                  type="button"
                                  className={`flex-1 rounded-lg py-3 font-medium text-lg
                                  ${
                                    newTask.priority === prio
                                      ? prio === "Urgent"
                                        ? "bg-red-500 text-white"
                                        : prio === "Medium"
                                        ? "bg-yellow-400 text-black"
                                        : "bg-green-400 text-white"
                                      : "bg-gray-100 hover:bg-gray-200"
                                  }`}
                                  onClick={() => handlePriorityClick(prio)}
                                >
                                  {prio}
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="category"
                            className="block font-semibold mb-1"
                          >
                            Category <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="category"
                            name="category"
                            className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={newTask.category}
                            onChange={handleInputChange}
                          >
                            <option value="">Select task category</option>
                            {columns.map((col) => (
                              <option key={col} value={col}>
                                {col}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="subtask"
                            className="block font-semibold mb-1"
                          >
                            Subtasks
                          </label>
                          <input
                            id="subtask"
                            type="text"
                            placeholder="Add new subtask"
                            className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled
                          />
                          <p className="text-gray-400 italic text-sm mt-1">
                            Subtask feature coming soon...
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center">
                      <span className="text-red-500 text-sm">
                        <span className="text-red-500">*</span> This field is
                        required
                      </span>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          className="border border-gray-400 rounded-lg px-6 py-3 hover:bg-gray-100 transition"
                          onClick={clearForm}
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          className="bg-[#2A3647] text-white rounded-lg px-6 py-3 hover:bg-[#29ABE2] transition"
                          onClick={createTask}
                        >
                          Create Task
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </section>
      </DndProvider>
    </>
  );
}
