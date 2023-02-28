import { Component } from 'react'
import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField'
import { Autocomplete } from '@mui/material';



export class Filter extends Component {

  state = {
    text: '',
    type: '',
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? (+target.value || '') : target.value
    this.setState({ [field]: value }, () => {
    })
  }

  onClickSearch = (e) => {
    console.log(e);
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.onChangeFilter({ ...this.state })
      this.state.text = ''
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
          <Button onClick={this.onClickSearch}>Search</Button>
        </div>
        <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
          Fetch data
        </LoadingButton>

      </section>
    )
  }
}