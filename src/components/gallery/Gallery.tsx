import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GalleryVerticalEnd, X } from 'lucide-react';

interface GalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const GALLERY_IMAGES = [
  {
    id: 1,
    src: '/p-1.jpeg',
    alt: 'Élèves en classe',
    category: 'Vie scolaire',
    date: '15/10/2023'
  },
  {
    id: 2,
    src: '/p-2.jpeg',
    alt: 'Cérémonie de remise des prix',
    category: 'Événements',
    date: '10/10/2023'
  },
  {
    id: 3,
    src: '/p-3.jpeg',
    alt: 'Sortie éducative',
    category: 'Sorties scolaires',
    date: '05/10/2023'
  },
  {
    id: 4,
    src: '/p-4.jpeg',
    alt: 'Atelier créatif',
    category: 'Activités',
    date: '01/10/2023'
  },
  {
    id: 5,
    src: '/p-5.jpeg',
    alt: 'Cours en plein air',
    category: 'Enseignement',
    date: '25/09/2023'
  }
];

export function Gallery({ isOpen, onClose }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <GalleryVerticalEnd className="h-5 w-5" />
              Galerie photos
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {GALLERY_IMAGES.map((image) => (
            <div 
              key={image.id} 
              className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white font-medium">{image.alt}</h3>
                <div className="flex justify-between text-sm text-white/80 mt-1">
                  <span>{image.category}</span>
                  <span>{image.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
      
      {/* Modal pour l'image sélectionnée */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]
           bg-white rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt=""
              className="max-w-full max-h-[80vh] object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
