import axios from "axios";

const getStuff = () => {
    return axios.get("http://api.openweathermap.org/data/2.5/weather?id=6176823&APPID=ed5c278c1423d2cd37c4adf04a10b3b8");
};

export { getStuff };