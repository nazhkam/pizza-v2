import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton :React.FC = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    <circle cx="140" cy="140" r="140" /> 
    <rect x="2" y="321" rx="15" ry="15" width="280" height="74" /> 
    <rect x="152" y="404" rx="0" ry="0" width="130" height="38" /> 
    <rect x="-1" y="403" rx="0" ry="0" width="130" height="38" /> 
    <rect x="6" y="281" rx="0" ry="0" width="267" height="31" />
  </ContentLoader>
)

export default Skeleton
