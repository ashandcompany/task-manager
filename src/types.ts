export interface Task {
    id: number;
    description: string;
    priority?: "Basse" | "Moyenne" | "Haute";
    category: string;
    deadline: string; // format: "2025-11-14"
}
