import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import { searchProductsService } from '../../services/products.services';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { CloseIconStyled } from '../sideNavbar';
import { Clear } from '@mui/icons-material';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [searchText, setSearchText] = React.useState('')
  const loading = open && options.length === 0;

  const router = useRouter()

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    // (async () => {
    //   await sleep(1e3); // For demo purposes.

    //   if (active) {
    //     setOptions([...topFilms]);
    //   }
    // })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
      setSearchText('');
    }
  }, [open]);

  React.useEffect(() => {
    if(searchText && !options.length){
      setOpen(false)
    }
  }, [searchText])
  const searchCall =async (query)  => {

    if(!query) return;
    try {
      const response = await searchProductsService({text: query});
      const data = response?.data?.data
      // setOptions([...response?.data?.data]);
      return data
    
    } catch (error) {
      console.log(error)
      return
    }
  }

  const debouncedFetchData = debounce(async (query) => {
    setSearchText(query)
   const res = await searchCall(query);
   console.log('res',res)

   setOptions(res || [])
   }, 500);
   
 console.log(options)
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    <Autocomplete
      id="search-bar"
      size='small'
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(searchText ? true : false);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      onChange={(event, option) => {
        if(option){
        router.push({pathname: `/products/${option?.slug}`});
        setOptions([]);
        setSearchText('');
        setOpen(false)
        event.target.value = ''
      }
      }}
      popupIcon={<SearchIcon sx={{width: "80%", }}/>}
      // clearIcon={<CloseIconStyled sx={{width: "80%", }}/>}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          onChange={(e) => debouncedFetchData(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} />  : null }
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    </div>
  );
}

