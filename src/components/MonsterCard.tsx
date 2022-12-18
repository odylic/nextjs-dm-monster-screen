const MonsterCard = () => {
  return (
    <div className="p-5 rounded-lg m-5 text-center shadow-monsterCard bg-gray-300">
      <div>
        <input
          type="text"
          className="text-center text-xl w-60 h-10 rounded-md"
          placeholder="Monster Name"
        />
      </div>
      <div className="mt-2">
        <input
          type="number"
          className="w-16 h-10 text-center text-xl rounded-md mr-2"
          min="0"
          placeholder="HP"
        />
        <input
          type="number"
          className="text-center text-xl rounded-md w-16 h-10"
          placeholder="Temp"
          min="0"
        />
      </div>
      <div className="m-2">
        <button className="bg-gray-50 px-2 rounded-md">-</button>
        <input
          type="number"
          className="mx-2 w-24 text-center rounded-md"
          min="0"
        />
        <button className="bg-gray-50 px-2 rounded-md">+</button>
      </div>
      <textarea className="resize" id="text" cols="25" rows="5"></textarea>
    </div>
  );
};

export default MonsterCard;
