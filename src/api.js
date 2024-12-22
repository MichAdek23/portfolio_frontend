import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

/**
 * Fetch all projects.
 */
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data || [];  // Ensure it returns an empty array if the response data is not available
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];  // Graceful fallback to an empty array
  }
};

/**
 * Fetch a single project by ID.
 * @param {string} id - The project ID.
 */
export const fetchProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data || null;  // Graceful fallback if no data is returned
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    return null;  // Graceful fallback to null
  }
};

/**
 * Fetch the total count of projects.
 */
export const fetchProjectCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects/count`);
    return response.data.count || 0;  // Default to 0 if the API doesn't return count
  } catch (error) {
    console.error('Error fetching project count:', error);
    return 0;  // Graceful fallback to 0
  }
};

/**
 * Add a new project.
 * @param {object} newProject - The new project data (name, description).
 */
export const addProject = async (newProject) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, newProject);
    return response.data || null;  // Graceful fallback if no data is returned
  } catch (error) {
    console.error('Error adding new project:', error);
    throw error;  // Re-throw the error to handle it in the component
  }
};

/**
 * Update an existing project.
 * @param {string} id - The project ID.
 * @param {object} updatedProject - The updated project data (name, description).
 */
export const updateProject = async (id, updatedProject) => {
  try {
    const response = await axios.put(`${API_URL}/projects/${id}`, updatedProject);
    return response.data || null;  // Graceful fallback if no data is returned
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    throw error;  // Re-throw the error to handle it in the component
  }
};

/**
 * Delete a project by ID.
 * @param {string} id - The project ID to delete.
 */
export const deleteProject = async (id) => {
  try {
    await axios.delete(`${API_URL}/projects/${id}`);
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch all blogs.
 */
export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data || [];  // Return an empty array if no data
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];  // Graceful fallback to an empty array
  }
};

/**
 * Fetch a single blog by ID.
 * @param {string} id - The blog ID.
 */
export const fetchBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data || null;  // Graceful fallback if no data is returned
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    return null;  // Graceful fallback to null
  }
};

/**
 * Fetch the total count of blogs.
 */
export const fetchBlogCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs/count`);
    return response.data.count || 0;  // Default to 0 if the API doesn't return count
  } catch (error) {
    console.error('Error fetching blog count:', error);
    return 0;  // Graceful fallback to 0
  }
};

/**
 * Update an existing blog.
 * @param {string} id - The blog ID.
 * @param {object} updatedBlog - The updated blog data.
 */
export const updateBlog = async (id, updatedBlog) => {
  try {
    const response = await axios.put(`${API_URL}/blogs/${id}`, updatedBlog);
    return response.data || null;  // Graceful fallback if no data is returned
  } catch (error) {
    console.error(`Error updating blog with ID ${id}:`, error);
    return null;  // Graceful fallback to null
  }
};

/**
 * Delete a blog by ID.
 * @param {string} id - The blog ID to delete.
 */
export const deleteBlog = async (id) => {
  try {
    await axios.delete(`${API_URL}/blogs/${id}`);
  } catch (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch all reviews.
 */
export const fetchReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/reviews`);
    return response.data || [];  // Ensure an empty array if no data
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];  // Graceful fallback to an empty array
  }
};

/**
 * Fetch the total count of reviews.
 */
export const fetchReviewCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/reviews/count`);
    return response.data.count || 0;  // Default to 0 if the API doesn't return count
  } catch (error) {
    console.error('Error fetching review count:', error);
    return 0;  // Graceful fallback to 0
  }
};

/**
 * Fetch all images for the slideshow.
 */
export const fetchImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/slideshow`);
    return Array.isArray(response.data) ? response.data : [];  // Ensure the return is an array
  } catch (error) {
    console.error('Error fetching slideshow images:', error);
    return [];  // Graceful fallback to an empty array
  }
};

/**
 * Add multiple images to the slideshow.
 * @param {FormData} formData - Form data containing the images.
 */
export const addImages = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/slideshow/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data || [];  // Ensure it returns an array of the newly added images
  } catch (error) {
    console.error('Error adding images to slideshow:', error);
    throw error;
  }
};

/**
 * Delete an image from the slideshow.
 * @param {string} id - The ID of the image to delete.
 */
export const deleteImage = async (id) => {
  try {
    await axios.delete(`${API_URL}/slideshow/delete/${id}`);
  } catch (error) {
    console.error(`Error deleting image with ID ${id}:`, error);
    throw error;
  }
};
