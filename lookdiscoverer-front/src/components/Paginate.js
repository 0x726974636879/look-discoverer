import Button from '@material-ui/core/Button';



const Paginate = ({ onChangePage, currentPage }) => {
    return (
        <div style={{margin: 20}}>
            <Button onClick={() => onChangePage("prev")} variant="contained" size="large" color="primary">Prev</Button>
            <span style={{margin: 10}}><strong>{currentPage}</strong></span>
            <Button onClick={() => onChangePage("next")} variant="contained" size="large" color="primary">Next</Button>
        </div>
    )
}

export default Paginate
