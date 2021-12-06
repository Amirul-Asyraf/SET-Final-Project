import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const ViewStats = (props) => {
    //state.contact.loadContacts.data.data
    // console.log(props)
    
    const total = useSelector((state) => state.contact.loadContacts.data.total);
    const user = useSelector((state) => console.log(state.contact.loadContacts));

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-around",
            alignItems: 'center'
        }}>
        <Box sx={{ maxWidth: "45%", minWidth: "45%"}} >
            <Link to="/dashboard/view-contacts" style={{textDecoration: "none"}}>
            <Card variant="outlined" style={{backgroundColor: "#1976d2", color:"white"}}>
                <React.Fragment>
                    <CardContent>
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography> */}
                    <Typography variant="h3" component="div" sx={{ mb: 1.5 }}>
                        {total}
                    </Typography>
                    <Typography style={{color: "white"}}>
                        Total number of Contacts
                    </Typography>
                    <Typography variant="body2">
                        (Click the link to see your contacts.)
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small">
                        <Link to="/dashboard/view-contacts" style={{color: "white"}}>View</Link>
                    </Button>
                    </CardActions>
                </React.Fragment>
            </Card>
            </Link>
            </Box>

            {/* <Box sx={{ maxWidth: "45%", minWidth: "45%"}} >
            <Link to="/dashboard/view-contacts" style={{textDecoration: "none"}}>
                <Card variant="outlined" style={{backgroundColor: "#1976d2", color:"white"}}>
                    <React.Fragment>
                        <CardContent>
                        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h3" component="div" sx={{ mb: 1.5 }}>
                            {total}
                        </Typography>
                        <Typography style={{color: "white"}}>
                            Total number of Contacts
                        </Typography>
                        <Typography variant="body2">
                            (Click the link to see your contacts.)
                        </Typography>
                        </CardContent>
                        <CardActions>
                        <Button size="small">
                            <Link to="/dashboard/view-contacts" style={{color: "white"}}>View</Link>
                        </Button>
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Link>
        </Box> */}
    </div>
    )
}

export default ViewStats;
