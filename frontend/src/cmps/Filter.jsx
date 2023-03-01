import { Component } from 'react'
import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField'
import { Autocomplete } from '@mui/material';



export class Filter extends Component {

  state = {
    text: '',
    currentSearch: 'All',
    searchResult: null,
    type: '',
    loading: false,
  }

  componentDidUpdate() {
    this.state.loading = false
  }


  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? (+target.value || '') : target.value
    this.setState({ [field]: value }, () => {
    })
  }

  onClickSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.props.onChangeFilter({ ...this.state })
      this.state.currentSearch = this.state.text
      // this.state.currentSearch = ('Showing search result for - ' + this.state.text)
      this.state.text = ''
      this.state.loading = true
    }
  }

  render() {
    const { text, type } = this.state
    return (
      <div className='food-filter' >
        <section className="filter-result">
          <h4>Showing search result for - {this.state.currentSearch}</h4>
        </section>
        <section className='filter-container'>
          <TextField value={text} onChange={this.handleChange} onKeyDown={this.onClickSearch}
            type="text"
            name="text"
            id="standard-basic"
            label="Search"
            variant="standard" />
          <LoadingButton
            size="small"
            onClick={this.onClickSearch}
            loading={this.state.loading}
            variant="standard">
            Search
          </LoadingButton>
        </section>

      </div>
    )
  }
}