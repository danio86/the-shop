import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/SideBar.module.css';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';

const SideBar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(!expanded);

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();


  const items = [
    {
      path: '/',
      name: 'home',
      icon: <i className="fas fa-home"></i>,
      text: 'Home',
      
    },
    {
      path: '/property/create',
      name: 'addProperty',
      icon: <i className="far fa-plus-square"></i>,
      text: 'Add Property',
    },

    {
      path: '/prospectivebuyers',
      name: 'prospectiveBuyers',
      icon: <i className="fa-solid fa-bell"></i>,
      text: 'Popular',
    },
    {
      path: `/profiles/${currentUser?.profile_id}`,
      name: 'profile',
      icon: <i className="fas fa-user-circle"></i>,
      text: 'Profile',
    },
  ];

  return (
    <div className={styles.Container}>
      <div
        className={styles.SideBar}
        style={{ width: expanded ? '200px' : '100%' }}
      >
        <div className={styles.TopSection}>
          {items.map((item, index) => {
           

            if (item.path === '/prospectivebuyers' && !currentUser) {
              // Skip rendering the 'Interesting Properties' link if the user is logged out
              return null;
            }

            if (item.path === '/property/create' && !currentUser) {
              // Skip rendering the 'Add Property' link if the user is logged out
              return null;
            }

            if (item.path === `/profiles/${currentUser?.profile_id}` && !currentUser) {
                // Skip rendering the 'Add Property' link if the user is logged out
                return null;
              }

            return (
              <NavLink
                to={item.path}
                key={index}
                className={styles.Link}
                activeClassName={styles.Active}
                aria-label= 'Home Page'
              >
                <div className={styles.Icon}>
                  {item.icon}
                  <h4
                    style={{
                      display: expanded ? 'inline' : 'none',
                      marginTop: '8px',
                      position: 'absolute',
                      padding: '2px 0px 0px 50px',
                      fontSize: 'initial',
                    }}
                  >
                    {item.text}
                  </h4>
                </div>
              </NavLink>
            );
          })}
          {currentUser && (
            <div className={styles.Hamburger} onClick={toggle}>
              {expanded ? (
                <i className="fas fa-arrow-circle-left"></i>
              ) : (
                <i className="fas fa-arrow-circle-right"></i>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
