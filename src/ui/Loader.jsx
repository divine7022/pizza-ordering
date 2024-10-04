function Loader() {
  return (
    // is we want to strech(to cover entair page) the loader in entair page, so to achive that to set top, bottom,left,right equal to 0.
    // and then to center the loader which is initially at the top left corner : flex it and justify-conternt:center and align-item:center ( to set it horizontally and vertically center).
    // if i make the parent div as absolute. then we can make child div(loader) as relative parent div.
    <div className="absolute bg-slate-200/20 inset-0 backdrop-blur-sm flex items-center justify-center">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;

//(if the parent div is absolute then we can make the child div as relative to parent )
