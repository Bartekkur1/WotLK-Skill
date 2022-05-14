import { FC } from 'react';
import './App.css';
import { Search } from './components/search/Search';

export const App: FC = () => {
  return (
    <div className='app-container'>
      <Search />
    </div>
  )
}