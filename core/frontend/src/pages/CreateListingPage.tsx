import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Upload } from 'react-feather';

const initialState = {
  title: '',
  description: '',
  price_per_day: '',
  category_id: '',
  city_id: '',
  delivery_option: false,
  start_date: '',
  end_date: '',
  is_premium: false,
  premium_duration: '1',
  main_photo: null,
  additional_photos: Array(5).fill(null),
};

const categories = [
  { id: 1, name: 'Power Tools' },
  { id: 2, name: 'Gardening' },
  // Add more categories as needed
];
const cities = [
  { id: 1, name: 'Paris' },
  { id: 2, name: 'Lyon' },
  // Add more cities as needed
];
const premiumOptions = [
  { value: '1', label: '1 month' },
  { value: '2', label: '2 weeks' },
  { value: '3', label: '1 week' },
];

const CreateListingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e, index = -1) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (index === -1) {
      setForm((prev) => ({ ...prev, main_photo: file }));
    } else {
      setForm((prev) => {
        const newPhotos = [...prev.additional_photos];
        newPhotos[index] = file;
        return { ...prev, additional_photos: newPhotos };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      
      // Ajouter les champs du formulaire
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'additional_photos') return;
        if (key === 'main_photo') {
          if (value) formData.append(key, value);
          return;
        }
        if (key === 'price_per_day') {
          formData.append(key, parseFloat(value));
          return;
        }
        if (key === 'category_id' || key === 'city_id' || key === 'premium_duration') {
          formData.append(key, parseInt(value));
          return;
        }
        formData.append(key, value);
      });

      // Ajouter les photos supplémentaires
      form.additional_photos.forEach((photo, index) => {
        if (photo) formData.append(`additional_photos[]`, photo);
      });

      const res = await fetch('http://127.0.0.1:8000/api/listings', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) throw new Error('Error creating listing.');
      navigate('/partner-dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sous-menu items
  const steps = [
    { id: 'details', label: 'Tool Details', step: 0 },
    { id: 'pricing', label: 'Pricing & Availability', step: 1 },
    { id: 'photos', label: 'Photos', step: 2 }
  ];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-1">Tool Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="tn-input w-full"
                placeholder="e.g., Bosch GSB 18V-55 Impact Drill"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="tn-input w-full"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">City</label>
                <select
                  name="city_id"
                  value={form.city_id}
                  onChange={handleChange}
                  className="tn-input w-full"
                  required
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="tn-input w-full"
                rows={4}
                placeholder="Describe your tool in detail..."
                required
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price and Delivery section */}
              <div>
                <label className="block font-semibold mb-1">Price per day (€)</label>
                <input
                  type="number"
                  name="price_per_day"
                  value={form.price_per_day}
                  onChange={handleChange}
                  className="tn-input w-full"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Delivery Option</label>
                <div className="flex items-center h-full">
                  <input
                    type="checkbox"
                    name="delivery_option"
                    checked={form.delivery_option}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Delivery Available</span>
                </div>
              </div>
            </div>

            {/* Dates section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="tn-input w-full"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                  className="tn-input w-full"
                  required
                />
              </div>
            </div>

            {/* Premium section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Premium Listing</label>
                <div className="flex items-center h-full">
                  <input
                    type="checkbox"
                    name="is_premium"
                    checked={form.is_premium}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Promote this listing</span>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Premium Duration</label>
                <select
                  name="premium_duration"
                  value={form.premium_duration}
                  onChange={handleChange}
                  className="tn-input w-full"
                  required
                >
                  {premiumOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Tool Photos</h3>
              <p className="text-sm text-gray-500 mb-4">
                Upload high-quality photos of your tool. Good photos will increase booking rates.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Main Photo */}
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)}
                    className="hidden"
                    id="main_photo"
                  />
                  <label 
                    htmlFor="main_photo" 
                    className="cursor-pointer flex flex-col items-center justify-center h-40"
                  >
                    {form.main_photo ? (
                      <img
                        src={URL.createObjectURL(form.main_photo)}
                        alt="Main preview"
                        className="h-full w-full object-cover rounded"
                      />
                    ) : (
                      <div className="text-gray-400">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-sm">Main Photo</span>
                      </div>
                    )}
                  </label>
                </div>

                {/* Additional Photos */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="border-2 border-dashed rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, index)}
                      className="hidden"
                      id={`photo_${index}`}
                    />
                    <label 
                      htmlFor={`photo_${index}`}
                      className="cursor-pointer flex flex-col items-center justify-center h-40"
                    >
                      {form.additional_photos[index] ? (
                        <img
                          src={URL.createObjectURL(form.additional_photos[index])}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover rounded"
                        />
                      ) : (
                        <div className="text-gray-400">
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <span className="text-sm">Additional Photo {index + 1}</span>
                        </div>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-24 max-w-5xl">
        {/* Back button and title header */}
        <div className="mb-8">
          <Link
            to="/partner-dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-8" style={{ color: '#0ac5b2' }}>Create New Listing</h1>
          
          {/* Steps Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeStep === index
                      ? 'border-[#0ac5b2] text-[#0ac5b2]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {step.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {renderStepContent(activeStep)}

          {error && <div className="text-red-500 mt-4">{error}</div>}
          
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => activeStep > 0 && setActiveStep(activeStep - 1)}
              className={`tn-button tn-button-outline ${activeStep === 0 ? 'invisible' : ''}`}
            >
              Previous
            </button>
            
            {activeStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className="tn-button tn-button-primary"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="tn-button tn-button-primary"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;