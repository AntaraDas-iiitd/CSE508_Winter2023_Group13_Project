
function OpenPlace(props) {
  const { place } = props;

  return (
    <div>
    <h2>{place.title}</h2>
      <p>{place.description}</p>
      <p>City: {place.city}</p>
      <p>State: {place.state}</p>
    </div>
  );
}

export default OpenPlace