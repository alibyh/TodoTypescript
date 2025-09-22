# API Integration with Redux Toolkit - Tutorial

## Overview
This guide explains how we transformed your local storage-based Todo app into a fully API-integrated application using Redux Toolkit for state management. We'll focus on the **fetching todos** functionality as the main example.

## What We Changed

### 1. **API Layer** (`src/api/todos.ts`)

**Before:** Your app used `localStorage` to store todos locally.

**After:** We created a dedicated API layer that communicates with a server.

```typescript
// New API function for fetching todos
export const fetchTodos = async ({ page, limit, filter }: FetchTodosPayload): Promise<TodosResponse> => {
  const response = await axios.get(`${API_URL}/todos?page=${page}&limit=${limit}&filter=${filter}`);
  return response.data;
};
```

**Key Concepts:**
- **Axios**: HTTP client library for making API requests
- **TypeScript Interfaces**: We defined `Todo` and `TodosResponse` interfaces to ensure type safety
- **Async/Await**: Modern JavaScript syntax for handling asynchronous operations
- **URL Parameters**: The API accepts `page`, `limit`, and `filter` parameters for pagination and filtering

### 2. **Redux Store** (`src/store/todoSlice.ts`)

**Before:** Your app used React's `useState` for local state management.

**After:** We implemented Redux Toolkit for centralized state management.

#### State Structure
```typescript
export interface TodoState {
  todos: Todo[];           // Array of todos from API
  loading: boolean;        // Loading state indicator
  error: string | null;    // Error message if API fails
  currentPage: number;     // Current page number
  limit: number;          // Items per page
  totalPages: number;     // Total number of pages
  total: number;          // Total number of todos
  filter: "active" | "completed" | "all"; // Current filter
}
```

#### Async Thunk for Fetching Todos
```typescript
export const fetchTodosAsync = createAsyncThunk(
  'todos/fetchTodos',
  async ({ page, limit, filter }: FetchTodosPayload) => {
    const response = await fetchTodos({ page, limit, filter });
    return response;
  }
);
```

**What is `createAsyncThunk`?**
- It's a Redux Toolkit function that handles asynchronous operations
- It automatically creates three action types: `pending`, `fulfilled`, and `rejected`
- It manages loading states and error handling for you

#### Reducer Logic for Fetching
```typescript
.addCase(fetchTodosAsync.pending, (state) => {
  state.loading = true;      // Show loading spinner
  state.error = null;        // Clear any previous errors
})
.addCase(fetchTodosAsync.fulfilled, (state, action) => {
  state.loading = false;     // Hide loading spinner
  state.todos = action.payload.data;        // Update todos array
  state.total = action.payload.total;       // Update total count
  state.totalPages = action.payload.totalPages; // Update total pages
  state.currentPage = action.payload.page;  // Update current page
  state.limit = action.payload.limit;       // Update items per page
})
.addCase(fetchTodosAsync.rejected, (state, action) => {
  state.loading = false;     // Hide loading spinner
  state.error = action.error.message || 'Failed to fetch todos'; // Set error message
})
```

### 3. **Component Integration** (`src/App.tsx`)

**Before:** Your app loaded todos from localStorage on component mount.

**After:** Your app dispatches Redux actions to fetch todos from the API.

```typescript
// Redux hooks
const dispatch = useAppDispatch();
const { todos, loading, error, currentPage, limit, filter } = useAppSelector((state) => state.todos);

// Fetch todos when dependencies change
useEffect(() => {
  dispatch(fetchTodosAsync({ page: currentPage, limit, filter }));
}, [dispatch, currentPage, limit, filter]);
```

**Key Changes:**
- **`useAppDispatch`**: Hook to dispatch Redux actions
- **`useAppSelector`**: Hook to access Redux state
- **`useEffect`**: Automatically refetches todos when page, limit, or filter changes

### 4. **Loading and Error States**

**Before:** No loading or error handling.

**After:** Proper loading and error states with user feedback.

```typescript
if (loading) {
  return <Loading themColorState={themColorState} />;
}

if (error) {
  return <Error error={error} themColorState={themColorState} onRetry={handleRetry} />;
}
```

## How Fetching Todos Works (Step by Step)

1. **User Action**: User changes page, filter, or items per page
2. **State Update**: Redux action updates the state (e.g., `setPage(2)`)
3. **Effect Trigger**: `useEffect` detects state change and dispatches `fetchTodosAsync`
4. **API Call**: Redux Toolkit calls the API function with current parameters
5. **Loading State**: `loading` becomes `true`, showing loading spinner
6. **API Response**: Server returns todos data
7. **State Update**: Redux updates state with new todos and pagination info
8. **UI Update**: Component re-renders with new data

## Benefits of This Approach

### 1. **Separation of Concerns**
- API logic is separate from UI logic
- State management is centralized
- Components focus only on presentation

### 2. **Better User Experience**
- Loading states prevent confusion
- Error handling with retry functionality
- Automatic data refresh when parameters change

### 3. **Scalability**
- Easy to add new API endpoints
- Consistent error handling across the app
- Predictable state updates

### 4. **Type Safety**
- TypeScript ensures data consistency
- Compile-time error checking
- Better IDE support and autocomplete

## Key Redux Concepts

### **Store**
The central repository of your application's state.

### **Actions**
Plain JavaScript objects that describe what happened.

### **Reducers**
Pure functions that specify how the state changes in response to actions.

### **Async Thunks**
Special Redux functions that handle asynchronous operations like API calls.

### **Selectors**
Functions that extract specific pieces of state from the store.

## Next Steps

To understand the complete implementation:

1. **Study the API layer** (`src/api/todos.ts`) to see all CRUD operations
2. **Examine the Redux slice** (`src/store/todoSlice.ts`) to understand state management
3. **Look at the pagination component** (`src/components/Pagination/Pagination.tsx`) to see how UI triggers state changes
4. **Review the main App component** (`src/App.tsx`) to see how everything connects

This architecture makes your app more maintainable, testable, and scalable while providing a better user experience.
