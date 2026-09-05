import { useState, useEffect } from 'react';
import { User, Book, Award, Clock, LayoutDashboard, LogOut } from 'lucide-react';
import DashNav from '../Compo/DashNav';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentsThunk, updateStudentThunk } from '../Store/studentSlice';
import { logoutThunk } from '../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';

export default function StudentDashBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allStudents = useSelector(state => state.students.students);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchStudentsThunk());
  }, [dispatch]);

  const studentRecord = allStudents.find((e) => e.email === user?.email) || {
    id: user?.id,
    name: user?.name || 'Student',
    rollNo: 'N/A',
    class: 'N/A',
    studentClass: 'N/A',
    marks: 0,
    attendance: 0
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: studentRecord.name,
    class: studentRecord.class || studentRecord.studentClass || '',
  });

  useEffect(() => {
    if (studentRecord) {
      setFormData({
        name: studentRecord.name,
        class: studentRecord.class || studentRecord.studentClass || '',
      });
    }
  }, [studentRecord.name, studentRecord.class, studentRecord.studentClass]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (studentRecord.id) {
      await dispatch(updateStudentThunk({
        id: studentRecord.id,
        name: formData.name,
        class: formData.class
      }));
    }
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  const currentClass = studentRecord.class || studentRecord.studentClass || 'N/A';

  return (
    <>
      <DashNav />
      <div className="flex min-h-screen bg-[#0f172a] text-white">

        {/* Sidebar */}
        <div className="w-64 bg-[#020617] text-white flex flex-col justify-between p-5 border-r border-slate-800">

          <div>
            <h2 className="text-xl font-bold mb-8 tracking-wide">Student Panel</h2>

            <div className="flex items-center gap-3 bg-indigo-600 p-3 rounded-xl cursor-pointer shadow-md">
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </div>
          </div>

          <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 transition-all">
            <LogOut size={20} />
            <span>Logout</span>
          </button>

        </div>

        {/* Main */}
        <div className="flex-1 p-6 space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold">
              Welcome,
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                {" "}{studentRecord.name}
              </span>
            </h1>
            <p className="text-slate-400 mt-1">
              Here's your academic overview
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              { icon: <User />, label: "Roll No", value: studentRecord.rollNo || 'N/A', color: "from-indigo-500 to-purple-500" },
              { icon: <Book />, label: "Class", value: currentClass, color: "from-emerald-400 to-teal-500" },
              { icon: <Award />, label: "Marks", value: `${studentRecord.marks || 0} / 100`, color: "from-amber-400 to-orange-500" },
              { icon: <Clock />, label: "Attendance", value: `${studentRecord.attendance || 0}%`, color: "from-blue-400 to-cyan-500" }
            ].map((card, i) => (
              <div key={i} className="bg-[#020617] p-6 rounded-2xl flex items-center gap-5 border border-slate-800 hover:border-indigo-500 transition">

                <div className={`p-4 bg-gradient-to-br ${card.color} text-white rounded-xl`}>
                  {card.icon}
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase">{card.label}</p>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                </div>

              </div>
            ))}

          </div>

          {/* Profile + Attendance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Profile */}
            <div className="bg-[#020617] p-8 rounded-2xl border border-slate-800">

              <div className="flex justify-between mb-6 border-b border-slate-800 pb-4">
                <h2 className="font-bold text-xl">Profile</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-indigo-400 hover:underline"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Name</label>
                    <input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f172a] border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Class</label>
                    <input
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f172a] border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-bold transition-colors">
                    Save Changes
                  </button>

                </form>
              ) : (
                <div className="space-y-4 text-slate-300">
                  <p><b className="text-white">Name:</b> {studentRecord.name}</p>
                  <p><b className="text-white">Class:</b> {currentClass}</p>
                  <p><b className="text-white">Role:</b> {user?.role || 'student'}</p>
                </div>
              )}

            </div>

            {/* Attendance */}
            <div className="bg-[#020617] p-8 rounded-2xl border border-slate-800">

              <h2 className="font-bold text-xl mb-6">Attendance</h2>

              <div className="flex justify-between mb-4">
                <p className="text-4xl font-bold">{studentRecord.attendance || 0}%</p>
                <span className={`px-3 py-1 rounded-lg text-sm flex justify-center items-center ${(studentRecord.attendance || 0) >= 75 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {(studentRecord.attendance || 0) >= 75 ? 'Good' : 'Low'}
                </span>
              </div>

              <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, studentRecord.attendance || 0))}%` }}
                ></div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}