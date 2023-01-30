import React, { useState, useEffect } from 'react';

// Import router
import { useRouter } from 'next/router';

// Import head
import Head from "next/head";

// Import styles
import styles from "../../styles/Home.module.css";

// Import react-bootstrap components
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

// Import react-icons
import { FaHamburger, FaInfoCircle, FaCopyright } from "react-icons/fa";
import { SiPostgresql, SiNextdotjs, SiNodedotjs, SiExpress, SiCss3, SiRedux } from "react-icons/si"

const Home: React.FC = () => {
    const router = useRouter();

    const [isMobile, setIsMobile] = useState(false)
  
    const handleResize = () => {
      if (window.innerWidth < 720) {
          setIsMobile(true)
      } else {
          setIsMobile(false)
      }
    }

    useEffect(() => {
      window.addEventListener("resize", handleResize)
    })

  return (
    <>
      <Head>
          <title>Burpger</title>
      </Head>
      <Container fluid className = {styles.brandContainer}>
          <Row>
              <h1><FaHamburger/> Burpger</h1>
          </Row>
      </Container>

      <Container fluid className = {styles.mainLandingContainer}>
          <Row>
              <Col md = {6}>
                  <h1>Delicious Burgers on the go!</h1>
                  <Container className = {styles.buttonContainer}>
                      <Row>
                          <Col>
                              <Button
                                  className = {styles.routeButtons}
                                  onClick = {() => {router.push("/deliveryPersonRegister")}}
                              >
                                Delivery
                              </Button>
                          </Col>
                          <Col>
                              <Button
                                  className = {styles.routeButtons}
                                  onClick = {() => {router.push("/customerRegister")}}
                              >
                                Customer
                              </Button>
                          </Col>
                      </Row>
                  </Container>
                  <br/><br/>
                  <Button className = {styles.aboutButton}>
                      <h4>
                        <FaInfoCircle className = {styles.aboutIcon}/> About Us
                      </h4>
                  </Button>
              </Col>
              {/* { */}
                {/* !isMobile ?  */}
                  <Col md = {6}>
                      <Image fluid
                          src='https://www.freepnglogos.com/uploads/burger-png/burger-png-png-images-yellow-images-12.png'
                          height="auto"
                          width="auto"  
                      />
                  </Col>
                  {/* :  */}
                  {/* <Col md = {6}></Col> */}
              {/* } */}
          </Row>
      </Container>
      <Container fluid className = {styles.stackContainer}>
      <h3 className = {styles.stackHeader}>Stack</h3>
          <Row>
              <Col md = {2}></Col>
              <Col md = {4} className = {styles.stack}>
                  <h4>Frontend</h4>
                  <br/>
                  <SiNextdotjs className = {styles.stackIcons}/> <SiCss3 className = {styles.stackIcons}/> <SiRedux className = {styles.stackIcons}/>
              </Col>
              <Col md = {4} className = {styles.stack}>
                  <h4>Backend</h4>
                  <br/>
                  <SiNodedotjs className = {styles.stackIcons}/> <SiExpress className = {styles.stackIcons}/> <SiPostgresql className = {styles.stackIcons}/>
              </Col>
              <Col md = {2}></Col>
          </Row>
      </Container>
      <Container fluid className = {styles.copyrightContainer}>
          <h4 className = {styles.copyrightText}><FaCopyright/> Copyright Burpger 2023 - Chinmay Karmokar</h4>
      </Container>
    </>
  )
}

export default Home;