import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function FormPropsTextFields({id, hashtags, hype_count, editLook}) {
  const [values, setValues] = useState({
    id: id,
    hashtags: hashtags,
    hype_count: hype_count
  });
  const handleChangeHashtag = (e) => setValues({...values, hashtags:e.target.value});
  const handleChangeHypeCount = (e) => setValues({...values, hype_count:e.target.value});

  return (
      <div >
        <TextField
          label="Hashtags"
          fullWidth={true}
          variant="standard"
          value={values.hashtags}
          onChange={handleChangeHashtag}
        />
        <TextField
          label="Hype count"
          fullWidth={true}
          variant="standard"
          value={values.hype_count}
          onChange={handleChangeHypeCount}
        />
        <Button onClick={() => editLook(values)}>Edit</Button>
      </div>
  );
}
