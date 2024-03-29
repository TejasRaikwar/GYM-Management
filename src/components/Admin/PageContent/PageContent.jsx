import './PageContent.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import routes from '../../../Routes/routes'
import { useEffect, useRef } from "react"
import { Suspense } from 'react'

function PageContent(){
    const mainContentRef = useRef(null);
    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current.scroll({
            top: 0,
            behavior: "smooth"
          });
      },)

    return(
        <div className="drawer-content">
            <main ref={mainContentRef}>
                <Suspense>
                        <Routes>
                            {
                                routes.map((route, key) => {
                                    return(
                                        <Route
                                            key={key}
                                            exact={true}
                                            path={`${route.path}`}
                                            element={<route.component />}
                                        />
                                    )
                                })
                            }
                        </Routes>
                </Suspense>
                <div className="h-16"></div>
            </main>
        </div> 
    )
}


export default PageContent