import React, { useState, useEffect } from 'react';
import BlogCard from './BlogList';
import { fetchBlogs } from '../api';  // Import the API function to fetch blogs

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  // Define the function to fetch blogs
  const loadBlogs = async () => {
    try {
      const fetchedBlogs = await fetchBlogs();
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Fetch blogs when the component mounts
  useEffect(() => {
    loadBlogs(); // Fetch blogs initially
  }, []);

  // Refresh the blog list after editing or deleting a blog
  const handleEdit = () => {
    loadBlogs();  // Re-fetch blogs after an edit
  };

  const handleDelete = () => {
    loadBlogs();  // Re-fetch blogs after a delete
  };

  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard 
          key={blog._id} 
          blog={blog} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      ))}
    </div>
  );
};

export default BlogList;
