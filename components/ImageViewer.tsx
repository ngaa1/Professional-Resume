
import React, { useState, useEffect, useCallback } from 'react';
import { Icons } from './Icon';

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  type?: 'experience' | 'personal_projects';
  projectName?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images, initialIndex = 0, isOpen, onClose, type, projectName }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsLoading(true);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  }, [isOpen, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Generate local image path
  const getLocalImagePath = (imageUrl: string, index: number): string => {
    if (!type || !projectName) return imageUrl;
    
    // Create a safe directory name from project name (replace spaces with underscores, remove special characters)
    const safeProjectName = projectName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    
    // Extract filename from URL or use index as fallback
    const urlParts = imageUrl.split('/');
    let filename = urlParts[urlParts.length - 1];
    
    // Remove query parameters from filename
    filename = filename.split('?')[0];
    
    // If filename is empty or doesn't have an extension, use index with jpg extension
    if (!filename || !filename.includes('.')) {
      filename = `${index + 1}.jpg`;
    }
    
    return `/images/${type}/${safeProjectName}/${filename}`;
  };

  // Handle image load error - fallback to original URL
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.src.includes('/images/')) {
      // If we're already trying a local image, fall back to the original URL
      const originalUrl = images[currentIndex];
      e.currentTarget.src = originalUrl;
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
      >
        <Icons.X className="w-6 h-6" />
      </button>

      {/* Navigation Buttons - Only if multiple images */}
      {images.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
          >
            <Icons.ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
          >
            <Icons.ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div 
        className="relative max-w-5xl max-h-[85vh] p-2 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <img 
          src={getLocalImagePath(images[currentIndex], currentIndex)} 
          alt={`Project Image ${currentIndex + 1}`} 
          className={`max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-medium text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
