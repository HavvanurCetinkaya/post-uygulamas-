import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import HomeCard from '../components/HomeCard';
import { getPostsAction } from '../redux/actions/post';

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  return (
    <div className='flex items-center m-5 flex-wrap'>
      {
        posts.length > 0 && posts.map((post, i) => (
          <HomeCard key={i} post={post} />
        ))
      }
    </div>
  )
}

export default Home
