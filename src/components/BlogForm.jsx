import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'; // Importing icons

const FormWrapper = styled.div`
  background: transparent;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  margin: auto;

  @media (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: #007bff;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const ImageThumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  display: block;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const IconButton = styled(Button)`
  padding: 0.5rem;
  background: transparent;
  color: #007bff;
  font-size: 1.5rem;

  &:hover {
    background: #e0e0e0;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const BlogForm = ({ blog, onSave }) => {
  const [title, setTitle] = useState(blog ? blog.title : '');
  const [excerpt, setExcerpt] = useState(blog ? blog.excerpt : '');
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setExcerpt(blog.excerpt);
      setCoverImage(blog.coverImage);
      setAdditionalImages(blog.additionalImages || []);
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      id: blog ? blog.id : Date.now(),
      title,
      excerpt,
      coverImage,
      additionalImages,
    };
    onSave(newBlog);
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        if (type === 'cover') {
          setCoverImage(imageUrl);
        } else {
          setAdditionalImages((prev) => [...prev, imageUrl]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (index, type) => {
    if (type === 'cover') {
      setCoverImage(null);
    } else {
      setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
        />
        <Textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Blog Excerpt"
        />

        {/* Cover Image Upload */}
        <div>
          <Label>Cover Image</Label>
          <IconButton
            type="button"
            onClick={() => document.getElementById('cover-image-input').click()}
          >
            <AiOutlinePlus />
          </IconButton>
          <HiddenInput
            id="cover-image-input"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'cover')}
          />
          {coverImage && (
            <div>
              <ImageThumbnail src={coverImage} alt="Cover Image Preview" />
              <IconButton type="button" onClick={() => handleImageRemove(null, 'cover')}>
                <AiOutlineDelete />
              </IconButton>
            </div>
          )}
        </div>

        {/* Button for Adding Additional Images */}
        <div>
          <Label>Additional Images</Label>
          <IconButton
            type="button"
            onClick={() => document.getElementById('additional-images-input').click()}
          >
            <AiOutlinePlus />
          </IconButton>
          <HiddenInput
            id="additional-images-input"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'additional')}
          />
          <ImagePreview>
            {additionalImages.map((img, index) => (
              <ImageWrapper key={index}>
                <ImageThumbnail src={img} alt={`Additional Image ${index + 1}`} />
                <IconButton type="button" onClick={() => handleImageRemove(index, 'additional')}>
                  <AiOutlineDelete />
                </IconButton>
              </ImageWrapper>
            ))}
          </ImagePreview>
        </div>

        <Button type="submit">{blog ? 'Update Blog' : 'Add Blog'}</Button>
      </form>
    </FormWrapper>
  );
};

export default BlogForm;
