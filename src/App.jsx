const horizonFile = "forest-bg horizon.jpg";

function App() {
  const bgPath = `${import.meta.env.BASE_URL}images/${encodeURIComponent(horizonFile)}`;

  return (
    <div
      style={{
        backgroundImage: `url("${bgPath}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
      }}
    >

    </div>
  );
}

export default App;
