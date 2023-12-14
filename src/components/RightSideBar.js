import React from "react";
import "./CSS/RightSideBar.css";
import comment from "../images/comment-alt-solid.svg";
import pen from "../images/pen-solid.svg";
import blackLogo from "../images/blacklogo.svg";

function RightSideBar() {
  const tags = [
    "c",
    "css",
    "express",
    "firebase",
    "html",
    "java",
    "javascript",
    "mern",
    "mongodb",
    "mysql",
    "next.js",
    "node.js",
    "php",
    "python",
    "reactjs",
  ];
  return (
    <div className="RightSideBarDiv text-secondary mt-5">
      <div className="Blogs">
        <div className="BlogsDiv">
          <div className="BlogsDiv1">
            <h4 className="">The Overflow Blog</h4>
            <p>
              <img src={pen} alt="pen" width="18" /> How terrifying is giving a
              conference talk? (Ep. 589)
            </p>
            <p>
              <img src={pen} alt="pen" width="18" /> The Overflow #186: Do large
              language models know what they’re talking about?
            </p>
          </div>
          <div className="BlogsDiv1">
            <h4 className="">Featured on Meta</h4>
            <p>
              <img src={comment} alt="pen" width="18" /> Starting the Prompt
              Design Site: A New Home in our Stack Exchange Neighborhood
            </p>
            <p>
              <img src={comment} alt="pen" width="18" /> Colors update: A more
              detailed look
            </p>
            <p>
              <img src={blackLogo} alt="pen" width="18" /> Temporary policy:
              Generative AI (e.g., ChatGPT) is banned
            </p>
            <p>
              <img src={blackLogo} alt="pen" width="18" /> Launching 2 new
              collectives: PHP and NLP
            </p>
          </div>
          <div className="BlogsDiv1">
            <h4 className="">Hot Meta Posts</h4>
            <p>
              35 I don't understand why a flag concerning "spam" was declined
            </p>
            <p>51 Is a link to the "How to ask" help page a useful comment?</p>
          </div>
          <div className="WatcheTagsHome"></div>
        </div>
      </div>
      <div className="WatchedTags">
        <h4>Watched tags</h4>
        <div className="widgettagsdiv">
          {tags.map((tag) => (
            <p key={tag}>{tag}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
