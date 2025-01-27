import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Header from '../../component/Header';
import Post from '../../component/Post';
import SubBar from './assets/SubBar';
import Pagination from './assets/Pagination';
import http from '../../api/http.js';

const PostList = styled.div`
  padding: 1rem 6vw 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2.5rem 0;
`;

export default function PostListPage() {
  const [postList, setPostList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPostList = async() => {
      try {
        const res = await http.get('/post');
        setPostList(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPostList();
  }, []);
  
  return (
    <>
      <Header />
      <SubBar />
      <PostList>
        {postList && postList.map((data) => {
          return (<Post key={data.id} data={data} />);
        })}
      </PostList>
      <PaginationWrapper>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </PaginationWrapper>
    </>
  );
}