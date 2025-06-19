"use client";

import React, { useEffect, useState, useCallback } from "react";

const images = [
  "/ad/ad1.jpg",
  "/ad/ad2.jpg",
];

const getRandomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};

const FIFTEEN_MINUTES = 15 * 60 * 1000;

const AdModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(getRandomImage());

  const showModal = useCallback(() => {
    setImg(getRandomImage());
    setOpen(true);
  }, []);

  useEffect(() => {
    showModal();
    const interval = setInterval(() => {
      showModal();
    }, FIFTEEN_MINUTES);
    return () => clearInterval(interval);
  }, [showModal]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-lg w-[80vw] max-w-xl p-4 flex flex-col items-center" style={{ minHeight: '60vh' }}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={() => setOpen(false)}
          aria-label="Cerrar anuncio"
        >
          ×
        </button>
        <img
          src={img}
          alt="Anuncio"
          className="w-full h-full object-contain rounded-md mb-4 flex-1"
        />
        <span className="text-center text-base text-gray-700">Publicidad</span>
      </div>
    </div>
  );
};

export default AdModal; 