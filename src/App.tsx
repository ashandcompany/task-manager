// App.tsx
import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import type { Task } from "./types";
import "./App.css";
import { Plus, Filter, SortAsc, SortDesc } from "lucide-react";

export default function TaskApp() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

    const addTask = (task: Omit<Task, "id">) => {
        const newTask: Task = { id: Date.now(), ...task };
        setTasks([...tasks, newTask]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
        setEditingTask(null);
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const editTask = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const toggleSort = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');

    const categories = Array.from(new Set(tasks.map(t => t.category)));

    const filteredAndSortedTasks = tasks
        .filter(task => !selectedCategory || task.category === selectedCategory)
        .sort((a, b) => {
            const ta = new Date(a.deadline).getTime();
            const tb = new Date(b.deadline).getTime();
            const aValid = !isNaN(ta);
            const bValid = !isNaN(tb);
            if (!aValid && !bValid) return 0;
            if (!aValid) return 1;
            if (!bValid) return -1;
            return sortOrder === 'asc' ? ta - tb : tb - ta;
        });

    return (
        <div className="bg-roseraie-50 min-h-screen py-8 px-4 sm:px-8 lg:px-12">

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">

                {/* Filtre Catégorie */}
                <div className="relative w-full sm:w-auto">
                    <button 
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                        className="shadow-sm transition bg-white rounded-lg px-3 py-2 w-full sm:w-auto focus:outline-none hover:bg-roseraie-200 flex items-center gap-2"
                        aria-haspopup="true"
                        aria-expanded={isCategoryDropdownOpen}
                    >
                        <Filter width={16}/>
                        <span className="truncate text-roseraie-800">
                            {selectedCategory ? `Catégorie : ${selectedCategory}` : 'Filtrer par catégorie'}
                        </span>
                    </button>

                    {isCategoryDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-roseraie-200">
                            <button
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setIsCategoryDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-roseraie-200 transition"
                            >
                                Toutes les catégories
                            </button>

                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setIsCategoryDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-roseraie-200 transition ${selectedCategory === cat ? 'bg-roseraie-200 font-medium' : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tri */}
                <button
                    onClick={toggleSort}
                    aria-pressed={sortOrder === 'desc'}
                    aria-label={`Trier par date limite (${sortOrder})`}
                    className="shadow-sm transition bg-white rounded-lg px-3 py-2 w-full sm:w-auto focus:outline-none hover:bg-roseraie-200 flex items-center gap-2"
                >
                    {sortOrder === 'asc' ? <SortAsc width={16}/> : <SortDesc width={16}/>}
                    Trier par date limite
                </button>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-end mb-6">
                <h1 className="tracking-wider font-medium text-sm text-roseraie-800">
                    TODO
                </h1>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex justify-center items-center text-white bg-roseraie-500 transition hover:bg-roseraie-600 border border-transparent shadow-xs font-medium leading-5 rounded-lg text-sm px-3 py-2 focus:outline-none"
                >
                    <Plus width={16} className="mr-1"/>Ajouter
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <TaskForm
                    onAdd={(task) => {
                        addTask(task);
                        closeModal();
                    }}
                    onUpdate={(task) => {
                        updateTask(task);
                        closeModal();
                    }}
                    editingTask={editingTask}
                    onClose={closeModal}
                />
            )}

            {/* Liste */}
            <TaskList
                tasks={filteredAndSortedTasks}
                onEdit={editTask}
                onDelete={deleteTask}
            />
        </div>
    );
}
