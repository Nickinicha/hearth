import forestBg from
  "./assets/images/forest-bg horizon.jpg";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${forestBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >

    </div>
  );
}

export default App;
