const Fullscreen = ({ children }) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

export default Fullscreen;
