import React, { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useHabit } from '../context/HabitContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { habits, loading: habitLoading, fetchHabits } = useHabit();
  const navigate = useNavigate();

  // 1. Protect the route: Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // 2. Show loading state while checking auth or fetching data
  if (authLoading || habitLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Loading MaxiMost OS...</h2>
          <p className="text-gray-400 text-sm">Synchronizing your data</p>
        </div>
      </div>
    );
  }

  // 3. Render the Dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-500">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.email}</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={() => void(0)} // Replace with your modal logic
        >
          + New Habit
        </button>
      </header>

      {/* 4. Handle Empty State vs Data State */}
      {!habits || habits.length === 0 ? (
        <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No Habits Found</h3>
          <p className="text-gray-500 mb-6">Discipline is built one habit at a time.</p>
          <button
             className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
             onClick={() => void(0)}
          >
            Forge Your First Habit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <div key={habit.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-bold mb-2">{habit.title}</h3>
              <p className="text-sm text-gray-400 mb-4">
                Created: {new Date(habit.created_at).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">Daily</span>
                {/* Add completion buttons here later */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;