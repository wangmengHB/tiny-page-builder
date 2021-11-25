import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './styles.scss';




export default function SettingDialog(
    { visible, onClose, value, updateWidgetProps }
) {

    const [innerValue, setInnerValue] = useState(0);

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    if (!visible) {
        return null;
    }

    return (
        <div className="widget-setting-modal">
            <div className="title"> Widget Setting</div>
            <div className="form-item">
                <TextField 
                    id="outlined-basic" 
                    label="Value" 
                    variant="outlined" 
                    value={innerValue || 0} 
                    onChange={(e) => {
                        console.log('meng', e.target.value);
                        setInnerValue(Number(e.target.value));
                    }}
                />
            </div>
            
            <div className="action-panel">
                <Button
                    onClick={() => {
                        const result = {
                            value: innerValue,
                        }
                        updateWidgetProps(result);
                        onClose();
                    }}
                >
                    Save
                </Button>
                <Button onClick={onClose}>
                    Cancel
                </Button>
            </div>

        </div>
    )

}

