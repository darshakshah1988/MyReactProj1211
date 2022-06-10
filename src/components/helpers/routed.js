const routed = Component => ({ match: { params } }) => (
  <Component {...params} />
);

export default routed;
