import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FVideo = () => {
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.set(".first-vd-wrapper", { marginTop: "-150vh", opacity: 0 });

    const setupTimeline = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".first-vd-wrapper",
          start: "top top",
          end: "+=200% top",
          scrub: true,
          pin: true,
        },
      });

      tl.to(
        ".hero-section",
        { delay: 0.5, opacity: 0, ease: "power1.inOut" },
        "<"
      );
      tl.to(".first-vd-wrapper", {
        opacity: 1,
        duration: 2,
        ease: "power1.inOut",
      });

      if (videoRef.current) {
        tl.to(
          videoRef.current,
          {
            currentTime: videoRef.current.duration,
            duration: 3,
            ease: "power1.inOut",
          },
          "<"
        );
      }
    };

    if (videoRef.current) {
      if (videoRef.current.readyState >= 1) {
        // Metadata already loaded
        setupTimeline();
      } else {
        // Wait for metadata to load
        videoRef.current.onloadedmetadata = setupTimeline;
      }
    }
  }, []);

  return (
    <section className="first-vd-wrapper">
      <div className="h-dvh">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output1.mp4"
          className="first-vd"
        ></video>
      </div>
    </section>
  );
};

export default FVideo;
// before
