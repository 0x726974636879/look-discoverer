import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';



const Look = ({ look, handleOpenModal }) => {
    return (
        <tr>
            <th>{look.look_id}</th>
            <th>
                <CardMedia
                    style={{width: "50px", height: "50px"}}
                    image={`https://images.heuritech.com/${look.image_md5}`}
                    title={look.look_name}
                />
            </th>
            <td>{look.look_name}</td>
            <td>{look.country}</td>
            <td>{look.hype_count}</td>
            <td>{look.hashtags}</td>
            <td><Button onClick={() => handleOpenModal(look)}>Edit</Button></td>
        </tr>
    )
}

export default Look
