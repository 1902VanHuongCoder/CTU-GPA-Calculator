import PropTypes from "prop-types";

const Error = ({ message  }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-red-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Network Error</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    </div>
  );
};
Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
