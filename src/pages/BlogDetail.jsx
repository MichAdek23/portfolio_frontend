import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchBlogById } from '../api';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Content = styled.div`
  line-height: 1.8;
`;

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      const data = await fetchBlogById(id);
      setBlog(data);
    };
    getBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <Wrapper>
      <Title>{blog.title}</Title>
      <Content dangerouslySetInnerHTML={{ __html: blog.content }} />
    </Wrapper>
  );
}

export default BlogDetail;
