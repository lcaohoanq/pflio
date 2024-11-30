import React from "react";

const Home: React.FC = () => {
  const informationURL = [
    {
      name: "github",
      url: "https://github.com/lcaohoanq",
    },
    {
      name: "ig",
      url: "https://www.instagram.com/lcaohoanq/",
    },
  ];

  // Convert the array to a map
  const informationURLMap = informationURL.reduce(
    (acc, item) => {
      acc[item.name] = item.url;
      return acc;
    },
    {} as { [key: string]: string },
  );

  // Change the event handler to use React's event type
  const handleNavigate = (name: string) => {
    const url = informationURLMap[name];

    if (url) {
      window.open(url, "_blank"); // Opens in a new tab
    }
  };

  return (
    <div className="flex justify-center items-center gap-6 bg-[#f1f1f1] min-h-[100vh]">
      <img
        className="h-[20rem] w-[20rem] rounded-full"
        src="/avatar.jpeg"
        alt="Avatar"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl">Luu Cao Hoang</h1>
        <p className="text-[#606060]">GitHub account is lcaohoanq</p>
        <p className="text-[#606060]">Fullstack Web Developer</p>
        <div className="flex gap-2">
          <div
            onClick={() => handleNavigate("github")}
            className="link-icon flex justify-center items-center w-12 h-12 rounded-full bg-transparent transition-transform duration-300 hover:cursor-pointer hover:bg-[#d8d8d8] hover:scale-110"
          >
            <img className="w-12 h-12" src="/github.png" alt="Github" />
          </div>
          <div
            onClick={() => handleNavigate("ig")}
            className="link-icon flex justify-center items-center w-12 h-12 rounded-full bg-transparent transition-transform duration-300 hover:cursor-pointer hover:bg-[#d8d8d8] hover:scale-110"
          >
            <img className="w-12 h-12" src="/ig.png" alt="Instagram" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
