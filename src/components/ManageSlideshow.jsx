import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchImages, addImages, deleteImage } from '../api'; // Import API functions

// Styled Components
const SlideshowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ImageCard = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FilePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const LoadingMessage = styled.p`
  color: #007bff;
  font-size: 1rem;
`;

const ManageSlideshow = () => {
  const [images, setImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]); // Changed to handle multiple files
  const [previewImages, setPreviewImages] = useState([]); // Preview multiple images
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchImages()
      .then((data) => {
        console.log('Fetched data:', data);  // Log the data to check the structure
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error('Fetched data is not an array:', data);
          setImages([]); // Default to an empty array if the structure is unexpected
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching images:', err);
        setError('Failed to load images.');
        setImages([]); // Ensure that images is always an array
        setLoading(false);
      });

    // Cleanup function to revoke object URLs to avoid memory leaks
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setNewImageFiles(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const addImagesToAPI = () => {
    if (newImageFiles.length > 0) {
      const formData = new FormData();
      newImageFiles.forEach((file) => {
        formData.append('images', file);
      });

      setLoading(true);
      setError('');
      addImages(formData)
        .then((newImages) => {
          setImages([...images, ...newImages]); // Add new images to the list
          setNewImageFiles([]);  // Reset file input state
          setPreviewImages([]);  // Reset preview images
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error adding images:', error);
          setError('Failed to upload images.');
          setLoading(false);
        });
    }
  };

  const removeImageFromAPI = (id) => {
    setLoading(true);
    setError('');
    deleteImage(id)
      .then(() => {
        setImages(images.filter((image) => image._id !== id)); // Remove image from local state
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
        setError('Failed to delete image.');
        setLoading(false);
      });
  };

  return (
    <SlideshowContainer>
      <h2>Manage Slideshow</h2>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <LoadingMessage>Loading...</LoadingMessage>}

      {/* File input to add new images */}
      <InputContainer>
        <FileInputLabel htmlFor="file-input">
          {previewImages.length > 0 ? (
            previewImages.map((preview, index) => (
              <FilePreview key={index} src={preview} alt={`Preview ${index}`} />
            ))
          ) : (
            'Choose Files'
          )}
        </FileInputLabel>
        <HiddenFileInput
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
          disabled={loading}
        />
        <Button onClick={addImagesToAPI} disabled={newImageFiles.length === 0 || loading}>
          {loading ? 'Uploading...' : 'Add Images'}
        </Button>
      </InputContainer>

      {/* Display slideshow images */}
      <ImageContainer>
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image) => (
            <ImageCard key={image._id}>
              <Image src={image.url} alt={`Slide ${image._id}`} />
              <RemoveButton
                onClick={() => removeImageFromAPI(image._id)}
                disabled={loading}
              >
                Remove
              </RemoveButton>
            </ImageCard>
          ))
        ) : (
          <p>No images to display.</p>
        )}
      </ImageContainer>
    </SlideshowContainer>
  );
};

export default ManageSlideshow;
