import { Delete } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { useState } from 'react';
import DeleteConfirmation from './deleteConfirmation';
import { SeverityPill } from 'src/components/severity-pill';

export const MemberDetails = (props) => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const { member } = props;

  const [memberId, setId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = (id) => {
    setDialogOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const align = mdUp ? 'horizontal' : 'vertical';

  const healthCondition = member.hasHealthIssues ? 'Good' : 'Bad';

  return (
    <>
      <Card
        sx={{ mr: 1, mb: 2 }}
        {...props}
      >
        <CardHeader title="Personal Details" />
        <PropertyList>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={6}
            >
              <PropertyListItem
                align={align}
                divider
                label="Full Name"
                value={member.firstName + ' ' + member.lastName}
              />

              <PropertyListItem
                align={align}
                divider
                label="Email"
                value={member.email}
              />

              <PropertyListItem
                align={align}
                divider
                label="Personal Number"
                value={member.contactNumber}
              />
              <PropertyListItem
                align={align}
                divider
                label="Other Contact"
                value={member.otherContactNumber}
              />
              <PropertyListItem
                align={align}
                divider
                label="Gender"
                value={member.gender}
              />
              <PropertyListItem
                align={align}
                divider
                label="Address"
                value={member.address}
              />
              <PropertyListItem
                align={align}
                divider
                label="Postal code"
                value={member.postalCode}
              />
              <PropertyListItem
                align={align}
                divider
                label="NIC / Passport"
                value={member.nicOrPassport}
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <PropertyListItem
                align={align}
                divider
                label="Nationality"
                value={member.nationality}
              />
              <PropertyListItem
                align={align}
                divider
                label="Occupation"
                value={member.occupation}
              />
              <PropertyListItem
                align={align}
                divider
                label="Emergency contact name"
                value={member.emergencyContactName}
              />
              <PropertyListItem
                align={align}
                divider
                label="Emergency contact "
                value={member.emergencyContactNumber}
              />
              <PropertyListItem
                align={align}
                divider
                label="DOB"
                value={member.dateOfBirth}
              />
              <PropertyListItem
                align={align}
                divider
                label="Vehile Reg No"
                value={member.vehileRegNo}
              />
              <PropertyListItem
                align={align}
                divider
                label="Health Condition"
                value={member.hasHealthIssues ? 'Good' : 'Bad'}
              />
              <PropertyListItem
                align={align}
                divider
                label="Country"
                value={member.country}
              />
            </Grid>
          </Grid>
        </PropertyList>
        <Divider />
        <CardActions sx={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(member._id)}
          >
            Delete Account
          </Button>
        </CardActions>
      </Card>

      {/* delete confirmation */}
      <DeleteConfirmation
        id={memberId}
        open={isDialogOpen}
        onClose={handleClose}
      />
    </>
  );
};
