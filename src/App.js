import './App.css';
import React, {useState} from 'react';

function GroceryStore({data}){
	const [stocked, setStocked] = useState(false);
	const [filter, setFilter] = useState('');
	const fruits = data.filter((item)=>{return item.category==='Fruits'});
	const vegetables = data.filter((item)=>{return item.category==='Vegetables'});
	
	return (
		<div>
			<Input onInputChange={(event)=> setFilter(event.target.data)} onCheckBoxChanged={(event)=> setStocked(event.target.checked)} />
			/*
				TODO
				1. Convert the entire block below into a separate component.
				2. Identify the categories dynamically.
			*/
			<table className='table'>
			<tbody>
				<tr id='heading' className='heading'>
					<td>Name</td>
					<td>Price</td>
				</tr>
				<Category categoryname='Fruits' items={filterItems(fruits, stocked, filter)} />
				<Category categoryname='Vegetables' items={filterItems(vegetables, stocked, filter)} />
			</tbody>
			</table>
		</div>
	);
}

function filterItems(data, inStock, filterText){
	return data.filter((item)=>{
					if(!(filterText===null || filterText=== '') && !inStock)
						return item.name.includes(filterText);
					else if(!(filterText===null || filterText=== '') && inStock)
						return item.name.includes(filterText) && item.stocked;
					else if((filterText===null || filterText=== '') && inStock)
						return item.stocked;
					else
						return true;
				});
}

function Input({onInputChange, onCheckBoxChanged}){
	return(
		<div>
			<form>
				<input type='text' placeholder='Search...' onChange={onInputChange} /><br />
				<label>
					<input type='checkbox' onClick={onCheckBoxChanged} />
					Only show products in stock
				</label>
			</form>
		</div>
	);
}

function Category({categoryname, items}){
	return (
		<>
			<tr id={categoryname} className='heading'>
				<td span='2' className='category-head'>{categoryname}</td>
			</tr>
			{
				items.map((val, index)=> {
					return <Item key={index} id={index} name={val.name} price={val.price} stocked={val.stocked} />
				})
			}
		</>
	);
}

function Item({id, stocked, name, price}){
	return (
		<tr id={id} className={stocked===true?'stocked':'unstocked'}>
			<td>{name}</td>
			<td>{price}</td>
		</tr>
	);
}

export default GroceryStore;