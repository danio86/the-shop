import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/SideBar.module.css';
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";

const SideBar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(!expanded);

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const items = [
    {
      path: '/agents',
      name: 'agents',
      icon: <i className="fas fa-user-friends"></i>,
      text: 'Agents',
    },
    {
      path: '/properties',
      name: 'properties',
      icon: <i className="fas fa-house"></i>,
      text: 'Properties',
    },
    {
      path: '/reviews',
      name: 'reviews',
      icon: <i className="far fa-star"></i>,
      text: 'Reviews',
    },
    {
      path: '/messages',
      name: 'messages',
      icon: <i className="fas fa-comments"></i>,
      text: 'Messages',
    },
  ];

  return (
    <div className={styles.Container}>
      <div
        className={styles.SideBar}
        style={{ width: expanded ? '200px' : '100%' }}
      >
        <div className={styles.TopSection}>
          {items.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={styles.Link}
              activeClassName={styles.Active}
            >
              <div className={styles.Icon}>
                {item.icon}
                <h4
                    className={styles.Icon}
                  style={{
                    display: expanded ? 'inline' : 'none',
                    marginTop: '8px',
                    position: 'absolute',
                    padding: '0 9px',
                    fontFamily: 'Roboto Mono, sans-serif',
                }}
                  
                >
                  {item.text}
                </h4>
              </div>
            </NavLink>
          ))}
          <div className={styles.Hamburger} onClick={toggle}>
            {expanded ? (
              <i className="fas fa-arrow-circle-left"></i>
            ) : (
              <i className="fas fa-arrow-circle-right"></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;