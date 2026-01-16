import { useState } from 'react';
import { supabase } from '../supabase';

export default function HabitActionMenu({ habit, onEdit, onDelete, isOpen, onOpenChange }) {
  // If isOpen/onOpenChange are provided, use them (Controlled). Else use internal state (Uncontrolled).
  const [internalOpen, setInternalOpen] = useState(false);
  const isMenuOpen = isOpen !== undefined ? isOpen : internalOpen;
  const setMenuOpen = onOpenChange || setInternalOpen;

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await supabase.from('habits').delete().eq('id', habit.id);
    onDelete();
  };

  return (
    <div className="relative">
      <button
        onPointerDown={e => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); setMenuOpen(!isMenuOpen); setConfirmDelete(false); }}
        className="p-2 text-gray-500 hover:text-white transition-colors"
      >
        ⋮
      </button>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-[90]" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-40 bg-[#0B0C10] border border-white/10 rounded-lg shadow-2xl z-[100] overflow-hidden py-1">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(habit); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm text-blue-500 hover:bg-white/5 font-bold"
            >
              Edit Details
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                 confirmDelete ? 'bg-red-600 text-white font-bold' : 'text-red-500 hover:bg-red-500/10 font-bold'
              }`}
            >
              {confirmDelete ? 'Tap to Confirm' : 'Delete Habit'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
