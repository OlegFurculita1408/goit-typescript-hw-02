import React from 'react';
import css from './ImageGalleryItem.module.css'


interface ImageGalleryItemProps {
    url: string;
    tags: string;
    openModal: (largeImageURL: string, tags: string) => void;
    largeImageURL: string;
}

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({ url, tags, openModal, largeImageURL }) => {
    return (
        <li className={css.ImageGalleryItem}>
            <img
                className={css.ImageGalleryItemImage}
                src={url}
                alt={tags}
                onClick={() => openModal(largeImageURL, tags)}
            />
        </li>
    );
};

export default ImageGalleryItem;