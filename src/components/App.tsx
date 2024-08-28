import React, { useEffect, useState } from 'react';
import { getAllImages, necessaryValues } from '../api/api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'normalize.css';

interface Image {
    id: number;
    tags: string;
    largeImageURL: string;
    webformatURL: string;
}

interface ApiResponse {
    hits: Image[];
    totalHits: number;
}

export const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [largeImageURL, setLargeImageUrl] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tags, setTags] = useState<string>('');
  const [totalHits, setTotalHits] = useState<number | null>(null);

  useEffect(() => {
    if (!searchQuery) return;

    const renderGallery = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits }: ApiResponse = await getAllImages(searchQuery, page);

        if (totalHits === 0) {
          toast.warning('Sorry, no images!', { position: 'top-left' });
        }

        const newImages = necessaryValues(hits);
        setImages(images => [...images, ...newImages]);
        setTotalHits(totalHits);

      } catch (error) {
        console.error(error);
        toast.error('Error fetching images');

      } finally {
        setIsLoading(false);
      }
    };

    renderGallery();
  }, [searchQuery, page]);

  const onFormSubmit = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (largeImageURL: string, tags: string) => {
    setLargeImageUrl(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const allImagesLoaded = images.length === totalHits;

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} />
      <ImageGallery 
        images={images} 
        onOpenModal={(largeImageURL: string, tags: string) => openModal(largeImageURL, tags)} 
      />
      <ToastContainer />
      {isLoading && <Loader />}
      {images.length !== 0 && !isLoading && !allImagesLoaded && (
        <Button onClick={onLoadMore} />
      )}
      {showModal && (
        <Modal
          onModalClick={toggleModal}
          largeImageURL={largeImageURL}
          alt={tags}
        />
      )}
    </>
  );
};