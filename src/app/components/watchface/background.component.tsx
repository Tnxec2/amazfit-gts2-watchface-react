import React, { FC, useContext, useMemo } from "react";
import { Card } from "react-bootstrap";
import BlocksArrayComponent from "../../blocks/blocksArray.component";
import { IWatchContext, WatchfaceContext } from "../../context";
import { BlockType, IRow } from "../../model/blocks.model";

const BackgroundComponent: FC = () => {
  const { watchface, setWatchface } = useContext<IWatchContext>(WatchfaceContext)

  const ar = useMemo<IRow[]>(() => [
    {
      blocks: [
        { title: 'Preview', type: BlockType.SelectFile, nvalue: watchface.background.previewIndex, onChange: onChangeBackgroundPreviewImage },
        { title: 'Background', type: BlockType.SelectFile, nvalue: watchface.background.imageIndex, onChange: onChangeBackgroundImageIndex },
      ]
    },
    {
      blocks: [
        { title: 'Color', type: BlockType.Color, svalue: watchface.background.color, onChange: onChangeBackgroundColor },
      ]
    }
  ], [watchface])  // eslint-disable-line react-hooks/exhaustive-deps

  function onChangeBackgroundPreviewImage(index: number) {
    let w = {...watchface}
    w.background.previewIndex = index
    setWatchface(w)
  }

  function onChangeBackgroundImageIndex(index: number) {
    let w = {...watchface}
    w.background.imageIndex = index
    setWatchface(w)
  }

  function onChangeBackgroundColor(value: string) {
    let w = {...watchface}
    w.background.color = value
    setWatchface(w)
  }

  return (
    <Card>
      <Card.Header
        className="clickable"
        onClick={() => {
          let w = { ...watchface };
          w.background.collapsed = !w.background.collapsed;
          setWatchface(w);
        }}
      >
        Background
      </Card.Header>
      {!watchface.background.collapsed ? (
        <Card.Body>
          <BlocksArrayComponent ar={ar} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
};

export default BackgroundComponent;
