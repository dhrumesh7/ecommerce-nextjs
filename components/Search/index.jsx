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
import { InputAdornment, ListItemIcon, ListItemText, styled } from '@mui/material';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [searchText, setSearchText] = React.useState('')
  const [loading, setLoading] = React.useState(false);
  // const loading = open && options.length === 0;

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

  // React.useEffect(() => {
  //   if(searchText && !options.length){
  //     setOpen(false)
  //   }
  // }, [searchText])
  const searchCall = async (query) => {

    if (!query) return;
    try {
      setLoading(true);
      const response = await searchProductsService({ text: query });
      const data = response?.data?.data
      setLoading(false);
      // setOptions([...response?.data?.data]);
      return data

    } catch (error) {
      setLoading(false);
      console.log(error)
      return
    }
  }

  const debouncedFetchData = debounce(async (query) => {
    setSearchText(query)
    const res = await searchCall(query);

    setOptions(res || [])
  }, 500);

  const StyledOption = styled('li')(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    '& > svg': {
      marginRight: theme.spacing(1),
    },
  }));
const searchClick = (slug) => {
  router.push(`/products/${slug}`)
  setSearchText('');

}
  function renderOption(props, option, { selected }) {
    const label = props.key;
    return (
      <> 
      {/* <Link href={`/products/${option.slug}`} style={{textDecoration: "none", color: "black"}}> */}
      <StyledOption selected={selected} component="li" onClick={()=> searchClick(option.slug)}>
        {/* <ListItemIcon>
          {selected ? <CheckIcon /> : null}
        </ListItemIcon> */}
        <ListItemText primary={label} />
      </StyledOption>
      {/* </Link> */}
      </>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
          if (option) {
            router.push({ pathname: `/products/${option?.slug}` });
            setOptions([]);
            setSearchText('');
            setOpen(false)
            event.target.value = ''
          }
        }}
        popupIcon={<></>}
        renderInput={(params) => (
          <TextField
            sx={{ border: '#000', color: '$000', outline: '#000' }}
            variant="standard"
            placeholder='Search'
            {...params}
            onChange={(e) => debouncedFetchData(e.target.value)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (<InputAdornment position="start"> <SearchIcon />
              </InputAdornment>),
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        renderOption={(props, option, state) => searchText && renderOption(props, option, state)}
      />
    </div>
  );
}

