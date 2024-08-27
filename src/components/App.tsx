import React, { useEffect, useState } from 'react';
import { getAllImages, necessaryValues } from '../api/api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          toast.warning(`Sorry, no images!`, { position: toast.POSITION.TOP_LEFT });
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
        onOpenModal={openModal}
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

// import { useEffect, useState } from 'react';
// import { getAllImages, necessaryValues } from '../api/api';
// import SearchBar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import Loader from './Loader/Loader';
// import Modal from './Modal/Modal';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const App = () => {
//   const [images, setImages] = useState([]);
//   const [largeImageURL, setLargeImageUrl] = useState('');
//   // const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [tags, setTags] = useState('');
//   const [totalHits, setTotalHits] = useState(null);


//   useEffect(() => {
//     if (!searchQuery) return 
          
//   const renderGalery = async () => {
//      setIsLoading(true);

//      try {
//       const { hits, totalHits } = await getAllImages(searchQuery, page);

//         if (totalHits === 0) {
//           toast.warning(`Sory, no images!`, {position: toast.POSITION.TOP_LEFT});
//         }

//       const newImages = necessaryValues(hits);
//         setImages(images => [...images, ...newImages])
//         setTotalHits(totalHits)
      
//      } catch (error) {
//         error({ error })
//           toast.error({error})

//      } finally {
//         setIsLoading(false)
//      }
//   }
//     renderGalery();
//   },[searchQuery, page])


//   const onFormSubmit = searchQuery => {
//     setSearchQuery(searchQuery);
//     setPage(1);
//     setImages([]);
//   }

//   const onLoadMore = () => {
//     setPage(page + 1);
//   }

//   const openModal = largeImageURL => {
//     setLargeImageUrl(largeImageURL)
//     toggleModal()
//     setTags(tags)
//   }

//   const toggleModal = () => {
//     setShowModal(prev => !prev)
//   }

//   const allImages = images === totalHits;

//   return (
//     <>
//       <SearchBar
//        onSubmit={onFormSubmit}
//         />
//       <ImageGallery
//        images={images}
//        onOpenModal={openModal}
//         />
//       <ToastContainer />
//         {isLoading && <Loader />}
//         {images.length !== 0 && !isLoading && !allImages && (
//       <Button onClick={onLoadMore} />)}
//         {showModal && (
//           <Modal 
//             onModalClick={toggleModal}
//             largeImageURL={largeImageURL}
//             alt={tags}/>)}
//     </>
//   )
// };