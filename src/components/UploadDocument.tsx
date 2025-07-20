import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadDocumentProps {
  onUpload: (doc: {
    name: string;
    summary: string;
    hash: string;
    verified: boolean;
    uploadDate: string;
    size: string;
  }) => void;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setSuccess(false);

    // Simulate upload + hash
    setTimeout(() => {
      const fakeHash = '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 10);
      const newDoc = {
        name: file.name,
        summary: summary || 'No summary provided.',
        hash: fakeHash,
        verified: Math.random() > 0.3,
        uploadDate: new Date().toISOString().slice(0, 10),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      };

      onUpload(newDoc);
      setUploading(false);
      setSuccess(true);
      setFile(null);
      setSummary('');
    }, 2000);
  };

  return (
    <motion.div 
      className="p-6 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl max-w-xl mx-auto mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-white text-lg font-semibold flex items-center gap-2 mb-4">
        <UploadCloud className="text-cyan-400" size={20} />
        Upload New Document
      </h3>

      <div className="flex flex-col gap-4">
        <input 
          type="file" 
          onChange={handleFileChange}
          className="bg-black/30 text-gray-300 p-2 rounded-lg border border-cyan-400/20"
        />
        <textarea 
          placeholder="Enter document summary (optional)" 
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="bg-black/30 text-gray-300 p-2 rounded-lg border border-cyan-400/20 resize-none h-24"
        />

        <motion.button 
          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-400/25 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </motion.button>

        {success && (
          <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
            <CheckCircle size={18} />
            Upload Successful!
          </div>
        )}
        {!file && !uploading && success === false && (
          <div className="flex items-center gap-2 text-yellow-400 text-sm mt-2">
            <AlertCircle size={18} />
            Please select a file to upload.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UploadDocument;
