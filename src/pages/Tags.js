import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTagsList } from "../actions/tagsActions";
import LeftSideBar from "../components/LeftSideBar";
import "./CSS/Tags.css";

function Tags() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetTagsList());
  }, []);
  const tagsList = useSelector((state) => state.tagsReducer?.data);
  if (!tagsList) {
    return <div className="spinner-border mt-5  isLoadingTags"></div>;
  }
  return (
    <div>
      <div className="containerHome mt-5 row">
        <div className="leftsidebarHome col-2">
          <LeftSideBar page="Tags" />
        </div>
        <div className="mainrightbarHome col-12">
          <div className="ms-3 mt-3">
            <h3>Tags</h3>
            <p className="me-5 pe-5 tagdef">
              A tag is a keyword or label that categorizes your question with
              other, similar questions. Using the right tags makes it easier for
              others to find and answer your question.
            </p>
            <div className="row ms-1">
              {tagsList.map((tag, index) => (
                <div
                  className="col-12 col-sm-3 col-md-5 TagsDivtags p-3 me-5 mb-3"
                  key={index}
                >
                  <p className="displaytagsTags px-2 py-1">{tag.tagName}</p>
                  <p>{tag.tagDesc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tags;
