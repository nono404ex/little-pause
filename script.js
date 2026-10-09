const $ = (id) => document.getElementById(id);

const audio = $("audio");
audio.volume = 0.15;
let musicStarted = false;

$("startBtn").addEventListener("click", () => {
  $("checkin").scrollIntoView({behavior:"smooth",block:"center"});
  if (!musicStarted) {
    audio.volume = 0.15;
    audio.play().then(() => {
      musicStarted = true;
      $("musicLabel").textContent = "playing softly ♫";
    }).catch(() => {
      const hint = document.querySelector(".file-hint");
      if (hint) hint.textContent = "kalau lagu belum mulai, tekan play pada pemutar lagu.";
    });
  }
});

const responses = {
  capek: "semoga kaka bisa punya waktu buat narik napas sebentar. nggak harus beresin semuanya sekaligus.",
  aman: "syukurlah kalau hari ini masih aman. semoga ada hal kecil yang bikin harinya makin enak.",
  campur: "hari yang campur aduk juga tetap bisa dilewatin pelan-pelan. semoga bagian baiknya lebih banyak."
};
document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".choice").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    $("answer").textContent = responses[button.dataset.answer];
  });
});

$("envelope").addEventListener("click", () => {
  const opened = $("envelope").classList.toggle("open");
  $("letterMessage").classList.toggle("show", opened);
  $("envelope").setAttribute("aria-label", opened ? "Tutup amplop" : "Buka amplop");
});

$("againBtn").addEventListener("click", () => {
  $("envelope").classList.remove("open");
  $("letterMessage").classList.remove("show");
  document.querySelectorAll(".choice").forEach(item => item.classList.remove("active"));
  $("answer").textContent = "pilih yang paling mendekati, nggak ada jawaban salah.";
  window.scrollTo({top:0,behavior:"smooth"});
});

const modal = $("musicModal");
$("musicToggle").addEventListener("click", () => modal.classList.add("show"));
$("closeModal").addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });
