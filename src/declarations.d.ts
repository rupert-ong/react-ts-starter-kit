declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg' {
  const content: string;
  export default content;
}
