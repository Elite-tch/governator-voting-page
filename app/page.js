'use client'

import Image from "next/image";
import { useState } from 'react';


export default function Home() {

  const cars = [
    { id: 'vote1', name: 'Lamborghini Huracan', votes: 0 },
    { id: 'vote2', name: 'Ferrari 488 GTB', votes: 0 },
    { id: 'vote3', name: 'McLaren 720S', votes: 0 },
    { id: 'vote4', name: 'Audi R8 V10 Plus', votes: 0 },
  ];

  const [votes, setVotes] = useState(cars);
  const [selectedVote, setSelectedVote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleCheckboxChange = (carId) => {
    setSelectedVote(carId);
  };

  const handleVoteClick = () => {
    if (selectedVote) {
      setShowModal(true);
    }
  };
  const confirmVote = (confirm) => {
    if (confirm && selectedVote) {
      const updatedVotes = votes.map((car) =>
        car.id === selectedVote ? { ...car, votes: car.votes + 1 } : car
      );
      setVotes(updatedVotes);
      setHasVoted(true);
    }
    setShowModal(false);
    setSelectedVote(null);
  };

  // Find the car with the most votes
  const winningCar = votes.reduce((max, car) => (car.votes > max.votes ? car : max), votes[0]);




  
  return (
    <div className="bg-gray-900 md:h-screen pb-16">
      <div className="md:mx-8 mx-4 pt-6">
    <div className="flex justify-between items-center rounded-xl border py-2 px-1 md:px-3 ">
    <div className="flex items-center">
      <Image src="/gover.png" alt="logo" width={34} height={34}/>
      <h1 className="text-white font-bold">
        GOVERNATOR
      </h1>
    </div>
    <div className="flex items-center md:gap-2  gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>
<div className="flex items-center gap-1 md:gap-2 border rounded-full p-1">
  <Image src='/avartar.png' alt="avartar" className=" bg-text rounded-full" width={30} height={30}/>
  <h3 className="text-white">
    Franklinvania
  </h3>
</div>
    </div>
    </div>

<div className="flex gap-8 mt-10 md:mt-16 md:mx-8 md:flex-row flex-col">
<div className="border text-gray-200 py-4 px-6 flex flex-col gap-3 w-full md:w-4/5">
  <h3 className="text-color font-bold text-xl">Your favourite sports car</h3> 
<div>
<h4 className="text-lg">Description</h4>
<div className="black-bg text-gray-400 p-3 text-sm rounded mt-2">
 <h5 className="pb-2 font-bold">Which supercar do you think deserves the top spot? Vote now and join the debate!.
 </h5> 
<h5>The Contenders:</h5>
<ul className="list-disc pl-5">
<li>Lamborghini Huracan: The Italian stallion with a roaring V10 engine and sleek design.
</li>
<li>Ferrari 488 GTB: The Prancing Horse's powerhouse with a turbocharged V8 and razor-sharp handling.
</li>
<li>McLaren 720S: The British bullet with a lightning-quick V8 and cutting-edge tech.
</li>
</ul>
</div>
<div className="text-sm pt-3">
<h4 className="text-lg">Duration</h4>
<p> <span className="text-color">From:</span> Tuesday, 3rd September 2024, 3:00pm WAT </p>
<p> <span className="text-color">To:</span> Thursday, 5th September 2024, 3:00pm WAT</p>
<p>About 2 days remaining</p>
</div>
</div>
</div>

<div className="border text-gray-200 py-6 px-6 flex flex-col gap-8 w-full md:w-3/5">
      <div><h3 className="text-color font-bold text-xl">Cast Votes</h3>
<p>Click or tap in any option to select</p> </div>
      <div className="input text-sm flex flex-col gap-4">
        {votes.map((car) => {
          // Calculate overlay width based on votes
          const overlayWidth = Math.min(car.votes * 10, 100);

          return (
<div  key={car.id}
              className="relative flex items-center black-bg px-5 py-1 rounded-md"
            >
              <p>{car.name}</p>

              {/* Progress overlay */}
              <div
                className="absolute inset-0 rounded-md"
                style={{
                  backgroundColor: car.votes > 0 ? 'rgb(34,197,94,0.7)' : 'transparent',
                  width: `${overlayWidth}%`,
                    
                }}
              ></div>

              <input
                type="checkbox"
                id={car.id}
                name={car.id}
                checked={selectedVote === car.id}
                onChange={() => handleCheckboxChange(car.id)}
                className="hidden"
              />
              <label htmlFor={car.id} className="ml-auto cursor-pointer"></label>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
        <button
          className={`py-2 rounded-full  ${selectedVote ? 'bg-green-500 border border-green-500' : 'border'} text-black`}
          onClick={handleVoteClick}
          disabled={hasVoted}
        >
      
      <span className={`px-4 py-2 rounded-full ${hasVoted ? 'bg-green-500 px-8 py-3 border-0 text-white' : 'bg-transparent text-white'}`}>
  {hasVoted ? 'Voted' : 'Cast Vote'}
</span>


        </button>
      </div>

      {hasVoted && (
        <div className="mt-4 text-center text-green-500 font-bold">
          Winner: {winningCar.name} with {winningCar.votes} votes!
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-md shadow-lg text-center">
            <h4 className="text-green-600 font-bold text-xl pb-2">Confirm</h4>
            <p className="text-lg mb-4">
              Are you sure you want to vote for:   
               {votes.find((car) => car.id === selectedVote).name}?  <span/>
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => confirmVote(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Vote </button>
              <button
                onClick={() => confirmVote(false)}
                className="bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>




</div>
</div>

    </div>
        
  );
}
