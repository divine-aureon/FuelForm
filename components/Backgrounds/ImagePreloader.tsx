export default function ImagePreloader() {
    return (
      <div className="hidden z[-20]">
        {/* Preload backgrounds and animation assets */}
        <img src="/images/sine.gif" alt="" />
        <img src="/images/home.gif" alt="" />
        <img src="/images/login.webp" alt="" />
        <img src="/images/info.webp" alt="" />
        <img src="/images/loading.webp" alt="" />
        <img src="/images/bg.png" alt="" />
        {/* Add any other critical assets */}
      </div>
    );
  }
  