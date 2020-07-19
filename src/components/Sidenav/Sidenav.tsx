import React from "react";
import { useTransition, animated } from "react-spring";

export const SidenavContainer: React.FC = React.memo(({ children }) => (
  <div
    data-testid="sidenav-container"
    className="flex flex-row flex-1 overflow-hidden h-full"
  >
    {children}
  </div>
));

interface SidenavProps {
  isSidenavOpen: boolean;
}

export const Sidenav: React.FC<SidenavProps> = React.memo(
  ({ children, isSidenavOpen }) => {
    const width = "14rem";
    const transitions = useTransition(isSidenavOpen, null, {
      from: { marginLeft: `-${width}` },
      enter: { marginLeft: "0" },
      leave: { marginLeft: `-${width}` },
    });
    return (
      <>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <div
                  data-testid="sidenav"
                  style={{ width }}
                  className={`p-6 border-r border-black flex-grow-0 flex-shrink-0 h-full`}
                >
                  {children}
                </div>
                ️
              </animated.div>
            )
        )}
      </>
    );
  }
);

export const SidenavContent: React.FC = React.memo(({ children }) => (
  <div className="flex-1 p-2" data-testid="sidenav-content">
    {children}
  </div>
));
