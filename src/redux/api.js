import axios from "axios";
const YOUR_APP_ID = "d065ddff";
const YOUR_APP_KEY = "952e3e2dd3f01f833ca0b3d4548c1013";

export const getRecipes = async (query) => {
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
  return await axios.get(url);
};
