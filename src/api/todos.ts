import axios from 'axios';

const API_URL = 'http://localhost:3001';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface TodosResponse {
  data: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
interface FetchTodosPayload {
  page: number;
  limit: number;
  filter: "active" | "completed" | "all";
  sortOption?: "newest to oldest" | "oldest to newest";
}

export const fetchTodos = async ({ page, limit, filter, sortOption }: FetchTodosPayload): Promise<TodosResponse> => {
  const response = await axios.get(`${API_URL}/todos?page=${page}&limit=${limit}&filter=${filter}&sort=${sortOption}`);
  return response.data;
};

export const createTodo = async (text: string): Promise<Todo> => {
  const response = await axios.post(`${API_URL}/todos`, { text });
  return response.data;
};

export const updateTodo = async (id: number, text?: string, completed?: boolean): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/todos/${id}`, { text, completed });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/todos/${id}`);
};

export const toggleTodo = async (id: number): Promise<Todo> => {
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
  return response.data;
};
