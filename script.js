const $ = (id) => document.getElementById(id);

$("startBtn").addEventListener("click", () => $("checkin").scrollIntoView({behavior:"smooth",block:"center"}));

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
$("audioFile").addEventListener("change", event => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const audio = $("audio");
  if (audio.dataset.objectUrl) URL.revokeObjectURL(audio.dataset.objectUrl);
  const url = URL.createObjectURL(file);
  audio.dataset.objectUrl = url;
  audio.src = url;
  audio.volume = 0.15;
  audio.pause();
  $("musicLabel").textContent = file.name.length > 17 ? file.name.slice(0,14) + "..." : file.name;
  audio.dataset.readyForScroll = "true";
});

const backgroundAudio = $("audio");
let scrollMusicStarted = false;
backgroundAudio.volume = 0.15;
window.addEventListener("scroll", () => {
  if (scrollMusicStarted || backgroundAudio.dataset.readyForScroll !== "true") return;
  if (window.scrollY < 35) return;
  scrollMusicStarted = true;
  backgroundAudio.volume = 0.15;
  backgroundAudio.play().catch(() => {
    scrollMusicStarted = false;
    const hint = document.querySelector(".file-hint");
    if (hint) hint.textContent = "browser memblokir putar otomatis. tekan play sekali, lalu musik tetap pelan.";
  });
}, { passive: true });
