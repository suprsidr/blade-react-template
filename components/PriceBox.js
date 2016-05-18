import React, {Component} from 'react';
import Toolbar from './Toolbar';

class PriceBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }
  save() {
    const arr = this.props.prices.slice();
    arr[this.props.index] = {
        className: [this.refs.class1.value, this.refs.class2.value],
        price: this.refs.price.value,
        completion: this.refs.completion.value,
        prodId: this.refs.prodId.value,
        neededToComplete: Array.from(this.refs.needed.children).map((item, i) => item.querySelector('input').value),
        specs: Array.from(this.refs.specs.children).map((row, i) => ({name: row.children[0].value,value: row.children[1].value})),
        url: this.refs.url.value
      };
    this.props.updateState({
      prices: arr
    });
    this.toggleEditing();
  }
  toggleEditing() {
    this.setState({
      editing: !this.state.editing
    });
    return false;
  }
  deleteItem() {
    const arr = this.props.prices.slice();
    if(arr.length === 1) return;
    arr.splice([this.props.index], 1);
    this.props.updateState({
      prices: arr
    });
  }
  addItem() {
    const arr = this.props.prices.slice();
    if(arr.length === 3) return;
    arr.push(arr[0]);
    this.props.updateState({
      prices: arr
    });
  }
  deleteNeededItem(idx) {
    const arr = this.props.prices.slice();
    if(arr[this.props.index].neededToComplete.length === 1) return;
    arr[this.props.index].neededToComplete.splice(idx, 1);
    this.props.updateState({
      prices: arr
    });
  }
  addNeededItem() {
    const arr = this.props.prices.slice();
    arr[this.props.index].neededToComplete.push(arr[this.props.index].neededToComplete[0]);
    this.props.updateState({
      prices: arr
    });
  }
  deleteSpecItem() {
    let arr = this.props.prices.slice();
    if(arr[this.props.index].specs.length === 1) return;
    arr[this.props.index].specs.splice(null, 1);
    this.props.updateState({
      prices: arr
    });
  }
  addSpecItem() {
    const arr = this.props.prices.slice();
    arr[this.props.index].specs.push(arr[this.props.index].specs[0]);
    this.props.updateState({
      prices: arr
    });
  }
  renderItemOrEdit() {
    const box = this.props.prices[this.props.index];
    if (this.state.editing) {
      return(<div className="flex-item-auto text-center">
        <div className="flex-it flex-col controls">
          <label>
            Plan:
            <select ref="class1" defaultValue={box.className[0]}>
              <option value="">Regular</option>
              <option value="best-plan">Best</option>
            </select>
          </label>
          <label>
            Background-color:
            <select ref="class2" defaultValue={box.className[1]}>
              <option value="text-price">Red</option>
              <option value="text-price-grey">Grey</option>
            </select>
          </label>
          <label>
            Price:
            <input ref="price" defaultValue={box.price}/>
          </label>
          <label>
            Completion:
            <input ref="completion" defaultValue={box.completion}/>
          </label>
          <label>
            ProdID:
            <input ref="prodId" defaultValue={box.prodId}/>
          </label>
          <label>Needed To Complete:</label>
          <label ref="needed" className="flex-it flex-col">
            {box.neededToComplete.map((item, i) => (
              <span key={i} className="editable-item">
                <input defaultValue={item} style={{width: '100%'}}/>
                {(i === box.neededToComplete.length - 1) && <Toolbar miniclass=" mini" onClick={() => this.toggleEditing()} onDelete={() => this.deleteNeededItem()} onAdd={() => this.addNeededItem()}/>}
              </span>
            ))}
          </label>
          <label>Specs:</label>
          <label ref="specs" className="flex-it flex-col specs-edit">
            {box.specs.map((item, i) => (
              <span key={i} className="editable-item">
                <input defaultValue={item.name}/>&nbsp;<input defaultValue={item.value}/>
                {(i === box.specs.length - 1) && <Toolbar miniclass=" mini" onClick={() => this.toggleEditing()} onDelete={() => this.deleteSpecItem()} onAdd={() => this.addSpecItem()}/>}
              </span>
            ))}
          </label>
          <label>Purchase URL:</label>
          <label className="flex-it flex-col">
            <input ref="url" defaultValue={box.url}/>
          </label>
          <button className="saver" onClick={() => this.save()}>Save</button>
        </div>
      </div>)
    } else {
      return (
        <div className={`flex-item-auto ${box.className[0]} editable-item`}>
          <div className={box.className[1]}>
            <h3>${box.price}</h3>
            <span>{box.completion}</span>
            <p>
              <span>{box.prodId}</span>
            </p>
          </div>
          <div className="pricing-box-container">
            <div className="list-box-content">
              <ul>
              {box.neededToComplete.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
              </ul>
              <ul>
                <li><strong>Specs:</strong></li>
                {box.specs.map((spec, i) => (
                  <li key={i}><strong>{spec.name}:</strong> {spec.value}</li>
                ))}
              </ul>
            </div>
            <div>
              <a href="/StoreLocator/" className="button small round green">
                <span className="shopNowText">Find&nbsp;a&nbsp;Retailer</span><i className="icon-circle-arrow-right"/></a>
              <a href={box.url} className="button small round green">
                <span className="buyNowText">Buy Now</span><i className="icon-circle-arrow-right"/></a>
            </div>
          </div>
          {this.props.updateState && <Toolbar onClick={() => this.toggleEditing()} onDelete={() => this.deleteItem()} onAdd={() => this.addItem()}/>}
        </div>
      )
    }
  }
  render() {
    return this.renderItemOrEdit();
  }
}

PriceBox.propTypes = {
  updateState: React.PropTypes.func,
  prices: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired
};

export default PriceBox;
