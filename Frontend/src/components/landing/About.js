import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import image1 from '../Images/1.png'
import image2 from '../Images/2.png'

function About() {
  return (
    <div>
      <Header/>
      <br/>
      <section id='about'>
        <div className='max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6'>
          {/* ITEM 1 */}
          <div className='items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16'>
            {/* TEXT */}
            <div className='text-gray-500 sm:text-lg'>
              {/* TITLE */}
              <h2 className='mb-4 text-3xl font-extrabold tracking-tight text-gray-900'>
                With Loan App, see how loans are released and Succeed.
              </h2>

              {/* DESCRIPTION 1 */}
              <p className='mb-8 font-light lg:text-xl'>
                You can create loans, update their amounts and approve pending
                loans.
              </p>

              {/* FEATS */}
              <ul
                role='list'
                className='pt-8 space-y-5 border-t border-gray-200 my-7'
              >
                <li className='flex space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-[#47b6f2] e-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-base font-medium leading-tight text-gray-900 '>
                    Continuous integration and deployment
                  </span>
                </li>
                <li className='flex space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-[#47b6f2] e-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-base font-medium leading-tight text-gray-900 '>
                    Development workflow
                  </span>
                </li>
                <li className='flex space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-[#47b6f2] e-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-base font-medium leading-tight text-gray-900 '>
                    Loan management
                  </span>
                </li>
              </ul>

              {/* DESCRIPTION 2 */}
              <p className='mb-8 font-light lg:text-xl'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
                dicta aut, quasi ullam aliquid sed nostrum nesciunt iusto quae
                incidunt.
              </p>
            </div>

            {/* IMAGE */}
            <div>
              <img
                src={image1}
                alt=''
              />
            </div>
          </div>

          {/* ITEM 2 */}
          <div className='items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16'>
            {/* IMAGE */}
            <img
              src={image2}
              alt=''
            />

            {/* TEXT */}
            <div className='text-gray-500 sm:text-lg'>
              {/* TITLE */}
              <h2 className='mb-4 text-3xl font-extrabold tracking-tight text-gray-900 '>
                Communicate with your clients through the app.
              </h2>

              {/* DESCRIPTION 1 */}
              <p className='mb-8 font-light lg:text-xl'>
                Instantly notify your clients with their upcoming loan payments.
                Update them with their balance or tell them that their loan has
                been approved and ready for disbursement.
              </p>

              {/* FEATURES */}
              <ul
                role='list'
                className='pt-8 space-y-5 border-t border-gray-200 my-7 '
              >
                <li className='flex space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-[#47b6f2] '
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-base font-medium leading-tight text-gray-900 '>
                    Send Email
                  </span>
                </li>
                <li className='flex space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-[#47b6f2] '
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-base font-medium leading-tight text-gray-900 '>
                    Notify clients
                  </span>
                </li>
                <li className='flex space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-[#47b6f2] '
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-base font-medium leading-tight text-gray-900 '>
                    Send Loan Status / Approvals
                  </span>
                </li>
              </ul>

              {/* DESCRIPTION 2 */}
              <p className='font-light lg:text-xl'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis repudiandae quis commodi odio excepturi exercitationem
                ipsum et sed nesciunt facere.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default About
