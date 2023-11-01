export const ImageGalleryItem = ({ image }) => {
  const { id, webformatURL, tags } = image;
  return (
    <li className="ImageGalleryItem">
      <img
        id={id}
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};
