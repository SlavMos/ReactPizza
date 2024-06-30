import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={500}
    viewBox="0 0 300 500"
    backgroundColor="#ededed"
    foregroundColor="#d2cbcb"
    {...props}
  >
    <rect x="25" y="269" rx="5" ry="5" width="282" height="32" />
    <rect x="42" y="324" rx="0" ry="0" width="260" height="68" />
    <rect x="274" y="420" rx="0" ry="0" width="10" height="4" />
    <rect x="33" y="433" rx="11" ry="11" width="95" height="30" />
    <rect x="157" y="424" rx="22" ry="22" width="152" height="45" />
    <circle cx="119" cy="167" r="3" />
    <circle cx="177" cy="125" r="119" />
  </ContentLoader>
);

export default MyLoader;
