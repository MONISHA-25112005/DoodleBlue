import react from 'react';
const Button=({name,onclick}) =>{
    return(
        <button className="button" onClick={onclick}>
            {name}
            </button>
    );
};
export default Button;