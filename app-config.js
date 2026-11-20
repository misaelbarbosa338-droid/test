window.GAME_SERVER_URL =
  location.hostname === "localhost" && location.protocol === "https:" && !location.port
    ? "https://origen-zero.onrender.com"
    : location.origin;
