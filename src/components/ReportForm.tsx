import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { EventCategory, NewReport, Location } from '../../types';
import { useTranslation } from '../hooks/useTranslation';

interface ReportFormProps {
  location: Location | null;
  onClose: () => void;
  onSubmit: (report: NewReport) => void;
  isSubmitting: boolean;
}

export const ReportForm: React.FC<ReportFormProps> = ({ location, onClose, onSubmit, isSubmitting }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<EventCategory>(EventCategory.Civic);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !location) return;
    
    const newReport: NewReport = {
        description,
        category,
        location,
        imageFile: imageFile || undefined
    };
    onSubmit(newReport);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('report_new_issue')}</h2>
                
                {!location && (
                  <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-4 text-sm">
                    {t('map_click_prompt')}
                  </div>
                )}
                
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1">{t('category')}</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as EventCategory)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#586877]"
                    >
                        {Object.values(EventCategory).map(cat => (
                            <option key={cat} value={cat}>{t(`category_${cat}`)}</option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">{t('description')}</label>
                    <textarea
                        id="description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t('describe_issue_placeholder')}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#586877]"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">{t('attach_photo')}</label>
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-[#586877] transition"
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="h-32 object-contain rounded"/>
                        ) : (
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="text-sm text-gray-500">{t('click_to_upload')}</p>
                                <p className="text-xs text-gray-400">{t('image_formats')}</p>
                            </div>
                        )}
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
                <button type="button" onClick={onClose} className="py-2 px-4 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition">{t('cancel')}</button>
                <button 
                    type="submit" 
                    disabled={!description || !location || isSubmitting}
                    className="py-2 px-4 rounded-md text-sm font-semibold text-white bg-[#586877] hover:bg-[#4a5a69] disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center"
                >
                    {isSubmitting && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {isSubmitting ? t('submitting') : t('submit_report')}
                </button>
            </div>
        </form>
      </motion.div>
    </div>
  );
};