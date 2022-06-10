import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useState } from 'react';
import './style.css';

function GeneSearch(props) {
  //console.log(props.data.search.genes);
  const [SearchQuery, setSearchQuery] = useState('');
  const searchTerm = '';
  const handlechange = e => {
    setSearchQuery(e.target.value);
    //console.log(SearchQuery);
    props.que(() => SearchQuery);
  };
  return (
    <>
      <Autocomplete
        multiple
        limitTags={2}
        options={props.data.search.genes}
        getOptionLabel={option => option.symbol}
        renderInput={params => (
          <TextField
            className="genesearhbox"
            {...params}
            label="Select Gene(s)"
            placeholder="Select Multiple Gene(s)..."
            value={SearchQuery}
            onInput={handlechange}
            //onChange={() => props.searchQuery(searchTerm)}
          />
        )}
      />
    </>
  );
}

export default GeneSearch;
