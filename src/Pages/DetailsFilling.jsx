import React, { useState } from "react";
import {
  Navbar,
  DetailFillingSidebar,
  EducationComponent,
  KeySkillsComponent,
  PersonalInfoComponent,
  PreviewComponent,
  WorkExperienceComponent,
} from ".";
import "./Styles/DetailsFilling.css";

// As soon as details are filled for particular categories/sections browser moves further to next fields if ! then same field on same page

const DetailsFilling = (props) => {
  // State to manage active tab in datails filling page
  const [tab, setTab] = useState(0);

  return (
    <div className="details-filling">
      <Navbar active={""} />
      {tab === 4 ? null : (
        // Details filling container
        <div className="details-filling-cont">
          {/* Details filling sidebar */}
          <DetailFillingSidebar tab={tab} setTab={setTab} />
          {tab === 0 ? (
            // Personal info component if tab state is set to 0 this will display
            <PersonalInfoComponent setTab={setTab} tab={tab} />
          ) : null}
          {/* Key skills info component if tab state is set to 3 this will display */}
          {tab === 3 ? <KeySkillsComponent setTab={setTab} tab={tab} /> : null}
          {/* Work experience info component if tab state is set to 1 this will display */}
          {tab === 1 ? (
            <WorkExperienceComponent setTab={setTab} tab={tab} />
          ) : null}
          {/* Education info component if tab state is set to 2 this will display */}
          {tab === 2 ? <EducationComponent setTab={setTab} tab={tab} /> : null}
        </div>
      )}
      {/* Preview Component if tab is set to 4 this will be displayed */}
      {tab === 4 ? <PreviewComponent setTab={setTab} tab={tab} /> : null}
    </div>
  );
};

export default DetailsFilling;
