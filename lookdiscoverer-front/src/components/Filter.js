import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

const Filter = ({ filterLook, filter, setFilter }) => {
    const handleChangeHashtag = (e) => setFilter({...filter, hashtag:e.target.value});
    const handleChangeHypeCount = (e) => setFilter({...filter, hype_count:e.target.value});
    const handleChangeName = (e) => setFilter({...filter, name:e.target.value});

    return (
        <Container maxWidth="lg">
            <TextField value={filter.name} onChange={handleChangeName} label="Name" />
            <TextField type="number" value={filter.hype_count} onChange={handleChangeHypeCount} label="Hype Count" />
            <TextField value={filter.hashtag} onChange={handleChangeHashtag} label="Hashtag" />
            <Button onClick={filterLook} variant="contained" size="large" color="primary">Filter</Button>
        </Container>
    )
}

export default Filter
