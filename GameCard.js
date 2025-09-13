import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, Users } from 'lucide-react';

const GameCard = ({ game }) => {
  return (
    <motion.div
      className="perspective-1000 group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:rotate-y-12 group-hover:rotate-x-5"
        />
        <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {game.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{game.title}</h3>
        <p className="text-gray-600 mt-2 line-clamp-2">{game.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <p
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              game.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {game.available ? 'Disponible' : 'Prestado'} ({game.stock} en stock)
          </p>
          
          <div className="flex items-center text-gray-500 text-sm">
            <Users size={16} className="mr-1" />
            {game.minPlayers || 1}-{game.maxPlayers || 8} jugadores
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <Link
            to={`/game/${game.id}`}
            className="inline-flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Eye size={18} />
            Ver Detalles
          </Link>
          
          {game.available && (
            <Link
              to="/loan"
              className="inline-flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Solicitar
            </Link>
          )}
        </div>
      </div>
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .group:hover img {
          transform: rotateY(12deg) rotateX(5deg);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </motion.div>
  );
};

export default GameCard;