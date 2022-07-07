import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton: React.FC = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={486}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="140" cy="125" r="125" />
        <rect x="0" y="270" rx="15" ry="15" width="280" height="27" />
        <rect x="0" y="320" rx="10" ry="10" width="280" height="76" />
        <rect x="123" y="420" rx="30" ry="30" width="154" height="45" />
        <rect x="0" y="429" rx="10" ry="10" width="91" height="29" />
    </ContentLoader>
)

export default PizzaSkeleton;