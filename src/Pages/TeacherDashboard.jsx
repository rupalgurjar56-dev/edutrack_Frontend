import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Lock, Unlock, LayoutDashboard, Search } from "lucide-react";
import DashNav from "../Compo/DashNav";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsThunk, addStudentThunk, updateStudentThunk, toggleStudentStatusThunk, deleteStudentThunk } from "../Store/studentSlice";

export default function TeacherDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [editingID, setEditingID] = useState(null);

  const [student, setStudent] = useState({
    name: '', rollNo: '', class: '', attendance: '', marks: ''
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const students = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);

  const teacherEmail = user?.email || "";

  useEffect(() => {
    dispatch(fetchStudentsThunk({ search, category, teacherEmail }));
  }, [dispatch, search, category, teacherEmail]);

  const filterStudents = students;
  const count = filterStudents.length;

  const handleOpenModel = (studentToEdit = null) => {
    if (studentToEdit) {
      setEditingID(studentToEdit.id);
      setStudent({
        name: studentToEdit.name || '',
        rollNo: studentToEdit.rollNo || '',
        class: studentToEdit.class || studentToEdit.studentClass || '',
        attendance: studentToEdit.attendance || 0,
        marks: studentToEdit.marks || 0
      });
    } else {
      setEditingID(null);
      setStudent({
        name: '', rollNo: '', class: '', attendance: '', marks: ''
      });
    }
    setIsModalOpen(true);
  };

  async function handleStudentSubmit(e) {
    e.preventDefault();

    if (editingID) {
      // Update student
      try {
        await dispatch(updateStudentThunk({ id: editingID, ...student, teacherEmail })).unwrap();
        setIsModalOpen(false);
      } catch (error) {
        alert(error);
      }
    } else {
      // Add new student via Spring Boot linked to current teacher
      try {
        const createdStudent = await dispatch(addStudentThunk({ ...student, teacherEmail })).unwrap();
        setCredentials({ email: createdStudent.email, password: createdStudent.password });
        setIsModalOpen(false);
        setShowSuccess(true);
        setStudent({
          name: '', rollNo: '', class: '', attendance: '', marks: ''
        });
      } catch (error) {
        alert(error);
      }
    }
  }

  const handleToggleStatus = (s) => {
    dispatch(toggleStudentStatusThunk(s));
  };

  const handleDeleteStudent = (s) => {
    if (confirm("Are you sure to delete this student and their records?")) {
      dispatch(deleteStudentThunk(s.id));
    }
  };

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
          
          <div className="mt-auto pt-4 border-t border-slate-700 text-xs text-slate-400">
            Logged in as: <br />
            <span className="text-white font-medium">{user?.email}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="w-full mb-4">
            {/* Search Box */}
            <div className="relative w-72 flex gap-4 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search student..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <div>
                <select 
                  className="px-3 py-2 border rounded-lg bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="12th">Class-12th</option>
                  <option value="11th">Class-11th</option>
                  <option value="10th">Class-10th</option>
                </select>
              </div>
            </div>
          </div>

          <h2 className="text-2xl text-black font-semibold">Your Students ({count})</h2>

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>

            <button
              onClick={() => handleOpenModel()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
            >
              <Plus size={18} />
              Add Student
            </button>
          </div>

          {/* Table */}
          <div className="bg-white shadow rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500 font-medium">Loading your assigned students...</div>
            ) : filterStudents.length === 0 ? (
              <div className="p-8 text-center text-gray-500 font-medium">You have no assigned students yet. Click "Add Student" to create your first student record!</div>
            ) : (
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
                  {filterStudents.map((s) => (
                    <tr key={s.id} className="border-t text-center hover:bg-gray-50">
                      <td className="p-3 font-medium">{s.rollNo}</td>
                      <td className="p-3 relative group">
                        <span className="cursor-pointer text-indigo-600 font-semibold hover:underline">
                          {s.name}
                        </span>

                        {/* Hover Box */}
                        <div className="absolute bottom-[85%] left-1/2 -translate-x-1/2
                          mt-2 w-52 bg-gray-900 text-white text-xs rounded-md p-3 shadow-xl
                          opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto
                          z-50 text-left">
                          <p className="select-text"><strong>Email:</strong> {s.email}</p>
                          <p className="select-text"><strong>Password:</strong> {s.password}</p>
                        </div>
                      </td>
                      <td className="p-3">{s.class || s.studentClass}</td>

                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            (s.attendance || 0) < 75
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {s.attendance}%
                        </span>
                      </td>

                      <td className="p-3 font-medium">{s.marks}</td>

                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                            s.status === "blocked"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>

                      <td className="p-3 space-x-3">
                        <button
                          title="Toggle Status"
                          className="text-amber-600 hover:text-amber-800"
                          onClick={() => handleToggleStatus(s)}
                        >
                          {s.status === "blocked" ? (
                            <Unlock size={18} />
                          ) : (
                            <Lock size={18} />
                          )}
                        </button>

                        <button
                          title="Edit Student"
                          onClick={() => handleOpenModel(s)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 size={18} />
                        </button>

                        <button
                          title="Delete Student"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteStudent(s)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Form Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h2 className="font-bold text-lg">{editingID ? "Edit Student" : "Add Student"}</h2>

                  <button onClick={() => setIsModalOpen(false)}>
                    <X size={20} />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleStudentSubmit}>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
                    <input required placeholder="Student Full Name" className="w-full border p-2.5 rounded-lg" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Roll No</label>
                    <input required placeholder="Roll Number" className="w-full border p-2.5 rounded-lg" value={student.rollNo} onChange={(e) => setStudent({ ...student, rollNo: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Class</label>
                    <input required placeholder="Class (e.g. 12th)" className="w-full border p-2.5 rounded-lg" value={student.class} onChange={(e) => setStudent({ ...student, class: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Attendance (%)</label>
                      <input required type="number" min="0" max="100" placeholder="0-100" className="w-full border p-2.5 rounded-lg" value={student.attendance} onChange={(e) => setStudent({ ...student, attendance: Number(e.target.value) })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Marks (/100)</label>
                      <input required type="number" min="0" max="100" placeholder="0-100" className="w-full border p-2.5 rounded-lg" value={student.marks} onChange={(e) => setStudent({ ...student, marks: Number(e.target.value) })} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition-colors mt-2"
                  >
                    {editingID ? "Save Changes" : "Create Student"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Success Modal */}
          {showSuccess && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center shadow-2xl">
                <h2 className="text-xl font-bold mb-2 text-green-600">
                  Student Created!
                </h2>

                <p className="text-gray-500 mb-4 text-sm">
                  Student login credentials generated by Spring Boot:
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left text-sm space-y-1">
                  <p><strong>Email:</strong> <span className="select-all text-indigo-600">{credentials?.email}</span></p>
                  <p><strong>Password:</strong> <span className="select-all text-indigo-600">{credentials?.password}</span></p>
                </div>

                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-bold"
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