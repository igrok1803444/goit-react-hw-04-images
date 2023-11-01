import { useState, useEffect } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';

import { fetchPhotoes } from './API/API';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionID, setActionID] = useState(null);

  // async componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.page !== this.state.page ||
  //     prevState.query !== this.state.query
  //   ) {
  //     this.setState({ isLoading: true });
  //     try {
  //       const response = await fetchPhotoes(this.state.query, this.state.page);
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...response],
  //       }));
  //     } catch (error) {
  //       this.setState({ error });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }
  useEffect(() => {
    if (query !== '') {
      search();
    }
  }, [page, query, images]);
  const formHandler = event => {
    event.preventDefault();
    const query = event.target.queryInput.value.trim();
    if (query !== '') {
      setQuery(query);
      setPage(1);
      setImages([]);
    } else {
      return;
    }
  };
  async function search() {
    setIsLoading(true);
    try {
      const response = await fetchPhotoes(query, page);

      setImages(prev => [...prev, ...response]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  const galleryHandler = event => {
    if (event.target.nodeName === 'LI' || event.target.nodeName === 'IMG') {
      // this.setState({ actionID: Number(event.target.id), modalOpen: true });
      setActionID(Number(event.target.id));
      setModalOpen(true);
    }
  };
  const loadMoreHandler = () => {
    setPage(page + 1);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Searchbar handleFunction={formHandler} />
      <ImageGallery handleFunction={galleryHandler}>
        {images.map(image => (
          <ImageGalleryItem image={image} key={image.id} />
        ))}
      </ImageGallery>
      {error && <p>{error.message}</p>}
      {isLoading && (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{
            justifyContent: 'center',
          }}
          wrapperClassName=""
          visible={true}
        />
      )}
      {images.length > 0 && <Button handleFunction={loadMoreHandler} />}
      {modalOpen && (
        <Modal
          image={images.filter(image => image.id === actionID)}
          handleFunction={closeModal}
        />
      )}
    </>
  );
};
