const makeGreeter = (greeting)=>
{
  return (name)=>{
     return greeting + " "+name
  };
}
console.log(makeGreeter("Hello")("Asha"))
