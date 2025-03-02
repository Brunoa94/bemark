import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  closeModal: (value: boolean) => void;
}

const FullscreenLayout = (props: Props) => {
  const [onCartModal, setOnCartModal] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={() => !onCartModal && props.closeModal(false)}
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-20"
    >
      <div
        onMouseEnter={() => setOnCartModal(true)}
        onMouseLeave={() => setOnCartModal(false)}
      >
        {props.children}
      </div>
    </div>
  );
};

export default FullscreenLayout;
