export * from "gsap";
export * from "gsap/ScrollTrigger";
export * from "gsap/SplitText";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
