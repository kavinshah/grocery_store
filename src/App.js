import './App.css';
import React, {useState} from 'react';

function GroceryStore({data}){
	const [stocked, setStocked] = useState(false);
	const [filter, setFilter] = useState('');
	
	return (
		<div>
			<Input onInputChange={(event)=> setFilter(event.target.value)} onCheckBoxChanged={(event)=> setStocked(event.target.checked)} />
			<Items data={data} stocked={stocked} filter={filter} />
		</div>
	);
}

function Items({data, stocked, filter}){
	let categories = [];
	data.map((item, index)=> {
		if(!categories.includes(item.category))
			categories.push(item.category);
		return true;
	});
	
	return(
		<table className='table'>
			<tbody>
				<tr id='heading' className='heading'>
					<td>Name</td>
					<td>Price</td>
				</tr>
				{
					categories.map((item, index)=>{
						return (
							<Category key={index} categoryname={item}
								items={filterItems(data.filter((x)=> x.category===item), stocked, filter)} />
						)
					})
				}
			</tbody>
		</table>
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
