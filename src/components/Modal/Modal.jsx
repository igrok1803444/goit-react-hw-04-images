import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.escHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.escHandler);
  }
  escHandler = event => {
    if (event.code === 'Escape') {
      this.props.handleFunction();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props.image[0];
    const { handleFunction } = this.props;
    return (
      <div className="Overlay" onClick={handleFunction}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
