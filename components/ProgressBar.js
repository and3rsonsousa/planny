const ProgressBar = (props) => {
  const width = props.completed
    ? (100 / props.actions) * props.completed + "%"
    : "0%";
  return (
    <div className="w-full overflow-hidden rounded">
      <div className="h-4 bg-gray-200">
        <div
          className="h-4 bg-success-400"
          style={{
            width: width,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
