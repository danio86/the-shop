import styles from "../../styles/Inquiry.module.css";
import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Inquiry = (props) => {
    const {owner, profile_id, profile_image, updated_at, content, id, setInquiries, setProperty} = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            //setter are passed down from PropertyPage
            await axiosRes.delete(`/inquiries/${id}/`);
            setProperty((prevProperty) => ({
            results: [
                {
                ...prevProperty.results[0],
                comments_count: prevProperty.results[0].comments_count - 1,
                },
            ],
            }));

            setInquiries((prevInquiries) => ({
                ...prevInquiries,
                results: prevInquiries.results.filter((inquiry) => inquiry.id !== id),
                }));
        } catch (err) {}
    };

    return (
        <div>
          <hr />
          <Media>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} />
            </Link>
            <Media.Body className="align-self-center ml-2">
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{updated_at}</span>
              <p>{content}</p>
            </Media.Body>
                {is_owner && (
                    <MoreDropdown handleEdit={() => {}} handleDelete={handleDelete} />
                )}
          </Media>
        </div>
      );
    };

export default Inquiry