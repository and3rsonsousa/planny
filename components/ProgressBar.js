const ProgressBar = (props) => {
  const width = props.completed
    ? (100 / props.actions) * props.completed + "%"
    : "0%";
  return (
    <div className="progress-bar w-full overflow-hidden rounded">
      <div className="progress-bar__content h-4 bg-gray-100">
        <div
          className="progress-bar__bar h-4 bg-green-300"
          style={{
            width: width,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
