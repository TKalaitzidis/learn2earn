
function Item(props) {

  return (
    <a href="#">
        <div>
            <img src={props.img} alt="Image Error" />
            <p>{props.author}</p>
            <p>{props.title}</p>
            <p>{props.price}</p>
        </div>
    </a>
    
  );
}

export default Item;
