import React, { useState } from 'react';
import { Plus, User, Calendar, Mail, AlertCircle } from 'lucide-react';
import { games } from '../mock/games';

const LoanForm = () => {
  const [formData, setFormData] = useState({ 
    gameId: '', 
    studentId: '', 
    email: '', 
    date: '' 
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Validar ID del juego
    if (!formData.gameId) {
      newErrors.gameId = 'Selecciona un juego';
    } else {
      const selectedGame = games.find(g => g.id === parseInt(formData.gameId));
      if (!selectedGame) {
        newErrors.gameId = 'Juego no válido';
      } else if (!selectedGame.available) {
        newErrors.gameId = 'Este juego no está disponible actualmente';
      }
    }
    
    // Validar ID de estudiante
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'El ID de estudiante es requerido';
    } else if (!/^\d+$/.test(formData.studentId)) {
      newErrors.studentId = 'El ID debe contener solo números';
    }
    
    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    } else if (!formData.email.endsWith('@unisimon.edu.co')) {
      newErrors.email = 'Debe usar un email de Universidad Simón Bolívar (@unisimon.edu.co)';
    }
    
    // Validar fecha
    if (!formData.date) {
      newErrors.date = 'La fecha de devolución es requerida';
    } else {
      const today = new Date();
      const selectedDate = new Date(formData.date);
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate <= today) {
        newErrors.date = 'La fecha de devolución debe ser futura';
      }
      
      // Máximo 14 días de préstamo
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 14);
      if (selectedDate > maxDate) {
        newErrors.date = 'El préstamo máximo es de 14 días';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log('Datos del préstamo:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ gameId: '', studentId: '', email: '', date: '' });
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Solicitar Préstamo</h1>
      
      {submitted ? (
        <div className="max-w-lg mx-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">
          <p className="font-bold">¡Solicitud enviada con éxito!</p>
          <p>Revisa tu email para confirmar el préstamo.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Plus size={20} /> Juego a prestar
            </label>
            <select
              name="gameId"
              value={formData.gameId}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.gameId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona un juego</option>
              {games.filter(game => game.available).map(game => (
                <option key={game.id} value={game.id}>
                  {game.title} ({game.stock} disponibles)
                </option>
              ))}
            </select>
            {errors.gameId && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.gameId}
              </p>
            )}
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <User size={20} /> ID de Estudiante
            </label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.studentId ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tu ID de Universidad Simón Bolívar (solo números)"
            />
            {errors.studentId && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.studentId}
              </p>
            )}
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Mail size={20} /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="tuemail@unisimon.edu.co"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.email}
              </p>
            )}
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Calendar size={20} /> Fecha de Devolución
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.date}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Solicitar Préstamo
          </button>
        </form>
      )}
    </section>
  );
};

export default LoanForm;