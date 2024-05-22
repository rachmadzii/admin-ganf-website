import { loadingIcon } from '../../assets';

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <img
        src={loadingIcon}
        alt="Loading Icon"
        className="animate-spin w-8 h-8 mr-2"
      />
      Loading...
    </div>
  );
};

export default Loading;
