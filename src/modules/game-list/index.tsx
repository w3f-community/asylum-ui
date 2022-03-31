import * as React from "react";
import { GameTable } from "../../components/game-table";
import { Hr } from "../../components/hr";

export const GameList = () => {
  return (
    <div className='bg-custom-gray px-[60px] py-[27px] rounded-[10px]'>
      <p className='custom-text text-header-of-page'>Select a game</p>
      <Hr />
      <GameTable />
    </div>
  );
};
