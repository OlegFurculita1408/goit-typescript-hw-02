import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'

// interface one image
interface Image {
    id: number;
    webformatURL: string;
    largeImageURL: string;
    tags: string;
}

interface ImageGalleryProps {
    images: Image[];
    onOpenModal: (largeImageURL: string, tags: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onOpenModal }) => (
    <ul className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
                key={id}
                url={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                openModal={onOpenModal}
            />
        ))}
    </ul>
);
export default ImageGallery;