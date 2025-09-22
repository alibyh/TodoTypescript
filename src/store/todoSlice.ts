import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type Todo, fetchTodos, createTodo, updateTodo, deleteTodo, toggleTodo } from '../api/todos';

export interface TodoState {
  todos: Todo[];
  currentPage: number;
  limit: number;
  totalPages: number;
  total: number;
  filter: "active" | "completed" | "all";
  sortOption: "newest to oldest" | "oldest to newest";
}

const initialState: TodoState = {
  todos: [],
  currentPage: 1,
  limit: 10,
  totalPages: 0,
  total: 0,
  filter: "all",
  sortOption: "newest to oldest",
};
interface FetchTodosPayload {
  page: number;
  limit: number;
  filter: "active" | "completed" | "all";
  sortOption: "newest to oldest" | "oldest to newest";
}

export const fetchTodosAsync = createAsyncThunk(
  'todos/fetchTodos',
  async ({ page, limit, filter, sortOption }: FetchTodosPayload) => {
    const response = await fetchTodos({ page, limit, filter, sortOption });
    return response;
  }
);

export const createTodoAsync = createAsyncThunk(
  'todos/createTodo',
  async (text: string) => {
    const response = await createTodo(text);
    return response;
  }
);

export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, text, completed }: { id: number; text?: string; completed?: boolean }) => {
    const response = await updateTodo(id, text, completed);
    return response;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    await deleteTodo(id);
    return id;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodo',
  async (id: number) => {
    const response = await toggleTodo(id);
    return response;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.currentPage = 1;
    },
    setFilter: (state, action: PayloadAction<"active" | "completed" | "all">) => {
      state.filter = action.payload;
      state.currentPage = 1; 
    },
    setSortOption: (state, action: PayloadAction<"newest to oldest" | "oldest to newest">) => {
      state.sortOption = action.payload;
      state.currentPage = 1;
      state.todos = [...state.todos].sort((a, b) => {
        const da = new Date(a.createdAt).getTime();
        const db = new Date(b.createdAt).getTime();
        return action.payload === "newest to oldest" ? db - da : da - db;
      });
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.todos = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
        state.todos = [...state.todos].sort((a, b) => {
          const da = new Date(a.createdAt).getTime();
          const db = new Date(b.createdAt).getTime();
          return state.sortOption === "newest to oldest" ? db - da : da - db;
        });
      })
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.total += 1;
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
        state.total -= 1;
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
  },
});

export const { setPage, setLimit, setFilter, setSortOption } = todoSlice.actions;
export default todoSlice.reducer;
