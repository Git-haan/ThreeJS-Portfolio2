import './style.css';
import gsap from 'gsap';


// Screen Animation
const t1 = gsap.timeline({ defaults: { duration: 1 } });
t1.fromTo("nav", { y: "-100%" }, { y: "0%" });
t1.fromTo("div", { opacity: 0 }, { opacity: 1 });