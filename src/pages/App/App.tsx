import React, { Suspense, useCallback, useEffect } from 'react';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Auth, DashboardLayer, Home, Login, Logout, MovieDetails, MovieDetailsCast, MovieDetailsReviews, Movies, MoviesList, NotFound, getLocalStorage, loadConfiguration } from '../../shared/services';
import { AppRouteMap } from '../../shared/enums';
import {BrowserRouter, Route, Routes, useBeforeUnload} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

function App() {
  const [loadApp, setLoadApp] = React.useState<boolean>(false);

  useBeforeUnload(
    useCallback(() => {
      setLoadApp(true);
    }, [loadApp])
  );

  useEffect(() => {
    if(!getLocalStorage('config')) {
      loadConfiguration()
    }
  }, [loadApp])

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={AppRouteMap.home} element={<DashboardLayer />}>
              <Route index element={<Home />} />
              <Route path={AppRouteMap.movies} element={<Movies />} >
                <Route index element={<MoviesList />} />
                <Route path={AppRouteMap.movieDetails} element={<MovieDetails />} />
                <Route path={AppRouteMap.movieCast} element={<MovieDetailsCast />} />
                <Route path={AppRouteMap.movieReviews} element={<MovieDetailsReviews />} />
              </Route>
            </Route>
            <Route path={AppRouteMap.notFound} element={<NotFound />} />
            <Route path={AppRouteMap.auth} element={<Auth />} >
              <Route index element={<Login />} />
              <Route path={AppRouteMap.logout} element={<Logout />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
