import { useState } from 'react';

function VotingApp() {
  // Track selected votes
  const [selectedVotes, setSelectedVotes] = useState([]);
  // Track modal visibility and selected vote for confirmation
  const [showModal, setShowModal] = useState(false);
  const [voteToConfirm, setVoteToConfirm] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const cars = [
    { id: 'vote1', name: 'Lamborghini Huracan' },
    { id: 'vote2', name: 'Ferrari 488 GTB' },
    { id: 'vote3', name: 'McLaren 720S' },
    { id: 'vote4', name: 'Audi R8 V10 Plus' },
  ];

  const handleCheckboxChange = (car) => {
    if (selectedVotes.includes(car.id)) {
      setSelectedVotes(selectedVotes.filter((id) => id !== car.id));
    } else if (selectedVotes.length < 2) {
      setSelectedVotes([...selectedVotes, car.id]);
    }
  };

  const handleVoteClick = () => {
    if (selectedVotes.length === 1) {
      setVoteToConfirm(selectedVotes[0]);
      setShowModal(true);
    }
  };

  const confirmVote = (confirm) => {
    if (confirm) {
      setHasVoted(true);
      setSelectedVotes([voteToConfirm]);
    } else {
      setSelectedVotes([]);
    }
    setShowModal(false);
  };

  return (
    <div className="border text-gray-200 py-6 px-6 flex flex-col gap-8 w-full md:w-3/5">
      <h3 className="text-color font-bold text-xl">Cast Votes</h3>
      <div className="input text-sm flex flex-col gap-2">
        {cars.map((car) => (
          <div
            key={car.id}
            className={`flex justify-between items-center black-bg px-5 py-1 rounded-md ${selectedVotes.includes(car.id) ? 'bg-green-500' : 'bg-gray-800'}`}
          >
            <p>{car.name}</p>
            <input
              type="checkbox"
              id={car.id}
              name={car.id}
              checked={selectedVotes.includes(car.id)}
              onChange={() => handleCheckboxChange(car)}
              className="hidden"
            />
            <label htmlFor={car.id} className="cursor-pointer"></label>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <button
          className={`py-2 rounded-full px-6 ${selectedVotes.length === 1 ? 'bg-green-500 border border-green-500' : 'bg-gray-600'} ${hasVoted ? 'text-green-500 border border-green-500' : 'text-black'}`}
          onClick={handleVoteClick}
          disabled={hasVoted}
        >
          {hasVoted ? 'Voted' : 'Cast Vote'}
        </button>
      </div>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <p className="text-lg mb-4">Do you want to continue voting for {cars.find((car) => car.id === voteToConfirm).name}?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => confirmVote(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => confirmVote(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VotingApp;
