import React from 'react';


export default function SugarPage() {
  return (

      <div className="max-w-4xl mx-auto py-8">
         <h1 className="text-4xl font-black text-white mb-6">The Dangers of Sugar</h1>
         <p className="text-xl text-gray-400 mb-12">Understanding the hidden impact of sugar on health and performance.</p>

         <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
               <h3 className="text-2xl font-bold text-red-400 mb-4">Cognitive Decline</h3>
               <p className="text-gray-400">Impairs memory, focus, and may increase risk of neurodegenerative disorders.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
               <h3 className="text-2xl font-bold text-orange-400 mb-4">Chronic Inflammation</h3>
               <p className="text-gray-400">Triggers inflammatory responses linked to chronic diseases and pain.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
               <h3 className="text-2xl font-bold text-yellow-400 mb-4">Metabolic Dysfunction</h3>
               <p className="text-gray-400">Disrupts hormones, contributes to insulin resistance and weight gain.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
               <h3 className="text-2xl font-bold text-rose-400 mb-4">Cardiovascular Risk</h3>
               <p className="text-gray-400">Increases blood pressure, triglycerides, and risk of heart disease.</p>
            </div>
         </div>
      </div>

  );
}
