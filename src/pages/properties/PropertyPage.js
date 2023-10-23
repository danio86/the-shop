import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Property from "./Property";
import Inquiry from "../inquiries/Inquiry";
import Image from "../images/Image";

import ImageCreateForm from "../images/ImageCreateForm";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

import InquiryCreateForm from "../inquiries/InquiryCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";


function PropertyPage() {
    const { id } = useParams();
    const [property, setProperty] = useState({ results: [] });


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
            console.log(err, 'no property found###############');
            console.error(err.stack);
            alert('Failed to fetch property data. Please try again later.');
          }
        };
    
        handleMount();
      }, [id]);


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        {/* <Post {...post.results[0]} setPosts={setPost} postPage /> */}
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
                <Inquiry 
                  key={inquiry.id} {...inquiry}
                  setInquiries={setInquiries}
                  setProperty={setProperty}
                /> //this sends the setter to the child component 
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

            {/*if currentUser is property owner*/}
            {currentUser && currentUser.username === property.results[0]?.owner ? (
              <ImageCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                property={id}
                setProperty={setProperty}
                pictures={pictures}
                setPictures={setPictures}
            />
            ) : pictures.results.length ? (
              "Pictures"
            ) : null}
            {pictures.results.length ? (
              <InfiniteScroll
                children={pictures.results.map((picture) => (
                //   <Image 
                //   key={picture.id} {...picture}
                //   setPictures={setPictures}
                //   setProperty={setProperty}
                // />
                  <img
                    key={picture.id}
                    className={appStyles.Image}
                    src={picture.pictures}
                    alt="property"
                  />
                ))}
                dataLength={pictures.results.length}
                loader={<Asset spinner />}
                hasMore={!!pictures.next}
                next={() => fetchMoreData(pictures, setPictures)}
              />
            ) : currentUser && currentUser.username === property.results[0]?.owner ? (
              <span>No pictures yet, be the first to upload!</span>
            ) : (
              <span>No pictures... yet</span>
            )}



        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PropertyPage;