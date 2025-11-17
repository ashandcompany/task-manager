// TaskForm.tsx
import { useEffect, useState } from "react";
import type { Task } from "./types";

import ModalWrapper from "./components/ModalWrapper";
import TaskFormFields from "./components/TaskFormFields";

import styles from "./buttons.module.css";

interface TaskFormProps {
    onAdd: (task: Omit<Task, "id">) => void;
    onUpdate: (task: Task) => void;
    editingTask: Task | null;
    onClose: () => void;
}

export default function TaskForm({
    onAdd, onUpdate, editingTask, onClose
}: TaskFormProps) {

    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState<Task["priority"] | "">("");

    useEffect(() => {
        if (editingTask) {
            setDescription(editingTask.description);
            setCategory(editingTask.category);
            setDeadline(editingTask.deadline);
            setPriority(editingTask.priority ?? "");
        }
    }, [editingTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !category || !deadline) return;

        if (editingTask) {
            onUpdate({ ...editingTask, description, category, deadline, priority: priority as Task["priority"] });
        } else {
            onAdd({ description, category, deadline, priority: priority as Task["priority"] });
        }

        setDescription("");
        setCategory("");
        setDeadline("");
        setPriority("");
    };

    const handleCancel = () => {
        setDescription("");
        setCategory("");
        setDeadline("");
        setPriority("");
        onClose();
    };

    return (
        <ModalWrapper onClose={handleCancel}>
            <h2 className="text-lg font-semibold mb-4 text-roseraie-700">
                {editingTask ? "Modifier la tâche" : "Ajouter une tâche"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <TaskFormFields
                    description={description} setDescription={setDescription}
                    category={category} setCategory={setCategory}
                    deadline={deadline} setDeadline={setDeadline}
                    priority={priority} setPriority={setPriority}
                />

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className={styles.cancel}
                    >
                        Annuler
                    </button>

                    <button
                        type="submit"
                        className={styles.submit}
                    >
                        {editingTask ? "Modifier" : "Ajouter"}
                    </button>
                </div>
            </form>
        </ModalWrapper>
    );
}
