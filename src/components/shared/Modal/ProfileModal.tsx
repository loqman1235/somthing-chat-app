import { MdCameraAlt, MdClose, MdVerified } from "react-icons/md";
import Avatar from "../Avatar";
import { useState } from "react";

interface ProfileModalProps {
  onClose?: () => void;
  isOpen?: boolean;
}

const ProfileModal = ({ isOpen = false }: ProfileModalProps) => {
  const [isAboutTabActive, setIsAboutTabActive] = useState(true);
  const [isOptionsTabActive, setIsOptionsTabActive] = useState(false);
  const [isLevelsTabActive, setIsLevelsTabActive] = useState(false);

  const toggleAboutTab = () => {
    setIsAboutTabActive(true);
    setIsOptionsTabActive(false);
    setIsLevelsTabActive(false);
  };

  const toggleOptionsTab = () => {
    setIsAboutTabActive(false);
    setIsOptionsTabActive(true);
    setIsLevelsTabActive(false);
  };

  const toggleLevelsTab = () => {
    setIsAboutTabActive(false);
    setIsOptionsTabActive(false);
    setIsLevelsTabActive(true);
  };

  const activeTabStyles = "bg-muted !text-text-foreground";
  const inactiveTabStyles =
    "flex h-full cursor-pointer items-center px-5 text-text-muted transition duration-300 hover:text-text-foreground";

  return (
    // MODAL CONTAINER
    <div
      className={`fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm ${isOpen ? "block" : "hidden"}`}
    >
      <div className="w-[90%] max-w-[580px] overflow-hidden rounded-md border border-border bg-foreground shadow-lg">
        {/* MODAL HEADER */}
        <div>
          <div className="relative h-[200px] w-full bg-secondary before:absolute before:inset-0 before:bg-black before:opacity-70 before:shadow">
            <img
              src="https://picsum.photos/1920/300"
              alt="profile"
              className="h-full w-full object-cover"
            />

            {/* CTAs */}
            <div className="absolute right-2 top-2 flex gap-5 rounded-full bg-muted px-2 py-1 text-xl text-text-foreground opacity-80 shadow md:right-5 md:top-5">
              <button>
                <MdClose />
              </button>
              <button>
                <MdCameraAlt />
              </button>
            </div>

            {/* AVATAR */}
            <div className="absolute bottom-5 left-2 flex items-end gap-3 md:left-5">
              <div className="relative shadow-md">
                <Avatar
                  size="4xl"
                  src="https://picsum.photos/200"
                  username="Loqmane Djefafla"
                  gender="male"
                  isBordered
                  rounded={false}
                />

                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-5 rounded-full bg-muted px-2 py-1 text-xl text-text-foreground opacity-80 shadow">
                  <button>
                    <MdClose />
                  </button>
                  <button>
                    <MdCameraAlt />
                  </button>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">
                    Loqmane Djefafla
                  </h3>
                  <span className="text-success">
                    <MdVerified />
                  </span>
                </div>
                {/* MOOD */}
                <p className="text-sm text-text-muted">
                  Chat developer and coder
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL TABS */}
        <ul className="flex h-10 w-full items-center bg-foreground">
          <li
            className={`${inactiveTabStyles} ${isAboutTabActive && activeTabStyles}`}
            onClick={toggleAboutTab}
          >
            About
          </li>
          <li
            className={`${inactiveTabStyles} ${isOptionsTabActive && activeTabStyles}`}
            onClick={toggleOptionsTab}
          >
            Options
          </li>
          <li
            className={`${inactiveTabStyles} ${isLevelsTabActive && activeTabStyles}`}
            onClick={toggleLevelsTab}
          >
            Level
          </li>
        </ul>

        {/* ABOUT SECTION */}
        <div
          className={`w-full bg-red-400 p-5 ${isAboutTabActive ? "block" : "hidden"}`}
        >
          About
        </div>
        {/* OPTIONS SECTION */}
        <div
          className={`w-full bg-red-400 p-5 ${isOptionsTabActive ? "block" : "hidden"}`}
        >
          Options
        </div>
        {/* LEVEL SECTION */}
        <div
          className={`w-full bg-red-400 p-5 ${isLevelsTabActive ? "block" : "hidden"}`}
        >
          Level
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
