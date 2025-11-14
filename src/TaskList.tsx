import type { Task } from "./types";
import { useEffect, useRef, useState } from "react";
import { Clock, EllipsisVertical } from "lucide-react";

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
    const [openId, setOpenId] = useState<number | null>(null);
    const menuContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            const target = e.target as Node | null;
            if (menuContainerRef.current && target && !menuContainerRef.current.contains(target)) {
                setOpenId(null);
            }
        }

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpenId(null);
        }

        document.addEventListener("mousedown", onClickOutside);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return (
        <ul className="w-full">
            {tasks.length === 0 ? (
                <li className="w-full">
                    <div className="flex items-center justify-center bg-white py-6 px-6 rounded-lg shadow-md mb-4 text-roseraie-600">
                        Aucune tâche à afficher
                    </div>
                </li>
            ) : (
                tasks.map((task) => (
                    <li key={task.id} className="w-full">
                        <div
                            className="
                                flex flex-col sm:flex-row sm:items-center justify-between 
                                bg-white py-4 px-4 sm:px-6 rounded-lg shadow-md mb-4 gap-3
                            "
                        >
                            <div className="flex flex-col gap-0 w-full sm:w-auto">
                                <p className="text-base sm:text-lg font-medium line-clamp-1 break-all text-roseraie-800">
                                    {task.description}
                                </p>
                                <span className="text-xs sm:text-sm text-roseraie-700">{task.category}</span>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                {task.priority && (
                                    <div
                                        className={`
                                            text-xs sm:text-sm font-medium px-2 py-1 rounded-md inline-block w-fit
                                            ${task.priority === "Haute"
                                                ? "bg-roseraie-500 text-white"
                                                : task.priority === "Moyenne"
                                                    ? "bg-roseraie-300 text-roseraie-800"
                                                    : "bg-roseraie-100 text-roseraie-800"
                                            }
                                        `}
                                    >
                                        {task.priority}
                                    </div>
                                )}
                                <small className="flex items-center gap-1 text-roseraie-700">
                                    {(() => {
                                        const d = new Date(task.deadline);
                                        if (isNaN(d.getTime())) return "Date invalide";
                                        const diff = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                                        if (diff > 0)
                                            return (
                                                <span className="flex gap-1 items-center">
                                                    <Clock width={14} />{" "}
                                                    <div className="font-medium text-xs sm:text-sm">
                                                        {diff} jour{diff > 1 ? "s" : ""} restants
                                                    </div>
                                                </span>
                                            );
                                        if (diff === 0) return "Dernier jour";
                                        return "Expiré";
                                    })()}
                                </small>

                                <div
                                    ref={(el) => {
                                        if (openId === task.id) menuContainerRef.current = el;
                                    }}
                                    className="relative"
                                >
                                    <button
                                        aria-haspopup="true"
                                        aria-expanded={openId === task.id}
                                        aria-label="Ouvrir le menu"
                                        className="p-1 rounded-full hover:bg-roseraie-200 transition"
                                        onClick={() => setOpenId((prev) => (prev === task.id ? null : task.id))}
                                    >
                                        <EllipsisVertical width={21} />
                                    </button>

                                    {openId === task.id && (
                                        <div
                                            className="
                                                absolute right-0 mt-2 w-40 bg-roseraie-100 rounded-md 
                                                shadow-lg z-10 border border-roseraie-200
                                            "
                                            role="menu"
                                            aria-label="Actions"
                                        >
                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-roseraie-200 transition"
                                                role="menuitem"
                                                onClick={() => {
                                                    setOpenId(null);
                                                    onEdit(task);
                                                }}
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-roseraie-200 text-roseraie-800 transition"
                                                role="menuitem"
                                                onClick={() => {
                                                    setOpenId(null);
                                                    onDelete(task.id);
                                                }}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </li>
                ))
            )}
        </ul>
    );
}
