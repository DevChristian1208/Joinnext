"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/Komponenten /Header/Header";
import NavBar from "@/Komponenten /navBar/NavBar";

type Priority = "urgent" | "medium" | "low";

export default function AddTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [priority, setPriority] = useState<Priority | null>(null);
  const [taskAdded, setTaskAdded] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleAddSubtask = () => {
    if (subtaskInput.trim() !== "") {
      setSubtasks((prev) => [...prev, subtaskInput.trim()]);
      setSubtaskInput("");
    }
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setCategory("");
    setSubtasks([]);
    setPriority(null);
    setSubtaskInput("");
  };

  const handleCreateTask = () => {
    if (!title.trim() || !dueDate || !category)
      return alert("Fill in all required fields.");
    setTaskAdded(true);
    setTimeout(() => setTaskAdded(false), 3000);
    handleClear();
  };

  return (
    <div className="content relative h-screen flex ml-[232px] px-16 pt-40 text-[#2A3647] overflow-auto">
      <NavBar />
      <Header />
      <div className="w-full max-w-[976px] mx-auto flex flex-col gap-20">
        <h2 className="text-[61px] font-bold">Add Task</h2>

        <div className="flex gap-8 text-[20px]">
          <div className="flex flex-col gap-5 w-1/2">
            <div className="flex flex-col gap-2">
              <label>
                Title<span className="text-[#FF8190]">*</span>
              </label>
              <div className="flex flex-col gap-1">
                <input
                  className="inputfield border rounded-lg px-4 py-3"
                  type="text"
                  placeholder="Enter a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label>Description</label>
              <div className="border rounded-lg flex flex-col px-4 py-3">
                <textarea
                  className="resize-none h-28 text-[16px] outline-none"
                  placeholder="Enter a Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Image src="/textarea.svg" alt="" width={20} height={20} />
              </div>
            </div>

            {/* Assigned To (disabled placeholder) */}
            <div className="flex flex-col gap-2">
              <label>Assigned to</label>
              <div className="relative border rounded-lg flex items-center px-4 py-3 bg-white cursor-pointer">
                <input
                  className="w-full bg-transparent outline-none cursor-pointer text-black"
                  placeholder="Select contacts to assign"
                  disabled
                />
                <Image
                  src="/arrow_drop_down.svg"
                  alt="dropdown"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-[#D1D1D1] mx-4" />

          {/* Right Side */}
          <div className="flex flex-col gap-5 w-1/2">
            {/* Due Date */}
            <div className="flex flex-col gap-2">
              <label>
                Due Date<span className="text-[#FF8190]">*</span>
              </label>
              <div className="relative border rounded-lg flex items-center px-4 py-3 bg-white">
                <input
                  type="date"
                  className="w-full bg-transparent outline-none"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
                <Image
                  src="/img/event.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                />
              </div>
            </div>

            {/* Priority */}
            <div className="flex flex-col gap-2">
              <span>Prio</span>
              <div className="flex gap-4">
                {(["urgent", "medium", "low"] as Priority[]).map((prio) => {
                  const isActive = priority === prio;
                  const baseStyle =
                    "flex items-center justify-center gap-2 px-4 py-3 rounded-lg w-full text-[20px] font-medium";
                  const activeStyle = {
                    urgent: "bg-[#FF3D00] text-white font-bold",
                    medium: "bg-[#FFA800] text-white font-bold",
                    low: "bg-[#7AE229] text-white font-bold",
                  }[prio];
                  const inactiveStyle = "bg-white text-[#2A3647] shadow-sm";

                  const icon = {
                    urgent: isActive
                      ? "/PrioAltaWhite.svg"
                      : "/PrioAltaRed.svg",
                    medium: isActive
                      ? "/PrioMediaWhite.svg"
                      : "/PrioMediaOrange.svg",
                    low: isActive ? "/PrioBajaWhite.svg" : "/PrioBajaGreen.svg",
                  }[prio];

                  return (
                    <button
                      key={prio}
                      onClick={() => setPriority(prio)}
                      className={`${baseStyle} ${
                        isActive ? activeStyle : inactiveStyle
                      }`}
                    >
                      {prio.charAt(0).toUpperCase() + prio.slice(1)}
                      <Image src={icon} alt={prio} width={20} height={20} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2 relative">
              <label>
                Category<span className="text-[#FF8190]">*</span>
              </label>
              <div
                className="border rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => setShowCategoryDropdown((prev) => !prev)}
              >
                <span>{category || "Select task category"}</span>
                <Image
                  src="/arrow_drop_down.svg"
                  alt="dropdown"
                  width={24}
                  height={24}
                  className={showCategoryDropdown ? "rotate-180" : ""}
                />
              </div>
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow z-10">
                  {["Technical Task", "User Story"].map((cat) => (
                    <div
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                      className="px-4 py-2 hover:bg-[#F0F0F0] cursor-pointer"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Subtasks */}
            <div className="flex flex-col gap-2">
              <label>Subtasks</label>
              <div className="relative flex gap-2 items-center">
                <input
                  type="text"
                  className="border rounded-lg px-4 py-3 w-full"
                  placeholder="Add new subtask"
                  value={subtaskInput}
                  onChange={(e) => setSubtaskInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
                />
                <button
                  onClick={handleAddSubtask}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Image src="/subtasks.svg" alt="Add" width={24} height={24} />
                </button>
              </div>
              <ul className="max-h-24 overflow-auto list-disc pl-5 text-sm text-gray-600">
                {subtasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between items-center text-sm">
          <span>
            <span className="text-[#FF8190]">*</span> This field is required
          </span>
          <div className="flex gap-4 text-[21px] font-bold">
            <button
              onClick={handleClear}
              className="border border-[#647188] text-[#647188] rounded-lg px-6 py-3 hover:bg-gray-200 transition"
            >
              Clear
            </button>
            <button
              onClick={handleCreateTask}
              className="bg-[#2A3647] text-white rounded-lg px-6 py-3 flex items-center gap-2 hover:bg-[#1f2a3a] transition"
            >
              Create Task
              <Image
                src="/check-white.svg"
                alt="check"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        {/* Added Animation */}
        {taskAdded && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-slideInUp z-50">
            <Image
              src="/task_added.svg"
              alt="Task added"
              width={326}
              height={75}
            />
          </div>
        )}
      </div>
    </div>
  );
}
