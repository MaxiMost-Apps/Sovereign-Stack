import React from 'react';


export default function SupplementsPage() {
  return (

      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold text-white mb-6">Top 10 Supplements</h1>
        <p className="text-gray-400 mb-8">Highest-ROI supplements backed by scientific research.</p>

        <div className="space-y-6">
           {[
             { name: "Omega-3 (EPA/DHA)", benefit: "Reduces inflammation, supports brain health.", dose: "2-4g daily" },
             { name: "Vitamin D3", benefit: "Immune support, bone health, mood regulation.", dose: "5,000 IU daily" },
             { name: "Magnesium", benefit: "Sleep quality, muscle relaxation, stress reduction.", dose: "400mg before bed" },
             { name: "Creatine Monohydrate", benefit: "Muscle power, cognitive function.", dose: "5g daily" },
             { name: "Whey Protein", benefit: "Muscle repair, convenient protein source.", dose: "20-40g post-workout" }
           ].map((s, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex justify-between items-center">
                 <div>
                    <h3 className="font-bold text-white text-lg">{s.name}</h3>
                    <p className="text-gray-400 text-sm">{s.benefit}</p>
                 </div>
                 <div className="text-right">
                    <span className="text-xs bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">{s.dose}</span>
                 </div>
              </div>
           ))}
        </div>
      </div>

  );
}
