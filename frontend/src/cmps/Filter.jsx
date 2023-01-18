import { Component } from 'react'

export class Filter extends Component {

  state = {
    text: '',
    type: '',
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? (+target.value || '') : target.value
    this.setState({ [field]: value }, () => {
      // this.props.onChangeFilter({ ...this.state })
    })
  }
  
  onClickSearch = ()=>{
    console.log({...this.state});
    this.props.onChangeFilter({ ...this.state })
  }


  render() {
    const { text, type } = this.state
    return (
      <section className='food-filter' >
        <div>
          <label htmlFor="text">Search</label>
          <input value={text} onChange={this.handleChange} type="text" name="text" id="text" />
        </div>
        <button onClick={this.onClickSearch}>SearchIt</button>
      </section>
    )
  }
}