import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../../app/services/auth';
import { getCities, City } from '../../app/services/cities'; // Import City type

const EditProfile = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    city_id: '',
    phone_number: '',
    address: '',
    password: '',
    password_confirmation: '',
  });
  const [cities, setCities] = useState<City[]>([]); // <-- Add type here
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, citiesRes] = await Promise.all([
          getProfile(),
          getCities(),
        ]);
        setForm({
          ...form,
          ...userRes.data,
          city_id: userRes.data.city_id || '',
          role: userRes.data.role || 'client',
        });
        setCities(citiesRes); // Now citiesRes is City[]
      } catch {
        setAlert({ type: 'error', message: 'Failed to load profile data.' });
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert({ type: '', message: '' });
    try {
      await updateProfile(form);
      setAlert({ type: 'success', message: 'Profile updated successfully.' });
      setForm({ ...form, password: '', password_confirmation: '' });
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors && Object.values(err.response.data.errors).join(' ')) ||
        'Update failed.';
      setAlert({ type: 'error', message: msg });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Edit Profile</h2>
      {alert.message && (
        <div style={{ color: alert.type === 'error' ? 'red' : 'green' }}>{alert.message}</div>
      )}
      <div>
        <label>Full Name *</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email *</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Username</label>
        <input name="username" value={form.username || ''} onChange={handleChange} />
      </div>
      <div>
        <label>City *</label>
        <select name="city_id" value={form.city_id} onChange={handleChange} required>
          <option value="">Select city</option>
          {cities.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Phone Number</label>
        <input name="phone_number" value={form.phone_number || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Address</label>
        <input name="address" value={form.address || ''} onChange={handleChange} />
      </div>
      
      <div>
        <label>New Password (leave blank to keep current)</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          minLength={8}
        />
      </div>
      <div>
        <label>Confirm New Password</label>
        <input
          name="password_confirmation"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
          minLength={8}
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfile;