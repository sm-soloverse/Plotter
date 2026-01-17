'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Bell,
  Shield,
  Palette,
  Link as LinkIcon,
  Save,
  ArrowLeft,
} from 'lucide-react';
import { Tabs } from '@/components/Tabs';
import { useStore } from '@/store';

export default function SettingsPage() {
  const { currentUser } = useStore();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState('system');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Not Logged In</h1>
          <p className="text-gray-500 mb-4">Please log in to access settings.</p>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    // In a real app, this would save to an API
    alert('Settings saved!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/profile" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <Tabs tabs={tabs} defaultTab="profile">
            {(activeTab) => (
              <div className="p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <img
                        src={currentUser.avatar}
                        alt=""
                        className="w-20 h-20 rounded-2xl"
                      />
                      <div>
                        <button className="btn-secondary text-sm">Change Avatar</button>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Display Name</label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field pl-8"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        className="input-field resize-none"
                        placeholder="Tell others about yourself..."
                      />
                      <p className="text-xs text-gray-500 mt-1">{bio.length}/200 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          placeholder="https://yourwebsite.com"
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive updates about your creations</p>
                      </div>
                      <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          emailNotifications ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                            emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium">Notify me when:</h3>
                      {[
                        'Someone likes my creation',
                        'Someone forks my creation',
                        'Someone comments on my creation',
                        'I get a new follower',
                        'A creator I follow publishes something new',
                      ].map((item, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600" />
                          <span className="text-sm">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Theme</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {['light', 'dark', 'system'].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              theme === t
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-sm font-medium capitalize">{t}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Content Display</h3>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600" />
                        <span className="text-sm">Show cover images in cards</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-medium">Profile Visibility</h3>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600" />
                        <span className="text-sm">Show my profile in search results</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary-600" />
                        <span className="text-sm">Allow others to see my liked creations</span>
                      </label>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium">Default License</h3>
                      <select className="input-field">
                        <option value="attribution">Attribution - Free with credit</option>
                        <option value="open">Open - Anyone can use</option>
                        <option value="non-commercial">Non-Commercial only</option>
                        <option value="restricted">Restricted - View only</option>
                      </select>
                      <p className="text-xs text-gray-500">
                        This will be the default license for new creations
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                      <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Once you delete your account, there is no going back.
                      </p>
                      <button className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
                  <button onClick={handleSave} className="btn-primary gap-1.5">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
