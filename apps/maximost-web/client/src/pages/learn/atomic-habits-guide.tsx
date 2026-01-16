import React from 'react';
import ContentPageLayout from '@/components/layout/ContentPageLayout';

const AtomicHabitsGuidePage: React.FC = () => {
  return (
    <ContentPageLayout title="Atomic Habits Guide">
      <p className="text-lg text-muted-foreground mb-6">
        A practical guide to implementing the principles from James Clear's "Atomic Habits".
      </p>
      {/* Placeholder content */}
      <div className="space-y-4">
        <p>This section will provide a detailed breakdown of the Four Laws of Behavior Change and how to apply them within MaxiMost.</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>1st Law (Cue):</strong> Make It Obvious</li>
          <li><strong>2nd Law (Craving):</strong> Make It Attractive</li>
          <li><strong>3rd Law (Response):</strong> Make It Easy</li>
          <li><strong>4th Law (Reward):</strong> Make It Satisfying</li>
        </ul>
        <p>Content under development. More detailed explanations and practical exercises will be added soon.</p>
      </div>
    </ContentPageLayout>
  );
};

export default AtomicHabitsGuidePage;
