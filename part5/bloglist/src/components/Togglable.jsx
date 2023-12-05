import { useState, useImperativeHandle, forwardRef } from "react";

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [isVisible, setIsVisible] = useState(false);

  Togglable.displayName = "Togglable";

  const hideWhenVisible = { display: isVisible ? "none" : "" };
  const showWhenVisible = { display: isVisible ? "" : "none" };

  const toggleVisibility = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  );
});

export default Togglable;
