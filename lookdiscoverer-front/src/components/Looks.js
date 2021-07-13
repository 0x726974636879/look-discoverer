import { useState, useEffect } from 'react';

import Look from './Look'
import Modal from  './Modal'
import Filter from './Filter'
import Paginate from './Paginate'

const Looks = () => {
    const [looks, setLooks] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selectedLook, setSelectedLook] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPage, setNextPage] = useState(false)
    const [previousPage, setPreviousPage] = useState(false)
    const [filter, setFilter] = useState({
        name: "",
        hashtag: "",
        hype_count: ""
    });


    const url = "http://localhost:8000/api/looks/"

    useEffect(() => {
        const getLooks = async () => {
            const resp = await fetch(`${url}`)
            const data = await resp.json()
            if(data.next != null)
                setNextPage(true)
            setLooks(data.results)
        }
        getLooks()
    }, [])

    const onChangePage = async (nextprev) => {
        let page = currentPage
        if (nextPage && nextprev === "next"){
            page++
            setCurrentPage(page)
        } else if (previousPage && nextprev === "prev"){
            page--
            setCurrentPage(page)
        }
        console.log("currentPage", page)
        const resp = await fetch(`${url}?page=${page}`)
        const data = await resp.json()
        if (data.previous != null)
            setPreviousPage(true)
        else
            setPreviousPage(false)
        setLooks(data.results)
    }

    const editLook = async (data) => {
        const response = await fetch(`${url}${selectedLook.look_id}/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hashtags: data.hashtags.split(','),
                hype_count: data.hype_count
            })
        })
        const resObj = await response.json()

        setLooks(looks.map((obj) => obj.look_id === resObj.look_id ? resObj : obj))
        setOpenModal(false)
    }
    const handleOpenModal = (data) => {
        setSelectedLook({...data, hashtags: data.hashtags.join(',')})
        setOpenModal(true)
    }
    const handleCloseModal = () => setOpenModal(false)

    const filterLook = async () => {
        let myUrl = url
        myUrl += "?"
        if(filter.hashtag)
            myUrl += "hashtags=" + filter.hashtag + "&"
        if(filter.hype_count)
            myUrl += "hype_count=" + filter.hype_count + "&"
        if(filter.name)
            myUrl += "name=" + filter.name + "&"
        const resp = await fetch(`${myUrl}`)
        const data = await resp.json()
        setLooks(data.results)
    }

    return (
        <>
        <Filter setFilter={setFilter} filter={filter} filterLook={filterLook} />
        <Paginate onChangePage={onChangePage} currentPage={currentPage} />
        <table className="table">
            <thead>
                <tr>
                    <th><abbr title="Identifier">ID</abbr></th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Hype count</th>
                    <th>Hashtags</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {looks.map((look) => (
                    <Look key={Math.floor(Math.random() * 1000000)} look={look} handleOpenModal={handleOpenModal} />
                ))}
            </tbody>
            <Modal openModal={openModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} selectedLook={selectedLook} editLook={editLook} />
        </table>
        <Paginate onChangePage={onChangePage} currentPage={currentPage} />
        </>
    )
}

export default Looks
