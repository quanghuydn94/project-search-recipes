import "./App.css";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useEffect, useState } from "react";
import * as types from "./redux/action";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const { recipes } = useSelector((state) => state.data);
  const updateSearch = () => {
    setQuery(search);
    setSearch("");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: types.FETCH_RECIPE_START, query });
  }, [query]);

  const [expanded, setExpanded] = useState(false);
  const [cardValue, setCardValue] = useState("");
  const handleExpandClick = (index) => {
    setCardValue(index);
    setExpanded(!expanded);
  };
  const classes = useStyles();
  return (
    <div className="App">
      <Typography variant="h3" gutterBottom>
        Recipes App
      </Typography>
      <form
        style={{
          width: 300,
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          label="Search"
          fullWidth
        />
        <Button variant="contained" color="secondary" onClick={updateSearch}>
          Search
        </Button>
      </form>
      {/* <Box
        component="div"
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gridGap: 50,
        }}
      > */}
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {recipes &&
              recipes.hits &&
              recipes.hits.map((recipe, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <CardActionArea>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe  ">
                            {recipe.recipe.label[0].toUpperCase()}
                          </Avatar>
                        }
                        title={recipe.recipe.label}
                      />
                      <CardMedia
                        image={recipe.recipe.image}
                        style={{ width: "auto", height: 200 }}
                      />
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleExpandClick(index)}
                      >
                        {index === cardValue && expanded
                          ? "Read less"
                          : "read more"}
                      </Button>
                    </CardActions>
                    <Collapse
                      in={index === cardValue && expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        {recipe.recipe.ingredientLines.map(
                          (ingredient, index) => (
                            <Typography key={index} variant="body2">
                              {ingredient}
                            </Typography>
                          )
                        )}
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      {/* </Box> */}
    </div>
  );
}

export default App;
