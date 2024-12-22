import React, { useState } from 'react';
import styled from 'styled-components';
import BlogCard from './BlogList';
import BlogForm from './BlogForm';

const ManageBlogsWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent; /* Set background to transparent */

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333; /* Set a color for the title */

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const BlogList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center; /* Center the blog cards horizontally */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack blog cards vertically on small screens */
    align-items: center; /* Center items horizontally */
  }
`;

const AddBlogButton = styled.button`
  padding: 1rem 2rem;
  background: #007bff;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
  margin-bottom: 2rem;
  cursor: pointer;
  
  &:hover {
    background: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const BlogManager = () => {
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'Blog 1', excerpt: 'This is the first blog.' },
    { id: 2, title: 'Blog 2', excerpt: 'This is the second blog.' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  const handleAddBlogClick = () => {
    setShowForm(true);
    setCurrentBlog(null); // Create a new blog
  };

  const handleEditBlogClick = (blog) => {
    setShowForm(true);
    setCurrentBlog(blog); // Edit existing blog
  };

  const handleDeleteBlogClick = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleSaveBlog = (newBlog) => {
    if (currentBlog) {
      setBlogs(blogs.map(blog => (blog.id === currentBlog.id ? newBlog : blog)));
    } else {
      setBlogs([...blogs, newBlog]);
    }
    setShowForm(false);
  };

  return (
    <ManageBlogsWrapper>
      <Title>Manage Blogs</Title>
      <AddBlogButton onClick={handleAddBlogClick}>Add New Blog</AddBlogButton>
      
      {showForm ? (
        <BlogForm blog={currentBlog} onSave={handleSaveBlog} />
      ) : (
        <BlogList>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onEdit={() => handleEditBlogClick(blog)}
              onDelete={() => handleDeleteBlogClick(blog.id)}
            />
          ))}
        </BlogList>
      )}
    </ManageBlogsWrapper>
  );
};

export default BlogManager;
