const ProgressBar = (props) => {
  return (
    <div className="progress-bar w-full overflow-hidden rounded">
      <div className="progress-bar__content h-4 bg-gray-100">
        <div
          className="progress-bar__bar h-4 bg-green-300"
          style={{
            width: props.completed ? 100 / props.completed + "%" : "0%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
