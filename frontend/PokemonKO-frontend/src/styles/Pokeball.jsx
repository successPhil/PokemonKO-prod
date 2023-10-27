const Pokeball = () => {
    const stylez = { color: '#6F58C9' };
    const stylex = { color: '#f0f0f0' };
    const styleX = { color: '#f7c846' };
  
    return (
      <div>
        <span className="pokeball">Z</span>
        <span className="pokeball" style={stylez}>z</span>
        <span className="pokeball" style={styleX}>X</span>
        <span className="pokeball" style={stylex}>x</span>
      </div>
    );
  };

export default Pokeball
  