import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent, GlassCardFooter } from '@/components/glass/GlassCard';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parseISO, isValid, startOfDay } from 'date-fns';
import { useJournal } from '@/context/JournalProvider';
import { JournalEntry } from '@/types/journal'; // Assuming you have a type definition

const JournalPage: React.FC = () => {
  const { entries, addEntry, updateEntry, fetchEntries } = useJournal();
  const [selectedDate, setSelectedDate] = useState<Date>(startOfDay(new Date()));
  const [currentEntry, setCurrentEntry] = useState<string>('');
  const [isLocked, setIsLocked] = useState<boolean>(false);

  useEffect(() => {
    // Fetch entries when the component mounts
    fetchEntries();
  }, [fetchEntries]);

  useEffect(() => {
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const entry = entries.find(e => e.date === dateString);

    // Logic: If entry is missing and date is > 7 days ago, is it locked?
    // Note: The API returns filtered list. If we don't have it, we don't know if it exists or was filtered.
    // But for UX "psychological itch", we can show lock on ANY past date > 7 days if no entry is found locally (assuming we fetched all).
    // Better: We should check user tier from context, but for now let's infer "Lock" if date > 7 days and no entry.
    // However, user might just not have written that day.
    // The requirement: "Do not delete data; simply 'blur/lock' it in the UI."
    // If the API withholds it, we won't see it.
    // Let's assume if it's older than 7 days, we show a "History Locked" state if no content.

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    if (selectedDate < startOfDay(sevenDaysAgo) && !entry) {
        setIsLocked(true);
        setCurrentEntry('');
    } else {
        setIsLocked(false);
        setCurrentEntry(entry ? entry.content : '');
    }

  }, [selectedDate, entries]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(startOfDay(date));
    }
  };

  const handleSaveEntry = () => {
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const existingEntry = entries.find(e => e.date === dateString);

    const entryData: Omit<JournalEntry, 'id'> = {
      date: dateString,
      content: currentEntry,
      mood: 'neutral', // Default mood
      tags: [],       // Default tags
    };

    if (existingEntry) {
      updateEntry({ ...existingEntry, content: currentEntry });
    } else {
      addEntry(entryData);
    }
  };

  const entryDates = entries.map(e => startOfDay(parseISO(e.date)));

  return (
    <div className="container mx-auto py-8 grid md:grid-cols-3 gap-8">
      {/* Left side: Calendar View */}
      <div className="md:col-span-1">
        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle>Your Journal Calendar</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              modifiers={{ hasEntry: entryDates }}
              modifiersStyles={{
                hasEntry: {
                  border: "2px solid",
                  borderColor: "hsl(var(--primary))",
                  borderRadius: '50%',
                },
              }}
              className="p-0 bg-white/5 border-white/20 text-white rounded-md"
            />
            <p className="text-sm text-muted-foreground mt-4">
              Select a date to view or add an entry. Dates with entries are circled.
            </p>
          </GlassCardContent>
        </GlassCard>
      </div>

      {/* Right side: Entry Editor */}
      <div className="md:col-span-2">
        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle className="text-2xl">
              Journal Entry for {format(selectedDate, 'MMMM d, yyyy')}
            </GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            {isLocked ? (
                <div className="flex flex-col items-center justify-center h-[400px] border border-white/10 rounded-md bg-black/20 backdrop-blur-sm">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="text-xl font-bold text-white mb-2">History Locked</h3>
                    <p className="text-slate-400 max-w-md text-center mb-6">
                        Journal entries older than 7 days are archived for Vanguard members only.
                        Upgrade to unlock your full history and analyze your long-term patterns.
                    </p>
                    <Button className="bg-amber-600 hover:bg-amber-500 text-white font-bold" onClick={() => window.location.href = '/pricing'}>
                        Upgrade to Vanguard
                    </Button>
                </div>
            ) : (
                <Textarea
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  placeholder={`What's on your mind for ${format(selectedDate, 'MMMM d')}?`}
                  rows={15}
                  className="w-full text-base leading-relaxed p-3 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:ring-offset-0 focus:ring-primary/50 rounded-md"
                />
            )}
          </GlassCardContent>
          <GlassCardFooter className="flex justify-end">
            {!isLocked && (
                <Button onClick={handleSaveEntry} className="bg-primary hover:bg-primary/90">
                  {entries.some(e => e.date === format(selectedDate, 'yyyy-MM-dd')) ? 'Update Entry' : 'Save Entry'}
                </Button>
            )}
          </GlassCardFooter>
        </GlassCard>
      </div>
    </div>
  );
};

export default JournalPage;
