import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';
import { Habit } from "@/types/habit";

// Flattened suggestions
const habitSuggestions = [
    { title: 'Drink 8 glasses of water', icon: '💧', category: 'nutrition', frequency: 'daily', default_type: 'absolute' },
    { title: 'Take supplements', icon: '💊', category: 'nutrition', frequency: 'daily', default_type: 'absolute' },
    { title: 'Sleep 8 hours', icon: '🛏️', category: 'sleep', frequency: 'daily', default_type: 'absolute' },
    { title: 'Morning sunlight', icon: '☀️', category: 'health', frequency: 'daily', default_type: 'absolute' },
    { title: 'Exercise 30 min', icon: '🏋️', category: 'physical', frequency: '5x-week', default_type: 'frequency' },
    { title: 'Walk 10k steps', icon: '👣', category: 'physical', frequency: 'daily', default_type: 'absolute' },
    { title: 'Meditation', icon: '🧘', category: 'mental', frequency: 'daily', default_type: 'absolute' },
    { title: 'Read 10 pages', icon: '📖', category: 'mental', frequency: 'daily', default_type: 'absolute' },
    { title: 'Deep Work', icon: '🧠', category: 'productivity', frequency: 'daily', default_type: 'frequency' },
    { title: 'Journaling', icon: '✍️', category: 'mental', frequency: 'daily', default_type: 'absolute' },
];

interface HabitLibraryProps {
  onAddSuggestion: (habitTemplate: Partial<Habit>) => void;
  onCreateCustom: () => void;
  suggestions?: any[];
}

export function HabitLibrary({ onAddSuggestion, onCreateCustom, suggestions }: HabitLibraryProps) {
  const items = suggestions && suggestions.length > 0 ? suggestions : habitSuggestions;

  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Habit Library</h3>
        <button
            onClick={onCreateCustom}
            className="text-sm text-blue-400 hover:text-blue-300 underline"
        >
            + Create Custom
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((template, idx) => (
          <button
            key={idx}
            onClick={() => onAddSuggestion({
                title: template.title,
                icon: template.icon,
                category: template.category as any,
                frequency_type: template.default_type || 'absolute',
            })}
            className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl border border-gray-700 flex flex-col items-center gap-2 transition-all group"
          >
            <div className="text-2xl group-hover:scale-110 transition-transform">{template.icon}</div>
            <div className="text-sm font-medium text-gray-300 text-center leading-tight">{template.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
