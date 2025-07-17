import React from "react";

const AppPromoSection = () => {
  return (
    <div className="bg-[#fff9ee] rounded-3xl px-8 py-12 md:flex md:items-center md:justify-between ">
   
      <div className="flex justify-center md:justify-start md:w-1/2 mb-10 md:mb-0">
        <img
          src="/phone.png" 
          alt="App Mobile Preview"
          className="max-w-xs md:max-w-sm"
        />
      </div>

      
      <div className="md:w-1/2 text-center md:text-left  ">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Shop faster with foodmart App
        </h2>
        <p className="text-gray-600 mb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis sed
          ptibus liberolectus nonet psryroin.
        </p>
        <p className="text-gray-600 mb-2">
          Amet sed lorem posuere sit iaculis amet, ac urna. Adipiscing fames
          semper erat ac in suspendisse iaculis.
        </p>
        <p className="text-gray-600 mb-6">
          Amet blandit tortor praesent ante vitae. A, enim pretium senectus
          magna.
        </p>

    
        <div className="flex justify-center md:justify-start gap-4">
          <a href="#">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on App Store"
              className="h-12"
            />
          </a>
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppPromoSection;
