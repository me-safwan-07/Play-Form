import React from 'react'
import { EditWelcomeCard } from './components/EditWelcomeCard'
import { AddQuestionButton } from './components/AddQuestionButton';

export const Edit = () => {
  return (
    <div>
      <div className="">
        <EditWelcomeCard 
          activeQuestionId="start"
        />
      </div>
      <div className="">
        <AddQuestionButton />
      </div>
    </div>
  );
};