// import React, { useState } from "react";
// import styles from '../../styles/Image.module.css'
// import { Media } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Avatar from "../../components/Avatar";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
// import { axiosRes } from "../../api/axiosDefaults";
// import { MoreDropdown } from "../../components/MoreDropdown";

// import ImageEditForm from "./ImageEditForm";


// const Image = (props) => {
//     const {owner, profile_id, profile_image, updated_at, pictures, id, setImages, setProperty} = props;

//     const [showEditForm, setShowEditForm] = useState(false);

//     const currentUser = useCurrentUser();
//     const is_owner = currentUser?.username === owner;

//     const handleDelete = async () => {
//         try {
//             //setter are passed down from PropertyPage
//             await axiosRes.delete(`/pictures/${id}/`);
//             setProperty((prevProperty) => ({
//             results: [
//                 {
//                 ...prevProperty.results[0],
//                 // comments_count: prevProperty.results[0].comments_count - 1,
//                 },
//             ],
//             }));

//             setImages((prevImages) => ({
//                 ...prevImages,
//                 results: prevImages.results.filter((pictures) => pictures.id !== id),
//                 }));
//         } catch (err) {}
//     };

//     return (
//         <>
//       <hr />
//       <Media>
//         <Link to={`/profiles/${profile_id}`}>
//           <Avatar src={profile_image} />
//         </Link>
//         <Media.Body className="align-self-center ml-2">
//           <span className={styles.Owner}>{owner}</span>
//           <span className={styles.Date}>{updated_at}</span>
//           {showEditForm ? (
//             <ImageEditForm
//                 id={id}
//                 profile_id={profile_id}
//                 pictures={pictures}
//                 profileImage={profile_image}
//                 setImages={setImages}
//                 setShowEditForm={setShowEditForm}
//           />
//           ) : (
//             <p>{pictures}</p>
//           )}
//         </Media.Body>
//         {is_owner && !showEditForm && (
//           <MoreDropdown
//             handleEdit={() => setShowEditForm(true)}
//             handleDelete={handleDelete}
//           />
//         )}
//       </Media>
//     </>
//       );
//     };

// export default Image