import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { attendanceApi } from 'src/api/attendance';
import useSWR from 'swr';
import Button from '@mui/material/Button';
import AddCheckout from 'src/sections/dashboard/attendance/add-checkout';

const CheckOut = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});

  const { data } = useSWR('attendance', async () => {
    const response = await attendanceApi.fetchCheckInMemberAPI();
    return response?.data ?? [];
  });

  const handleOpenPopup = (member) => {
    setSelectedMember(member);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <Card>
        <CardHeader title="Check-out Member" />
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {item.member.firstName} {item.member.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleOpenPopup(item)}
                    >
                      Check-out
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <AddCheckout
        open={openPopup}
        handleClose={handleClosePopup}
        member={selectedMember}
      />
    </>
  );
};

CheckOut.getLayout = (checkOut) => <DashboardLayout>{checkOut}</DashboardLayout>;

export default CheckOut;
