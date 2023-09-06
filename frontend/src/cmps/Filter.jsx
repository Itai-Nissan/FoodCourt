import { Component } from 'react'
import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import TextField from '@mui/material/TextField'
import { Input } from '@mui/material'
import { Autocomplete } from '@mui/material'

export class Filter extends Component {

  state = {
    text: '',
    category: '',
    currentSearch: this.props.filterBy.category ? this.props.filterBy.category : 'All',
    searchResult: null,
    type: '',
  }

  componentDidUpdate() {
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
      this.state.text = ''
      console.log(window.location);
    }
  }

  onClickReset = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.state.text = ''
      this.props.onChangeFilter({ ...this.state })
      this.state.currentSearch = 'All'
      this.state.loading = true
    }
  }

  render() {
    const { text, type } = this.state
    return (
      <div className='food-filter' >
        <section className="filter-result">
          <h4>Showing {this.props.resultsNumber} {this.state.currentSearch ? this.state.currentSearch.toUpperCase() : 'All'} search result </h4>
          <Button
            size="small"
            onClick={this.onClickReset}
            // loading={this.state.loading}
            variant="standard">
            Reset
          </Button>
        </section>
        <section className='filter-container'>
          <input
            placeholder='Enter search here'
            value={text}
            onChange={this.handleChange}
            onKeyDown={this.onClickSearch}
            type="text"
            name="text"
            id="standard-basic"
            label="Search"
            variant="standard" />
          <LoadingButton
            size="medium"
            onClick={this.onClickSearch}
            loading={this.props.isLoading}
            variant="standard">
            {this.props.isLoading ? '' : 'Search'}
          </LoadingButton>
        </section>
      </div>
    )
  }
}