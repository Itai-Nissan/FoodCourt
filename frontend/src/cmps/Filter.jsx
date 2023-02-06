import { Component } from 'react'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'


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

  onClickSearch = (e) => {
    if (e.key === 'Enter') {
      this.props.onChangeFilter({ ...this.state })
      // this.state.text = ''
    }
  }


  render() {
    const { text, type } = this.state
    return (
      <section className='food-filter' >
        <div className='food-container'>
          <TextField value={text} onChange={this.handleChange} onKeyDown={this.onClickSearch}
            type="text"
            name="text"
            id="standard-basic"
            label="Search"
            variant="standard" />
          {/* <Button onClick={this.onClickSearch}>SearchIt</Button> */}
        </div>
      </section>
    )
  }
}