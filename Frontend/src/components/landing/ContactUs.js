import React from 'react';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import { Row, Col, Container } from 'react-bootstrap';

function ContactUs() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <Container className="my-2 mt-4">
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <img 
              src="https://www.fisdom.com/wp-content/uploads/2022/07/neo-bank.png" 
              alt="Contact Us" 
             
            />
          </Col>

          <Col md={5} className="mt-4" >
            <section id="contacts">
              <div className="py-3 px-2 mx-auto">
                <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-center text-gray-900">
                  Contact Us
                </h2>
                <p className="mb-8 font-light text-center text-gray-500 sm:text-xxl">
                  Got a technical issue? Want to send feedback about a beta feature? 
                  Need details about our Business plan? 
                  Let us know.
                </p>
                <form action="#" className="space-y-8">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      placeholder="abc@gmail.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      placeholder="+1 234 567 890"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Let us know how we can help you"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows="6"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Leave a comment..."
                    ></textarea>
                  </div>

                  <button className="bg-[#00397F] hover:bg-[#00397F] text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline " style={{marginLeft:"26rem"}}>
                    Send
                  </button>
                </form>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ContactUs;
