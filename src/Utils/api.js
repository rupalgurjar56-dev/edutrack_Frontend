const BASE_URL = "http://localhost:8080/api";

export const api = {
    // Auth APIs
    login: async (email, password) => {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Login failed");
        }
        return data;
    },

    register: async ({ name, email, password, role }) => {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Registration failed");
        }
        return data;
    },

    logout: async () => {
        try {
            await fetch(`${BASE_URL}/auth/logout`, { method: "POST" });
        } catch (e) {
            console.error("Logout request error:", e);
        }
    },

    // Student APIs
    fetchStudents: async (search = "", category = "", teacherEmail = "") => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (category) params.append("category", category);
        if (teacherEmail) params.append("teacherEmail", teacherEmail);

        const res = await fetch(`${BASE_URL}/students?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Failed to fetch students");
        }
        return data;
    },

    addStudent: async (studentData) => {
        const payload = {
            name: studentData.name,
            rollNo: studentData.rollNo,
            class: studentData.class || studentData.studentClass,
            attendance: Number(studentData.attendance),
            marks: Number(studentData.marks),
            teacherEmail: studentData.teacherEmail
        };

        const res = await fetch(`${BASE_URL}/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Failed to add student");
        }
        return data;
    },

    updateStudent: async (id, studentData) => {
        const payload = {
            ...studentData,
            class: studentData.class || studentData.studentClass
        };

        const res = await fetch(`${BASE_URL}/students/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Failed to update student");
        }
        return data;
    },

    toggleStudentStatus: async (id, currentStatus) => {
        const newStatus = currentStatus === "blocked" ? "active" : "blocked";
        const res = await fetch(`${BASE_URL}/students/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Failed to update student status");
        }
        return data;
    },

    deleteStudent: async (id) => {
        const res = await fetch(`${BASE_URL}/students/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Failed to delete student");
        }
        return { id, ...data };
    }
};
