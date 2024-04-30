
function Item(props) {

  return (
    <a href="#">
        <div>
            <img src={props.img} alt="Image Error" />
            <p>{props.author}</p>
            <p>{props.title}</p>
            <p>{props.area}</p>
            <p>{props.user}, {props.category}</p>
        </div>
    </a>
    
  );
}

export default Item;
