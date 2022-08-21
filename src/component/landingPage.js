
import '../App.css';

function App(props) {

  return (
    <div className="row m-2">
    {props.items.map((item,i) => {
      return (
        <div key={i} className="col-sm-6 col-md-3 v my-2" onClick={()=>props.descriptionPage(item)}>
          <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png`} className="card-img-top" alt={item.name} style={{backgroundColor:"#e6e8ea"}}/>
            <div className="card-body">
              <h5 className="card-title text-center h2">{item.name} </h5>
              <h6 className="card-subtitle mb-2 text-muted text-center">
                {"#"+item.url.split('/')[6]}
              </h6>
            </div>
          </div>
        </div>
      );
    })}
  </div>
  );
}

export default App;
