import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { Generation } from '../../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  generation?: Generation;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, generation = 'women' }) => {
  const [activeTab, setActiveTab] = useState<Generation>(generation);
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const womenSizes = [
    { size: 'XS', bust: unit === 'inches' ? '32' : '81', waist: unit === 'inches' ? '25' : '63.5', hip: unit === 'inches' ? '35' : '89' },
    { size: 'S', bust: unit === 'inches' ? '34' : '86', waist: unit === 'inches' ? '27' : '68.5', hip: unit === 'inches' ? '37' : '94' },
    { size: 'M', bust: unit === 'inches' ? '36' : '91.5', waist: unit === 'inches' ? '29' : '73.5', hip: unit === 'inches' ? '39' : '99' },
    { size: 'L', bust: unit === 'inches' ? '38' : '96.5', waist: unit === 'inches' ? '31' : '78.5', hip: unit === 'inches' ? '41' : '104' },
    { size: 'XL', bust: unit === 'inches' ? '41' : '104', waist: unit === 'inches' ? '34' : '86.5', hip: unit === 'inches' ? '44' : '112' },
    { size: 'XXL', bust: unit === 'inches' ? '44' : '112', waist: unit === 'inches' ? '37' : '94', hip: unit === 'inches' ? '47' : '119' },
  ];

  const menSizes = [
    { size: 'S', chest: unit === 'inches' ? '38' : '96', waist: unit === 'inches' ? '30' : '76', shoulder: unit === 'inches' ? '17.5' : '44.5' },
    { size: 'M', chest: unit === 'inches' ? '40' : '101.5', waist: unit === 'inches' ? '32' : '81', shoulder: unit === 'inches' ? '18' : '45.7' },
    { size: 'L', chest: unit === 'inches' ? '42' : '106.5', waist: unit === 'inches' ? '34' : '86', shoulder: unit === 'inches' ? '18.5' : '47' },
    { size: 'XL', chest: unit === 'inches' ? '44' : '112', waist: unit === 'inches' ? '36' : '91.5', shoulder: unit === 'inches' ? '19' : '48.2' },
    { size: 'XXL', chest: unit === 'inches' ? '46' : '117', waist: unit === 'inches' ? '38' : '96.5', shoulder: unit === 'inches' ? '19.5' : '49.5' },
  ];

  const kidsSizes = [
    { age: '2-3 Y', height: unit === 'inches' ? '36-39' : '92-98', chest: unit === 'inches' ? '21' : '54', waist: unit === 'inches' ? '20' : '51' },
    { age: '4-5 Y', height: unit === 'inches' ? '41-43' : '104-110', chest: unit === 'inches' ? '23' : '58', waist: unit === 'inches' ? '21.5' : '55' },
    { age: '6-7 Y', height: unit === 'inches' ? '46-48' : '116-122', chest: unit === 'inches' ? '25' : '63', waist: unit === 'inches' ? '23' : '58' },
    { age: '8-9 Y', height: unit === 'inches' ? '50-53' : '128-134', chest: unit === 'inches' ? '27' : '68', waist: unit === 'inches' ? '24' : '61' },
    { age: '10-12 Y', height: unit === 'inches' ? '55-60' : '140-152', chest: unit === 'inches' ? '30' : '76', waist: unit === 'inches' ? '26' : '66' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-xl">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold uppercase tracking-wider">
              Western Size Guide
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              International standard measurement charts & fit recommendations
            </p>
          </div>
        </div>

        {/* Tab & Unit selection */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {(['women', 'men', 'teenagers', 'kids', 'baby', 'seniors'] as Generation[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                unit === 'inches'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                unit === 'cm'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Tables */}
        {activeTab === 'women' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-2.5">Size</th>
                  <th className="py-2.5">Bust ({unit})</th>
                  <th className="py-2.5">Waist ({unit})</th>
                  <th className="py-2.5">Hip ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {womenSizes.map(r => (
                  <tr key={r.size} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                    <td className="py-2.5 font-bold">{r.size}</td>
                    <td className="py-2.5 text-zinc-600 dark:text-zinc-300">{r.bust}</td>
                    <td className="py-2.5 text-zinc-600 dark:text-zinc-300">{r.waist}</td>
                    <td className="py-2.5 text-zinc-600 dark:text-zinc-300">{r.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(activeTab === 'men' || activeTab === 'seniors') && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-2.5">Size</th>
                  <th className="py-2.5">Chest ({unit})</th>
                  <th className="py-2.5">Waist ({unit})</th>
                  <th className="py-2.5">Shoulder ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {menSizes.map(r => (
                  <tr key={r.size} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                    <td className="py-2.5 font-bold">{r.size}</td>
                    <td className="py-2.5 text-zinc-600 dark:text-zinc-300">{r.chest}</td>
                    <td className="py-2.5 text-zinc-600 dark:text-zinc-300">{r.waist}</td>
                    <td className="py-2.5 text-zinc-600 dark:text-zinc-300">{r.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(activeTab === 'kids' || activeTab === 'baby' || activeTab === 'teenagers') && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-2.5">Age / Size</th>
                  <th className="py-2.5">Height ({unit})</th>
                  <th className="py-2.5">Chest ({unit})</th>
                  <th className="py-2.5">Waist ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {kidsSizes.map(r => (
                  <tr key={r.age} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                    <td className="py-2.5 font-bold">{r.age}</td>
                    <td className="py-2.5 text-zinc-600 dark:text-zinc-300">{r.height}</td>
                    <td className="py-2.5 text-zinc-600 dark:text-zinc-300">{r.chest}</td>
                    <td className="py-2.5 text-zinc-600 dark:text-zinc-300">{r.waist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 -mx-6 -mb-6 p-6 rounded-b-2xl text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
          <p className="font-semibold text-zinc-700 dark:text-zinc-300">How to Measure:</p>
          <p>• <strong>Bust / Chest:</strong> Measure under arms around the fullest part of bust/chest.</p>
          <p>• <strong>Waist:</strong> Measure around natural waistline where waistband comfortably sits.</p>
          <p>• <strong>Fit Guarantee:</strong> Not sure? If the fit isn't 100% perfect, enjoy our free doorstep exchange within 14 days.</p>
        </div>
      </div>
    </div>
  );
};
