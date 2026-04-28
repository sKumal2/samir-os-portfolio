"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const skillsJson = `{
  "languages": [
    "Python", "Java", "C/C++", "SQL", "JavaScript", "R"
  ],
  "data_engineering": [
    "ETL Pipelines", "Data Integration", "Data Cleansing",
    "Data Modeling", "Statistical Analysis"
  ],
  "databases": [
    "PostgreSQL", "MongoDB", "SQL",
    "Spark (familiar)", "Snowflake (familiar)"
  ],
  "ai_ml": [
    "PyTorch", "Scikit-learn", "Pandas", "NumPy",
    "TensorFlow", "Statistical Modeling"
  ],
  "genai_nlp": [
    "RAG", "LLMs", "Vector Embeddings",
    "Prompt Engineering", "Multi-Agent Systems"
  ],
  "cloud_devops": [
    "Google Cloud Platform", "Docker", "Cloud Run", "Linux", "Git"
  ]
}`;

export function SkillsWindow() {
  return (
    <div className="h-full samir-scroll">
      <SyntaxHighlighter
        language="json"
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: "20px",
          background: "#060b14",
          minHeight: "100%",
          fontSize: "12px",
          fontFamily: "var(--font-space-mono), monospace",
          lineHeight: "1.7",
        }}
        wrapLongLines
      >
        {skillsJson}
      </SyntaxHighlighter>
    </div>
  );
}
