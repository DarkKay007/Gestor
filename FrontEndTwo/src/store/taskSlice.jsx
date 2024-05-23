import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:666/api/tasks');
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (newTask) => {
  const response = await axios.post('http://localhost:666/api/tasks', newTask);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (updatedTask) => {
  const response = await axios.put(`http://localhost:666/api/tasks/${updatedTask.ID}`, updatedTask);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.delete(`http://localhost:666/api/tasks/${taskId}`);
  return taskId;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.ID === action.payload.ID);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.ID !== action.payload);
      });
  },
});

export default taskSlice.reducer;
