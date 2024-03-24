import { useEffect, useState } from "react";
import { fetchExploreProfiles } from "~~/api2";

const MostFoll = () => {
  const [profiles, setProfiles] = useState<any>([]); // [title, description, content

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profiles = await fetchExploreProfiles();
        setProfiles(profiles.items.slice(0, 3));
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);
  return (
    <div className="text-white border border-white border-opacity-25 bg-black h-[36vh] w-[25vw] rounded-lg translate-y-28 translate-x-40">
      <div className="card-body w-full">
        <h2 className="card-title text-center">Most Followers</h2>
        {profiles.map((profile, index) => {
          return (
            <div className="flex mt-4" key={index}>
              <div className="avatar">
                <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-6">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <p>{profile.handle.localName}</p>
              <p className="ml-10">{profile.id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostFoll;
