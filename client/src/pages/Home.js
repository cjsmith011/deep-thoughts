import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import Thoughtlist from '../components/Thoughtlist';

const Home = () => {
  //use useQuery hook to make a query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  //use this to get to the thought data
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Thoughtlist thoughts={thoughts} title="Some Feed for Thought(s)..." />
          
          )}
          </div>
      </div>
    </main>
  );
};

export default Home;
