import { useState, useEffect } from 'react';

import Look from './Look'
import Modal from  './Modal'
import Filter from './Filter'
import Paginate from './Paginate'

const Looks = () => {
    const baseUrl = "http://localhost:8000/api/looks/"
    const [looks, setLooks] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selectedLook, setSelectedLook] = useState()
    const [hasFilters, setHasFilters] = useState(false)
    const [nextPage, setNextPage] = useState(false)
    const [previousPage, setPreviousPage] = useState(false)
    const [filter, setFilter] = useState({
        name: "",
        country: "",
        hashtag: "",
        hype_count: "",
        currentPage: 1
    });
    const [url, setUrl] = useState(baseUrl)

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
        console.log("currentPage", filter.currentPage)
        let page = filter.currentPage
        let myFilter = filter
        if(!myFilter.country && !myFilter.currentPage && !myFilter.hashtag && !myFilter.hype_count && !myFilter.name)
            page = 1
        if (nextPage && nextprev === "next")
            page++
        else if (previousPage && nextprev === "prev")
            page--
        if((nextPage || previousPage) && (nextPage || previousPage))
            myFilter.currentPage = page
            setFilter(myFilter)
            console.log(filter)
            filterLook(false)
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

    const filterLook = async (firstTimeFiltre) => {
        let myPage = 1
        if(!firstTimeFiltre)
            myPage = filter.currentPage
            setFilter({...filter, currentPage: myPage})
        let myFilter = `?page=${myPage}&`
        if(filter.hashtag)
            myFilter += "hashtags=" + filter.hashtag + "&"
        if(filter.hype_count)
            myFilter += "hype_count=" + filter.hype_count + "&"
        if(filter.name)
            myFilter += "name=" + filter.name + "&"
        if(filter.country)
            myFilter += "country=" + filter.country
        setUrl(baseUrl + myFilter)
        const resp = await fetch(`${baseUrl}${myFilter}`)
        const data = await resp.json()
        if (data.previous != null)
            setPreviousPage(true)
        else
            setPreviousPage(false)
        if(data.next != null)
            setNextPage(true)
        else
            setNextPage(false)
        setLooks(data.results)
    }

    return (
        <>
        <Filter setFilter={setFilter} filter={filter} filterLook={filterLook} />
        <Paginate onChangePage={onChangePage} currentPage={filter.currentPage} />
        <table className="table">
            <thead>
                <tr>
                    <th><abbr title="Identifier">ID</abbr></th>
                    <th>Icon</th>
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
        <Paginate onChangePage={onChangePage} currentPage={filter.currentPage} />
        </>
    )
}

export default Looks
