import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 350,
    marginLeft: 20,
    marginTop: 20
  },
});

export default function ImgMediaCard({ title, description, image, area, state, postalCode, price, onClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="200"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title} 
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {area}, {state} {postalCode}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" onClick={onClick}>
          Reserve
        </Button>
      </CardActions>
    </Card>
  );
}
