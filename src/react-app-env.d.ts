
/// <reference types="react-scripts" />

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}

//Для swiper
declare module 'swiper/css' {}
declare module 'swiper/css/pagination' {}
declare module 'swiper/css/navigation' {}
declare module 'swiper/css/autoplay' {}
declare module 'swiper/css/effect-fade' {}
