const CustomAPI = {
  getGenesData: () => {
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then(res => res.json())
      .then(
        data => {
          return data;
        },
        error => {
          return error;
        }
      );
  },
  getPlotData: () => {
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then(res => res.json())
      .then(
        data => {
          return data;
        },
        error => {
          return error;
        }
      );
  },
};
export default CustomAPI;
