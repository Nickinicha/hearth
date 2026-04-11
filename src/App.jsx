<<<<<<< HEAD
const horizonFile = "forest-bg horizon.jpg";

=======
>>>>>>> 810729086c8b29d51697dea299a32b1127e49788
function App() {
  const bgPath = `${import.meta.env.BASE_URL}images/${encodeURIComponent(horizonFile)}`;

  return (
    <div
      style={{
<<<<<<< HEAD
        backgroundImage: `url("${bgPath}")`,
=======
        backgroundImage:
          "url('/hearth/images/forest-bg.jpg')",
>>>>>>> 810729086c8b29d51697dea299a32b1127e49788
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
