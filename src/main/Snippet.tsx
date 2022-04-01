interface IProps {
  snippet: string;
  onDeselect: () => void;
}

const Snippet = (props: IProps) => {
  const { snippet, onDeselect } = props;

  return (
    <div className='snippet'>
      {snippet}
      <button onClick={() => onDeselect()}>Remove</button>
    </div>
  );
};

export default Snippet;
