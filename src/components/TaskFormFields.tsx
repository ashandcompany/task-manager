// TaskFormFields.tsx
import type { Task } from "../types";

interface FieldsProps {
    description: string;
    setDescription: (v: string) => void;

    category: string;
    setCategory: (v: string) => void;

    deadline: string;
    setDeadline: (v: string) => void;

    priority: Task["priority"] | "";
    setPriority: (v: Task["priority"] | "") => void;
}

export default function TaskFormFields({
    description, setDescription,
    category, setCategory,
    deadline, setDeadline,
    priority, setPriority,
}: FieldsProps) {

    return (
        <div className="flex flex-col gap-4 text-sm">

            {/* Description */}
            <div className="flex flex-col gap-1.5">
                <label className="font-medium text-roseraie-800">Description</label>
                <input
                    type="text"
                    placeholder="Entrer la description..."
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-roseraie-200 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-roseraie-400"
                />
            </div>

            {/* Priorité */}
            <div className="flex flex-col gap-1.5">
                <label className="font-medium text-roseraie-800">Priorité</label>
                <select
                    value={priority}
                    required
                    onChange={(e) => setPriority(e.target.value as Task["priority"])}
                    className="border border-roseraie-200 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-roseraie-400"
                >
                    <option value="" disabled>Choisir la priorité</option>
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Haute">Haute</option>
                </select>
            </div>
            
            <div className="flex gap-4">

            {/* Catégorie */}
            <div className="flex flex-col gap-1.5 w-full">
                <label className="font-medium text-roseraie-800">Catégorie</label>
                <select
                    value={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-roseraie-200 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-roseraie-400"
                >
                    <option value="" disabled>Choisir la catégorie</option>
                    <option value="Travail">Travail</option>
                    <option value="Personnel">Personnel</option>
                    <option value="Urgent">Urgent</option>
                </select>
            </div>

            {/* Date limite */}
            <div className="flex flex-col gap-1.5 w-full">
                <label className="font-medium text-roseraie-800">Date limite</label>
                <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="border border-roseraie-200 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-roseraie-400"
                />
            </div>

            </div>

        </div>
    );
}
