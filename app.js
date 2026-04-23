// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const hasVisibleBorder = (el) => {
    const style = window.getComputedStyle(el);
    const borderWidths = [
      style.borderTopWidth,
      style.borderRightWidth,
      style.borderBottomWidth,
      style.borderLeftWidth,
    ];

    return borderWidths.some((width) => parseFloat(width) > 0);
  };

  const borderedElements = Array.from(document.querySelectorAll("*"))
    .filter((el) => !["HTML", "BODY"].includes(el.tagName))
    .filter(hasVisibleBorder);

  borderedElements.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const elementCenterX = rect.left + rect.width / 2;
    const viewportCenterX = window.innerWidth / 2;
    const fromLeft = elementCenterX <= viewportCenterX;

    gsap.fromTo(
      el,
      {
        x: fromLeft ? -120 : 120,
        autoAlpha: 0,
      },
      {
        x: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        delay: index * 0.04,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
});