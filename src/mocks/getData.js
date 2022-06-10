/* Mock */
const getData = async entity => require(`./data/${entity}.js`).default;

export default getData;
