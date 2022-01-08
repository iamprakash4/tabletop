import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import image from'../image/images.jpg';


class Login extends Component {
    render() {
        return (
            <div>
                <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                    <Grid item xs={12}>
                        <Grid  container justifyContent="center">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image={image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Game Store
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        We are tracking game players. Please click to continue.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        color = "secondary" 
                                        onClick={()=>{
                                            this.props.history.push('/dashboard')
                                        }}
                                    >
                                        Click here
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withStyles({ withTheme: true })(Login);
