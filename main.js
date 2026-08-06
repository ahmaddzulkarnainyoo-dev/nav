/* ============================================
   NAV OFFICIAL — GSAP Animations & Video Fallback
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Video Play Fallback ---------- */
  var video = document.getElementById("hero-video");

  if (video) {
    var playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(function () {
        // Autoplay diblokir, paksa sekali lagi dengan muted
        video.muted = true;
        video.play().catch(function () {
          // Tetap gagal, abaikan: overlay navy tetap elegan
        });
      });
    }
  }

  /* ---------- GSAP Entrance Animation ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    var tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Fade-in halus overlay & video (1.2s)
    tl.fromTo(
      ".hero-overlay",
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
      0
    ).fromTo(
      ".hero-video",
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
      0
    );

    // Headline slide-up + fade-in
    tl.fromTo(
      ".hero-heading",
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      0.35
    );

    // Sub-headline slide-up + fade-in
    tl.fromTo(
      ".hero-subheading",
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 },
      0.55
    );

    // Empat tombol muncul berurutan dari bawah ke atas (stagger 0.15s)
    tl.fromTo(
      ".hero-btn",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
      0.75
    );

    /* ---------- Hover Parallax Tipis pada Tombol ---------- */
    var btns = document.querySelectorAll(".hero-btn");
    var isTouch = window.matchMedia("(hover: none)").matches;

    btns.forEach(function (btn) {
      if (isTouch) {
        // Touch device: respon sentuhan dengan scale halus
        btn.addEventListener("touchstart", function () {
          btn.style.transform = "scale(0.98)";
        });
        btn.addEventListener("touchend", function () {
          btn.style.transform = "";
        });
        return;
      }

      // Desktop: parallax tipis mengikuti kursor
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;

        // Pergeseran tipis maksimal ±3px agar tetap profesional
        var moveX = x * 0.04;
        var moveY = y * 0.04;

        gsap.to(btn, {
          x: moveX,
          y: moveY,
          duration: 0.35,
          ease: "power2.out",
        });
      });

      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });
  }
});