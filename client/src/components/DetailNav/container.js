import * as React from "react";
import { Presenter } from "./presenter";
import { useDispatch, useSelector } from "react-redux";
import { changeTagLoadingStatusAction } from "../../module/selectedFeed";
import { setBackendWorking } from "../../module/hashtags";

export function Container() {
  const { selected_feed, pending, server } = useSelector(
    state => state.selectedFeed
  );
  const { isBackendWorking } = useSelector(state => state.hashtags);
  const dispatch = useDispatch();
  const dispatchChangeTagLoadingStatus = tagName =>
    dispatch(changeTagLoadingStatusAction(tagName));
  const handleRefresh = tag => {
    dispatchChangeTagLoadingStatus(tag.name);
    dispatch(setBackendWorking({ status: true, tag_id: tag.id }));
  };
  return (
    <>
      {pending ? (
        ""
      ) : (
        <Presenter
          selectedFeed={selected_feed}
          server={server}
          handleRefresh={handleRefresh}
          isBackendWorking={isBackendWorking}
        />
      )}
    </>
  );
}
