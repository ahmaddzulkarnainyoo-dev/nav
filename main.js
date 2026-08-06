/* ============================================
   NAV OFFICIAL — GSAP Animations & Video Fallback
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Video Play Fallback ---------- */
  var videos = document.querySelectorAll("video");

  videos.forEach(function (video) {
    var playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(function () {
        // Autoplay diblokir, paksa sekali lagi dengan muted
        video.muted = true;
        video.play().catch(function () {
          // Tetap gagal, abaikan: fallback navy tetap elegan
        });
      });
    }
  });

  /* ---------- GSAP Animations ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    /* --- Entrance Hero --- */
    var tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Fade-in halus background video persisten
    tl.fromTo(
      ".bg-fixed-video",
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
      0
    ).fromTo(
      ".bg-fixed-overlay",
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

    // Empat tombol muncul berurutan (stagger 0.15s)
    tl.fromTo(
      ".hero-btn",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
      0.75
    );

    // Scroll indicator muncul setelah tombol
    tl.fromTo(
      ".hero-scroll-indicator",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      1.4
    );

    /* --- Marquee Ticker: fade-in tipis --- */
    gsap.fromTo(
      ".marquee",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".marquee",
          start: "top 95%",
        },
      }
    );

    /* --- Scroll Narrative: About Us --- */
    gsap.fromTo(
      ".about-eyebrow",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".about-heading",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about",
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      ".about-description",
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about",
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      ".about-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 80%",
        },
      }
    );

    /* --- Scroll Narrative: Lokasi Workshop --- */
    gsap.fromTo(
      ".location-editorial .section-eyebrow",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".location",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".location-editorial .section-heading",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".location",
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      ".location-editorial-text",
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".location",
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      ".location-editorial-link",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".location",
          start: "top 65%",
        },
      }
    );

    gsap.fromTo(
      ".location-card",
      { y: 48, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".location-layout",
          start: "top 80%",
        },
      }
    );

    /* --- Scroll Narrative: Contact --- */
    gsap.fromTo(
      ".contact-card",
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%",
        },
      }
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