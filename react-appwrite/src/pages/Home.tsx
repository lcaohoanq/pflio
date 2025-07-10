import React from "react";

const Home: React.FC = () => {
  const profile = {
    name: "Luu Cao Hoang",
    avatarUrl: "https://avatars.githubusercontent.com/u/136492579?v=4",
    role: "Software Engineer | Backend Developer | Spring Boot Enthusiastic",
    socialLinks: [
      {
        type: "github",
        url: "https://github.com/lcaohoanq",
        iconUrl: "/github.png",
      },
      {
        type: "gitlab",
        url: "https://gitlab.com/lcaohoanq",
        iconUrl: "/gitlab.png",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/in/lcaohoanq",
        iconUrl: "/linkedin.png",
      },
      {
        type: "ig",
        url: "https://instagram.com/lcaohoanq",
        iconUrl: "/ig.png",
      },
      {
        type: "unsplash",
        url: "https://unsplash.com/@lcaohoanq",
        iconUrl: "/unsplash.png",
      },
    ],
  };

  const handleNavigate = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <main className="flex flex-col md:flex-row items-center justify-center p-8 min-h-screen bg-[#f1f1f1] text-[#333]">
      <img
        className="avatar w-52 h-52 rounded-full object-cover mb-4 md:mb-0 md:mr-8"
        src={profile.avatarUrl}
        alt="Avatar"
      />
      <div className="content max-w-xl space-y-4">
        <h1 className="text-3xl font-semibold">{profile.name}</h1>
        <p className="text-lg text-gray-600">{profile.role}</p>
        <p>
          When I'm not coding, you'll likely find me capturing moments through
          my lens,{" "}
          <a
            href="https://unsplash.com/@lcaohoanq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Unsplash
          </a>
          , 📸 or enjoying a peaceful bike ride.
        </p>
        <p>
          I also enjoy sharing knowledge through my blog,{" "}
          <a
            href="https://shinbun.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            shinbun 新聞
          </a>
          , where I write about tech, development tips, and more.
        </p>

        {/* Portfolio Button */}
        <div className="pt-4">
          <a
            href="/portfolio"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Full Portfolio →
          </a>
        </div>

        <div className="link-icons-container flex flex-wrap gap-4 mt-4">
          {profile.socialLinks.map((link) => (
            <div
              key={link.type}
              className="link-icon w-12 h-12 rounded-full flex items-center justify-center bg-white shadow hover:scale-110 transition-transform cursor-pointer"
              onClick={() => handleNavigate(link.url)}
            >
              <img
                src={link.iconUrl}
                alt={link.type}
                className="w-6 h-6 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
