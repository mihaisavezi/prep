import React, { useState } from "react";
import styles from "./accordion.module.css";

const sections = [
  {
    title: "HTML",
    content: `The HyperText Markup Language or HTML is the
            standard markup language for documents designed to
            be displayed in a web browser.`,
  },
  {
    title: "CSS",
    content: `Cascading Style Sheets is a style sheet language
            used for describing the presentation of a document
            written in a markup language such as HTML or XML.`,
  },
  {
    title: "Javascript",
    content: ` JavaScript, often abbreviated as JS, is a
            programming language that is one of the core
            technologies of the World Wide Web, alongside HTML
            and CSS.`,
  },
];

const Accordion = () => {
  const [items, setItems] = useState(new Set());
  console.log("🚀 ~ Accordion ~ items:", items);

  const toggleSection = (index) => {
    setItems((prevItems) => {
      const openSections = new Set(prevItems);

      if (openSections.has(index)) {
        openSections.delete(index);
      } else {
        openSections.add(index);
      }
      return openSections;
    });
  };

  return (
    <>
      <h2>Accordion</h2>
      <div className={styles.accordion} role="tablist">
        {sections.map((section, index) => (
          <AccordionItem
            key={index}
            title={section.title}
            content={section.content}
            isOpen={items.has(index)}
            onToggle={() => toggleSection(index)}
          />
        ))}
      </div>
    </>
  );
};

const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  console.log("🚀 ~ AccordionItem ~ isOpen:", isOpen);
  return (
    <div className={styles.accordionItem}>
      <button
        className={styles.accordionHeader}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`content-${title.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span className={styles.accordionTitle}>{title}</span>
        <span
          className={`${styles.accordionChevron} ${isOpen ? styles.open : ""}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.427 9.573l3.396-3.396a.25.25 0 01.354 0l3.396 3.396a.25.25 0 01-.177.427H4.604a.25.25 0 01-.177-.427z" />
          </svg>
        </span>
      </button>
      <div
        className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}
        id={`content-${title.replace(/\s+/g, "-").toLowerCase()}`}
        role="region"
        aria-labelledby={`header-${title.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <div className={styles.accordionContentInner}>{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
