const axios = require("axios");
axios.get(`https://api.github.com/users/Fed0d`)
.then(response => {
    console.log(response.data)
}
);