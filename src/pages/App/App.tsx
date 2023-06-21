import React from 'react';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMogieCredits, getMogieDetail, getMogieReviews, getMogiesTrending } from '../../shared/services';
import { TrendingType } from '../../shared/enums';

function App() {
  // getMogiesTrending(TrendingType.day).then(res => console.log(res))
  // getMogieDetail(385687).then(res => console.log('detail',res))
  // getMogieReviews(385687).then(res => console.log('rew', res))
  // getMogieCredits(385687).then(res => console.log('cred', res))
  return (
    <div className="App">
      <ToastContainer />
    </div>
  );
}

export default App;
