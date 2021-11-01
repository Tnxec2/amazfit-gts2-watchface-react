import React, { FC } from 'react';
import { IRow, BlockType, IBlock } from '../model/blocks.model';
import SelectFileListComponent from '../shared/selectFileList.component';
import CheckBoxBlockComponent from './checkboxBlock.component';
import ColorBlockComponent from './colorBlock.component';
import NumberBlockComponent from './numberBlock.component';
import SelectBlockComponent from './selectBlock.component';

interface IProps {
    row: IRow
}
const RowComponent: FC<IProps> = ({ row }) => {

    function getBlock(block: IBlock) {
        let result: any = '';
        switch (block.type) {
            case BlockType.Empty:
                result = <span className="input-group-text">{block.title}</span>
                break;
            case BlockType.SelectFile:
                result =
                    <SelectFileListComponent
                        title={block.title}
                        onChange={block.onChange}
                        value={block.nvalue}
                    />
                break;
            case BlockType.Number:
                result =
                    <NumberBlockComponent
                        title={block.title}
                        onChange={block.onChange}
                        value={block.nvalue}
                        disabled={block.disabled}
                    />
                break;
            case BlockType.Checkbox:
                result =
                    <CheckBoxBlockComponent
                        title={block.title}
                        onChange={block.onChange}
                        checked={block.checked}
                        disabled={block.disabled}
                    />
                break;
            case BlockType.Select:
                result = 
                    <SelectBlockComponent
                        title={block.title}
                        onChange={block.onChange}
                        value={block.svalue}
                        disabled={block.disabled}
                        options={block.selectOptions}
                    />
                break;
            case BlockType.Color:
                result =
                    <ColorBlockComponent
                        title={block.title}
                        onChange={block.onChange}
                        value={block.svalue}
                    />
                break;
            default:
                break;
        }
        return result
    }
    return (
        <>
            <div className={`input-group input-group-sm d-flex ${ row.showDelete ? 'justify-content-between' : ''}`}>
                {row.blocks.map((block) =>
                    getBlock(block))
                }
                { row.showDelete ?
                    <button className="btn btn-outline-danger" type="button" onClick={row.onDelete} disabled={!row.onDelete}>Delete</button> : ''}
            </div>
        </>
    );
};

export default RowComponent;


