import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function SimpleBadge({ value }) {
  return (
    <Badge badgeContent={value || 0 } color="primary">
      <MailIcon color="action" />
    </Badge>
  );
}