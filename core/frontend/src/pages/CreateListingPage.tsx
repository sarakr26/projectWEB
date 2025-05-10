import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
};

const categories = [
  { id: 1, name: 'Outils électriques' },
  { id: 2, name: 'Jardinage' },
  // Add more categories as needed
];
const cities = [
  { id: 1, name: 'Paris' },
  { id: 2, name: 'Lyon' },
  // Add more cities as needed
];
const premiumOptions = [
  { value: '1', label: '1 mois' },
  { value: '2', label: '2 semaines' },
  { value: '3', label: '1 semaine' },
];

const CreateListingPage = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        price_per_day: parseFloat(form.price_per_day),
        category_id: parseInt(form.category_id),
        city_id: parseInt(form.city_id),
        premium_duration: parseInt(form.premium_duration),
      };
      const res = await fetch('http://127.0.0.1:8000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Erreur lors de la création de l\'annonce.');
      navigate('/partner-dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Créer une Nouvelle Annonce</h1>
      <form onSubmit={handleSubmit} className="tn-card p-8 space-y-6">
        <div>
          <label className="block font-semibold mb-1">Titre de l'Outil</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="tn-input w-full"
            placeholder="ex: Perceuse à Percussion Bosch GSB 18V-55"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Catégorie</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="tn-input w-full"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Ville</label>
            <select
              name="city_id"
              value={form.city_id}
              onChange={handleChange}
              className="tn-input w-full"
              required
            >
              <option value="">Sélectionner une ville</option>
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
            placeholder="Décrivez votre outil en détail..."
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Prix par jour (€)</label>
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
            <label className="block font-semibold mb-1">Option de livraison</label>
            <div className="flex items-center h-full">
              <input
                type="checkbox"
                name="delivery_option"
                checked={form.delivery_option}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Livraison Disponible</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Date de début</label>
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
            <label className="block font-semibold mb-1">Date de fin</label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Annonce Premium</label>
            <div className="flex items-center h-full">
              <input
                type="checkbox"
                name="is_premium"
                checked={form.is_premium}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Mettre en avant cette annonce</span>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Durée Premium</label>
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
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="tn-button tn-button-outline"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="tn-button tn-button-primary"
            disabled={loading}
          >
            {loading ? 'Création...' : 'Créer l\'Annonce'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage; 