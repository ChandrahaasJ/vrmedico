import React from 'react'
import {Stack, Button } from '@mui/material'
//colors include primary secondary error warning info success
export const Mui_button = () => {
  return (
    <Stack>
        <Stack spacing={2}>
            <Button variant='text' href='https://google.com'>text</Button>
            <Button variant='contained' color='error'>contained</Button>
            <Button variant='outlined'>outlined</Button>
        </Stack>

        <Stack display='block' spacing={2} direction='row'>
            <Button variant='text' size ='small'>text</Button>
            <Button variant='contained' color='error' size ='medium'>contained</Button>
            <Button variant='outlined' size ='large' starticon={<SendIcon/>}>large</Button>
        </Stack>

        
    </Stack>

  )
}
 