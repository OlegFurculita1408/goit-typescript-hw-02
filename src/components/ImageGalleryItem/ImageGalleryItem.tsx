// import PropTypes from 'prop-types';
import React from 'react';
import css from './ImageGalleryItem.module.css'

// const ImageGalleryItem = ({ url, tags, openModal, largeImageURL }) => {
//     return (
//         <li className={css.ImageGalleryItem}>
//             <img
//                 className={css.ImageGalleryItemImage}
//                 src={url}
//                 alt={tags}
//                 onClick={() => openModal(largeImageURL, tags)}
//             />
//         </li>
//     )
// }
// ImageGalleryItem.propTypes = {
//     url: PropTypes.string.isRequired,
//     tags: PropTypes.string.isRequired,
//     openModal: PropTypes.func.isRequired,
//     largeImageURL: PropTypes.string.isRequired,
// }
// export default ImageGalleryItem

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