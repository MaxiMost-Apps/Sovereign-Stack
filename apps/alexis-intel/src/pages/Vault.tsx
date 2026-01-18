import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Lock, Eye } from 'lucide-react';

export const Vault = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">The Institutional Vault</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Secured archives of strategic intelligence and operational protocols.
          Clearance Level: SENTINEL and above.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 p-6 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-primary opacity-80" />
              <Lock className="w-4 h-4 text-gray-500" />
            </div>
            <h3 className="font-serif text-xl text-white mb-2 group-hover:text-primary transition-colors">
              Protocol {100 + i}: Sovereign {['Defense', 'Identity', 'Health', 'Finance', 'Network', 'Mind'][i-1]}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Restricted access. Encrypted contents available for decryption by authorized keys only.
            </p>
            <div className="flex items-center text-xs text-primary/80 gap-2">
               <Eye className="w-3 h-3" />
               <span>READ ONLY</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
