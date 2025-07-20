import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UploadDocument from './UploadDocument'; // adjust path as needed


import { 
  Upload, 
  FileText, 
  Shield, 
  Brain, 
  Activity, 
  Database, 
  TrendingUp,
  Settings,
  Users,
  Home,
  CheckCircle,
  AlertCircle,
  Zap,
  Copy,
  ExternalLink
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  summary: string;
  hash: string;
  verified: boolean;
  uploadDate: string;
  size: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Smart Contract Audit Report',
      summary: 'Comprehensive security analysis of DeFi protocol with vulnerability assessments and recommendations.',
      hash: '0xa1b2c3...f4e5d6',
      verified: true,
      uploadDate: '2025-01-15',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Tokenomics Whitepaper',
      summary: 'Detailed token distribution model and economic framework for blockchain governance.',
      hash: '0xb2c3d4...g5f6e7',
      verified: true,
      uploadDate: '2025-01-14',
      size: '1.8 MB'
    },
    {
      id: '3',
      name: 'Legal Compliance Document',
      summary: 'Regulatory framework analysis and compliance guidelines for cryptocurrency operations.',
      hash: '0xc3d4e5...h6g7f8',
      verified: false,
      uploadDate: '2025-01-13',
      size: '3.1 MB'
    }
  ]);

  const [aiProcessing, setAiProcessing] = useState(false);
  const [walletAddress] = useState('0x742d35Cc4Bf4a1CafC7Ae4E7F3B4c8d9e0F1a2B3');

  useEffect(() => {
    const interval = setInterval(() => {
      setAiProcessing(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Documents', id: 'documents' },
    { icon: Upload, label: 'Upload', id: 'upload' },
    { icon: Users, label: 'Team', id: 'team' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"></div>
        <div className="absolute top-1/3 left-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-30"></div>
      </div>

      {/* Top Navbar */}
      <motion.nav 
        className="flex justify-between items-center px-8 py-6 backdrop-blur-sm bg-black/20 border-b border-cyan-400/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Shield className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider">SecureX</h1>
          <div className="flex gap-2 text-xs text-cyan-400 ml-4">
            <span>Secure</span> • <span>Intelligent</span> • <span>Verifiable</span> • <span>Decentralized</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 rounded-lg text-cyan-300 text-sm">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            <Copy 
              size={14} 
              className="inline ml-2 cursor-pointer hover:text-cyan-400" 
              onClick={() => copyToClipboard(walletAddress)}
            />
          </div>
          <motion.button 
            className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-400/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Connect Wallet
          </motion.button>
        </div>
      </motion.nav>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside 
          className="w-20 h-screen bg-black/20 backdrop-blur-sm border-r border-cyan-400/30 flex flex-col items-center py-8 gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {sidebarItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`p-3 rounded-lg transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-cyan-400/20 border border-cyan-400/50 text-cyan-300' 
                  : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-400/10'
              }`}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <item.icon size={24} />
            </motion.button>
          ))}
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
                  <p className="text-cyan-300">Your AI-powered document intelligence dashboard</p>
                </div>
              </div>
            </motion.div>

            {/* AI Status Bar */}
            <motion.div 
              className="mb-8 p-4 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="text-yellow-400" size={20} />
                  <span className="text-white font-medium">AI Summarization Engine</span>
                  {aiProcessing && (
                    <motion.div 
                      className="flex gap-1"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    </motion.div>
                  )}
                </div>
                <div className="text-cyan-300 text-sm">
                  {aiProcessing ? 'Processing documents...' : 'Ready'}
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { icon: FileText, label: 'Total Documents', value: '12', color: 'cyan' },
                { icon: Shield, label: 'Verified', value: '9', color: 'green' },
                { icon: Database, label: 'Storage Used', value: '24.7 MB', color: 'blue' },
                { icon: TrendingUp, label: 'AI Summaries', value: '156', color: 'purple' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="p-6 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl hover:border-cyan-400/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(6, 182, 212, 0.1)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`text-${stat.color}-400`} size={24} />
                    <span className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Documents Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* My Documents */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">My Documents</h3>
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-400/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Upload New
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      className="p-6 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl hover:border-cyan-400/50 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <FileText className="text-cyan-400 mt-1" size={20} />
                          <div>
                            <h4 className="text-white font-medium mb-1">{doc.name}</h4>
                            <p className="text-gray-300 text-sm mb-2">{doc.summary}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span>{doc.uploadDate}</span>
                              <span>{doc.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.verified ? (
                            <CheckCircle className="text-green-400" size={20} />
                          ) : (
                            <AlertCircle className="text-yellow-400" size={20} />
                          )}
                          <ExternalLink className="text-gray-400 hover:text-cyan-400 cursor-pointer" size={16} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Hash:</span>
                          <span className="text-xs text-cyan-300 font-mono">{doc.hash}</span>
                          <Copy 
                            size={12} 
                            className="text-gray-400 hover:text-cyan-400 cursor-pointer" 
                            onClick={() => copyToClipboard(doc.hash)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Blockchain:</span>
                          <div className={`w-2 h-2 rounded-full ${doc.verified ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Analytics & Storage */}
              <div className="space-y-6">
                {/* Usage Analytics */}
                <motion.div
                  className="p-6 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Activity size={18} />
                    Usage Analytics
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Documents Processed</span>
                        <span className="text-cyan-300">75%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 1, delay: 1 }}
                        ></motion.div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">AI Summaries</span>
                        <span className="text-cyan-300">92%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '92%' }}
                          transition={{ duration: 1, delay: 1.2 }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Storage Status */}
                <motion.div
                  className="p-6 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Database size={18} />
                    Storage Status
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">IPFS Network</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm">Active</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Encryption</span>
                      <span className="text-cyan-300 text-sm">AES-256</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Backup Nodes</span>
                      <span className="text-cyan-300 text-sm">3/3</span>
                    </div>
                  </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  className="p-6 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <h4 className="text-white font-medium mb-4">Tech Stack</h4>
                  <div className="space-y-2">
                    {['React + TypeScript', 'Ethereum Blockchain', 'IPFS Storage', 'OpenAI GPT-4', 'Web3.js'].map((tech, index) => (
                      <motion.div 
                        key={tech}
                        className="text-gray-300 text-sm py-1 px-2 bg-cyan-400/10 rounded border border-cyan-400/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
