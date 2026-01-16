import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import apiClient from '@/lib/apiClient';
import { FirestoreHabit } from '../../../shared/types/firestore';
import { useUser } from '@/context/user-context';
import { ExpertStackModal } from '@/components/dashboard/ExpertStackModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HabitStack {
  id: string;
  name: string;
  habitIds: string[];
  userId?: string;
}

const LibraryPage: React.FC = () => {
  const { user } = useUser();
  const [stacks, setStacks] = useState<HabitStack[]>([]);
  const [newStackName, setNewStackName] = useState('');
  const [availableHabits, setAvailableHabits] = useState<FirestoreHabit[]>([]);
  const [selectedHabitsForNewStack, setSelectedHabitsForNewStack] = useState<Set<string>>(new Set());
  const [editingStack, setEditingStack] = useState<HabitStack | null>(null);
  const [expandedStacks, setExpandedStacks] = useState<Record<string, boolean>>({});
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const [selectedExpertStack, setSelectedExpertStack] = useState<any | null>(null);

  const handleImportHabits = (selectedHabits: string[]) => {
    alert(`Importing the following habits: ${selectedHabits.join(', ')}`);
  };

  useEffect(() => {
    const fetchHabits = async () => {
      if (user) {
        try {
          const response = await apiClient<{ habits: FirestoreHabit[] }>('/habits');
          if (response.success) {
            setAvailableHabits(response.data.habits);
          }
        } catch (error) {
          console.error('Failed to fetch habits:', error);
        }
      }
    };
    fetchHabits();
  }, [user]);

  const handleCreateStack = () => {
    if (!newStackName.trim() || selectedHabitsForNewStack.size === 0) {
      alert('Please provide a stack name and select at least one habit.');
      return;
    }
    const newStack: HabitStack = {
      id: `stack-${Date.now()}`,
      name: newStackName.trim(),
      habitIds: Array.from(selectedHabitsForNewStack),
      userId: user?.uid,
    };
    setStacks([...stacks, newStack]);
    setNewStackName('');
    setSelectedHabitsForNewStack(new Set());
    alert(`Stack "${newStack.name}" created! (Placeholder - not saved to backend)`);
  };

  const toggleHabitForNewStack = (habitId: string) => {
    setSelectedHabitsForNewStack(prev => {
      const newSet = new Set(prev);
      if (newSet.has(habitId)) {
        newSet.delete(habitId);
      } else {
        newSet.add(habitId);
      }
      return newSet;
    });
  };

  const toggleStackExpansion = (stackId: string) => {
    setExpandedStacks(prev => ({ ...prev, [stackId]: !prev[stackId] }));
  };

  const getHabitTitleById = (habitId: string) => {
    return availableHabits.find(h => h.id === habitId)?.title || 'Unknown Habit';
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-neutral-100">Library</h1>
      <Tabs defaultValue="my-stacks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-stacks">My Stacks</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left text-neutral-100">Quick Add Individual Habits</h2>
            {/* Placeholder for individual habits */}
            <p className="text-neutral-400">Individual habits will be listed here.</p>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left text-neutral-100">Expert Habit Stacks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertStacksData.map(expertStack => (
                <Card
                  key={expertStack.id}
                  className="shadow-lg flex flex-col text-neutral-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-400">{expertStack.expertName}</CardTitle>
                    <p className="text-sm text-neutral-400">{expertStack.description}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <h4 className="font-medium mb-2 text-sm text-neutral-300">Example Habits:</h4>
                    <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-neutral-400">
                      {expertStack.habits.map((habit, index) => (
                        <li key={index}>{habit}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        setSelectedExpertStack(expertStack);
                        setIsExpertModalOpen(true);
                      }}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Add to My Dashboard
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="my-stacks">
          <Card className="mb-8 shadow-lg text-neutral-100">
            <CardHeader>
              <CardTitle className="text-2xl text-neutral-100">Create New Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="new-stack-name" className="text-sm font-medium text-neutral-300">Stack Name</Label>
                <Input
                  id="new-stack-name"
                  type="text"
                  value={newStackName}
                  onChange={(e) => setNewStackName(e.target.value)}
                  placeholder="e.g., Morning Routine, Evening Wind-down"
                  className="mt-1 bg-neutral-700 border-neutral-600 text-neutral-100 placeholder:text-neutral-400 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-neutral-300">Select Habits for Stack</Label>
                {availableHabits.length > 0 ? (
                  <div className="mt-2 space-y-2 max-h-60 overflow-y-auto border border-neutral-700 bg-neutral-900/50 p-3 rounded-md">
                    {availableHabits.map(habit => (
                      <div key={habit.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`habit-${habit.id}`}
                          checked={selectedHabitsForNewStack.has(habit.id)}
                          onCheckedChange={() => toggleHabitForNewStack(habit.id)}
                          className="border-neutral-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor={`habit-${habit.id}`} className="font-normal text-sm text-neutral-300">
                          {habit.title}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-400 mt-1">No habits available to add. Create some habits first!</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateStack} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Stack
              </Button>
            </CardFooter>
          </Card>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">Your Stacks</h2>
            {stacks.length > 0 ? (
              <div className="space-y-4">
                {stacks.map(stack => (
                  <Card key={stack.id} className="shadow-md text-neutral-100">
                    <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => toggleStackExpansion(stack.id)}>
                      <CardTitle className="text-xl text-neutral-100">{stack.name}</CardTitle>
                      {expandedStacks[stack.id] ? <ChevronDown className="h-5 w-5 text-neutral-300" /> : <ChevronRight className="h-5 w-5 text-neutral-300" />}
                    </CardHeader>
                    {expandedStacks[stack.id] && (
                      <CardContent>
                        <p className="text-sm text-neutral-400 mb-2">Habits in this stack:</p>
                        <ul className="list-disc list-inside pl-4 space-y-1 text-sm text-neutral-300">
                          {stack.habitIds.map(habitId => (
                            <li key={habitId}>{getHabitTitleById(habitId)}</li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-neutral-400">You haven't created any habit stacks yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <ExpertStackModal
        isOpen={isExpertModalOpen}
        onClose={() => setIsExpertModalOpen(false)}
        stack={selectedExpertStack}
        onImport={handleImportHabits}
      />
    </div>
  );
};

import { expertStacksData } from '@/data/expert-stacks';

export default LibraryPage;
