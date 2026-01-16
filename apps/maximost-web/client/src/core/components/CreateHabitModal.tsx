import { X } from 'lucide-react';
import HabitForm from './HabitForm';

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function CreateHabitModal({ isOpen, onClose, onSubmit, initialData }: CreateHabitModalProps) {
  if (!isOpen) return null;

  const mode = initialData?.id ? 'edit' : (initialData?.title ? 'library' : 'create');

  const getHeaderTitle = () => {
      if (mode === 'edit') return 'EDIT HABIT';
      if (mode === 'library') return 'INITIALIZE HABIT';
      return 'NEW HABIT';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {getHeaderTitle()}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {mode === 'edit' ? 'Refine your habit parameters.' : 'Architect your new standard.'}
          </p>

          <HabitForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
            mode={mode}
          />
        </div>
      </div>
    </div>
  );
}
