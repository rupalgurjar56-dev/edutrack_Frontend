import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage } from "../Utils/LocalStorage";
import { api } from "../Utils/api";

export const fetchStudentsThunk = createAsyncThunk(
    "students/fetchStudents",
    async ({ search = "", category = "", teacherEmail = "" } = {}, { rejectWithValue }) => {
        try {
            const data = await api.fetchStudents(search, category, teacherEmail);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addStudentThunk = createAsyncThunk(
    "students/addStudent",
    async (studentData, { rejectWithValue }) => {
        try {
            const newStudent = await api.addStudent(studentData);
            return newStudent;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateStudentThunk = createAsyncThunk(
    "students/updateStudent",
    async ({ id, ...studentData }, { rejectWithValue }) => {
        try {
            const updatedStudent = await api.updateStudent(id, studentData);
            return updatedStudent;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleStudentStatusThunk = createAsyncThunk(
    "students/toggleStatus",
    async (student, { rejectWithValue }) => {
        try {
            const updatedStudent = await api.toggleStudentStatus(student.id, student.status);
            return updatedStudent;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteStudentThunk = createAsyncThunk(
    "students/deleteStudent",
    async (id, { rejectWithValue }) => {
        try {
            await api.deleteStudent(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    students: getFromLocalStorage("students") || [],
    loading: false,
    error: null
};

export const studentSlice = createSlice({
    name: "Students",
    initialState,
    reducers: {
        clearStudentError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Students
            .addCase(fetchStudentsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudentsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
                setToLocalStorage("students", action.payload);
            })
            .addCase(fetchStudentsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Student
            .addCase(addStudentThunk.fulfilled, (state, action) => {
                state.students.push(action.payload);
                setToLocalStorage("students", state.students);
            })
            .addCase(addStudentThunk.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Update Student
            .addCase(updateStudentThunk.fulfilled, (state, action) => {
                const index = state.students.findIndex(s => String(s.id) === String(action.payload.id));
                if (index !== -1) {
                    state.students[index] = action.payload;
                    setToLocalStorage("students", state.students);
                }
            })
            // Toggle Status
            .addCase(toggleStudentStatusThunk.fulfilled, (state, action) => {
                const index = state.students.findIndex(s => String(s.id) === String(action.payload.id));
                if (index !== -1) {
                    state.students[index] = action.payload;
                    setToLocalStorage("students", state.students);
                }
            })
            // Delete Student
            .addCase(deleteStudentThunk.fulfilled, (state, action) => {
                state.students = state.students.filter(s => String(s.id) !== String(action.payload));
                setToLocalStorage("students", state.students);
            });
    }
});

export const { clearStudentError } = studentSlice.actions;
export default studentSlice.reducer;