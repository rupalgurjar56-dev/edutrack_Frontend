import { useState } from "react";
import { Plus, Edit2, Trash2, X, Lock, Unlock, LayoutDashboard } from "lucide-react";
import DashNav from "../components/Dashnav";
 
export default function TeacherDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [credentials, setCredentials] = useState(null);
 
 
 
  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      class: "10-A",
      roll_no: "101",
      attendance: 82,
      marks: 76,
      status: "active",
    },
    {
      id: 2,
      name: "Priya Singh",
      class: "10-B",
      roll_no: "102",
      attendance: 65,
      marks: 88,
      status: "blocked",
    },
  ];
 
  return (
    <>
      <DashNav />
 
      <div className="flex min-h-screen bg-gray-100">
 
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 text-white flex flex-col p-5">
          <h2 className="text-xl font-bold mb-8">Teacher Panel</h2>
 
          <div className="flex items-center gap-3 bg-indigo-800 p-3 rounded-lg cursor-pointer">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </div>
        </div>
 
        {/* Main */}
        <div className="flex-1 p-6 space-y-6">
 
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
 
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex gap-2"
            >
              <Plus size={18} />
              Add Student
            </button>
          </div>
 
          {/* Table */}
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3">Marks</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
 
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-t text-center">
                    <td className="p-3">{s.roll_no}</td>
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.class}</td>
 
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${s.attendance < 75
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                          }`}
                      >
                        {s.attendance}%
                      </span>
                    </td>
 
                    <td className="p-3">{s.marks}</td>
 
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded ${s.status === "blocked"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                          }`}
                      >
                        {s.status}
                      </span>
                    </td>
 
                    <td className="p-3 space-x-2">
                      <button className="text-yellow-600">
                        {s.status === "blocked" ? (
                          <Unlock size={16} />
                        ) : (
                          <Lock size={16} />
                        )}
                      </button>
 
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600"
                      >
                        <Edit2 size={16} />
                      </button>
 
                      <button className="text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
 
          {/* Form Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
 
              <div className="bg-white p-6 rounded-xl w-full max-w-md">
 
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Add Student</h2>
 
                  <button onClick={() => setIsModalOpen(false)}>
                    <X />
                  </button>
                </div>
 
                <form className="space-y-3">
                  <input placeholder="Name" className="w-full border p-2 rounded" />
                  <input placeholder="Roll No" className="w-full border p-2 rounded" />
                  <input placeholder="Class" className="w-full border p-2 rounded" />
                  <input type="number" placeholder="Attendance" className="w-full border p-2 rounded" />
                  <input type="number" placeholder="Marks" className="w-full border p-2 rounded" />
 
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
 
                      const email = "student101@school.com";
                      const password = "abc123";
 
                      setCredentials({ email, password });
                      setShowSuccess(true);
                    }}
                    className="w-full bg-indigo-600 text-white py-2 rounded"
                  >
                    Save
                  </button>
                </form>
 
              </div>
            </div>
          )}
 
          {/* Success Modal */}
          {showSuccess && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50">
 
              <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center shadow-lg">
 
                <h2 className="text-xl font-bold mb-2 text-green-600">
                  Student Created!
                </h2>
 
                <p className="text-gray-500 mb-4 text-sm">
                  Share these credentials with the student
                </p>
 
                <div className="bg-gray-100 p-4 rounded mb-4 text-left text-sm">
                  <p><strong>Email:</strong> {credentials?.email}</p>
                  <p><strong>Password:</strong> {credentials?.password}</p>
                </div>
 
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full bg-indigo-600 text-white py-2 rounded"
                >
                  Done
                </button>
 
              </div>
            </div>
          )}
 
        </div>
      </div>
    </>
  );
}