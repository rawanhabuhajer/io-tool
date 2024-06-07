import React from "react";
import { Dimmer, Loader} from "semantic-ui-react";
import './loading.css'
const Loading = () => {
  return (
    <div className="loader">
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </div>
  );
};

export default Loading;
