import * as React from 'react';
import { GameList } from '../modules/game-list';

export const Core = () => {
  return (
    <div className='h-screen flex justify-center items-center bg-gradient-to-b from-custom-gray via-white to-white'>
      <GameList />
    </div>
  );
};
