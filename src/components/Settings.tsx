import React from 'react';
import { User, Bell, Shield, Palette, Download, HelpCircle } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="glass-button rounded-xl p-3">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Profile</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full p-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Email</label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full p-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Currency</label>
              <select className="w-full p-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white/30">
                <option value="USD" className="bg-gray-800">USD ($)</option>
                <option value="EUR" className="bg-gray-800">EUR (€)</option>
                <option value="GBP" className="bg-gray-800">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="glass-button rounded-xl p-3">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Budget Alerts</p>
                <p className="text-white/60 text-sm">Get notified when you exceed budget limits</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 glass rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Goal Reminders</p>
                <p className="text-white/60 text-sm">Reminders for financial goal deadlines</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 glass rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Investment Updates</p>
                <p className="text-white/60 text-sm">Daily portfolio performance updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 glass rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="glass-button rounded-xl p-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Security</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full glass-button rounded-xl p-4 text-left">
              <p className="text-white font-medium">Change Password</p>
              <p className="text-white/60 text-sm">Update your account password</p>
            </button>
            
            <button className="w-full glass-button rounded-xl p-4 text-left">
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-white/60 text-sm">Add an extra layer of security</p>
            </button>
            
            <button className="w-full glass-button rounded-xl p-4 text-left">
              <p className="text-white font-medium">Login History</p>
              <p className="text-white/60 text-sm">View recent account activity</p>
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="glass-button rounded-xl p-3">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Theme</label>
              <select className="w-full p-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white/30">
                <option value="glassmorphism" className="bg-gray-800">Glassmorphism</option>
                <option value="dark" className="bg-gray-800">Dark</option>
                <option value="light" className="bg-gray-800">Light</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Date Format</label>
              <select className="w-full p-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white/30">
                <option value="MM/DD/YYYY" className="bg-gray-800">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY" className="bg-gray-800">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD" className="bg-gray-800">YYYY-MM-DD</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-white/60 text-sm">Use dark theme across the app</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 glass rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="glass-button rounded-xl p-4 flex items-center gap-3">
          <Download className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Export Data</span>
        </button>
        
        <button className="glass-button rounded-xl p-4 flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Help & Support</span>
        </button>
        
        <button className="glass-button rounded-xl p-4 flex items-center gap-3 text-red-300 hover:bg-red-500/20">
          <Shield className="w-5 h-5" />
          <span className="font-medium">Delete Account</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
