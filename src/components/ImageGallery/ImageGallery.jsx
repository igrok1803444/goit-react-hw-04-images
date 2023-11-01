export const ImageGallery = ({ handleFunction, children }) => {
  return (
    <ul className="ImageGallery" onClick={handleFunction}>
      {children}
    </ul>
  );
};
