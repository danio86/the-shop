import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Property from "./Property";
import Inquiry from "../inquiries/Inquiry";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

import InquiryCreateForm from "../inquiries/InquiryCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function PropertyPage(props) {
    const { id } = useParams();
    const [property, setProperty] = useState({ results: [] });
    // const { images } = props;

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [inquiries, setInquiries] = useState({ results: [] });
    const [pictures, setPictures] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: property }, { data: inquiries }, { data: pictures }] = await Promise.all([
              axiosReq.get(`/properties/${id}/`),
              axiosReq.get(`/inquiries/?property=${id}`),
              axiosReq.get(`/pictures/?property=${id}`),
            ]);
            setProperty({ results: [property] });
            setInquiries(inquiries);
            setPictures(pictures);
          } catch (err) {
            console.error(err.stack);
            alert('Failed to fetch property data. Please try again later.');
          }
        };
    
        handleMount();
      }, [id]);


  return (
    <Row className="h-100 center-contents">
        <Property {...property.results[0]} setProperty={setProperty} propertyPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <InquiryCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              property={id}
              setProperty={setProperty}
              setInquiries={setInquiries}
            />
            ) : inquiries.results.length ? (
              "Inquiries"
            ) : null}
            {inquiries.results.length ? (

            <InfiniteScroll
              children={inquiries.results.map((inquiry) => (
                <div key={inquiry.id} className="inquiry-container mb-5">
                  <Inquiry 
                    className={Inquiry}
                    key={inquiry.id} {...inquiry}
                    setInquiries={setInquiries}
                    setProperty={setProperty}
                  />
                </div>
                //this sends the setter to the child component 
              ))}


              
              dataLength={inquiries.results.length}
              loader={<Asset spinner />}
              hasMore={!!inquiries.next}
              next={() => fetchMoreData(inquiries, setInquiries)}
            />

          ) : currentUser ? (
            <span>No inquiry yet, be the first to inquiry!</span>
          ) : (
            <span>No inquiry... yet</span>
          )}
        </Container>
    </Row>
  );
}

export default PropertyPage;