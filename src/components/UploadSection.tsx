import React, { useState, ChangeEvent, useMemo, memo, useCallback } from 'react';
import { Upload, User, Globe, Users, MessageSquare, Calendar, CheckCircle, AlignLeft } from 'lucide-react';

interface ProfileData {
  accountType: 'public' | 'private';
  username: string;
  posts: string | null;
  followers: string | null;
  following: string | null;
  bio: string;
  dateJoined: string;
  location: string;
  isVerified: boolean;
  imageFile: File | null;
}

interface UploadSectionProps {
  onAnalyze: (data: {
    accountType: 'public' | 'private';
    username: string;
    posts: string;
    followers: string;
    following: string;
    bio: string;
    dateJoined: string;
    location: string;
    isVerified: boolean;
    imageFile: File | null;
  }) => void;
  isAnalyzing: boolean;
}

const UploadSection = ({ onAnalyze, isAnalyzing }: UploadSectionProps) => {
  const [formData, setFormData] = useState<ProfileData>({
    accountType: 'public',
    username: '',
    posts: '',
    followers: '',
    following: '',
    bio: '', 
    dateJoined: '',
    location: '',
    isVerified: false,
    imageFile: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = useCallback((name: keyof ProfileData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);


  const handleImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleToggleChange('imageFile', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [handleToggleChange]);

  const handleAnalyze = useCallback(() => {
    if (formData.username.trim()) {
      onAnalyze({
        accountType: formData.accountType,
        username: formData.username,
        posts: formData.posts || '',
        followers: formData.followers || '',
        following: formData.following || '',
        bio: formData.bio,
        dateJoined: formData.dateJoined,
        location: formData.location,
        isVerified: formData.isVerified,
        imageFile: formData.imageFile,
      });
    }
  }, [formData, onAnalyze]);

  const isFormValid = useMemo(() => formData.username.trim() !== '', [formData.username]);

  const InputField = memo(({ label, icon: Icon, type = 'text', name, value, onChange, placeholder, step }: {
    label: string;
    icon: React.ElementType;
    type?: string;
    name: keyof ProfileData;
    value: string | null;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    placeholder?: string;
    step?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange as (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors shadow-sm"
          min={type === 'number' ? "0" : undefined}
          step={step}
        />
      </div>
    </div>
  ));
  const ToggleSwitch = memo(({ name, value, onChange, label1, label2, Icon1, Icon2 }: {
    name: keyof ProfileData;
    value: string;
    onChange: (name: keyof ProfileData, val: string) => void;
    label1: string;
    label2: string;
    Icon1: React.ElementType;
    Icon2: React.ElementType;
  }) => (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
      <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
        <button
          type="button"
          onClick={() => onChange(name, label1.toLowerCase() as 'public' | 'private')}
          className={`flex-1 flex items-center justify-center py-2 rounded-xl transition-all font-semibold text-sm ${
            value === label1.toLowerCase()
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          <Icon1 className="w-4 h-4 mr-2" />
          {label1}
        </button>
        <button
          type="button"
          onClick={() => onChange(name, label2.toLowerCase() as 'public' | 'private')}
          className={`flex-1 flex items-center justify-center py-2 rounded-xl transition-all font-semibold text-sm ${
            value === label2.toLowerCase()
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          <Icon2 className="w-4 h-4 mr-2" />
          {label2}
        </button>
      </div>
    </div>
  ));

  const BioTextArea = memo(({ name, value, onChange }: {
    name: keyof ProfileData;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Bio Description (Optional)
      </label>
      <div className="relative">
        <AlignLeft className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          placeholder="e.g., Creator, traveler, food lover."
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors shadow-sm resize-none"
        />
      </div>
    </div>
  ));


  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl w-full mx-auto font-sans">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
        Instagram Profile Data Entry
      </h2>
      <p className="text-gray-500 mb-8 text-center">
        Manually enter the profile metrics for detailed analysis.
      </p>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ToggleSwitch
            name="accountType"
            value={formData.accountType}
            onChange={handleToggleChange}
            label1="Public"
            label2="Private"
            Icon1={Globe}
            Icon2={User}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Username (Required)</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange as (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}
                placeholder="e.g., jane_doe"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Posts Posted</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="posts"
                value={formData.posts || ''}
                onChange={handleInputChange as (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}
                placeholder="0"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Followers Count</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="followers"
                value={formData.followers || ''}
                onChange={handleInputChange as (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}
                placeholder="0"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Following Count</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="following"
                value={formData.following || ''}
                onChange={handleInputChange as (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}
                placeholder="0"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>
        <BioTextArea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Joined (YYYY-MM)</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="dateJoined"
                value={formData.dateJoined}
                onChange={handleInputChange as (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}
                placeholder="e.g., 2020-05"
                pattern="^\d{4}-\d{2}$"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Based In (Location)</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange as (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}
                placeholder="e.g., New York, USA"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center">
            <input
              id="isVerified"
              type="checkbox"
              name="isVerified"
              checked={formData.isVerified}
              onChange={(e) => handleToggleChange('isVerified', e.target.checked)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isVerified" className="ml-3 block text-base font-medium text-gray-700 select-none cursor-pointer">
              <CheckCircle className="inline w-5 h-5 mr-2 text-blue-600" />
              Account is Verified
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 hover:bg-blue-50 p-2"
            >
              {imagePreview ? (
                <div className="flex items-center w-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-full shadow-lg mr-4 border-2 border-blue-400"
                  />
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {formData.imageFile?.name || 'Image uploaded'}
                  </span>
                  <span className="ml-auto text-blue-600 text-xs font-semibold hover:underline">
                    Change
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Upload className="w-6 h-6 text-gray-400 mr-3" />
                  <p className="text-sm text-gray-600 font-medium">Click to upload profile image (PNG, JPG)</p>
                </div>
              )}
            </label>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!isFormValid || isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 mt-6"
        >
          {isAnalyzing ? 'Analyzing Data...' : 'Analyze Profile Data'}
        </button>
        {!isFormValid && (
          <p className="text-red-500 text-center text-sm">The username field is required to proceed with analysis.</p>
        )}
      </div>
    </div>
  );
};

export default memo(UploadSection);
