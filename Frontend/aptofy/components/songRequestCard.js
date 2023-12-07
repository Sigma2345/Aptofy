import React from "react";

const SongRequestCard = ({
  imageSrc,
  location,
  genres,
  onReject,
  onAccept,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0 w-1/4">
          <img
            src={imageSrc}
            alt="Hotel"
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="ml-4 flex-grow">
          <h2 className="text-xl font-semibold">{location}</h2>

          <p className="text-gray-600">Description of the hotel goes here.</p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Genres:</h3>
            <div className="flex space-x-2 overflow-x-auto">
              {genres.map((genre, index) => (
                <div key={index} className="px-2 py-1 bg-gray-200 rounded-md">
                  {genre}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button
              className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={onReject}
            >
              Reject
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={onAccept}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongRequestCard;
