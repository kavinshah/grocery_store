import './App.css';
import React from 'react';

class GroceryStore extends  React.Component{
	constructor(props){
		super(props);
		this.state={
			stocked:false,
			data:this.props.data,
			filter:''
		};
		this.onInputChange=this.onInputChange.bind(this);
		this.onCheckBoxChanged=this.onCheckBoxChanged.bind(this);
		this.filterItems=this.filterItems.bind(this);
	}
	
	onInputChange(event){
		console.log('value:',event.target.value);
		this.filterItems(this.state.stocked, event.target.value);
		return;
	}
	
	onCheckBoxChanged(event){
		console.log(event.target.checked);
		this.filterItems(event.target.checked, this.state.filter);
		return;
	}
	
	filterItems(inStock, filterText){
		this.setState((state)=>({
			data:this.props.data.filter((item)=>{
						if(!(filterText===null || filterText=== '') && !inStock)
							return item.name.includes(filterText);
						else if(!(filterText===null || filterText=== '') && inStock)
							return item.name.includes(filterText) && item.stocked;
						else if((filterText===null || filterText=== '') && inStock)
							return item.stocked;
						else
							return true;
					}),
			stocked:inStock,
			filter:filterText
		}));
		return;
	}
	
	render(){
		return (
			<div>
				<Input onInputChange={this.onInputChange} onCheckBoxChanged={this.onCheckBoxChanged} />
				<table className='table'>
				<tbody>
					<tr id='heading' className='heading'>
						<td>Name</td>
						<td>Price</td>
					</tr>
					<Category categoryname='Fruits' items={this.state.data.filter((item)=>{
						return item.category==='Fruits'
					})} />
					<Category categoryname='Vegetables' items={this.state.data.filter((item)=>{
						return item.category==='Vegetables'
					})} />
				</tbody>
				</table>

			</div>
		);
	}
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

export default GroceryStore;
