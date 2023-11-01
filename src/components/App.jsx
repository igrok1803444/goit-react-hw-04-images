import { Component } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';

import { fetchPhotoes } from './API/API';
import { Modal } from './Modal/Modal';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      query: '',
      page: 1,
      isLoading: false,
      error: null,
      modalOpen: false,
      actionID: null,
    };
  }

  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoading: true });
      try {
        const response = await fetchPhotoes(this.state.query, this.state.page);
        this.setState(prevState => ({
          images: [...prevState.images, ...response],
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  formHandler = event => {
    event.preventDefault();
    const query = event.target.queryInput.value;
    this.setState({ query: query, page: 1, images: [] });
  };
  galleryHandler = event => {
    if (event.target.nodeName === 'LI' || event.target.nodeName === 'IMG') {
      this.setState({ actionID: Number(event.target.id), modalOpen: true });
    }
  };
  loadMoreHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };
  render() {
    return (
      <>
        <Searchbar handleFunction={this.formHandler} />
        <ImageGallery handleFunction={this.galleryHandler}>
          {this.state.images.map(image => (
            <ImageGalleryItem image={image} key={image.id} />
          ))}
        </ImageGallery>{' '}
        {this.state.isLoading && (
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
        {this.state.images.length > 0 && (
          <Button handleFunction={this.loadMoreHandler} />
        )}
        {this.state.modalOpen && (
          <Modal
            image={this.state.images.filter(
              image => image.id === this.state.actionID
            )}
            handleFunction={this.closeModal}
          />
        )}
      </>
    );
  }
}
