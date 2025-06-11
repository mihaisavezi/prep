import { useState } from "react";

const TabContentMap = {
  html: (
    <p>
      The HyperText Markup Language or HTML is the standard markup language for
      documents designed to be displayed in a web browser.
    </p>
  ),
  css: (
    <p>
      Cascading Style Sheets is a style sheet language used for describing the
      presentation of a document written in a markup language such as HTML or
      XML.
    </p>
  ),
  javascript: (
    <p>
      JavaScript, often abbreviated as JS, is a programming language that is one
      of the core technologies of the World Wide Web, alongside HTML and CSS.
    </p>
  ),
};

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(null);
  
  
  return (
    <div>
      <div onClick={(e) => setActiveTab(e.target.dataset.name)}>
        <button data-name={"html"}>HTML</button>
        <button data-name={"css"}>CSS</button>
        <button data-name={"javascript"}>JavaScript</button>
      </div>
      <div style={{width: '480px'}}>
        {Object.entries(TabContentMap).map(([name, content]) => (<div>{activeTab === name && content}</div>))}
      </div>
    </div>
  );
}
