import { useEffect } from 'react';

export const Modal = props => {
  useEffect(() => {
    window.addEventListener('keydown', escHandler);
    return () => {
      window.removeEventListener('keydown', escHandler);
    };
  });

  function escHandler(event) {
    if (event.code === 'Escape') {
      handleFunction();
    }
  }

  const { largeImageURL, tags } = props.image[0];
  const { handleFunction } = props;
  return (
    <div className="Overlay" onClick={handleFunction}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
