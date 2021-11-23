import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './styles.scss';




export default function TestWidgetSetting(
    { visible, onClose, rating, updateWidgetProps }
) {

    const [innerRating, setInnerRating] = useState(0);

    useEffect(() => {
        setInnerRating(rating);
    }, [rating]);

    if (!visible) {
        return null;
    }

    return (
        <div className="widget-setting-modal">
            <div className="title"> Widget Setting</div>
            <div className="form-item">
                <TextField 
                    id="outlined-basic" 
                    label="Rating" 
                    variant="outlined" 
                    value={innerRating} 
                    onChange={(e) => {
                        console.log('meng', e.target.value);
                        setInnerRating(Number(e.target.value));
                    }}
                />
            </div>
            
            <div className="action-panel">
                <Button
                    onClick={() => {
                        const result = {
                            rating: innerRating,
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

